# TESSERA Website Design Spec

**Date:** 2026-03-11
**Project:** geotessera.org
**Status:** Approved

## Overview

A single-page application website for TESSERA, a pixel-wise earth observation foundation model developed by the University of Cambridge. The site serves as the public face of the project: an interactive demo, blog, downstream task showcase, and documentation hub.

## Tech Stack

- **Framework:** Svelte 5 + Vite + TypeScript
- **Routing:** Hand-rolled SPA router using `history.pushState` / `popstate` event. Pattern-matches URL path segments to page components. No library dependency — simple enough for 6 routes.
- **Map:** MapLibre GL JS (globe projection). **Note:** Globe projection + zarr:// tile protocol is untested in tze — validate early with a spike.
- **Tile rendering:** `@ucam-eo/maplibre-zarr-tessera` from `../tze` (linked via `link:` protocol for cross-repo local dev)
- **Content:** mdsvex (Markdown + Svelte components) for blog posts and task examples. Use `@huntabyte/mdsvex` or mdsvex >=1.x for Svelte 5 compatibility — verify exact version before starting.
- **Fonts:** Inter (sans-serif), loaded via Google Fonts or self-hosted
- **Deployment:** Static site (Vite build output). Hosting must serve `index.html` for all routes (SPA fallback). Add `_redirects` for Netlify or equivalent for other hosts.

## Visual Design

- **Theme:** Deep Space Dark — dark navy/black backgrounds (#0a0a1a), cyan/blue accents (rgb(0,200,255)), ultra-light font weights
- **Title:** "TESSERA" in font-weight 200, letter-spacing 14px
- **Subtitle:** "A pixel-wise earth observation foundation model" in uppercase, cyan, small tracking
- **Cards/borders:** rgba(255,255,255,0.04-0.06) borders, rgba(255,255,255,0.02-0.03) backgrounds
- **Accent color:** rgba(0,200,255) at varying opacities for tags, links, highlights
- **Footer:** University of Cambridge · Energy & Environment Group, MIT License

## Site Structure

### Routes

```
/                      Homepage (scroll-driven globe demo)
/blog                  Blog listing (filterable by tag)
/blog/:slug            Individual blog post (mdsvex)
/tasks                 All downstream tasks overview
/tasks/:tag            Task page with related examples & posts
/tasks/:tag/:slug      Individual example (TS/Python tabs)
```

### Navigation Bar

Fixed top bar with:
- **Left:** TESSERA wordmark + nav links: HOME, BLOG, TASKS (dropdown), DOCS (external link to ReadTheDocs)
- **Right:** Social links — GitHub (ucam-eo), Twitter (@avsm), Bluesky (@eeg.cl.cam.ac.uk)
- Social links are configurable via a site config file

### TASKS Dropdown

Dropdown menu listing downstream tasks:
- Classification
- Segmentation
- Change Detection
- Canopy Height
- Land Cover
- Crop Mapping
- Solar Panels

Each links to `/tasks/:tag` which shows related blog posts and code examples filtered by that tag.

### Tasks Overview Page (`/tasks`)
Grid of cards, one per task category. Each card shows the task name, a one-line description, and a count of related examples. Clicking navigates to `/tasks/:tag`.

## Homepage: Scroll-Driven Globe Demo

The homepage hero is a full-viewport MapLibre GL globe that serves as an interactive demonstration of TESSERA's capabilities. The sequence is scroll-driven:

Each step corresponds to approximately one viewport height of scrolling. Animations are triggered as discrete `map.flyTo()` calls when the scroll position crosses step boundaries (not continuously interpolated).

### Step 1 — Globe View (0-100vh scroll, initial load)
- MapLibre GL map in globe projection
- Shows global TESSERA tile coverage via the tze global preview Zarr store
- Gentle auto-rotation
- TESSERA title and subtitle overlaid at bottom
- Initial center: [10, 30] (mid-Atlantic, showing Europe/Africa), zoom 1.5

### Step 2 — Fly to UK (100-200vh scroll)
- Camera flies to UK center: [-2, 54], zoom 5
- Tessera tile grid becomes visible over Britain via global preview store higher-resolution pyramid levels
- Transition is smooth via `map.flyTo()`

### Step 3 — Zoom to Cambridge (200-300vh scroll)
- Fly to Cambridge: [0.1218, 52.2053], zoom 12
- Global preview store's highest-resolution pyramid level renders TESSERA RGB tiles over Cambridge
- Info overlay appears: "128-dimensional embeddings at 10m resolution"
- This is the key demo moment — real satellite-derived tile data visible in the browser
- **Note:** This uses the global preview store only (not full per-zone embedding loading). The global preview provides pre-rendered RGB at multiple zoom levels, sufficient for visual demonstration.

### Step 4 — Zoom Out to Global (300-400vh scroll)
- Camera pulls back to [10, 30], zoom 1.5
- "Global coverage" text appears
- Map settles, page content below becomes scrollable

### Implementation Notes
- Use `map.flyTo()` triggered by scroll position via scroll event listener on a spacer element
- The map container is `position: sticky; top: 0; height: 100vh` so it stays in view during the scroll sequence
- A spacer div of 400vh below the map provides the scroll range
- `registerZarrProtocol()` enables the `zarr://` tile protocol for rendering global preview tiles
- Text overlays fade in/out based on scroll position using CSS opacity transitions

## "Fully Open" Section

Below the globe demo, a section emphasizing TESSERA's open nature with four pillars:

1. **Open Weights** — model checkpoints freely available
2. **Open Data** — pre-computed embeddings downloadable
3. **Open Training** — full training pipeline reproducible
4. **Open Inference** — run locally or in the browser

Links to `https://github.com/ucam-eo`. Styled as a 4-column grid with icons and descriptions.

## Latest Content Section

Shows the two most recent posts/examples from across blog and tasks (sorted by `date` frontmatter field), with tag pills, title, and language indicators (TypeScript/Python). All content — blog posts and task examples alike — must include a `date` field in frontmatter for sorting.

## Blog System

### Content Structure

Content directory structure is flat within each section. The subdirectory name is cosmetic organization — **routing and filtering are driven entirely by frontmatter tags**, not directory structure. The slug is derived from the filename (without extension).

```
content/
  blog/
    2026-03-11-first-post.svx
    2026-03-15-another-post.svx
  tasks/
    osm-land-classification.svx        # tags: [classification, osm]
    solar-panel-detection.svx           # tags: [segmentation, solar]
```

The route `/tasks/:tag/:slug` filters by the first matching tag in frontmatter. For example, `/tasks/classification/osm-land-classification` matches the content file `osm-land-classification.svx` because its tags include `classification`.

### Frontmatter Schema
```yaml
---
title: "Land Classification with OSM Labels"
date: 2026-03-11
tags: [classification, osm]
languages: [typescript, python]  # for task examples
author: "TESSERA Team"
description: "Use OpenStreetMap labels to train a k-NN classifier on TESSERA embeddings"
---
```

### Content Loading Pipeline
- The mdsvex Vite plugin compiles `.svx` files to Svelte components at build time
- `content.ts` uses Vite's `import.meta.glob('../../content/**/*.svx', { eager: true })` to discover all content
- Each imported module exposes its frontmatter metadata and a default Svelte component
- Listing pages (blog index, tasks index) iterate over the glob results, extract frontmatter, sort by date, and filter by tag

### Features
- Tag-based filtering on listing pages
- Language tabs (TypeScript/Python) on task example pages
- Syntax highlighting for code blocks (via shiki, configured in mdsvex)
- Ability to embed interactive Svelte components (maps, live demos) via mdsvex

## Initial Content Stubs

Two task examples with stub content:

1. **Classification: OSM Land Classification** (`/tasks/classification/osm-land-classification`)
   - Tags: classification, osm
   - Languages: TypeScript, Python
   - Demonstrates k-NN classification using OpenStreetMap labels on TESSERA embeddings

2. **Segmentation: Solar Panel Detection** (`/tasks/segmentation/solar-panel-detection`)
   - Tags: segmentation, solar
   - Languages: TypeScript, Python
   - Demonstrates UNet segmentation for detecting solar panels

## Configuration

Site-wide configuration in a single file (`src/lib/config.ts`):

```typescript
export const siteConfig = {
  title: "TESSERA",
  subtitle: "A pixel-wise earth observation foundation model",
  social: {
    github: "https://github.com/ucam-eo",
    twitter: "https://twitter.com/avsm",
    bluesky: "https://bsky.app/profile/eeg.cl.cam.ac.uk",
  },
  tasks: [
    { name: "Classification", tag: "classification" },
    { name: "Segmentation", tag: "segmentation" },
    { name: "Change Detection", tag: "change-detection" },
    { name: "Canopy Height", tag: "canopy-height" },
    { name: "Land Cover", tag: "land-cover" },
    { name: "Crop Mapping", tag: "crop-mapping" },
    { name: "Solar Panels", tag: "solar" },
  ],
  docs: "https://geotessera.readthedocs.io/",
  map: {
    catalogUrl: "https://dl2.geotessera.org/zarr/v1/catalog.json",  // STAC catalog for zone discovery
    globalPreviewUrl: "https://dl2.geotessera.org/zarr/v1/global_rgb_2025.zarr",  // verify path via catalog
    initialCenter: [10, 30] as [number, number], // Mid-Atlantic, global view
    initialZoom: 1.5,
    cambridgeCenter: [0.1218, 52.2053] as [number, number],
    ukCenter: [-2, 54] as [number, number],
  },
};
```

## File Structure

```
geotessera.org/
├── index.html
├── vite.config.ts
├── svelte.config.js
├── package.json
├── tsconfig.json
├── src/
│   ├── main.ts                    # Entry point
│   ├── App.svelte                 # Root component + router
│   ├── lib/
│   │   ├── config.ts              # Site configuration
│   │   ├── router.ts              # Simple SPA router
│   │   ├── content.ts             # mdsvex content loader
│   │   └── globe.ts               # Globe scroll animation logic
│   ├── components/
│   │   ├── Nav.svelte             # Navigation bar + tasks dropdown
│   │   ├── Footer.svelte          # Footer
│   │   ├── Globe.svelte           # MapLibre GL globe wrapper
│   │   ├── TagPill.svelte         # Reusable tag pill
│   │   ├── PostCard.svelte        # Blog/example card
│   │   ├── CodeTabs.svelte        # TypeScript/Python tab switcher
│   │   └── OpenSection.svelte     # "Fully Open" section
│   ├── pages/
│   │   ├── Home.svelte            # Homepage
│   │   ├── Blog.svelte            # Blog listing
│   │   ├── BlogPost.svelte        # Blog post renderer
│   │   ├── Tasks.svelte           # Tasks overview
│   │   ├── TaskTag.svelte         # Filtered task page
│   │   └── TaskExample.svelte     # Individual example
│   └── styles/
│       └── global.css             # Global styles, CSS variables
├── content/
│   ├── blog/                      # Blog posts (.svx)
│   └── tasks/                     # Task examples (.svx), flat directory
│       ├── osm-land-classification.svx
│       └── solar-panel-detection.svx
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-03-11-tessera-website-design.md
```

## Dependencies

```json
{
  "dependencies": {
    "maplibre-gl": "^4.x",
    "@ucam-eo/maplibre-zarr-tessera": "link:../tze/packages/maplibre-zarr-tessera"
  },
  "devDependencies": {
    "svelte": "^5.x",
    "@sveltejs/vite-plugin-svelte": "^4.x",
    "vite": "^6.x",
    "mdsvex": "^1.x",  // or @huntabyte/mdsvex — must support Svelte 5
    "typescript": "^5.x",
    "shiki": "^1.x"
  }
}
```

## Non-Goals

- No server-side rendering (pure SPA)
- No CMS integration (content lives in the repo)
- No user authentication or accounts
- No full tze viewer rebuild — the globe demo shows real tiles but doesn't replicate the full analysis UI
- No search functionality in v1
- No responsive/mobile-first design in v1 (desktop-oriented, basic readability on mobile is fine)

## Risks and Spikes

- **Globe + zarr:// tile protocol:** MapLibre's globe projection with the zarr:// custom protocol is untested in the tze codebase. Validate early with a minimal spike before building scroll animations.
- **mdsvex + Svelte 5:** Verify exact compatible mdsvex version. If mainline mdsvex doesn't support Svelte 5, use `@huntabyte/mdsvex` fork.
