<script>
    import { Link } from "svelte-routing";

    import CustomInput from '../../lib/customInput.svelte';
    import CustomSelect from "../../lib/customSelect.svelte";
    import { API_URL } from "../../main";
    import Modal from "../../lib/modal.svelte";
    import { onMount } from "svelte";
    import Loadmore from "../../lib/loadmore.svelte";

    let popup = false;
    let information = {
        firstName: "",
        lastName: "",
        birthDay: "",
        email: "",
        phone: "",
        sexe: "",
        ville: "",
        address: ""
    }
    let error = "";
    let showModal = false;
    let limit = 5;
    let messages = [];
    let more = false;

    onMount ( async () => {
        loadUserData();
        loadMessages(limit,0);
    })

    if(localStorage.getItem("token") == null){
        window.location.href = "/";
    }

    async function loadMessages(limit,offset){
        try{
            let response = await fetch(`${API_URL}/user/message?limit=${limit}&offset=${offset}`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
            });
            let data = await response.json();
            if (response.ok) {
                messages = [...messages, ...data.messages];
            } else {
                throw new Error(data.message);
            }
            more = data.more;
        }catch(err){
            console.log(err);
        }
    }

    async function loadUserData(){
        fetch(`${API_URL}/user/profile`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((res) => {
                if (res.status === 404 || res.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = "/";
                }
                return res.json();
            })
            .then((data) => {
                information = data.user;
                information["birthDay"] = information["birthDay"].split("T")[0];
            })
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = "/";
    }

    const handleUpdateProfile = () => {
        fetch(`${API_URL}/user/profile`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(information)
            })
            .then((res) => res.json())
            .then((data) => {
                error = data.message;
            })
    }

    const handleDeleteProfile = () => {
        fetch(`${API_URL}/user/profile`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((res) => {
                if (res.status === 200) {
                    localStorage.removeItem('token');
                    window.location.href = "/";
                }
                return res.json();
            })
            .then((data) => {
                error = data.message;
            });
    }

    let toRemove = null;
    const handlePopup = (id) => {
        popup = !popup;
        toRemove = id;
    }

    const handleDeleteComment = async () => {
        let response = await fetch(`${API_URL}/message/delete/${toRemove}`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        if(response.ok){
            location.reload();
        }else{
            alert((await response.json()).message);
        }
    }
</script>
    
{#if popup}
<div id="popup">
    <div id="popupContainer">
        <div id="popupContent">
            <h2>Supprimer le commentaire</h2>
            <p>Êtes-vous sûr de vouloir supprimer ce commentaire ?</p>
            <div id="btnContainer">
                <button on:click={handlePopup}>Annuler</button>
                <button on:click={handleDeleteComment}>Supprimer</button>
            </div>
        </div>
    </div>
</div>
{/if}
<main>
    <Link to="/">
        <span class="material-symbols-rounded" id="back" role="button">
            arrow_back
        </span>
    </Link>
    <button class="btnIcons" on:click={handleLogout}>
        <span class="material-symbols-rounded" id="logout" role="button">
            logout
        </span>
    </button>
    <h1>Edit Profil</h1>
    <div id="container">
        <div class="logoContainer">
            <img src="https://thispersondoesnotexist.com/" alt="Logo app">
        </div>
        <div id="content">
            <h2>{information["firstName"] + information['lastName']}</h2>
            <div id="cityContainer">
                <span class="material-symbols-rounded">
                    location_on
                </span>
                {information["ville"]}
            </div>
            <div id="navBtnContainer">
                <a href="#editProfil">Edit Profil</a>
                <a href="#comments">Comments</a>
            </div>
            <div id="editProfil">
                <CustomInput type="text" text="Nom" bind:value={information["lastName"]} required/>
                <CustomInput type="text" text="Prénom" bind:value={information["firstName"]} required/>
                <div style="display: flex; gap: .5em;align-items: flex-end;">
                    <CustomSelect text="Sexe" bind:value={information["sexe"]} required>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                        <option value="Autre">Autre</option>
                    </CustomSelect>
                    <CustomInput type="date" bind:value={information["birthDay"]} text="Date de naissance" required/>
                </div>
                <CustomInput text="Ville" bind:value={information["ville"]} type="text" required/>
                <CustomInput text="Adresse" bind:value={information["address"]} type="text" required/>
                <CustomInput text="Email" bind:value={information["email"]} type="email" required/>
                <CustomInput text="Téléphone" bind:value={information["phone"]} type="tel" required/>
                <p class="error">{error}</p>
                <div id="register">
                    <button on:click={handleUpdateProfile}>Enregistrer</button>
                </div>
            </div>
            <div id="comments">
                <h3>Commentaires</h3>
                {#each messages as msg}
                    <div class="comment">
                        <div class="top">
                            <p>{msg.restaurant.name}</p>
                            <p class="note">{msg.note}/5</p>
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <span class="material-symbols-rounded" on:click={() => handlePopup(msg._id)}>delete</span>
                        </div>
                        <p>{msg.message}</p>
                    </div>
                {/each}
                <Loadmore on:loadMore={() => loadMessages(limit, messages.length)} bind:more={more}/>
            </div>
            <div id="delete">
                <button on:click={() => showModal = true}>Supprimer mon compte</button>
            </div>
        </div>
    </div>
    <Modal bind:showModal validate={handleDeleteProfile}>
        <h2 slot="header">Voulez-vous vraiment supprimer votre compte ?</h2>
    </Modal>
</main>
    
<style lang="scss">
    .error{
        color: red;
        text-align: center;
    }
    #popup{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3;

        #popupContainer{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        #popupContent{
            width: 50%;
            background-color: var(--bone);
            border-radius: var(--radius);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1em;
            padding: 1em;

            h2{
                color: var(--black);
                font-size: 1.5em;
                font-weight: 400;
            }

            p{
                color: var(--black);
                font-size: 1em;
                font-weight: 400;
            }

            #btnContainer{
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1em;

                button{
                    background-color: var(--brunswick-green);
                    color: var(--bone);
                    border: none;
                    height: 2.5em;
                    width: 50%;
                    font-size: 1em;
                    padding: 10px 0;
                    border-radius: var(--radius);
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                button:nth-child(2){
                    background-color: var(--danger);
                }
            }
        }
    }

    main{
        width: 100%;
        display: flex;
        position: relative;
        align-items: center;
        flex-direction: column;

        #back{
            position: absolute;
            top: 0;
            left: 0;
            padding: 0.25em;
            font-size: 3.5em;
            color: var(--bone);
            z-index: 2;
            cursor: pointer;
        }

        .btnIcons{
            background: transparent;
            border: none;
        }

        #logout{
            position: absolute;
            top: 0;
            right: 0;
            padding: 0.25em;
            font-size: 3.5em;
            color: var(--bone);
            z-index: 2;
            cursor: pointer;
        }

        h1{
            color: var(--black);
            font-size: 1.5em;
            font-weight: 400;
            margin-top: var(--spacing);
        }

        #container{
            width: calc(100% - var(--spacing) * 2);
            height: fit-content;
            background-color: var(--bone);
            border-radius: var(--radius);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1;
            padding-bottom: var(--spacing);
            margin: calc(var(--spacing) * 2) 0;
            position: relative;
            flex-direction: column;
            position: relative;
            padding-top: calc(var(--spacing) / 2);

            .logoContainer{
                background-color: var(--bone);
                width: 100px;
                height: 100px;
                position: absolute;
                border-radius: 50%;
                top: 0;
                transform: translateY(-50%);
                display: flex;
                justify-content: center;
                align-items: center;

                img{
                    position: relative;
                    width: 85%;
                    height: 85%;
                    border-radius: 50%;
                    object-fit: cover;
                }
            }

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

            #content{
                position: relative;
                margin: calc(var(--spacing) / 1.5);
                height: fit-content;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;

                h2{
                    color: var(--black);
                    font-size: 1.5em;
                    font-weight: 400;
                }

                #cityContainer{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--black);
                }

                #navBtnContainer{
                    width: calc(100% - var(--spacing));
                    padding: calc(var(--spacing) / 2);
                    display: flex;
                    justify-content: space-between;

                    a{
                        background-color: var(--zomp);
                        padding: .5em 1em;
                        border-radius: var(--radius);
                        color: var(--black);
                    }
                }

                #editProfil{
                    width: calc(100% - var(--spacing));
                    display: flex;
                    padding: calc(var(--spacing) / 2);
                    flex-direction: column;
                    gap: 2em;
                    justify-content: center;
                    align-items: center;

                    #register{
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        button{
                            background-color: var(--brunswick-green);
                            color: var(--bone);
                            border: none;
                            height: 2.5em;
                            width: 50%;
                            font-size: 1em;
                            padding: 10px 0;
                            border-radius: var(--radius);
                            cursor: pointer;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                    }
                }

                #comments{
                    width: calc(100% - var(--spacing));
                    display: flex;
                    padding: calc(var(--spacing) / 2);
                    flex-direction: column;
                    gap: 0.5em;
                    justify-content: center;
                    align-items: center;

                    .comment{
                        width: calc(100% - 2em);
                        display: flex;
                        flex-direction: column;
                        gap: 1em;
                        padding: 1em;
                        margin: 1em;
                        border-radius: var(--radius);
                        background-color: var(--cambridge-blue);

                        .top{
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            p{
                                color: var(--black);
                                font-size: 1em;
                                font-weight: 400;
                            }

                            span{
                                font-size: 1.5em;
                                color: var(--black);
                                cursor: pointer;
                            }
                        }

                        p{
                            color: var(--black);
                            font-size: .75em;
                            font-weight: 400;
                        }
                    }
                }

                #delete{
                    width: calc(100% - var(--spacing));
                    display: flex;
                    padding: calc(var(--spacing) / 2);
                    flex-direction: column;
                    gap: 2em;
                    justify-content: center;
                    align-items: center;

                    button{
                        background-color: var(--danger);
                        color: var(--bone);
                        border: none;
                        height: 2.5em;
                        width: fit-content;
                        font-size: 1em;
                        padding: 10px 0;
                        border-radius: var(--radius);
                        cursor: pointer;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 0 1em;
                    }
                }
            }
        }
        
    }
</style>