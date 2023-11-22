<script>
// @ts-nocheck
    import { Link } from "svelte-routing";

    import logo from '../assets/icon.png';
    import UserInformation from '../lib/userInformation.svelte';
    import CustomInput from '../lib/customInput.svelte';
    import { API_URL } from "../main";
    import SHA256 from 'crypto-js/sha256';

    let signIn = true;
    let signUp = false;

    let error = "";
    let email = "";
    let password = "";

    let toggle = () => {
        signIn = !signIn;
        signUp = !signUp;
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const apiRequest = API_URL + new URL(e.target.action).pathname;

        let passwordHash = SHA256(password).toString();

        
        const data = {
            email: email,
            password: passwordHash
        }

        fetch(apiRequest, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.token) {
                    error = "";
                    localStorage.setItem("token", data.token);
                    window.location.href = "/";
                } else {
                    error = data.message;
                }
            })
    }

</script>

<main>
    <Link to="/">
        <span class="material-symbols-rounded" role="button">
            arrow_back
        </span>
    </Link>
    <div id="container">
        <div class="logoContainer">
            <img src="{logo}" alt="Logo app">
        </div>
        <div id="content">
            {#if signUp}
                <h1>Créer un compte</h1>
                <UserInformation />
            {:else}
                <h1>Se connecter</h1>
                <form action="/user/login" on:submit|preventDefault={handleLoginSubmit}>
                    <CustomInput type="email" required text="Email" bind:value={email}/>
                    <CustomInput type="password" required text="Mot de passe" bind:value={password}/>
                    <p class="error">{error}</p>
                    <button type="submit">Valider</button>
                </form>
            {/if}
            <div id="bottom">
                <!-- svelte-ignore a11y-missing-attribute -->
                <!-- svelte-ignore a11y-interactive-supports-focus -->
                <a role="button" on:click={toggle} on:keydown={toggle}>
                    {#if signUp}Déja un compte?{:else}Créer un compte{/if}
                </a>                             
                <a href="https://owner.ramenadvisor.fr">Vous êtes pro ?</a>
            </div>
        </div>
    </div>
    <div class="backCircle">
        <span class="cricle c2"></span>
        <span class="cricle c1"></span>
    </div>
</main>

<style lang="scss">
    .error{
        color: var(--error);
    }
    main{
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;

        position: relative;

        .backCircle{
            width: 100%;
            height: 100%;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 0;
            overflow: hidden;
            
            .cricle{
                width: 250px;
                height: 250px;
                border-radius: 50%;
                position: absolute;
                background-color: var(--brunswick-green);
    
                &.c1{
                    left: -100px;
                    top: -50px;
                    animation: moveCircle1 60s infinite linear;
                }
    
                &.c2{
                    right: -50px;
                    bottom: -100px;
                    animation: moveCircle2 60s infinite linear;
                    animation-delay: 500ms;
                }
            }
        }

        #container{
            width: calc(100% - var(--spacing) * 2);
            height: fit-content;
            background-color: var(--bone);
            border-radius: var(--radius);
            display: flex;
            justify-content: center;
            z-index: 1;
            padding-bottom: var(--spacing);
            margin: 100px 0;
            position: relative;

            .logoContainer{
                background-color: var(--bone);
                width: 100px;
                height: 100px;
                position: absolute;
                transform: translateY(-50%);
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;

                img{
                    width: calc(100%);
                    height: calc(100%);
                }
            }

            #content{
                margin: calc(var(--spacing) / 2);
                margin-top: var(--spacing);
                width: calc(100% - var(--spacing));
                height: fit-content;

                h1{
                    font-size: 1.5em;
                    color: var(--brunswick-green);
                    padding-bottom: 20px;
                    margin-bottom: var(--spacing);
                    border-bottom: 5px solid var(--brunswick-green);
                    box-sizing: border-box;
                }

                form{
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    flex-direction: column;
                    gap: calc(var(--spacing) / 1.25);

                    button[type="submit"]{
                        background-color: var(--brunswick-green);
                        color: var(--bone);
                        border: none;
                        height: 2.5em;
                        width: 50%;
                        font-size: 1.2em;
                        padding: 10px 0;
                        border-radius: var(--radius);
                        cursor: pointer;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }

            #bottom{
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                padding: 10px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                font-size: 0.75em;

                a{
                    text-decoration: none;
                    color: var(--black);
                    cursor: pointer;
                }
            }
        }

        .material-symbols-rounded{
            position: absolute;
            top: 0;
            left: 0;
            padding: 0.25em;
            font-size: 3.5em;
            color: var(--bone);
            z-index: 2;
            cursor: pointer;
        }
    }
    @keyframes moveCircle1 {
        0% { transform: translate(0, 0); }
        33% { transform: translate(-100px, -50px); }
        66% { transform: translate(-10px, 50px); }
        100% { transform: translate(0, 0); }
    }
    @keyframes moveCircle2 {
        0% { transform: translate(0, 0); }
        33% { transform: translate(100px, 50px); }
        66% { transform: translate(10px, -50px); }
        100% { transform: translate(0, 0); }
    }
</style>