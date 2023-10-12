<script>
    import NavBar from "./navBar.svelte";
    import RestaurantCard from "./restaurantCard.svelte";
  </script>
  
  <bottomContainer>
      <div id="restaurantContainer">
          <RestaurantCard image="./src/assets/restaurant.png" type="local_pizza" name="Pizza del Papa" note="4.4"/>
          <RestaurantCard image="https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1280.jpg" type="lunch_dining" name="Bobo Burger's" note="3.9"/>
          <RestaurantCard image="https://cdn.pixabay.com/photo/2016/11/18/19/13/buildings-1836478_1280.jpg" type="fastfood" name="Oye Papi que bueno" note="4.2"/>
          <RestaurantCard image="https://cdn.pixabay.com/photo/2020/08/27/07/31/restaurant-5521372_1280.jpg" type="restaurant" name="À la bonne franquette de jackie" note="4.1"/>
      </div>
      <NavBar/>
  </bottomContainer>
  
  <style lang="scss">
      bottomContainer{
          display: flex;
          position: relative;
          width: 100%;
          height: 33%;
          justify-content: center;
      }
  
      #restaurantContainer{
          height: 300px;
          width: fit-content;
          display: flex;
          flex-direction: row;
          gap: 75px;
          scrollbar-width: none;
          -ms-overflow-style: none;
          pointer-events: auto;
          z-index: 2;
          padding: 20px var(--spacing);
          position: relative;
          overflow-x: auto;
          margin-top: 20px;
      }
  </style>
  