<script>   
    import { onMount } from 'svelte';
    import L from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    import SearchContainer from '../../lib/searchContainer.svelte';
    import BottomContainer from './bottomContainer.svelte';
  
    let map;
    let isMouseDown = false;
    let dragging = false;
    let startDragPoint = null;
    const coord = [47.4713730268945, -0.5523281365745003];
    const dragDistance = 100;
  
    onMount(() => {
      map = L.map('map', { zoomControl: false }).setView(coord, 13);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      map.on('mousedown', (e) => {
        isMouseDown = true;
        startDragPoint = map.mouseEventToContainerPoint(e.originalEvent);
      });
      map.on('mouseup', () => {
        isMouseDown = false;
        dragging = false;
        startDragPoint = null;
      });
      map.on('mousemove', (e) => {
        if (isMouseDown && !dragging && startDragPoint) {
          const currentPoint = map.mouseEventToContainerPoint(e.originalEvent);
          const distance = startDragPoint.distanceTo(currentPoint);
          if (distance >= dragDistance) {
            dragging = true;
          }
        }
        if (dragging) {
          //console.log(`Mouse position: ${e.latlng}`); ??????????????????????
        }
      });
    });
  </script>
  
  
  <main>
    <div id="map"></div> <!-- Conteneriser la map -->
    <div id="container">
      <SearchContainer classComponent="{dragging ? 'onDragSearchContainer' : ''}"/>
      <BottomContainer classComponent="{dragging ? 'onDragBottomContainer' : ''}"/>
    </div>
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
  
      :global(BottomContainer){
        position: absolute;
        bottom: 0;
      }
    }
  
    :global(.onDragSearchContainer){
      transform: translateY(-250px);
      transition: transform .5s;
    }
  
    :global(.onDragBottomContainer){
      transform: translateY(600px);
      transition: transform .5s;
    }
  
    :global(SearchContainer){
      transition: transform .5s;
    }
  
    :global(BottomContainer){
      transition: transform .5s;
    }
  </style>
  