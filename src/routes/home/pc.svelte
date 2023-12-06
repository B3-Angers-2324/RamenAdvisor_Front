<script>   
    import { onMount, afterUpdate } from 'svelte';
    import { Link, navigate } from "svelte-routing";
    import { API_URL } from "../../main";
  
  
    import 'leaflet/dist/leaflet.css';
    import Map from "../../lib/map.svelte";
  
    //Get the restaurants from the API
    let restaurants = [];
    let listPos = undefined;
    const limit = 20;
    let showpin = true;
    onMount ( async () => {
      requestDataRestaurantFromAPI(`${API_URL}/restaurant/best?limit=${limit}`);
      filterBar = document.getElementById('filterBar');
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
  
    let input;
    let filterBarVisible = false;
    let filterBar;
  
    function toggleFilterBar(e){
      if(window.matchMedia("(max-width: 768px)").matches){
        if(e.target.placeholder === 'Search' || e.target.tagName === 'SELECT' || e.target.tagName === 'BUTTON' || e.target.tagName === 'P'){
          filterBar.style.transform = 'translateY(0em)';
          filterBarVisible = true;
        } else {
          filterBar.style.transform = 'translateY(-4.75em)';
          filterBarVisible = false;
        }
      }
    }
  
    afterUpdate(() => {
      window.addEventListener('mousedown', toggleFilterBar);
      return () => {
        window.removeEventListener('mousedown', toggleFilterBar);
      };
    });
  
    function handleClickRestaurantCard(id) {
          navigate("/restaurant/"+id); // naviguez vers la page "/restaurant/:id"
      }
      
      function handleKeyDownRestaurantCard(event) {
          if (event.key === "Enter") {
            handleClickRestaurantCard();
          }
      }
  </script>
    
        
<main>
    <div id="map">
        <Map 
        positions={listPos}
        showPin={showpin}
        />
    </div>
    <div id="navbar">
        <Link to="/">
            <div id="img">
                <img src="../../src/assets/icon.png" alt="">
                <h2>RamenAdvisor</h2>
            </div>
        </Link>
        <div id="searchContainer">
            <div id="searchBar">
                <span class="material-symbols-rounded">
                    search
                </span>
                <input type="text" placeholder="Search" bind:this={input} on:keydown={() => {}}/>
            </div>
            <div id="filterBar">
                <div class="filterItem">
                    <select name="Type" id="type" on:change={onFilterChange} value="{filterState.type}">
                        <option value="none">Tout type</option>
                        <option value="local_pizza">Pizza</option>
                        <option value="lunch_dining">Dinner</option>
                        <option value="fastfood">Fast-food</option>
                        <option value="restaurant">Restaurant</option>
                    </select>
                </div>
            
                <button class="filterItem soloItem {(filterState.accessible)?"on":""}" on:click={onFilterChange}>
                    <p>Accessible</p>
                    <span class="material-symbols-rounded">
                        accessible
                    </span>
                </button>    
            </div>
        </div>
        <div id="navBtns">
            <button>
                <span class="material-symbols-rounded">
                    favorite
                </span>
            </button>
            <button>
                <Link to="register/">
                    <span class="material-symbols-rounded">
                        account_circle
                    </span>
                </Link>
            </button>
        </div>
    </div>
    <div id="container">
        <div id="bottomContainer">
            <div id="restaurantContainer">
                {#each restaurants as restaurant}
                    <div id="restaurantCard" on:click={() => handleClickRestaurantCard(restaurant.id)} on:keydown={handleKeyDownRestaurantCard} role="button" tabindex=0>
                        <img src={restaurant.images[0]} alt="restaurant"/>
                        <div class="info">
                            <div class="name">
                                <h1>{restaurant.name}</h1>
                            </div>
                            <span class="material-symbols-rounded type">
                                {restaurant.foodtype}
                            </span>
                            <p class="note">{restaurant.note/10}/5</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</main>
    
<style lang="scss">
main {
    background-color: var(--cambridge-blue);
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    #map{
        position: absolute;
        width: 75%;
        height: calc(100% - 5em);
        top: 0;
        right: 0;
        z-index: 0;
        user-select: none;
        border: none;
        margin-top: 5em;

        &:focus {
            outline: none;
        }
    }

    #navbar{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: calc(100% - var(--spacing) * 2);
        height: 5em;
        position: relative;
        background-color: var(--cambridge-blue);
        padding: 0 var(--spacing);
        z-index: 2;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);

        #img{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1em;

            h2{
                font-size: 1.5em;
                color: var(--brunswick-green);
                font-family: var(--font-family);
            }

            img{
                width: 5em;
                height: 5em;
            }
        }

        #searchContainer {
            display: flex;
            position: relative;
            width: 75%;
            height: 5em;
            justify-content: center;
            position: relative;
            flex-direction: row;
            align-items: center;


            #filterBar {
                position: relative;
                height: 3.5em;
                display: flex;
                flex-direction: row;
                overflow-x: scroll;
                gap: 30px;
                scrollbar-width: none;
                -ms-overflow-style: none;
                pointer-events: auto;
                z-index: 2;
                padding: 0 calc(var(--spacing) / 2);
                transform: translateY(0);
                transition: 0.5s;

                &::-webkit-scrollbar {
                    display: none;
                }

                button {
                    border: none;
                    font-family: var(--font-family);

                    &.filterItem {
                        &.on {
                            background-color: var(--brunswick-green);
                            color: var(--bone);
                        }
                    }
                }

                .filterItem {
                    height: 100%;
                    background-color: var(--bone);
                    flex-shrink: 0;
                    overflow: hidden;
                    border-radius: var(--radius);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 10px;
                    color: var(--brunswick-green);
                    gap: 10px;
                    cursor: pointer;

                    p {
                        font-size: 1em;
                    }

                    select {
                        height: 100%;
                        width: 100%;
                        border: none;
                        background: transparent;
                        color: var(--brunswick-green);
                        font-family: var(--font-family);
                        font-size: 1em;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }

                        option {
                            font-size: 0.5em;
                        }
                    }
                }
            }

            #searchBar {
                pointer-events: auto;
                position: relative;
                background-color: var(--brunswick-green);
                height: 3.5em;
                border-radius: var(--radius);
                display: flex;
                align-items: center;
                padding: 0 calc(var(--spacing) / 2);
                gap: 20px;
                z-index: 3;
                

                .material-symbols-rounded {
                    font-size: 2em;
                    color: var(--bone);
                }

                input {
                    position: relative;
                    height: 75%;
                    width: 100%;
                    flex-grow: 1;
                    border: none;
                    background: transparent;
                    color: var(--bone);
                    font-size: 1em;
                    font-family: var(--font-family);

                    &:focus {
                        outline: none;
                    }
                }
            }
        }

        #navBtns{
            display: flex;
            justify-content: space-around;
            align-items: center;
            gap: 1em;
            
            button {
                height: 3.5em;
                width: 3.5em;
                background-color: transparent;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                border: none;
                cursor: pointer;

                .material-symbols-rounded {
                    font-size: 3em;
                    color: var(--brunswick-green);
                    padding: 5px;
                }
            }
        }
    }

    #container {
        position: absolute;
        width: 25%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        display: flex;
        align-items: end;

        #bottomContainer {
            position: relative;
            display: flex;
            justify-content: center;
            width: 100%;
            height: calc(100% - 5em);

            #restaurantContainer {
                position: relative;
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 2em;
                padding-top: 2em;
                align-items: center;
                overflow-y: scroll;

                &::-webkit-scrollbar {
                    display: none;
                }

                #restaurantCard:nth-last-child(1){
                    margin-bottom: 2em;
                }

                #restaurantCard {
                    height: 6em;
                    width: calc(100% - 4em);
                    padding: 1em;
                    background-color: var(--bone);
                    flex-shrink: 0;
                    border-radius: var(--radius);
                    color: var(--brunswick-green);
                    position: relative;
                    overflow: visible;
                    cursor: pointer;
                    user-select: none;
                    display: flex;
                    align-items: center;

                    .info {
                        width: 100%;
                        height: 100%;
                        position: relative;
                        display: flex;

                        .type {
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            padding: 0.5em;
                            background-color: var(--brunswick-green);
                            border-radius: 50%;
                            font-size: 1em;
                            color: var(--bone);
                        }

                        .note{
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            padding: 0 0.5em;
                            font-size: 1.2em;
                            color: var(--brunswick-green);
                        }

                        .name{
                            position: relative;
                            width: 75%;
                            height: 100%;
                            display: flex;
                            align-items: start;
                            padding-left: 1em;
                            font-size: .5em;
                            text-wrap: wrap;
                            word-wrap: break-word;                          
                        }
                    }
                    img {
                        position: relative;
                        height: 6em;
                        width: 6em;
                        border-radius: var(--radius);
                        object-fit: cover;
                    }

                }
            }
        }
    }
}
</style>
    