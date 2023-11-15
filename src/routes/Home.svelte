<script>   
    import { onMount } from 'svelte';

    import 'leaflet/dist/leaflet.css';
    import SearchContainer from '../lib/searchContainer.svelte';
    import NavBar from "../lib/navBar.svelte";
    import { API_URL } from "../main";
    import RestaurantCard from "../lib/restaurantCard.svelte";
    import Map from "../lib/map.svelte";
    let dragging = false;

    //Get the restaurants from the API
    let restaurants = [];
    let listPos = undefined;
    const limit = 20;
    let showpin = true;
    onMount ( async () => {
      requestDataRestaurantFromAPI(`${API_URL}/restaurant/best?limit=${limit}`);
    })

    //request the data from the API and update the list of restaurants for an url
    async function requestDataRestaurantFromAPI(url){
      fetch(url,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
      })
      .then((res) => {
        if (res.status === 404) {
          throw new Error("No restaurant found");
        }
        return res.json();
      })
      .then((data) => {
        let listProv = [];
        data.obj.forEach((restaurant,i) => {
          listProv.push(restaurant.position);
          //At the end of the loop, we update the list
          if(i >= data.obj.length-1){
            listPos = listProv;
          }
        });
        restaurants = data.obj;
        showpin = true;
      })
      .catch((err) => {
        restaurants = [];
        showpin = false;
      });
    }

    /* === Event for the search and filter bar === */
    console.log("Home");
    let filterState= {
        search: "",
        type: "none",
        accessible: false,
    };

    // Function to react on keypress (Is sended to the searchContainer component)
    let onKeypressInSearch = (e) => {
        if(e.key === "Enter"){
            filterState.search = e.target.value;
            fetchWithFilterAndSearch(filterState);
        }
    };

    //Function to react on filter change (Is sended to the filterBar component)
    let onFilterChange = (e) => {
        //If it's a type change 
        if(e.target.id === "type"){
            filterState.type = e.target.value;
        }else{ //If it's a accessible change
            filterState.accessible = !filterState.accessible;
        }
        fetchWithFilterAndSearch(filterState);
    };

    async function fetchWithFilterAndSearch(filters){

      //Build the url based on the filters
      let url = `${API_URL}/restaurant/search?`;
      if (filters.search !== "") {
        url += `search=${filters.search}&`;
      }
      if (filters.type !== "") {
        url += `type=${filters.type}&`;
      }
      if (filters.accessible !== "") {
        url += `accessible=${filters.accessible}&`;
      }
      url+=`limit=${limit}`;
      requestDataRestaurantFromAPI(url)
    }
  </script>
  
  
  <main>
    <Map 
      bind:dragging 
      positions={listPos}
      showPin={showpin}
      />
    <div id="container">
      <SearchContainer classComponent="{dragging ? 'onDragSearchContainer' : ''}" onKeypress={onKeypressInSearch} onFilterChange={onFilterChange} filterState={filterState}/>
      <bottomContainer class="{dragging ? 'onDragBottomContainer' : ''}">
        <div id="restaurantContainer">
          {#each restaurants as restaurant}
            <RestaurantCard name={restaurant.name} note={restaurant.note} images={restaurant.images} foodtype={restaurant.foodtype} id={restaurant.id}/>
            {/each}
            <!--<RestaurantCard name="McDonald's Champs-Élysées" address="15 rue du tertre" note="38" position="[48.87287753220859, 2.299091242896418]" image="https://images.pexels.com/photos/5531434/pexels-photo-5531434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" foodtype="local_pizza" id="1"/>
            <RestaurantCard name="Burger King Montmartre" address="165 avenue des Bizneuil" note="31" position="[48.884597, 2.339918]" image="https://images.pexels.com/photos/2291599/pexels-photo-2291599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" foodtype="restaurant" id="2"/>
            <RestaurantCard name="KFC Montmartre" address="1 avenue du Monmartre" note="39" position="[48.890217, 2.346131]" image="https://images.pexels.com/photos/3556225/pexels-photo-3556225.jpeg?auto=compress&cs=tinysrgb&w=600" foodtype="restaurant" id="3"/>
            <RestaurantCard name="Kebab Express" address="35 avenue du kebab" note="46" position="[48.875621, 2.337450]" image="https://images.pexels.com/photos/2983022/pexels-photo-2983022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" foodtype="local_pizza" id="4"/>
            <RestaurantCard name="Pizza Express" address="15 rue de la pizza" note="40" position="[48.871916, 2.329340]" image="https://images.pexels.com/photos/1841184/pexels-photo-1841184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" foodtype="lunch_dining" id="5"/-->
        </div>
        <NavBar/>
    </bottomContainer>
    </div>
  </main>
  
  <style lang="scss">
    main{
      background-color: var(--cambridge-blue);
      width: 100vw;
      height: 100vh;
    
      #container{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        pointer-events: none;
      }
  
      BottomContainer{
        position: absolute;
        bottom: 0;
        display: flex;
        width: 100%;
        height: 50%;
        justify-content: center;
    
        #restaurantContainer{
          position: relative;
          width: fit-content;
          display: flex;
          flex-direction: row;
          gap: 75px;
          scrollbar-width: none;
          -ms-overflow-style: none;
          pointer-events: auto;
          z-index: 2;
          padding: 20px var(--spacing) 0 var(--spacing);
          overflow-x: scroll;
          overflow-y: hidden;
          margin-bottom: calc(var(--spacing) + 3.5em + calc(var(--spacing) / 2));
          bottom: 0;
          align-items: end;

          &::-webkit-scrollbar {
            display: none;
          }
        }
      }
    }
  
    :global(.onDragSearchContainer){
      transform: translateY(-250px);
      transition: transform .5s;
    }
  
    :global(.onDragBottomContainer){
      transform: translateY(600px);
      transition: transform .5s;
    }
  
    :global(SearchContainer){
      transition: transform .5s;
    }
  
    :global(BottomContainer){
      transition: transform .5s;
    }
  </style>
  