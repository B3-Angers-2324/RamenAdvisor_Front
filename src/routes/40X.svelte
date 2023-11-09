<script>
    import {onMount} from 'svelte';
    let err = "XXX"
    onMount(() => {
        err = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    });
</script>

<div class="container">
  <div class="content">
    <h1>{err} - {"Error"}</h1>
    <button on:click={() => window.location.href = '/'}>Go back to home page</button>
  </div>
</div>

<style lang='scss'>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    h1 {
        font-size: 4rem;
        margin-bottom: 2rem;
    }

    button {
        padding: 1rem 2rem;
        font-size: 1.5rem;
        background-color: #ff6347;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }

    button:hover {
        background-color: #ff7f50;
    }
</style>
