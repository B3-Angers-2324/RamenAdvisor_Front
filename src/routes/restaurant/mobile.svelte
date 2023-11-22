<script>
    import { Link } from "svelte-routing";
    import Map from '../../lib/map.svelte';
    import { API_URL, isConnected } from '../../main.js';
    import { onMount } from "svelte";

    import { navigate } from "svelte-routing";

    function getId(){
        return  window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    }

    //Fill image with iterable array for svelte
    let restaurantData = {
        images:[],
        detailNote:[]
    };

    const limit = 5;
    let messageleft = true;

    //Init the message Array
    let messageData = [];
    
    let promiseStart = onMount(async () => {
        //Restaurants API
        let response = await fetch(`${API_URL}/restaurant/id/${getId()}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (response.status == 404){
            navigate("/Error/404");
        }
        let data = await response.json();
        restaurantData = data.obj;
        console.log("restaurantData :",restaurantData);
        console.log("restaurantData.detailNote :",restaurantData.detailNote);

        //get percentage of each note
        fetch(`${API_URL}/restaurant/id/${getId()}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => response.json())
        
        //Message API
        updateMessage(limit,0);
    })

    async function updateMessage(limit, offset){
        //Message API
        let response = await fetch(`${API_URL}/message/all/restaurant/${getId()}?limit=${limit}&offset=${offset}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (response.status == 404){
            navigate("/Error/404");
        }
        let data = await response.json();
        messageData = [...messageData, ...data.obj];
        messageData.forEach(element => {
            element.showDropdown = false;
        });
        messageleft = data.pageleft;
    }

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
        alert("Merci de votre signalement");
        fetch(`${API_URL}/message/report/${messageData[index].id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userId": messageData[index].user.id,
                "restaurantId": getId(),
                "messageId": messageData[index].id
            })
        })
    }

    let selectedNote = 0;
    function onChangeNote(event) {
		selectedNote = event.currentTarget.value;
	}
    async function newComment(e){
        e.preventDefault();
        if (textArea.value == "" || selectedNote==0) return;
        let response = await fetch(`${API_URL}/message/new/restaurant/${getId()}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "message": textArea.value,
                "note": selectedNote
            })
        })
        if (response.status == 200) {
            location.reload();
        }else{
            let json = await response.json();
            alert(json.message);
        }
        textArea.value = "";
        selectedNote = 0;
    }

    let textArea;
    
    const adjustHeight = () => {
        textArea.style.height = 'auto';
        textArea.style.height = `${textArea.scrollHeight}px`;
    };
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
    {#if isConnected()}
    <div id="postCommentContainer">
        <h3>Votre Commentaire</h3>
        <form on:submit|preventDefault={newComment}>
            <textarea bind:this={textArea} on:input={adjustHeight} name="comment" id="comment" placeholder="Votre commentaire..." required></textarea>  
            <div class="rating">
                <input checked={selectedNote===5} on:change={onChangeNote} name="stars" id="e5" type="radio" value="5" required>
                <label for="e5">
                    <span class="material-symbols-rounded">star</span>
                </label>
                <input checked={selectedNote===4} on:change={onChangeNote} name="stars" id="e4" type="radio" value="4" required>
                <label for="e4">
                    <span class="material-symbols-rounded">star</span>
                </label>
                <input checked={selectedNote===3} on:change={onChangeNote} name="stars" id="e3" type="radio" value="3" required>
                <label for="e3">
                    <span class="material-symbols-rounded">star</span>
                </label>
                <input checked={selectedNote===2} on:change={onChangeNote} name="stars" id="e2" type="radio" value="2" required>
                <label for="e2">
                    <span class="material-symbols-rounded">star</span>
                </label>
                <input checked={selectedNote===1} on:change={onChangeNote} name="stars" id="e1" type="radio" value="1" required>
                <label for="e1">
                    <span class="material-symbols-rounded">star</span>
                </label>
            </div>
            <button type="submit">Envoyer</button>
        </form>
    </div>  
    {/if}
    <div id="avisContainer">
        <h2>Avis</h2>
        <div class="avisFilter">
            <div class="btnFilter">
                {#each restaurantData.detailNote as element,i}
                    <div class="line">
                        <button>{i+1}</button>
                        <span style="width: {element.percentage}%;"></span>
                        <p>{element.percentage}%</p>
                    </div>
                {/each}
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
            {#if messageleft}
            <button on:click={() => updateMessage(limit,messageData.length)} id="loadMore">
                <span class="material-symbols-rounded">
                    expand_more
                </span>
                Voir plus
            </button>
            {/if}
        </div>
    </div>
</main>
  
<style lang="scss">
    main{
        width: calc(100% - 2 * var(--spacing));
        height: 100%;
        padding: var(--spacing);

        #postCommentContainer{
            margin-top: var(--spacing);
            background-color: var(--zomp);
            display: flex;
            flex-direction: column;
            gap: calc(var(--spacing) / 2);
            padding: calc(var(--spacing) / 2);
            justify-content: center;
            align-items: center;
            border-radius: var(--radius);
            position: relative;

            h3{
                color: var(--black);
                font-size: 1.2em;
            }

            form{
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: calc(var(--spacing) / 2);

                textarea{
                    width: calc(100% - var(--spacing));
                    min-height: 3em;
                    max-height: 10em;
                    border-radius: var(--radius);
                    background-color: var(--bone);
                    border: none;
                    outline: none;
                    padding: calc(var(--spacing) / 2);
                    resize: none;
                    color: var(--black);
                    font-size: 1em;
                    font-family: 'Poppins', sans-serif;
                    overflow-y: auto;
                }

                .rating {
                    width: 100%;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    direction: rtl;
                    
                    
                    input {
                        float: right;
                        opacity: 0;
                        position: absolute;
                    }

                    a, label {
                        float:right;
                        color: var(--cambridge-blue);
                        text-decoration: none;
                        -webkit-transition: color .4s;
                        -moz-transition: color .4s;
                        -o-transition: color .4s;
                        transition: color .4s;
                        display: flex;
                        justify-content: center;

                        span{
                            font-size: 3em;
                        }
                    }

                    label:hover ~ label,
                    input:focus ~ label,
                    label:hover,
                    a:hover,
                    a:hover ~ a,
                    a:focus,
                    a:focus ~ a{
                        color: var(--brunswick-green);
                        cursor: pointer;
                    }
                }
                .rating2 {
                    direction: rtl;
                    a {
                        float:none
                    }
                }

                button{
                    width: 100%;
                    height: 3em;
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

                #loadMore{
                    width: 100%;
                    height: 3em;
                    border-radius: var(--radius);
                    background-color: var(--brunswick-green);
                    color: var(--bone);
                    font-size: 1em;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &.off{
                        background-color: var(--zomp);
                        color: var(--grey);
                        cursor: not-allowed;
                    }

                    span{
                        font-size: 2em;
                    }
                }

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