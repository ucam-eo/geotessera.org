import { writable } from 'svelte/store';

export interface ScrollSection {
  label: string;
  start: number;
}

export const scrollSections = writable<ScrollSection[]>([]);
export const activeScrollSection = writable<number>(-1);

// Set by Home.svelte so Nav can trigger scrolling
let scrollToFn: ((scrollVh: number) => void) | null = null;

export function registerScrollTo(fn: (scrollVh: number) => void) {
  scrollToFn = fn;
}

export function unregisterScrollTo() {
  scrollToFn = null;
}

export function scrollToSection(scrollVh: number) {
  scrollToFn?.(scrollVh);
}
