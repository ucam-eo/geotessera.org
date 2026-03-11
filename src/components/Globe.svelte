<script lang="ts">
  import maplibregl from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import { registerZarrProtocol } from '@ucam-eo/maplibre-zarr-tessera';
  import { siteConfig } from '@/lib/config';
  import { globeSteps, setupScrollAnimation } from '@/lib/globe';
  import { onMount } from 'svelte';

  interface Props {
    scrollContainer?: HTMLElement;
  }

  let { scrollContainer }: Props = $props();

  let container: HTMLDivElement;
  let map: maplibregl.Map | null = null;
  let currentStep = $state(0);
  let cleanup: (() => void) | null = null;

  let step = $derived(globeSteps[currentStep]);
  let label = $derived(step?.label ?? '');
  let sublabel = $derived(step?.sublabel ?? '');

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

    if (scrollContainer) {
      const anim = setupScrollAnimation(map, scrollContainer);
      const interval = setInterval(() => {
        currentStep = anim.getCurrentStep();
      }, 100);
      cleanup = () => {
        anim.destroy();
        clearInterval(interval);
      };
    }

    return () => {
      cleanup?.();
      map?.remove();
    };
  });
</script>

<div class="globe-wrapper">
  <div class="globe" bind:this={container}></div>
  <div class="overlay" class:visible={!!label}>
    {#if label}
      <h1 class="label">{label}</h1>
    {/if}
    {#if sublabel}
      <p class="sublabel">{sublabel}</p>
    {/if}
  </div>
  {#if currentStep === 0}
    <div class="scroll-hint">SCROLL TO EXPLORE ↓</div>
  {/if}
</div>

<style>
  .globe-wrapper {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;
  }

  .globe {
    width: 100%;
    height: 100%;
  }

  .globe :global(.maplibregl-canvas) {
    outline: none;
  }

  .overlay {
    position: absolute;
    bottom: 48px;
    left: 0;
    right: 0;
    text-align: center;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .overlay.visible {
    opacity: 1;
  }

  .label {
    font-weight: 200;
    letter-spacing: 14px;
    font-size: 44px;
    color: var(--text-primary);
    text-shadow: 0 0 40px rgba(0, 0, 0, 0.8);
  }

  .sublabel {
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--accent-dim);
    margin-top: 8px;
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
  }

  .scroll-hint {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 10px;
    color: var(--text-faint);
    letter-spacing: 2px;
    animation: pulse 2s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.8; }
  }
</style>
