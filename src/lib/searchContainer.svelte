<script>
    import { afterUpdate } from 'svelte';
    import FilterBar from './filterBar.svelte';
    let filterBar;
    let input;
    let showFilterBar = false;

    const handleClickOutside = (event) => {
        if (event.target.tagName !== 'P' && !filterBar.contains(event.target) && event.target !== input) {
            showFilterBar = false;
        }
    };

    afterUpdate(() => {
        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    });
</script>

<searchContainer>
    <div id="container">
        <div id="searchBar">
            <span class="material-symbols-rounded">
                search
            </span>
            <input type="text" placeholder="Search ..." bind:this={input} on:click={() => showFilterBar = true} />
        </div>
        {#if showFilterBar}
            <FilterBar bind:div={filterBar}/>
        {/if}
    </div>
</searchContainer>


<style lang="scss">
    searchContainer{
        display: flex;
        position: relative;
        width: 100%;
        height: 15%;
        justify-content: center;

        #container{
            margin: var(--spacing);
            height: fit-content;
            width: 100%;
            overflow: hidden;

            #searchBar {
                position: relative;
                background-color: var(--brunswick-green);
                height: 125px;
                width: calc(100% - var(--spacing));
                border-radius: var(--radius);
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                padding: 0 calc(var(--spacing) / 2);
                gap: 20px;
                pointer-events: auto;
                z-index: 3;

                .material-symbols-rounded{
                    font-size: 75px;
                    color: var(--bone);
                }

                input{
                    position: relative;
                    height: 75%;
                    flex-grow: 1;
                    border: none;
                    background: transparent;
                    color: var(--bone);
                    font-size: 20px;
                    font-family: var(--font-family);

                    &:focus{
                        outline: none;
                    }
                }
            }
        }
    }
</style>
