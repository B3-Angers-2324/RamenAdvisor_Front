<script>
    export let required = false;
    export let text;
    export let showValid = false;

    export let value = "";

    const handleChange = (e) => {
        value = e.target.value;
    }
</script>

<customInput class="inputBox">
    <select {required} value={value} on:change={handleChange}>
        <option value="" disabled>---</option>
        <slot />
    </select>
    <span class:showValid={showValid == true}>{text}</span>
</customInput>

<style lang="scss">
    .inputBox{
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: row;

        select{
            width: 100%;
            padding: 10px;
            border: none;
            background: var(--cambridge-blue);
            border-radius: var(--radius);
            outline: none;
            color: var(--black);
            font-size: 1em;
            font-family: var(--font-family);
            z-index: 1;

            span
            {
            }
        }

        span{
            position: absolute;
            top: 0;
            left: 0;
            padding: 10px;
            color: var(--black);
            font-size: 0.75em;
            font-family: var(--font-family);
            text-transform: uppercase;
            transition: .25s;
            pointer-events: none;
            z-index: 0;
            padding-bottom: 1.5em;
            border-radius: var(--radius) var(--radius) 0 0;
            background-color: var(--cambridge-blue);
            transform: translateY(-75%) translateY(.5em);
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