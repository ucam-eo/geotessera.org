<script lang="ts">
  import maplibregl from 'maplibre-gl';
  import { registerZarrProtocol } from '@ucam-eo/maplibre-tessera';
  import { siteConfig } from '@/lib/config';
  import { onMount } from 'svelte';
  import { currentPath } from '@/lib/router';

  let container: HTMLDivElement;
  let map: maplibregl.Map | null = null;
  let isDesktop = $state(false);


  // Random UK locations — spread across interesting TESSERA coverage areas
  const ukLocations: [number, number][] = [
    [-1.26, 51.75],   // Oxford
    [-2.59, 51.45],   // Bristol
    [-3.19, 55.95],   // Edinburgh
    [-1.55, 53.80],   // Leeds
    [-2.24, 53.48],   // Manchester
    [-1.90, 52.48],   // Birmingham
    [1.30, 52.63],    // Norwich
    [-3.18, 51.48],   // Cardiff
    [-0.14, 51.50],   // London
    [-4.25, 55.86],   // Glasgow
    [0.12, 52.21],    // Cambridge
    [-1.40, 50.91],   // Southampton
    [-2.97, 53.41],   // Liverpool
    [-1.47, 53.38],   // Sheffield
    [0.72, 51.88],    // Colchester
    [-3.94, 51.62],   // Swansea
    [-1.09, 50.80],   // Portsmouth
    [-2.36, 51.38],   // Bath
  ];

  function randomLocation(): [number, number] {
    return ukLocations[Math.floor(Math.random() * ukLocations.length)];
  }

  onMount(() => {
    const mq = window.matchMedia('(min-width: 960px)');
    isDesktop = mq.matches;
    const onResize = (e: MediaQueryListEvent) => { isDesktop = e.matches; };
    mq.addEventListener('change', onResize);

    registerZarrProtocol(maplibregl);

    const [lng, lat] = randomLocation();

    map = new maplibregl.Map({
      container,
      style: {
        version: 8,
        sources: {
          'satellite': {
            type: 'raster',
            tiles: ['https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2021_3857/default/GoogleMapsCompatible/{z}/{y}/{x}.jpg'],
            tileSize: 256,
            attribution: 'Sentinel-2 cloudless by <a href="https://s2maps.eu">EOX</a> (contains modified Copernicus Sentinel data 2021)',
          },
          'tessera-preview': {
            type: 'raster',
            tiles: [`zarr://${siteConfig.map.globalPreviewUrl}/rgb/{z}/{x}/{y}`],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: 'background',
            type: 'background',
            paint: { 'background-color': '#0a0a1a' },
          },
          {
            id: 'satellite-basemap',
            type: 'raster',
            source: 'satellite',
          },
          {
            id: 'tessera-tiles',
            type: 'raster',
            source: 'tessera-preview',
            paint: { 'raster-opacity': 0.5 },
          },
        ],
      },
      center: [lng, lat],
      zoom: 11 + Math.random() * 2,
      interactive: false,
      attributionControl: false,
    });

    return () => {
      mq.removeEventListener('change', onResize);
      map?.remove();
    };
  });

  let navCount = 0;

  // Nudge one tile in a random direction on most navigations;
  // jump to a new UK location every ~6 navigations
  $effect(() => {
    const _path = $currentPath; // subscribe to path changes
    if (!map) return;
    navCount++;
    if (navCount % 6 === 0) {
      // Jump somewhere new
      const [lng, lat] = randomLocation();
      map.easeTo({
        center: [lng, lat],
        zoom: 11 + Math.random() * 2,
        duration: 2000,
      });
    } else {
      // Nudge ~0.02° in a random direction (roughly one tile at z12)
      const center = map.getCenter();
      const angle = Math.random() * Math.PI * 2;
      const nudge = 0.015 + Math.random() * 0.01;
      map.easeTo({
        center: [center.lng + Math.cos(angle) * nudge, center.lat + Math.sin(angle) * nudge],
        duration: 1200,
      });
    }
  });
</script>

<div class="tile-bg" class:hidden={!isDesktop} bind:this={container}></div>

<style>
  .tile-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
  }

  .tile-bg.hidden {
    visibility: hidden;
  }

  .tile-bg :global(.maplibregl-canvas) {
    outline: none;
  }
</style>
