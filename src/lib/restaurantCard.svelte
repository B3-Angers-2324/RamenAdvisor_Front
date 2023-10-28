<script>
    import { navigate } from "svelte-routing";
    import { restaurantStore } from '../routes/Restaurant/store'; // importez votre store

    export let name;
    export let address;
    export let note;
    export let position;
    export let image;
    export let foodtype;
    export let id;

    function handleClick() {
        restaurantStore.set({ name, address, note, position, image, foodtype, id }); // mettez à jour le store
        navigate("/restaurant");
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            handleClick();
        }
    }
</script>

<restaurantCard on:click={handleClick} on:keydown={handleKeyDown} role="button" tabindex="">
    <div class="info">
        <span class="material-symbols-rounded type">
            {foodtype}
        </span>
        <p class="note">{note/10}/5</p>
    </div>
    <img src={image} alt="restaurant"/>
    <div class="name">
        <h1>{name}</h1>
    </div>
</restaurantCard>


<style lang="scss">
restaurantCard{
    height: 12em;
    width: 12em;
    background-color: var(--bone);
    flex-shrink: 0;
    border-radius: var(--radius);
    color: var(--brunswick-green);
    position: relative;
    overflow: visible;
    cursor: pointer;
    user-select: none;

    .info{
        position: absolute;
        top: 0;
        right: 0;
        text-align: right;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        justify-content: center;
        align-items: center;

        .type, .note{
            margin: 0;
        }

        .material-symbols-rounded{
            font-size: 2em;
            color: var(--brunswick-green);
        }

        .note{
            font-size: 1.25em;
            font-weight: bold;
            font-family: var(--font-family);
        }
    }

    img{
        position: absolute;
        height: 8em;
        width: 8em;
        border-radius: var(--radius);
        transform: translateX(-20px) translateY(-20px);
        object-fit: cover;
    }

}
.name{
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 5px 20px 12.5% 20px;
    width: calc(100% - 40px);
    max-height: 9em;
    overflow-y: scroll;
    box-sizing: border-box;
    font-size: 0.6em;
}
</style>