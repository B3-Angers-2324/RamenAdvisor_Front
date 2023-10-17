<script>

</script>

<navBar>
    <button>
        <span class="material-symbols-rounded">
            home
        </span>
    </button>
    <button>
        <span class="material-symbols-rounded">
            favorite
        </span>
    </button>
    <button>
        <span class="material-symbols-rounded">
            account_circle
        </span>
    </button>
</navBar>

<style lang="scss">
    navBar{
        pointer-events: auto;
        position: absolute;
        background-color: var(--brunswick-green);
        display: flex;
        width: calc(100% - var(--spacing) * 2);
        height: 125px;
        justify-content: space-around;
        align-items: center;
        bottom: 0;
        margin: var(--spacing);
        border-radius: var(--radius);
        pointer-events: auto;

        button{
            background-color: transparent;
            border: none;
            cursor: pointer;
            
            .material-symbols-rounded{
                font-size: 75px;
                color: var(--bone);
            }
        }

    }
</style>