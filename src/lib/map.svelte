<script>
    import { onMount } from 'svelte';
    import L from 'leaflet';

    export let dragging = false;
    export let positions = [[47.4713730268945, -0.5523281365745003]]; // Maintenant une liste de positions
    export let zoom = "13";
    export let showPin = false; // Nouvelle variable booléenne

    let map;
    let markers = []; // Un tableau pour garder une trace des markers ajoutés
    let isMouseDown = false;
    let startDragPoint = null;
    const dragDistance = 100;
    var mapReady = false;

    onMount(() => {
        map = L.map('map', { zoomControl: false }).setView(positions[0], zoom);
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

        mapReady = true;
    });

    $: {
        if(mapReady && showPin){
            // Supprimer les anciens markers avant d'ajouter de nouveaux
            markers.forEach(marker => map.removeLayer(marker));
            markers = [];

            positions.forEach(position => {
                // Ajouter un marker pour chaque position
                let marker = L.marker(position).addTo(map);
                markers.push(marker);
            });

            if (positions.length > 1) {
                // Si plusieurs positions, ajuster la vue pour inclure tous les markers
                let group = L.featureGroup(markers);
                map.fitBounds(group.getBounds());
            } else {
                // Si une seule position, centrer la carte sur celle-ci
                map.setView(positions[0], zoom);
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
