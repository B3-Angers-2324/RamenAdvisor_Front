<script>
    // @ts-nocheck
    import { Link } from "svelte-routing";

    import logo from '../../assets/icon.png';
    import UserInformation from '../../lib/userInformation.svelte';
    import CustomInput from '../../lib/customInput.svelte';
    import { API_URL, setTokentWithExpiry } from "../../main";
    import SHA256 from 'crypto-js/sha256';
    import { onMount } from "svelte";

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
                setTokentWithExpiry(data.token);
                window.location.href = "/profile";
            } else {
                error = data.message;
            }
        })
    }

    let mobile = window.matchMedia("(max-width: 768px)").matches;

    function checkScreenSize() {
        mobile = window.matchMedia("(max-width: 768px)").matches;
    }

    window.addEventListener('resize', checkScreenSize);

    onMount(() => {
        checkScreenSize();
    });

</script>
    
{#if mobile}
<main id="mobile">
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
</main>
{:else}
<main id="pc">
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
</main>
{/if}

<style lang="scss">
    .error{
        color: var(--error);
    }
    main#mobile{
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;

        position: relative;

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
            color: var(--brunswick-green);
            z-index: 2;
            cursor: pointer;
        }
    }
    main#pc{
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;

        position: relative;

        #container{
            width: calc(50% - var(--spacing) * 2);
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
            color: var(--brunswick-green);
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