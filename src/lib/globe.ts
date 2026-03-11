import type { Map as MaplibreMap } from 'maplibre-gl';
import { siteConfig } from './config';

export interface GlobeStep {
  center: [number, number];
  zoom: number;
  label?: string;
  sublabel?: string;
}

export const globeSteps: GlobeStep[] = [
  {
    center: siteConfig.map.initialCenter,
    zoom: siteConfig.map.initialZoom,
    label: siteConfig.title,
    sublabel: siteConfig.subtitle,
  },
  {
    center: siteConfig.map.ukCenter,
    zoom: siteConfig.map.ukZoom,
  },
  {
    center: siteConfig.map.cambridgeCenter,
    zoom: siteConfig.map.cambridgeZoom,
    label: '128-dimensional embeddings',
    sublabel: 'at 10m resolution',
  },
  {
    center: siteConfig.map.initialCenter,
    zoom: siteConfig.map.initialZoom,
    label: 'Global coverage',
    sublabel: 'Sentinel-1 & Sentinel-2 · 2017–2025',
  },
];

export function setupAutoRotation(map: MaplibreMap) {
  let rotating = true;
  let frameId: number;

  function rotate() {
    if (!rotating) return;
    const center = map.getCenter();
    center.lng += 0.02;
    map.setCenter(center);
    frameId = requestAnimationFrame(rotate);
  }

  frameId = requestAnimationFrame(rotate);

  return {
    stop() { rotating = false; cancelAnimationFrame(frameId); },
    start() { rotating = true; rotate(); },
  };
}

export function setupScrollAnimation(map: MaplibreMap, scrollContainer: HTMLElement) {
  let currentStep = 0;
  let animating = false;
  const rotation = setupAutoRotation(map);

  function getScrollStep(): number {
    const scrollTop = scrollContainer.scrollTop;
    const vh = window.innerHeight;
    return Math.min(Math.floor(scrollTop / vh), globeSteps.length - 1);
  }

  function flyToStep(step: number) {
    if (step === currentStep || animating) return;
    animating = true;
    currentStep = step;

    if (step > 0) rotation.stop();

    const { center, zoom } = globeSteps[step];
    map.flyTo({
      center,
      zoom,
      duration: 2000,
      essential: true,
    });
    map.once('moveend', () => {
      animating = false;
      if (currentStep === 0) rotation.start();
      const newStep = getScrollStep();
      if (newStep !== currentStep) {
        flyToStep(newStep);
      }
    });
  }

  function onScroll() {
    const step = getScrollStep();
    if (step !== currentStep && !animating) {
      flyToStep(step);
    }
  }

  scrollContainer.addEventListener('scroll', onScroll, { passive: true });

  return {
    destroy() {
      scrollContainer.removeEventListener('scroll', onScroll);
      rotation.stop();
    },
    getCurrentStep: () => currentStep,
  };
}
