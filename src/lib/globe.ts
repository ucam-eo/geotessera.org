import type { Map as MaplibreMap } from 'maplibre-gl';
import { siteConfig } from './config';

export interface Waypoint {
  scroll: number; // in vh units
  center: [number, number];
  zoom: number;
}

// Scroll timeline: defines the mapping from scroll position (in vh) to map state.
// Between consecutive waypoints, center/zoom are interpolated.
// Consecutive waypoints with the same center/zoom create dwell zones.
export const timeline: Waypoint[] = [
  // Hero dwell
  { scroll: 0,    center: siteConfig.map.cambridgeCenter, zoom: 12 },
  { scroll: 1,    center: siteConfig.map.cambridgeCenter, zoom: 12 },
  // Transition to pixel close-up
  { scroll: 2,    center: siteConfig.map.cambridgeCenter, zoom: 16 },
  // Dwell at pixel close-up (progressive reveal + reading time)
  { scroll: 5,    center: siteConfig.map.cambridgeCenter, zoom: 16 },
  // Transition to pipeline zoom
  { scroll: 6,    center: siteConfig.map.cambridgeCenter, zoom: 14 },
  // Dwell at pipeline zoom
  { scroll: 8,    center: siteConfig.map.cambridgeCenter, zoom: 14 },
  // Tasks section — gentle zoom out while reading
  { scroll: 11,   center: siteConfig.map.cambridgeCenter, zoom: 10 },
  // Open/sovereign section — continue zoom out
  { scroll: 11,   center: siteConfig.map.cambridgeCenter, zoom: 10 },
  { scroll: 15,   center: siteConfig.map.ukCenter,        zoom: 5 },
  // Transition to coverage view (Europe)
  { scroll: 16,   center: [-2, 52],                       zoom: 4 },
  // Dwell at coverage view
  { scroll: 19,   center: [-2, 52],                       zoom: 4 },
];

export const totalScrollVh = timeline[timeline.length - 1].scroll;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function getMapState(scrollVh: number): { center: [number, number]; zoom: number } {
  const s = Math.max(0, Math.min(scrollVh, totalScrollVh));

  // Find the segment we're in
  for (let i = 0; i < timeline.length - 1; i++) {
    const from = timeline[i];
    const to = timeline[i + 1];
    if (s >= from.scroll && s <= to.scroll) {
      const range = to.scroll - from.scroll;
      const t = range > 0 ? (s - from.scroll) / range : 0;
      return {
        center: [lerp(from.center[0], to.center[0], t), lerp(from.center[1], to.center[1], t)],
        zoom: lerp(from.zoom, to.zoom, t),
      };
    }
  }

  // Past the end
  const last = timeline[timeline.length - 1];
  return { center: [...last.center], zoom: last.zoom };
}

export function setupScrollAnimation(
  map: MaplibreMap,
  scrollContainer: HTMLElement,
): () => void {
  let rafId = 0;

  function update() {
    const scrollTop = scrollContainer.scrollTop;
    const vh = window.innerHeight;
    if (vh === 0) return;

    const scrollVh = scrollTop / vh;
    const { center, zoom } = getMapState(scrollVh);
    map.jumpTo({ center, zoom });
  }

  function onScroll() {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(update);
  }

  scrollContainer.addEventListener('scroll', onScroll, { passive: true });

  return () => {
    scrollContainer.removeEventListener('scroll', onScroll);
    cancelAnimationFrame(rafId);
  };
}
