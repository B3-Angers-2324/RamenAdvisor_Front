<script>
    export let image;
    export let type;
    export let name;
    export let note;
</script>

<restaurantCard>
    <div class="info">
        <span class="material-symbols-rounded type">
            {type}
        </span>
        <p class="note">{note}/5</p>
    </div>
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img src={image} alt="restaurant image"/>
    <div class="name">
        <h1>{name}</h1>
    </div>
</restaurantCard>


<style lang="scss">
restaurantCard{
    height: 100%;
    width: 300px;
    background-color: var(--bone);
    flex-shrink: 0;
    border-radius: var(--radius);
    color: var(--brunswick-green);
    position: relative;
    overflow: visible;
    cursor: pointer;

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
            font-size: 50px;
            color: var(--brunswick-green);
        }

        .note{
            font-size: 1.5em;
            font-weight: bold;
            font-family: var(--font-family);
        }
    }

    img{
        position: absolute;
        height: 200px;
        width: 200px;
        border-radius: var(--radius);
        transform: translateX(-20px) translateY(-20px);
        object-fit: cover;
    }

    .name{
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 0 20px 12.5% 20px;
        width: calc(100% - 40px);
        max-height: 75px;
        overflow-y: scroll;
    }
}
</style>