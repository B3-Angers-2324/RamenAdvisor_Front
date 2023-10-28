<script>   
    import 'leaflet/dist/leaflet.css';
    import SearchContainer from '../../lib/searchContainer.svelte';
    import NavBar from "../../lib/navBar.svelte";
    import { API_URL } from "../../main";
    import RestaurantCard from "../../lib/restaurantCard.svelte";
    import Map from "../../lib/map.svelte";
    let dragging = false;

    //Get the restaurants from the API
    let restaurants = [];
    const limit = 5;
    fetch(`${API_URL}/restaurant/best?limit=${limit}`,{
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((data) => {
        restaurants = data.obj;
        console.log(restaurants);
      });
  </script>
  
  
  <main>
    <Map bind:dragging/>
    <div id="container">
      <SearchContainer classComponent="{dragging ? 'onDragSearchContainer' : ''}"/>
      <bottomContainer class="{dragging ? 'onDragBottomContainer' : ''}">
        <div id="restaurantContainer">
          {#each restaurants as restaurant}
            <RestaurantCard name="{restaurant.name}" address="{restaurant.address}" note="{restaurant.note}" position="{restaurant.position}" image="{restaurant.image}" foodtype="{restaurant.foodtype}" id="{restaurant.id}"/>
          {/each}
            <RestaurantCard name="McDonald's Champs-Élysées" address="15 rue du tertre" note="38" position="[48.87287753220859, 2.299091242896418]" image="https://images.pexels.com/photos/5531434/pexels-photo-5531434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" foodtype="local_pizza" id="1"/>
            <RestaurantCard name="Burger King Montmartre" address="165 avenue des Bizneuil" note="31" position="[48.884597, 2.339918]" image="https://images.pexels.com/photos/2291599/pexels-photo-2291599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" foodtype="restaurant" id="2"/>
            <RestaurantCard name="KFC Montmartre" address="1 avenue du Monmartre" note="39" position="[48.890217, 2.346131]" image="https://images.pexels.com/photos/3556225/pexels-photo-3556225.jpeg?auto=compress&cs=tinysrgb&w=600" foodtype="restaurant" id="3"/>
            <RestaurantCard name="Kebab Express" address="35 avenue du kebab" note="46" position="[48.875621, 2.337450]" image="https://images.pexels.com/photos/2983022/pexels-photo-2983022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" foodtype="local_pizza" id="4"/>
            <RestaurantCard name="Pizza Express" address="15 rue de la pizza" note="40" position="[48.871916, 2.329340]" image="https://images.pexels.com/photos/1841184/pexels-photo-1841184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" foodtype="lunch_dining" id="5"/>
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
  