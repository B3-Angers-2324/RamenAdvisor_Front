<script>
    import CustomInput from "./customInput.svelte";
</script>

<userInformation>
    <form>
        <CustomInput type="text" required text="Nom" />
        <CustomInput type="text" required text="Prénom" />
        <div class="inline">
            <CustomInput type="select" required text="Adresse" />
            <CustomInput type="text" text="Ville" />
        </div>
        <CustomInput type="date" required text="Date" showValid/>
        <CustomInput type="text" required text="Email" />
        <CustomInput type="password" required text="Mot de passe" />
        <CustomInput type="password" required text="Confirmer mot de passe" />
        <button type="submit">Valider</button>
    </form>
</userInformation>

<style lang="scss">
    userInformation{
        width: 100%;
        height: 100%;
        display: block;
        box-sizing: border-box;

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

            .inline{
                display: flex;
                flex-direction: row;
                gap: calc(var(--spacing) / 2);
                width: 100%;
            }

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
</style>