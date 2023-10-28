<script>
    import { restaurantStore } from './store.js';
    import { Link } from "svelte-routing";
    import Map from '../../lib/map.svelte';

    let restaurantData = {};

    restaurantStore.subscribe(value => {
        restaurantData = value;
    });

    let items = Array(5).fill().map(() => ({ showDropdown: false }));
    function toggleDropdown(index) {
        items[index].showDropdown = !items[index].showDropdown;
    }

    let imagesList = [
        restaurantData.image,
        "https://images.pexels.com/photos/8856554/pexels-photo-8856554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2067560/pexels-photo-2067560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/3252051/pexels-photo-3252051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ];
    let currentImageIndex = 0;

    const updateImage = (index) => {
        currentImageIndex = index;
    }
</script>

<main>
    <div id="restauImg">
        <img src="{imagesList[currentImageIndex]}" alt="restaurant"/>
        <div class="icon">
            <Link to="/">
                <span class="material-symbols-rounded">arrow_back</span>
            </Link>
            <span class="material-symbols-rounded">favorite</span>
        </div>
        <div class="caroussel">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            {#each imagesList as image, index}
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="img-container" on:click={() => updateImage(index)}>
                    <img src="{image}" alt="restaurant"/>
                </div>
            {/each}
        </div>        
    </div>
    <div id="restauInfo">
        <div class="nameAndnote">
            <h1>{restaurantData.name}</h1>
            <p>{restaurantData.note/10}/5</p>
        </div>
        <p class="address">
            {restaurantData.address}, Angers
        </p>
        <div class="link">
            <a href="#">
                <span class="material-symbols-rounded">mail</span>
            </a>
            <a href="#">
                <span class="material-symbols-rounded">phone</span>
            </a>
            <a href="#">
                <span class="material-symbols-rounded">language</span>
            </a>
        </div>
        <div class="map">
            <Map pin={restaurantData.position} zoom="15" showPlace/>
        </div>
    </div>
    <div id="avisContainer">
        <h2>Avis</h2>
        <div class="avisFilter">
            <div class="stars">
                <span class="material-symbols-rounded">
                    star
                </span>
                <span class="material-symbols-rounded">
                    star
                </span>
                <span class="material-symbols-rounded">
                    star
                </span>
                <span class="material-symbols-rounded">
                    star
                </span>
                <span class="material-symbols-rounded">
                    star
                </span>
            </div>
            <div class="btnFilter">
                <button>5</button>
                <button>4</button>
                <button>3</button>
                <button>2</button>
                <button>1</button>
            </div>
        </div>
        <div class="avisAll">
            {#each items as item, i}
                <div class="avis">
                    <img src="http://thispersondoesnotexist.com/" alt="profil"/>
                    <div class="top">
                    <h4>Jhon Doe</h4>
                    <p>{Math.floor(Math.random() * 6)}/5</p>
                    </div>
                    <p class="comment">
                    Ipsum elit sunt excepteur id irure aute laborum in. Deserunt ipsum labore amet sit pariatur laborum cupidatat proident duis amet ex. Laborum cupidatat quis nisi sunt voluptate incididunt nulla pariatur sit aliqua magna eu dolor.
                    </p>
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <span class="material-symbols-rounded" on:click={() => toggleDropdown(i)}>
                    more_horiz
                    </span>
                    {#if item.showDropdown}
                    <div class="dropdown">
                        <button>
                        <span class="material-symbols-rounded">
                            flag
                        </span>
                        Signaler
                        </button>
                        <button>
                        <span class="material-symbols-rounded">
                            edit
                        </span>
                        Modifier
                        </button>
                    </div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</main>
  
<style lang="scss">
    main{
        width: calc(100% - 2 * var(--spacing));
        height: 100%;
        padding: var(--spacing);

        #restauImg{
            width: 100%;
            height: 0;
            padding-bottom: 100%;
            position: relative;
            overflow: hidden;
            border-radius: var(--radius);

            img{
                width: 100%;
                height: 100%;
                position: absolute;
                object-fit: cover;
                object-position: center;
            }

            .icon{
                position: absolute;
                z-index: 1;
                width: calc(100% - 2 * var(--radius));
                padding: var(--radius);
                display: flex;
                justify-content: space-between;
                user-select: none;

                span{
                    color: var(--bone);
                    background-color: var(--brunswick-green);
                    border-radius: 50%;
                    padding: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;    
                }
            }

            .caroussel {
                display: flex;
                justify-content: flex-start;
                gap: 10px;
                position: absolute;
                bottom: 0;
                width: calc(100% - 4 * 10px);
                margin: 10px;
                height: 20%;
                align-items: center;
                padding: 10px;

                .img-container {
                    position: relative;
                    height: 100%;
                    width: 100%;
                    border-radius: var(--radius);
                    overflow: hidden;
                    background-color: var(--brunswick-green);
                }

                &::before{
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: var(--bone);
                    opacity: 0.5;
                    border-radius: var(--radius);
                }

            }
        }

        #restauInfo{
            margin-top: var(--spacing);

            .nameAndnote{
                width: 100%;
                display: flex;
                gap: calc(var(--spacing) / 2);
                color: var(--black);
                justify-content: space-between;

                h1{
                    font-size: 1.5em;
                }

                p{
                    font-size: 1.5em;
                }
            }

            .address{
                color: var(--black);
                font-size: 0.85em;
            }
            
            .link{
                box-sizing: border-box;
                margin: calc(var(--spacing) / 2) 0;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
            
                a{
                    width: 4em;
                    height: 4em;
                    border-radius: 50%;
                    background-color: var(--zomp);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: var(--bone);
    
                    span{
                        font-size: 2.5em;
                    }
                }
            }

            .map{
                height: 12.5em;
                border-radius: var(--radius);
                overflow: hidden;
            }
        }

        #avisContainer{
            margin-top: var(--spacing);

            h2{
                color: var(--black);
                font-size: 1.5em;
            }

            .avisFilter{
                margin-top: calc(var(--spacing) / 2);
                width: 100%;
                height: 8em;
                background-color: var(--bone);
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                border-radius: var(--radius);
                overflow: hidden;

                .stars{
                    width: 100%;
                    height: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;

                    &::before {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 50%;
                        height: 100%;
                        background-color: green;
                        z-index: -1;
                    }

                    span{
                        font-size: 3em;
                        position: relative;
                    }
                }

                .btnFilter{
                    width: calc(100% - 2em);
                    height: calc(50% - 2em);
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    gap: 1em;
                    padding: 1em;

                    button{
                        height: 2em;
                        width: 100%;
                        border-radius: var(--radius);
                        background-color: var(--brunswick-green);
                        color: var(--bone);
                        font-size: 1em;
                        border: none;
                        outline: none;
                        cursor: pointer;
                    }
                }
            }

            .avisAll{
                margin-top: var(--spacing);
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: var(--spacing);

                .avis{
                    background-color: var(--bone);
                    border-radius: var(--radius);
                    padding: 1em 1em 1em 4em;
                    position: relative;

                    img{
                        position: absolute;
                        width: 5em;
                        height: 5em;
                        border-radius: 50%;
                        object-fit: cover;
                        object-position: center;
                        top: -1em;
                        left: -1em;
                    }

                    .top{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        margin-bottom: 0.5em;

                        h4{
                            transform: translateX(0.5em);
                        }

                        p{
                            margin-left: 2em;
                            color: var(--black);
                            font-size: 1em;
                        
                        }
                    }

                    p{
                        color: var(--black);
                        font-size: 0.75em;
                    }

                    span{
                        position: absolute;
                        top: 0;
                        right: 0.5em;
                        color: var(--black);
                        font-size: 2em;
                        user-select: none;
                    }

                    .dropdown{
                        background-color: var(--cambridge-blue);
                        position: absolute;
                        top: 2em;
                        right: 0.5em;
                        display: flex;
                        flex-direction: column;
                        gap: 0.5em;
                        padding: 0.5em 0;
                        border-radius: var(--radius);
                        z-index: 2;

                        button{
                            padding: 0 0.5em;
                            display: flex;
                            align-items: center;
                            gap: 0.5em;
                            background-color: transparent;
                            border: none;
                            outline: none;
                            color: var(--black);
                            font-size: 1em;
                            cursor: pointer;

                            span{
                                position: relative;
                                top: 0;
                                right: 0;
                                font-size: 1.5em;
                            }
                        }

                        &::before{
                            content: "";
                            position: absolute;
                            top: -0.5em;
                            right: 1em;
                            width: 0;
                            height: 0;
                            border-left: 0.5em solid transparent;
                            border-right: 0.5em solid transparent;
                            border-bottom: 0.5em solid var(--cambridge-blue);
                        }
                    }
                }
            }
        }
    }
</style>