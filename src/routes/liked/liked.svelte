<script>
    import { Link } from "svelte-routing";
    import { onMount } from "svelte";
    import { API_URL, getTokenWithExpiry } from "../../main";
    import App from "../../App.svelte";

    let mobile = window.matchMedia("(max-width: 768px)").matches;

    let favorites = [];

    function checkScreenSize() {
        mobile = window.matchMedia("(max-width: 768px)").matches;
    }

    window.addEventListener('resize', checkScreenSize);

    onMount(() => {
        checkScreenSize();
        getFavorite();
    });

    async function getFavorite () {
        fetch(`${API_URL}/user/getFavorite`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getTokenWithExpiry()
            },
        })
        .then((res) => {
            if(res.status == 401){
                //window.location.href = '/';
            }
            return res.json()
        })
        .then((data) => {
            data.forEach(element => {
                element.restaurant.foodtype = element.foodtype.imgId;
                favorites = [...favorites, element.restaurant];
            });
        })
    }
</script>

{#if mobile}
<main id="mobile">
    <div class="icon">
        <Link to="/">
            <span class="material-symbols-rounded">arrow_back</span>
        </Link>
    </div>
    <h1>Liked</h1>
    <div id="input">
        <form>
            <input type="text" placeholder="Search">
        </form>
    </div>
    <div id="container">
        {#each favorites as favorite}
            <div id="restaurantCard" on:click={() => {}} on:keydown={() => {}} role="button" tabindex=0>
                <img src="https://thispersondoesnotexist.com/" alt="restaurant"/>
                <div class="info">
                    <div class="name">
                        <h1>{favorite.name}</h1>
                    </div>
                    <img src={`${API_URL}/image/${favorite.foodtype}`} class="foodtype" alt="">
                    <p class="note">{favorite.note/10}/5</p>
                </div>
            </div>
        {/each}
    </div>
</main>
{:else}
<main id="pc">
    <div class="icon">
        <Link to="/">
            <span class="material-symbols-rounded">arrow_back</span>
        </Link>
    </div>
    <h1>Liked</h1>
    <div id="input">
        <form>
            <input type="text" placeholder="Search">
        </form>
    </div>
    <div id="container">
        {#each favorites as favorite}
            <div id="restaurantCard" on:click={() => {}} on:keydown={() => {}} role="button" tabindex=0>
                <img src="https://thispersondoesnotexist.com/" alt="restaurant"/>
                <div class="info">
                    <div class="name">
                        <h1>{favorite.name}</h1>
                    </div>
                    <img src={`${API_URL}/image/${favorite.foodtype}`} class="foodtype" alt="">
                    <p class="note">{favorite.note/10}/5</p>
                </div>
            </div>
        {/each}
    </div>
</main>
{/if}

<style lang="scss">
    main#mobile{
        width: calc(100% - 2 * var(--spacing));
        height: 100%;
        padding: var(--spacing);

        h1{
            font-size: 2rem;
            margin-bottom: var(--spacing);
            color: var(--brunswick-green);
        }

        #input{
            width: 100%;
            margin-bottom: var(--spacing);
            display: flex;
            justify-content: center;
            align-items: center;

            form{
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                input{
                    width: 100%;
                    padding: calc(var(--spacing) / 4);
                    border-radius: var(--radius);
                    border: none;
                    outline: none;
                    font-size: 1rem;
                    background-color: var(--bone);
                    color: var(--brunswick-green);
                    font-family: var(--font);
                }
            }
        }

        #container{
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            grid-gap: var(--spacing);
            justify-items: center;
            align-items: center;

            #restaurantCard:nth-last-child(1){
                margin-bottom: 2em;
            }

            #restaurantCard {
                height: 6em;
                width: 100%;
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
                        text-wrap: wrap;
                        word-wrap: break-word;
                        
                        h1{
                            font-size: clamp(.5em, 1em, 1.5em);
                        }
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
    main#pc{
        width: calc(100% - 2 * var(--spacing));
        height: 100%;
        padding: var(--spacing);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h1{
            font-size: 2rem;
            margin-bottom: var(--spacing);
            color: var(--brunswick-green);
        }

        #input{
            width: 100%;
            margin-bottom: var(--spacing);
            display: flex;
            justify-content: center;
            align-items: center;

            form{
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                input{
                    width: 100%;
                    padding: calc(var(--spacing) / 4);
                    border-radius: var(--radius);
                    border: none;
                    outline: none;
                    font-size: 1rem;
                    background-color: var(--bone);
                    color: var(--brunswick-green);
                    font-family: var(--font);
                }
            }
        }

        #container{
            width: 50%;
            height: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            grid-gap: var(--spacing);
            justify-items: center;
            align-items: center;

            #restaurantCard:nth-last-child(1){
                margin-bottom: 2em;
            }

            #restaurantCard {
                height: 6em;
                width: 100%;
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
                        text-wrap: wrap;
                        word-wrap: break-word;
                        
                        h1{
                            font-size: clamp(.5em, 1em, 1.5em);
                        }
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
    .icon{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
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
</style>