<script lang="ts">
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  
  import Home from "./routes/home/home.svelte";
  import Register from "./routes/register/register.svelte";
  import Restaurant from "./routes/restaurant/restaurant.svelte";
  import Error from "./routes/40X.svelte";
  import Edit from "./routes/userProfil/profil.svelte";
  import Profil from "./routes/userProfil/profil.svelte";
  import Liked from "./routes/liked/liked.svelte";
  export let url = "";
</script>


<main>
  <Router {url}>
    <div>
      <!-- {#if mobile} -->
      <Route path="/"><Home /></Route>
      <Route path="register"><Register /></Route>
      <Route path="restaurant/:id"><Restaurant /></Route>
      <Route path="/profile"><Profil/></Route>
      <Route path="/edit"><Edit/></Route>
      <Route path="/liked"><Liked/></Route>
      <Route path="error/:err" component={Error} />
      <Route path="*">{navigate("/error/404")}</Route>
    </div>
  </Router> 
</main>
