<script>
    import { onMount } from 'svelte';
    import L from 'leaflet';
    export let dragging = false;
    export let pin = "";
    export let zoom ="13";
    export let position = [47.4713730268945, -0.5523281365745003];
    export let showPlace;

    let map;
    let isMouseDown = false;
    let startDragPoint = null;
    const dragDistance = 100;

    onMount(() => {
        if(pin != ""){
            map = L.map('map', { zoomControl: false }).setView(JSON.parse(pin), zoom);
            L.marker(JSON.parse(pin)).addTo(map);
        } else {
            map = L.map('map', { zoomControl: false }).setView(position, zoom);
        }

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
        });

        if(showPlace){
            const maxDistance = 0.001;
            let location = JSON.parse(pin);
            map.setMaxBounds(
                L.latLngBounds(
                    L.latLng(location[0]-maxDistance, location[1]-maxDistance),
                    L.latLng(location[0]+maxDistance, location[1]+maxDistance)
                )
            );
        }
    });
</script>

<map>
    <div id="map"></div>
</map>

<style lang="scss">
    #map{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 0;
    }
</style>