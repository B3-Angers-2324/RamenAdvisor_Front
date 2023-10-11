<script>
  import { onMount } from 'svelte';
  // @ts-ignore
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import SearchContainer from './lib/searchContainer.svelte';

  let map;

  const coord = [47.4713730268945, -0.5523281365745003];

  onMount(() => {
    map = L.map('map', { zoomControl: false }).setView(coord, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  });
</script>

<main>
  <div id="container">
    <SearchContainer/>
  </div>
  <div id="map"></div>
</main>

<style lang="scss">
  main{
    background-color: var(--cambridge-blue);
    width: 100vw;
    height: 100vh;

    #map{
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 0;
    }
  
    #container{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1;
      pointer-events: none;
    }
  }
</style>
