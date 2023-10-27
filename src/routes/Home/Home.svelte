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
              <RestaurantCard image="{restaurant.image}" type="{restaurant.foodtype}" name="{restaurant.name}" note="{restaurant.note}"/>
          {/each}
            <!-- <RestaurantCard image="https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1280.jpg" type="lunch_dining" name="Bobo Burger's" note="3.9"/>
            <RestaurantCard image="https://cdn.pixabay.com/photo/2016/11/18/19/13/buildings-1836478_1280.jpg" type="fastfood" name="Oye Papi que bueno" note="4.2"/>
            <RestaurantCard image="https://cdn.pixabay.com/photo/2020/08/27/07/31/restaurant-5521372_1280.jpg" type="restaurant" name="À la bonne franquette de jackie" note="4.1"/> -->
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
  