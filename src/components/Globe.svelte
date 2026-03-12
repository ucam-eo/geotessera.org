<script lang="ts">
  import maplibregl from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import { registerZarrProtocol } from '@ucam-eo/maplibre-zarr-tessera';
  import { siteConfig } from '@/lib/config';
  import { setupScrollAnimation } from '@/lib/globe';
  import { onMount } from 'svelte';

  interface Props {
    scrollContainer?: HTMLElement;
    tileOpacity?: number;
  }

  let { scrollContainer, tileOpacity = 0 }: Props = $props();

  let container: HTMLDivElement;
  let mapInstance = $state<maplibregl.Map | null>(null);
  let mapReady = $state(false);

  onMount(() => {
    registerZarrProtocol(maplibregl);

    mapInstance = new maplibregl.Map({
      container,
      style: {
        version: 8,
        glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
        sources: {
          'satellite': {
            type: 'raster',
            tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
            tileSize: 256,
            attribution: 'Esri, Maxar',
          },
          'tessera-preview': {
            type: 'raster',
            tiles: [`zarr://${siteConfig.map.globalPreviewUrl}/rgb/{z}/{x}/{y}`],
            tileSize: 256,
            attribution: '© TESSERA / University of Cambridge',
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
            paint: { 'raster-opacity': 0 },
          },
        ],
      },
      center: siteConfig.map.initialCenter,
      zoom: siteConfig.map.initialZoom,
      projection: { type: 'globe' },
      attributionControl: false,
      interactive: false,
    });

    mapInstance.on('load', () => { mapReady = true; });

    return () => {
      mapInstance?.remove();
    };
  });

  // Update tile opacity reactively
  $effect(() => {
    if (mapInstance && mapReady) {
      mapInstance.setPaintProperty('tessera-tiles', 'raster-opacity', tileOpacity);
    }
  });

  // Set up scroll animation reactively
  $effect(() => {
    if (mapInstance && scrollContainer) {
      const cleanup = setupScrollAnimation(mapInstance, scrollContainer);
      return cleanup;
    }
  });
</script>

<div class="globe-wrapper">
  <div class="globe" bind:this={container}></div>
</div>

<style>
  .globe-wrapper {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;
    pointer-events: none;
  }

  .globe {
    width: 100%;
    height: 100%;
  }

  .globe :global(.maplibregl-canvas) {
    outline: none;
  }
</style>
