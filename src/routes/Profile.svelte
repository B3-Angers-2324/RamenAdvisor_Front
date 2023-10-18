<!-- FILEPATH: /workspaces/RamenAdvisor/RamenAdvisor_Front/src/routes/Profile.svelte -->

<script>
    import NavBar from '../lib/navBar.svelte';
    let name = "John Doe";
    let age = 25;
    let bio = "I'm a software developer who loves ramen!";
</script>

<h1>{name}</h1>
<p>Age: {age}</p>
<p>{bio}</p>
<NavBar/>

<style lang="scss">
    h1 {
        font-size: 2rem;
        color: #333;
    }

    p {
        font-size: 1.2rem;
        color: #666;
    }
</style>