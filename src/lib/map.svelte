<script>
    import { onMount } from 'svelte';
    import L from 'leaflet';
    export let dragging = false;

    let map;
    let isMouseDown = false;
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
        });
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