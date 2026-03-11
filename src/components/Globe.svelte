<script lang="ts">
  import maplibregl from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import { registerZarrProtocol } from '@ucam-eo/maplibre-zarr-tessera';
  import { siteConfig } from '@/lib/config';
  import { onMount } from 'svelte';

  let container: HTMLDivElement;
  let map: maplibregl.Map | null = null;

  onMount(() => {
    registerZarrProtocol(maplibregl);

    map = new maplibregl.Map({
      container,
      style: {
        version: 8,
        glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
        sources: {
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
            id: 'tessera-tiles',
            type: 'raster',
            source: 'tessera-preview',
            paint: { 'raster-opacity': 0.8 },
          },
        ],
      },
      center: siteConfig.map.initialCenter,
      zoom: siteConfig.map.initialZoom,
      projection: { type: 'globe' },
      attributionControl: false,
    });

    return () => {
      map?.remove();
    };
  });
</script>

<div class="globe" bind:this={container}></div>

<style>
  .globe {
    width: 100%;
    height: 100vh;
  }

  .globe :global(.maplibregl-canvas) {
    outline: none;
  }
</style>
