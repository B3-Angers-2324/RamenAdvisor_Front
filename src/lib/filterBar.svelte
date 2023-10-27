<script>
    export let div;

    const customTransition = (node, { duration }) => {
        return {
            duration,
            css: (t) => `
                transform: translate(0, ${(1 - t) * -100}px);
            `
        };
    };
</script>

<filterBar transition:customTransition={{duration: 250}}>
    <div class="filterItem" bind:this={div}>
        <select name="Type" id="type">
            <option value="italien">Italien</option>
            <option value="japonais">Japonais</option>
            <option value="chinois">Chinois</option>
            <option value="traditionel">Traditionel</option>
        </select>
    </div>

    <button class="filterItem soloItem">
        <p>À Proximité</p>
        <span class="material-symbols-rounded">
            location_on
        </span>
    </button>    
    

    <button class="filterItem soloItem">
        <p>À Emporter</p>
        <span class="material-symbols-rounded">
            takeout_dining
        </span>
    </button>

    <button class="filterItem soloItem">
        <p>À Livrer</p>
        <span class="material-symbols-rounded">
            local_shipping
        </span>
    </button>
</filterBar>


<style lang="scss">
    filterBar {
        position: relative;
        height: 3.5em;
        display: flex;
        flex-direction: row;
        overflow-x: scroll;
        gap: 30px;
        scrollbar-width: none;
        -ms-overflow-style: none;
        pointer-events: auto;
        z-index: 2;
        padding: 0 calc(var(--spacing) / 2);

        &::-webkit-scrollbar {
            display: none;
        }

        button{
            border: none;
            font-family: var(--font-family);
        }

        .filterItem {
            height: 100%;
            background-color: var(--bone);
            flex-shrink: 0;
            overflow: hidden;
            border-radius: var(--radius);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 10px;
            color: var(--brunswick-green);
            gap: 10px;
            cursor: pointer;

            p{
                font-size: 1em;
            }

            select {
                height: 100%;
                width: 100%;
                border: none;
                background: transparent;
                color: var(--brunswick-green);
                font-family: var(--font-family);
                font-size: 1em;
                cursor: pointer;

                &:focus {
                    outline: none;
                }

                option{
                    font-size: 0.5em;
                }
            }
        }
    }
</style>