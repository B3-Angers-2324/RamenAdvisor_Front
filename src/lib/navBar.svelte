<script>
    import { Link } from "svelte-routing";

    let accout_url = "register";
    console.log(localStorage.getItem("token"));
    if(localStorage.getItem("token") != null){
        accout_url = "profile";
    }
</script>

<navBar>
    <button>
        <Link to="/">
            <span class="material-symbols-rounded">
                home
            </span>
        </Link>
    </button>
    <button>
        <Link to="/liked">
            <span class="material-symbols-rounded">
                favorite
            </span>
        </Link>
    </button>
    <button>
        <Link to={accout_url}>
            <span class="material-symbols-rounded">
                account_circle
            </span>
        </Link>
    </button>
</navBar>

<style lang="scss">
    navBar{
        pointer-events: auto;
        position: absolute;
        background-color: var(--brunswick-green);
        display: flex;
        width: calc(100% - var(--spacing) * 2);
        height: 3.5em;
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
                font-size: 2em;
                color: var(--bone);
            }
        }

    }
</style>