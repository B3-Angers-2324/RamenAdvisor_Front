<script lang="ts">
  import { Router, Route } from "svelte-routing";
  //Import components routes
  import Home from "./routes/Home/Home.svelte";
  import Register from "./routes/register.svelte";

  export let url = "";
</script>


<main>
  <Router {url}>
    <div>
      <Route path="/"><Home /></Route>
      <!--Route path="profile/:name" component="{Profile}" / -- Example using variable inside the path -->
      <Route path="register/"><Register /></Route>
    </div>
  </Router> 
</main>

<style lang="scss">
  
</style>
