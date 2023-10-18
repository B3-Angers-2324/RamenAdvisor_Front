<script>
// @ts-nocheck
    import { Link } from "svelte-routing";

    import logo from '../assets/icon.png';
    import UserInformation from '../lib/userInformation.svelte';
    import CustomInput from '../lib/customInput.svelte';
    import Home from './Home.svelte';

    let signIn = false;
    let signUp = true;

    let toggle = () => {
        signIn = !signIn;
        signUp = !signUp;
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
                <form>
                    <CustomInput type="mail" required text="Email" />
                    <CustomInput type="password" required text="Mot de passe" />
                    <button type="submit">Valider</button>
                </form>
            {/if}
            <div id="bottom">
                <!-- svelte-ignore a11y-missing-attribute -->
                <!-- svelte-ignore a11y-interactive-supports-focus -->
                <a role="button" on:click={toggle} on:keydown={toggle}>
                    {#if signUp}Déja un compte?{:else}Créer un compte{/if}
                </a>                             
                <a href="/pro">Vous êtes pro ?</a>
            </div>
        </div>
    </div>
    <div class="backCircle">
        <span class="cricle c2"></span>
        <span class="cricle c1"></span>
    </div>
</main>

<style lang="scss">
    main{
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
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
                width: 600px;
                height: 600px;
                border-radius: 50%;
                position: absolute;
                background-color: var(--brunswick-green);
    
                &.c1{
                    left: -10em;
                    top: -5em;
                    animation: moveCircle1 40s infinite linear;
                }
    
                &.c2{
                    right: -15em;
                    bottom: -6em;
                    animation: moveCircle2 40s infinite linear;
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
            margin-top: 100px;
            position: relative;

            .logoContainer{
                background-color: var(--bone);
                width: 200px;
                height: 200px;
                position: absolute;
                transform: translateY(-50%);
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;

                img{
                    width: 175px;
                    height: 175px;
                }
            }

            #content{
                margin: calc(var(--spacing) / 2);
                margin-top: var(--spacing);
                width: calc(100% - var(--spacing));
                height: fit-content;

                h1{
                    font-size: 2.5em;
                    color: var(--brunswick-green);
                    padding-bottom: 40px;
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
                        height: calc(50px + 10px * 2);
                        width: 50%;
                        font-size: 2em;
                        padding: 10px 0;
                        border-radius: var(--radius);
                        cursor: pointer;
                    }
                }
            }

            #bottom{
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                padding: 50px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                font-size: 1.25em;

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
            padding: 25px;
            font-size: 5em;
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