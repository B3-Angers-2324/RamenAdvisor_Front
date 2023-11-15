<script>
    import { onMount } from "svelte";

    export let div;

    export let filterState= {};
    export let onFilterChange = (e) => {};

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
        <select name="Type" id="type" on:change={onFilterChange} value="{filterState.type}">
            <option value="none">Tout type</option>
            <option value="local_pizza">Pizza</option>
            <option value="lunch_dining">Dinner</option>
            <option value="fastfood">Fast-food</option>
            <option value="restaurant">Restaurant</option>
        </select>
    </div>

    <button class="filterItem soloItem {(filterState.accessible)?"on":""}" on:click={onFilterChange}>
        <p>Accessible</p>
        <span class="material-symbols-rounded">
            accessible
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

            &.filterItem{

                &.on{
                    background-color: var(--brunswick-green);
                    color: var(--bone);
                }
            }
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