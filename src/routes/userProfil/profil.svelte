<script>
    import { Link } from "svelte-routing";

    import CustomInput from '../../lib/customInput.svelte';
    import CustomSelect from "../../lib/customSelect.svelte";

    let popup = false;

    const handlePopup = () => {
        popup = !popup;
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
                <button>Supprimer</button>
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
    <h1>Edit Profil</h1>
    <div id="container">
        <div class="logoContainer">
            <img src="https://thispersondoesnotexist.com/" alt="Logo app">
        </div>
        <div id="content">
            <h2>Jhon Doe</h2>
            <div id="cityContainer">
                <span class="material-symbols-rounded">
                    location_on
                </span>
                Angers
            </div>
            <div id="navBtnContainer">
                <a href="#editProfil">Edit Profil</a>
                <a href="#comments">Comments</a>
            </div>
            <div id="editProfil">
                <CustomInput type="text" text="Nom" required/>
                <CustomInput type="text" text="Prénom" required/>
                <div style="display: flex; gap: .5em;align-items: flex-end;">
                    <CustomSelect text="Sexe" required>
                        <option value="homme">Homme</option>
                        <option value="femme">Femme</option>
                        <option value="autre">Autre</option>
                    </CustomSelect>
                    <CustomInput type="date" text="Date de naissance" required/>
                </div>
                <CustomInput text="Ville" type="text" required/>
                <CustomInput text="Email" type="email" required/>
                <CustomInput text="Mot de passe" type="password" required/>
                <CustomInput text="Confirmer mot de passe" type="password" required/>
                <div id="register">
                    <button>Enregistrer</button>
                </div>
            </div>
            <div id="comments">
                <h3>Commentaires</h3>
                {#each Array(5) as _}
                    <div class="comment">
                        <div class="top">
                            <p>Restaurant</p>
                            <p class="note">5/5</p>
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <span class="material-symbols-rounded" on:click={handlePopup}>delete</span>
                        </div>
                        <p>Officia laborum qui consequat nulla. Ad aliquip adipisicing do do minim commodo ipsum consectetur. Aute reprehenderit excepteur cillum fugiat enim enim. Anim sit sint esse laborum. Laborum nisi ad ex non. Officia ea cupidatat deserunt magna ut laborum aliquip quis. Officia nulla labore laboris cupidatat officia reprehenderit minim irure ex.</p>
                    </div>
                {/each}
            </div>
            <div id="delete">
                <button>Supprimer mon compte</button>
            </div>
        </div>
    </div>
</main>
    
<style lang="scss">
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
            height: 50%;
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
                    gap: 2em;
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