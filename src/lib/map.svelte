<script>
    import { onMount } from 'svelte';
    import L from 'leaflet';

    import markerImg from '../assets/markerLeaflet.png';

    export let dragging = false;
    export let positions = undefined;
    export let zoom = "13";
    export let showPin = false; // Nouvelle variable booléenne

    let map;
    let markers = []; // Un tableau pour garder une trace des markers ajoutés
    let isMouseDown = false;
    let startDragPoint = null;
    const dragDistance = 100;
    let mapReady = false;

    const customMarker = L.icon({
        iconUrl: markerImg,

        iconSize:     [52, 82], // size of the icon
        iconAnchor:   [26, 81], // point of the icon which will correspond to marker's location
    });

    onMount(() => {
        map = L.map('map', { zoomControl: false }).setView( [16.766589,-3.002561], zoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        mapReady = true;
        
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
        });
    });

    $: {
        if(mapReady && positions != undefined && positions.length > 0){
            // reset marker list
            markers.forEach(marker => map.removeLayer(marker));
            markers = [];

            //For each position given add a marker
            positions.forEach((position) => {
                let marker = L.marker(position, {icon: customMarker}).addTo(map);
                marker.setOpacity(0);
                markers.push(marker);
            });
            // fit the map to the bounds of the markers
            let group = L.featureGroup(markers);
            //get the center of the group
            //map.setView(group.getBounds().getCenter());
            map.fitBounds(group.getBounds());

            if (showPin) {
                markers.forEach(marker => marker.setOpacity(1));
            }
        }
    }
</script>

<map>
    <div id="map"></div>
</map>

<style lang="scss">
    #map {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 0;
    }
</style>
