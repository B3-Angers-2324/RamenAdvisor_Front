<script>
    export let type;
    export let required = false;
    export let text;
    export let showValid = false;
</script>

<customInput class="inputBox">
    <input type={type} {required}/>
    <span class:showValid={showValid == true}>{text}</span>
</customInput>

<style lang="scss">
    .inputBox{
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: row;

        input{
            width: 100%;
            height: 1.5em;
            padding: 10px;
            border: none;
            background: var(--cambridge-blue);
            border-radius: var(--radius);
            outline: none;
            color: var(--black);
            font-size: 1em;
            font-family: var(--font-family);
            z-index: 1;

            &:valid ~ span,
            &:focus ~ span
            {
                transform: translateY(-75%) translateY(.5em);
                background-color: var(--cambridge-blue);
                border-radius: var(--radius) var(--radius) 0 0;
                font-size: 0.75em;
                padding-bottom: 1.5em;
                z-index: 0;
            }
        }

        span{
            position: absolute;
            top: 0;
            left: 0;
            padding: 10px;
            color: var(--black);
            font-size: 1em;
            font-family: var(--font-family);
            text-transform: uppercase;
            transition: .25s;
            pointer-events: none;
            z-index: 2;
        }

        .showValid{
            transform: translateY(-75%);
            background-color: var(--cambridge-blue);
            border-radius: var(--radius) var(--radius) 0 0;
            font-size: 0.75em;
            padding-bottom: 20px;
            z-index: 0;
        }
    }
</style>