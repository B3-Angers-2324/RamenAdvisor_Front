<script>
    import { Link } from "svelte-routing";
    import Map from '../../lib/map.svelte';
    import { API_URL } from '../../main.js';
    import { onMount } from "svelte";

    import { navigate } from "svelte-routing";

    //Fill image with iterable array for svelte
    let restaurantData = {
        images:[]
    };

    //Init the message Array
    let messageData = [];
    
    onMount(async () => {
        //get id from url
        let url = window.location.href;
        let id = url.substring(url.lastIndexOf('/') + 1);
        //Restaurants API
        await fetch(`${API_URL}/restaurant/id/${id}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) => res.json())
        .then((data) => {
            restaurantData = data.obj;
        })
        .catch((err) => {
            console.log('HERE');
            navigate("/Error");
        });
        //Message API
        fetch(`${API_URL}/message/restaurant/${id}?limit=${5}&offset=${0}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) => res.json())
        .then((data) => {
            messageData = data.obj;
            messageData.forEach(element => {
                element.showDropdown = false;
            });
        }).catch((err) => {
            console.log('HERE');
            navigate("/Error", {replace: true});
        });
    })

    //Fill dropdown button
    //let items = Array(5).fill().map(() => ({ showDropdown: false }));
    function toggleDropdown(/** @type {number} */ index) {
        messageData.forEach((element,i) => {
            if (i!=index) element.showDropdown = false;
        });
        messageData[index].showDropdown = !messageData[index].showDropdown;
    }

    let currentImageIndex = 0;
    const updateImage = (/** @type {number} */ index) => {
        currentImageIndex = index;
    }

    function sendReport(index){
        console.log(messageData[index]);
        let restaurantId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        alert("Merci de votre signalement");
        fetch(`${API_URL}/message/report/${messageData[index].id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userId": messageData[index].user.id,
                "restaurantId": restaurantId,
                "messageId": messageData[index].id
            })
        })
    }
    

    let note = {
        5: 69,
        4: 19,
        3: 6,
        2: 2,
        1: 4
    }
</script>

<main>
    <div id="restauImg">
        <img src="{restaurantData.images[currentImageIndex]}" alt=""/>
        <div class="icon">
            <Link to="/">
                <span class="material-symbols-rounded">arrow_back</span>
            </Link>
            <span class="material-symbols-rounded">favorite</span>
        </div>
        <div class="caroussel">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            {#each restaurantData.images as image, index}
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="img-container" on:click={() => updateImage(index)}>
                    <img src="{image}" alt=""/>
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
            <Map 
            positions={(restaurantData.position)?[restaurantData.position]:undefined} 
            zoom="15" 
            showPin={true}
          />
        </div>
    </div>
    <div id="avisContainer">
        <h2>Avis</h2>
        <div class="avisFilter">
            <div class="btnFilter">
                <div class="line">
                    <button>5</button>
                    <span style="width: {note[5]}%;"></span>
                    <p>{note[5]}%</p>
                </div>
                <div class="line">
                    <button>4</button>
                    <span style="width: {note[4]}%;"></span>
                    <p>{note[4]}%</p>
                </div>
                <div class="line">
                    <button>3</button>
                    <span style="width: {note[3]}%;"></span>
                    <p>{note[3]}%</p>
                </div>
                <div class="line">
                    <button>2</button>
                    <span style="width: {note[2]}%;"></span>
                    <p>{note[2]}%</p>
                </div>
                <div class="line">
                    <button>1</button>
                    <span style="width: {note[1]}%;"></span>
                    <p>{note[1]}%</p>
                </div>
            </div>
        </div>
        <div class="avisAll">
            {#each messageData as msg, i}
                <div class="avis">
                    <img src="http://thispersondoesnotexist.com/" alt="profil"/>
                    <div class="top">
                    <h4>{msg.user.firstName} {msg.user.lastName}</h4>
                    <p>{msg.note}/5</p>
                    </div>
                    <p class="comment">
                    {msg.content}
                    </p>
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <span class="material-symbols-rounded {(msg.showDropdown)?"dropped":""}" on:click={() => toggleDropdown(i)}>
                    more_horiz
                    </span>
                    {#if msg.showDropdown}
                    <div class="dropdown">
                        <button on:click={() => sendReport(i)}>
                        <span class="material-symbols-rounded">
                            flag
                        </span>
                        Signaler
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
                background-color: #fff;
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
                height: fit-content;
                background-color: var(--bone);
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                border-radius: var(--radius);
                overflow: hidden;

                .btnFilter{
                    width: calc(100% - 2em);
                    height: calc(50% - 2em);
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    gap: 1em;
                    padding: 1em;
                    flex-direction: column;

                    .line{
                        width: 100%;
                        display: grid; 
                        grid-template-columns: 3em 1fr auto; // Le bouton aura une largeur de 3em, le span prendra tout l'espace restant, et le paragraphe aura la largeur de son contenu
                        align-items: center;
                        gap: 1em;                

                        button{
                            height: 2em;
                            border-radius: var(--radius);
                            background-color: var(--brunswick-green);
                            color: var(--bone);
                            font-size: 1em;
                            border: none;
                            outline: none;
                            cursor: pointer;
                        }

                        span{
                            display: block;
                            height: 2em;
                            background-color: var(--cambridge-blue);
                            border-radius: var(--radius);
                        }

                        p {
                            text-align: right; // aligner le texte à droite
                        }
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
                        cursor: pointer;

                        &.dropped{
                            cursor: default;
                        }
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