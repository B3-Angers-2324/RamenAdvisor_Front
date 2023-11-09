<script lang="ts">
  import { Router, Route, navigate } from "svelte-routing";
  //Import components routes
  import Home from "./routes/Home.svelte";
  import Register from "./routes/register.svelte";
  import Restaurant from "./routes/restaurant.svelte";
  import Error from "./routes/40X.svelte";
  export let url = "";
</script>


<main>
  <Router {url}>
    <div>
      <Route path="/"><Home /></Route>
      <!--Route path="profile/:name" component="{Profile}" / -- Example using variable inside the path -->
      <Route path="register/"><Register /></Route>
      <Route path="restaurant/:id" component={Restaurant} /><!--Restaurant/></Route-->
      <Route path="error/:err" component={Error} />
      <Route path="*">{navigate("/error/404")}</Route>
    </div>
  </Router> 
</main>
