<script lang="ts">
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  
  import HomeLaptop from "./routes/home/pc.svelte";
  import HomeMobile from "./routes/home/mobile.svelte";

  import RestaurantLaptop from "./routes/restaurant/pc.svelte";
  import RestaurantMobile from "./routes/restaurant/mobile.svelte";
  
  import Register from "./routes/register.svelte";
  import Error from "./routes/40X.svelte";
  export let url = "";

  let mobile = true;

  onMount(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches) {
      mobile = true;
    } else {
      mobile = false;
    }
  });
</script>


<main>
  <Router {url}>
    <div>
      {#if mobile}
        <Route path="/"><HomeMobile /></Route>
      {:else}
        <Route path="/"><HomeLaptop /></Route>
      {/if}
      <!--Route path="profile/:name" component="{Profile}" / -- Example using variable inside the path -->
      <Route path="register/"><Register /></Route>
      <!-- <Route path="restaurant/:id" component={Restaurant} /> -->
      {#if mobile}
        <Route path="restaurant/:id"><RestaurantMobile /></Route>
      {:else}
        <Route path="restaurant/:id"><RestaurantLaptop /></Route>
      {/if}
      <Route path="error/:err" component={Error} />
      <Route path="*">{navigate("/error/404")}</Route>
    </div>
  </Router> 
</main>
