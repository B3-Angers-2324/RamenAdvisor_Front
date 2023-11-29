<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let more = false;

    const onClick = () => {
        if (more)
            dispatch('loadMore');
    };
    
</script>

<button on:click={onClick} class="loadMore {more? "":"off"}">
    <span class="material-symbols-rounded">
        expand_more
    </span>
    Voir plus
</button>

<style lang="scss">

.loadMore{
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

</style>