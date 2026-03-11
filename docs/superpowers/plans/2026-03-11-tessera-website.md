# TESSERA Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build geotessera.org — a Svelte 5 SPA with a scroll-driven MapLibre globe demo, blog, and downstream task showcase for the TESSERA foundation model.

**Architecture:** Svelte 5 + Vite SPA with hand-rolled history-based router. MapLibre GL in globe projection renders TESSERA tiles via the zarr:// custom protocol from the tze library. Content (blog posts, task examples) is authored as mdsvex `.svx` files with frontmatter, compiled at build time and discovered via `import.meta.glob`.

**Tech Stack:** Svelte 5.0.0, Vite 6.0.0, TypeScript 5.7.0, MapLibre GL 4.7.1, mdsvex 0.12.7, @ucam-eo/maplibre-zarr-tessera (linked from ../tze), shiki for syntax highlighting.

**Spec:** `docs/superpowers/specs/2026-03-11-tessera-website-design.md`

---

## Chunk 1: Project Foundation

### Task 1: Scaffold Vite + Svelte 5 project

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `svelte.config.js`
- Create: `tsconfig.json`
- Create: `index.html`
- Create: `src/main.ts`
- Create: `src/App.svelte`
- Create: `src/vite-env.d.ts`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "geotessera-org",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "maplibre-gl": "^4.7.1"
  },
  "devDependencies": {
    "svelte": "^5.0.0",
    "@sveltejs/vite-plugin-svelte": "^5.0.0",
    "vite": "^6.0.0",
    "typescript": "^5.7.0",
    "mdsvex": "^0.12.7",
    "shiki": "^1.0.0"
  },
  "pnpm": {
    "overrides": {
      "zarrita": "github:avsm/zarrita.js#coalesce&path:packages/zarrita",
      "@zarrita/storage": "github:avsm/zarrita.js#coalesce&path:packages/@zarrita-storage"
    }
  }
}
```

Note: The `@ucam-eo/maplibre-zarr-tessera` dependency will be added in Task 7 (Globe spike) after validating the link works. The zarrita overrides are needed because the tze library depends on a custom fork.

- [ ] **Step 2: Create vite.config.ts**

Note: mdsvex preprocessing is configured only in `svelte.config.js` (Step 3) — NOT here. The `@sveltejs/vite-plugin-svelte` reads `svelte.config.js` automatically.

```typescript
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@content': path.resolve(__dirname, './content'),
    },
  },
});
```

- [ ] **Step 3: Create svelte.config.js**

This is the single source of mdsvex configuration, including shiki syntax highlighting.

```javascript
import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.svx'],
      highlight: {
        highlighter: async (code, lang) => {
          const { codeToHtml } = await import('shiki');
          const html = await codeToHtml(code, {
            lang: lang || 'text',
            theme: 'github-dark',
          });
          // Escape backticks for Svelte template
          return `{@html \`${html.replace(/`/g, '\\`')}\`}`;
        },
      },
    }),
  ],
  extensions: ['.svelte', '.svx'],
};
```

- [ ] **Step 4: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "paths": {
      "@/*": ["./src/*"],
      "@content/*": ["./content/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.svelte", "src/**/*.svx", "content/**/*.svx"]
}
```

- [ ] **Step 5: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TESSERA — A pixel-wise earth observation foundation model</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 6: Create src/vite-env.d.ts**

```typescript
/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module '*.svx' {
  import type { SvelteComponent } from 'svelte';
  const component: typeof SvelteComponent;
  export default component;
  export const metadata: Record<string, unknown>;
}
```

- [ ] **Step 7: Create src/main.ts**

```typescript
import App from './App.svelte';
import './styles/global.css';
import { mount } from 'svelte';

const app = mount(App, { target: document.getElementById('app')! });

export default app;
```

- [ ] **Step 8: Create src/App.svelte (placeholder)**

```svelte
<script lang="ts">
  let message = 'TESSERA';
</script>

<main>
  <h1>{message}</h1>
  <p>A pixel-wise earth observation foundation model</p>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: #0a0a1a;
    color: white;
    font-family: 'Inter', system-ui, sans-serif;
  }
  h1 {
    font-weight: 200;
    letter-spacing: 14px;
    font-size: 48px;
  }
  p {
    font-size: 12px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(0, 200, 255, 0.6);
  }
</style>
```

- [ ] **Step 9: Install dependencies and verify dev server starts**

Run: `cd /Users/avsm/src/git/ucam-eo/geotessera.org && pnpm install && pnpm dev`
Expected: Vite dev server starts on localhost, page shows "TESSERA" title on dark background.

- [ ] **Step 10: Commit**

```bash
git init
echo 'node_modules\ndist\n.superpowers\n.DS_Store' > .gitignore
git add package.json pnpm-lock.yaml vite.config.ts svelte.config.js tsconfig.json index.html src/ .gitignore
git commit -m "feat: scaffold Vite + Svelte 5 project"
```

---

### Task 2: Global CSS and design system

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create global.css with CSS variables and base styles**

```css
:root {
  --bg-primary: #0a0a1a;
  --bg-card: rgba(255, 255, 255, 0.02);
  --bg-card-hover: rgba(255, 255, 255, 0.04);
  --border-subtle: rgba(255, 255, 255, 0.04);
  --border-light: rgba(255, 255, 255, 0.06);
  --accent: rgb(0, 200, 255);
  --accent-dim: rgba(0, 200, 255, 0.6);
  --accent-faint: rgba(0, 200, 255, 0.1);
  --accent-border: rgba(0, 200, 255, 0.2);
  --text-primary: rgba(255, 255, 255, 0.95);
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-muted: rgba(255, 255, 255, 0.4);
  --text-faint: rgba(255, 255, 255, 0.2);
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --nav-height: 52px;
}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a {
  color: var(--accent-dim);
  text-decoration: none;
}

a:hover {
  color: var(--accent);
}

::selection {
  background: rgba(0, 200, 255, 0.2);
  color: white;
}
```

- [ ] **Step 2: Verify styles apply**

Run: `pnpm dev`
Expected: Dark background, correct font rendering.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add global CSS with design tokens"
```

---

### Task 3: Site configuration

**Files:**
- Create: `src/lib/config.ts`

- [ ] **Step 1: Create config.ts**

```typescript
export const siteConfig = {
  title: 'TESSERA',
  subtitle: 'A pixel-wise earth observation foundation model',
  social: {
    github: 'https://github.com/ucam-eo',
    twitter: 'https://twitter.com/avsm',
    bluesky: 'https://bsky.app/profile/eeg.cl.cam.ac.uk',
  },
  tasks: [
    { name: 'Classification', tag: 'classification', description: 'Categorize land cover types from satellite embeddings' },
    { name: 'Segmentation', tag: 'segmentation', description: 'Detect and outline specific features in imagery' },
    { name: 'Change Detection', tag: 'change-detection', description: 'Monitor landscape changes over time' },
    { name: 'Canopy Height', tag: 'canopy-height', description: 'Estimate vegetation height from embeddings' },
    { name: 'Land Cover', tag: 'land-cover', description: 'Map land use and land cover at scale' },
    { name: 'Crop Mapping', tag: 'crop-mapping', description: 'Identify and classify agricultural crops' },
    { name: 'Solar Panels', tag: 'solar', description: 'Detect solar panel installations from space' },
  ] as const,
  docs: 'https://geotessera.readthedocs.io/',
  map: {
    catalogUrl: 'https://dl2.geotessera.org/zarr/v1/catalog.json',
    globalPreviewUrl: 'https://dl2.geotessera.org/zarr/v1/global_rgb_2025.zarr',
    initialCenter: [10, 30] as [number, number],
    initialZoom: 1.5,
    cambridgeCenter: [0.1218, 52.2053] as [number, number],
    cambridgeZoom: 12,
    ukCenter: [-2, 54] as [number, number],
    ukZoom: 5,
  },
} as const;

export type TaskConfig = (typeof siteConfig.tasks)[number];
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/config.ts
git commit -m "feat: add site configuration"
```

---

### Task 4: SPA Router

**Files:**
- Create: `src/lib/router.ts`
- Modify: `src/App.svelte`

- [ ] **Step 1: Create router.ts**

```typescript
import { writable, derived } from 'svelte/store';

export const currentPath = writable(window.location.pathname);

// Listen to popstate (browser back/forward)
window.addEventListener('popstate', () => {
  currentPath.set(window.location.pathname);
});

export function navigate(path: string) {
  if (path === window.location.pathname) return;
  window.history.pushState(null, '', path);
  currentPath.set(path);
  window.scrollTo(0, 0);
}

// Click handler for <a> tags — call navigate() instead of default
export function link(node: HTMLAnchorElement) {
  function handleClick(e: MouseEvent) {
    // Only intercept left-clicks without modifier keys
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const href = node.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('//')) return;
    e.preventDefault();
    navigate(href);
  }
  node.addEventListener('click', handleClick);
  return {
    destroy() {
      node.removeEventListener('click', handleClick);
    },
  };
}

interface Route {
  pattern: RegExp;
  params: string[];
}

function compileRoute(path: string): Route {
  const params: string[] = [];
  const pattern = path.replace(/:(\w+)/g, (_, name) => {
    params.push(name);
    return '([^/]+)';
  });
  return { pattern: new RegExp(`^${pattern}$`), params };
}

const routes: { path: string; route: Route }[] = [
  '/',
  '/blog',
  '/blog/:slug',
  '/tasks',
  '/tasks/:tag',
  '/tasks/:tag/:slug',
].map((path) => ({ path, route: compileRoute(path) }));

export const currentRoute = derived(currentPath, ($path) => {
  for (const { path, route } of routes) {
    const match = $path.match(route.pattern);
    if (match) {
      const params: Record<string, string> = {};
      route.params.forEach((name, i) => {
        params[name] = match[i + 1];
      });
      return { path, params };
    }
  }
  return { path: '/404', params: {} };
});
```

- [ ] **Step 2: Update App.svelte to use router**

```svelte
<script lang="ts">
  import { currentRoute } from './lib/router';

  // Pages will be added in later tasks — for now, show route info
  let route = $derived($currentRoute);
</script>

<main>
  <h1>TESSERA</h1>
  <p>Route: {route.path}</p>
  <p>Params: {JSON.stringify(route.params)}</p>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-family: var(--font-sans);
  }
  h1 {
    font-weight: 200;
    letter-spacing: 14px;
    font-size: 48px;
  }
  p {
    font-size: 12px;
    letter-spacing: 2px;
    color: var(--text-muted);
    margin-top: 8px;
  }
</style>
```

- [ ] **Step 3: Verify routing works**

Run: `pnpm dev`, navigate to `/`, `/blog`, `/tasks/classification` in browser.
Expected: Route path and params displayed correctly for each URL.

- [ ] **Step 4: Commit**

```bash
git add src/lib/router.ts src/App.svelte
git commit -m "feat: add SPA router with history.pushState"
```

---

## Chunk 2: Shell Components

### Task 5: Nav component

**Files:**
- Create: `src/components/Nav.svelte`

- [ ] **Step 1: Create Nav.svelte**

```svelte
<script lang="ts">
  import { siteConfig } from '@/lib/config';
  import { currentPath, link } from '@/lib/router';

  let tasksOpen = $state(false);
  let path = $derived($currentPath);

  function isActive(href: string): boolean {
    if (href === '/') return path === '/';
    return path.startsWith(href);
  }

  function closeDropdown() {
    tasksOpen = false;
  }
</script>

<svelte:window onclick={closeDropdown} />

<nav>
  <div class="nav-left">
    <a href="/" use:link class="wordmark">TESSERA</a>
    <div class="nav-links">
      <a href="/" use:link class:active={isActive('/')}>HOME</a>
      <a href="/blog" use:link class:active={isActive('/blog')}>BLOG</a>
      <div class="dropdown">
        <button
          class:active={isActive('/tasks')}
          onclick={(e) => { e.stopPropagation(); tasksOpen = !tasksOpen; }}
        >
          TASKS ▾
        </button>
        {#if tasksOpen}
          <div class="dropdown-menu" onclick={(e) => e.stopPropagation()}>
            {#each siteConfig.tasks as task}
              <a href="/tasks/{task.tag}" use:link onclick={closeDropdown}>{task.name}</a>
            {/each}
          </div>
        {/if}
      </div>
      <a href={siteConfig.docs} target="_blank" rel="noopener">DOCS</a>
    </div>
  </div>
  <div class="nav-right">
    <a href={siteConfig.social.github} target="_blank" rel="noopener" aria-label="GitHub">GitHub</a>
    <a href={siteConfig.social.twitter} target="_blank" rel="noopener" aria-label="Twitter">𝕏</a>
    <a href={siteConfig.social.bluesky} target="_blank" rel="noopener" aria-label="Bluesky">Bsky</a>
  </div>
</nav>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    height: var(--nav-height);
    border-bottom: 1px solid var(--border-subtle);
    background: rgba(10, 10, 26, 0.85);
    backdrop-filter: blur(12px);
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .wordmark {
    font-weight: 200;
    letter-spacing: 6px;
    font-size: 16px;
    color: var(--text-primary);
  }

  .nav-links {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .nav-links a, .nav-links button {
    font-size: 11px;
    letter-spacing: 1px;
    color: var(--text-muted);
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--font-sans);
    padding: 4px 0;
    transition: color 0.2s;
  }

  .nav-links a:hover, .nav-links button:hover,
  .nav-links a.active, .nav-links button.active {
    color: var(--accent-dim);
  }

  .dropdown {
    position: relative;
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 12px);
    left: -8px;
    background: rgba(10, 15, 30, 0.95);
    border: 1px solid var(--accent-border);
    border-radius: 6px;
    padding: 8px 0;
    min-width: 180px;
    backdrop-filter: blur(8px);
  }

  .dropdown-menu a {
    display: block;
    padding: 6px 16px;
    font-size: 11px;
    letter-spacing: 1px;
    color: var(--text-muted);
  }

  .dropdown-menu a:hover {
    color: var(--accent-dim);
    background: rgba(0, 200, 255, 0.05);
  }

  .nav-right {
    display: flex;
    gap: 12px;
  }

  .nav-right a {
    font-size: 11px;
    color: var(--text-faint);
    letter-spacing: 1px;
    transition: color 0.2s;
  }

  .nav-right a:hover {
    color: var(--text-muted);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Nav.svelte
git commit -m "feat: add Nav component with tasks dropdown"
```

---

### Task 6: Footer, TagPill, and PostCard components

**Files:**
- Create: `src/components/Footer.svelte`
- Create: `src/components/TagPill.svelte`
- Create: `src/components/PostCard.svelte`

- [ ] **Step 1: Create Footer.svelte**

```svelte
<footer>
  <span>University of Cambridge · Energy & Environment Group</span>
  <span>MIT License</span>
</footer>

<style>
  footer {
    padding: 20px 32px;
    border-top: 1px solid var(--border-subtle);
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: var(--text-faint);
    letter-spacing: 1px;
  }
</style>
```

- [ ] **Step 2: Create TagPill.svelte**

```svelte
<script lang="ts">
  import { link } from '@/lib/router';

  interface Props {
    tag: string;
    href?: string;
  }

  let { tag, href }: Props = $props();
</script>

{#if href}
  <a {href} use:link class="pill">{tag}</a>
{:else}
  <span class="pill">{tag}</span>
{/if}

<style>
  .pill {
    font-size: 9px;
    padding: 2px 8px;
    background: var(--accent-faint);
    border-radius: 10px;
    color: var(--accent-dim);
    letter-spacing: 1px;
    text-decoration: none;
    transition: background 0.2s;
  }

  a.pill:hover {
    background: rgba(0, 200, 255, 0.2);
  }
</style>
```

- [ ] **Step 3: Create PostCard.svelte**

```svelte
<script lang="ts">
  import { link } from '@/lib/router';
  import TagPill from './TagPill.svelte';

  interface Props {
    title: string;
    href: string;
    tags: string[];
    languages?: string[];
  }

  let { title, href, tags, languages }: Props = $props();
</script>

<a {href} use:link class="card">
  <div class="tags">
    {#each tags as tag}
      <TagPill {tag} />
    {/each}
  </div>
  <div class="title">{title}</div>
  {#if languages?.length}
    <div class="languages">{languages.join(' · ')}</div>
  {/if}
</a>

<style>
  .card {
    display: block;
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: 6px;
    padding: 16px;
    text-decoration: none;
    transition: border-color 0.2s, background 0.2s;
  }

  .card:hover {
    border-color: var(--border-light);
    background: var(--bg-card-hover);
  }

  .tags {
    display: flex;
    gap: 6px;
    margin-bottom: 8px;
  }

  .title {
    font-size: 13px;
    color: var(--text-secondary);
    margin-bottom: 4px;
  }

  .languages {
    font-size: 11px;
    color: var(--text-muted);
  }
</style>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.svelte src/components/TagPill.svelte src/components/PostCard.svelte
git commit -m "feat: add Footer, TagPill, and PostCard components"
```

---

### Task 7: OpenSection and CodeTabs components

**Files:**
- Create: `src/components/OpenSection.svelte`
- Create: `src/components/CodeTabs.svelte`

- [ ] **Step 1: Create OpenSection.svelte**

```svelte
<script lang="ts">
  import { siteConfig } from '@/lib/config';
</script>

<section class="open-section">
  <div class="header">
    <span class="label">FULLY OPEN</span>
    <div class="line"></div>
    <a href={siteConfig.social.github} target="_blank" rel="noopener">
      github.com/ucam-eo →
    </a>
  </div>
  <div class="grid">
    <div class="pillar">
      <div class="icon">⚖</div>
      <div class="name">Open Weights</div>
      <div class="desc">Model checkpoints freely available</div>
    </div>
    <div class="pillar">
      <div class="icon">◈</div>
      <div class="name">Open Data</div>
      <div class="desc">Pre-computed embeddings downloadable</div>
    </div>
    <div class="pillar">
      <div class="icon">⟳</div>
      <div class="name">Open Training</div>
      <div class="desc">Full training pipeline reproducible</div>
    </div>
    <div class="pillar">
      <div class="icon">▷</div>
      <div class="name">Open Inference</div>
      <div class="desc">Run locally or in the browser</div>
    </div>
  </div>
</section>

<style>
  .open-section {
    padding: 32px;
    border-top: 1px solid var(--border-subtle);
  }

  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .label {
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--text-faint);
    white-space: nowrap;
  }

  .line {
    flex: 1;
    height: 1px;
    background: var(--border-subtle);
  }

  .header a {
    font-size: 11px;
    color: var(--accent-dim);
    letter-spacing: 1px;
    white-space: nowrap;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  .pillar {
    text-align: center;
    padding: 16px 12px;
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: 6px;
  }

  .icon {
    font-size: 18px;
    margin-bottom: 6px;
  }

  .name {
    font-size: 11px;
    color: var(--accent-dim);
    letter-spacing: 1px;
    margin-bottom: 4px;
  }

  .desc {
    font-size: 10px;
    color: var(--text-faint);
  }
</style>
```

- [ ] **Step 2: Create CodeTabs.svelte**

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    languages: string[];
    children: Snippet;
  }

  let { languages, children }: Props = $props();
  let active = $state(languages[0]);
</script>

<div class="code-tabs">
  <div class="tab-bar">
    {#each languages as lang}
      <button
        class:active={active === lang}
        onclick={() => (active = lang)}
      >
        {lang}
      </button>
    {/each}
  </div>
  <div class="tab-content" data-active-lang={active.toLowerCase()}>
    {@render children()}
  </div>
</div>

<style>
  .code-tabs {
    border: 1px solid var(--border-light);
    border-radius: 6px;
    overflow: hidden;
    margin: 16px 0;
  }

  .tab-bar {
    display: flex;
    border-bottom: 1px solid var(--border-light);
    background: rgba(255, 255, 255, 0.02);
  }

  .tab-bar button {
    padding: 8px 16px;
    font-size: 12px;
    font-family: var(--font-sans);
    letter-spacing: 1px;
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: color 0.2s, border-color 0.2s;
  }

  .tab-bar button.active {
    color: var(--accent-dim);
    border-bottom-color: var(--accent-dim);
  }

  .tab-content {
    padding: 16px;
  }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/OpenSection.svelte src/components/CodeTabs.svelte
git commit -m "feat: add OpenSection and CodeTabs components"
```

---

## Chunk 3: Globe & Homepage

### Task 8: Globe spike — validate MapLibre globe + zarr:// protocol

**Files:**
- Create: `src/components/Globe.svelte`
- Modify: `src/App.svelte`
- Modify: `package.json`

This task validates that MapLibre's globe projection works with the zarr:// tile protocol from tze. This is a known risk from the spec.

- [ ] **Step 1: Add tze dependency to package.json**

Add to dependencies in `package.json`:
```json
"@ucam-eo/maplibre-zarr-tessera": "link:../tze/packages/maplibre-zarr-tessera"
```

Then run:
```bash
cd /Users/avsm/src/git/ucam-eo/geotessera.org && pnpm install
```

Also add a resolve alias in `vite.config.ts` to resolve the tze source directly (matching the tze viewer pattern):

Add to `resolve.alias`:
```typescript
'@ucam-eo/maplibre-zarr-tessera': path.resolve(__dirname, '../tze/packages/maplibre-zarr-tessera/src/index.ts'),
```

- [ ] **Step 2: Create Globe.svelte (spike version)**

```svelte
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
```

- [ ] **Step 3: Temporarily render Globe in App.svelte to test**

Update App.svelte:
```svelte
<script lang="ts">
  import Globe from './components/Globe.svelte';
</script>

<Globe />
```

- [ ] **Step 4: Test the globe spike**

Run: `pnpm dev`
Expected: MapLibre GL map renders in globe projection with dark background. If Tessera tiles load, they will be visible. If tiles fail (404, CORS, etc.), the globe renders with just the dark background — note what error appears in the console and adjust the globalPreviewUrl in config.ts accordingly.

**If globe projection + zarr:// does not work:** Fall back to mercator projection (`projection: undefined`) and adjust the scroll animation zooms. This is an acceptable fallback.

- [ ] **Step 5: Commit**

```bash
git add src/components/Globe.svelte src/App.svelte package.json pnpm-lock.yaml vite.config.ts
git commit -m "feat: Globe spike — MapLibre globe with zarr:// tiles"
```

---

### Task 9: Scroll-driven globe animation

**Files:**
- Create: `src/lib/globe.ts`
- Modify: `src/components/Globe.svelte`

- [ ] **Step 1: Create globe.ts with scroll step definitions**

```typescript
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

    // Stop auto-rotation when user scrolls away from step 0
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
      // Resume rotation if back to step 0
      if (currentStep === 0) rotation.start();
      // Check if scroll moved during animation
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
```

- [ ] **Step 2: Update Globe.svelte with scroll animation and overlays**

```svelte
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

  // Derive current overlay text
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
      // Poll current step for overlay text (simple approach)
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
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/globe.ts src/components/Globe.svelte
git commit -m "feat: scroll-driven globe animation with 4 steps"
```

---

### Task 10: Homepage assembly

**Files:**
- Create: `src/pages/Home.svelte`
- Modify: `src/App.svelte`

- [ ] **Step 1: Create Home.svelte**

```svelte
<script lang="ts">
  import Globe from '@/components/Globe.svelte';
  import OpenSection from '@/components/OpenSection.svelte';
  import PostCard from '@/components/PostCard.svelte';
  import Footer from '@/components/Footer.svelte';
  import { link } from '@/lib/router';
  import { getAllContent } from '@/lib/content';

  let scrollContainer: HTMLElement;

  // Get latest 2 posts across all content
  const allContent = getAllContent();
  const latest = allContent.slice(0, 2);
</script>

<div class="home" bind:this={scrollContainer}>
  <Globe {scrollContainer} />

  <!-- Spacer for scroll-driven animation: 4 steps × 100vh -->
  <div class="scroll-spacer"></div>

  <!-- Content below the globe -->
  <div class="content">
    <OpenSection />

    <section class="latest">
      <div class="section-header">
        <span class="section-label">LATEST</span>
        <a href="/blog" use:link>View all →</a>
      </div>
      <div class="grid">
        {#each latest as post}
          <PostCard
            title={post.title}
            href={post.href}
            tags={post.tags}
            languages={post.languages}
          />
        {/each}
      </div>
    </section>

    <Footer />
  </div>
</div>

<style>
  .home {
    height: 100vh;
    overflow-y: auto;
  }

  .scroll-spacer {
    height: 300vh; /* Steps 2-4 (step 1 is initial view) */
    pointer-events: none;
  }

  .content {
    position: relative;
    background: var(--bg-primary);
  }

  .latest {
    padding: 32px;
    border-top: 1px solid var(--border-subtle);
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .section-label {
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--text-faint);
  }

  .section-header a {
    font-size: 11px;
    color: var(--accent-dim);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
</style>
```

- [ ] **Step 2: Update App.svelte with full routing**

```svelte
<script lang="ts">
  import { currentRoute } from './lib/router';
  import Nav from './components/Nav.svelte';
  import Home from './pages/Home.svelte';

  let route = $derived($currentRoute);
</script>

<Nav />

<div class="page">
  {#if route.path === '/'}
    <Home />
  {:else}
    <div class="placeholder">
      <h2>{route.path}</h2>
      <p>Coming soon</p>
    </div>
  {/if}
</div>

<style>
  .page {
    padding-top: var(--nav-height);
  }

  .placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - var(--nav-height));
    color: var(--text-muted);
  }

  .placeholder h2 {
    font-weight: 300;
    letter-spacing: 4px;
    font-size: 24px;
    margin-bottom: 8px;
  }

  .placeholder p {
    font-size: 12px;
    letter-spacing: 2px;
  }
</style>
```

- [ ] **Step 3: Verify homepage renders**

Run: `pnpm dev`
Expected: Nav bar at top, globe fills viewport, scrolling triggers fly-to animations through UK → Cambridge → back. Below the globe: "Fully Open" section and latest content cards. Footer at bottom.

Note: `getAllContent()` is not yet implemented (Task 11). This step may show an import error — that's expected. If so, temporarily stub it:

```typescript
// src/lib/content.ts (temporary stub)
export function getAllContent() {
  return [
    { title: 'Land Classification with OSM Labels', href: '/tasks/classification/osm-land-classification', tags: ['classification', 'osm'], languages: ['TypeScript', 'Python'] },
    { title: 'Solar Panel Detection with UNet', href: '/tasks/segmentation/solar-panel-detection', tags: ['segmentation', 'solar'], languages: ['TypeScript', 'Python'] },
  ];
}
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/Home.svelte src/App.svelte src/lib/content.ts
git commit -m "feat: assemble homepage with globe, open section, latest content"
```

---

## Chunk 4: Content System & Pages

### Task 11: Content loader

**Files:**
- Create (or replace stub): `src/lib/content.ts`

- [ ] **Step 1: Create content.ts**

```typescript
export interface ContentMeta {
  title: string;
  date: string;
  tags: string[];
  languages?: string[];
  author?: string;
  description?: string;
  slug: string;
  href: string;
  type: 'blog' | 'task';
  component: any; // Svelte component
}

// Import all .svx files at build time
const blogModules = import.meta.glob('../../content/blog/*.svx', { eager: true }) as Record<string, any>;
const taskModules = import.meta.glob('../../content/tasks/*.svx', { eager: true }) as Record<string, any>;

function extractSlug(path: string): string {
  const filename = path.split('/').pop() ?? '';
  return filename.replace(/\.svx$/, '');
}

function loadModules(modules: Record<string, any>, type: 'blog' | 'task'): ContentMeta[] {
  return Object.entries(modules).map(([path, mod]) => {
    const meta = mod.metadata ?? {};
    const slug = extractSlug(path);
    const tags: string[] = meta.tags ?? [];
    const href = type === 'blog'
      ? `/blog/${slug}`
      : `/tasks/${tags[0] ?? 'uncategorized'}/${slug}`;
    return {
      title: meta.title ?? slug,
      date: meta.date ?? '1970-01-01',
      tags,
      languages: meta.languages,
      author: meta.author,
      description: meta.description,
      slug,
      href,
      type,
      component: mod.default,
    };
  });
}

let _allContent: ContentMeta[] | null = null;

export function getAllContent(): ContentMeta[] {
  if (!_allContent) {
    const blogs = loadModules(blogModules, 'blog');
    const tasks = loadModules(taskModules, 'task');
    _allContent = [...blogs, ...tasks].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  return _allContent;
}

export function getBlogPosts(): ContentMeta[] {
  return getAllContent().filter((c) => c.type === 'blog');
}

export function getTaskExamples(): ContentMeta[] {
  return getAllContent().filter((c) => c.type === 'task');
}

export function getContentByTag(tag: string): ContentMeta[] {
  return getAllContent().filter((c) => c.tags.includes(tag));
}

export function getContentBySlug(slug: string): ContentMeta | undefined {
  return getAllContent().find((c) => c.slug === slug);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/content.ts
git commit -m "feat: add content loader with import.meta.glob"
```

---

### Task 12: Content stubs

**Files:**
- Create: `content/blog/.gitkeep`
- Create: `content/tasks/osm-land-classification.svx`
- Create: `content/tasks/solar-panel-detection.svx`

- [ ] **Step 1: Create content directories**

```bash
mkdir -p content/blog content/tasks public
```

- [ ] **Step 2: Create osm-land-classification.svx**

```markdown
---
title: "Land Classification with OSM Labels"
date: 2026-03-11
tags: [classification, osm]
languages: [TypeScript, Python]
author: "TESSERA Team"
description: "Use OpenStreetMap labels to train a k-NN classifier on TESSERA embeddings"
---

# Land Classification with OSM Labels

This example demonstrates how to use OpenStreetMap land-use labels as training data
for a k-nearest-neighbors classifier operating on TESSERA's 128-dimensional embeddings.

## Overview

TESSERA embeddings encode rich spectral-temporal information at every 10m pixel. By
sampling embeddings at locations where OpenStreetMap provides reliable land-use labels,
we can train a simple k-NN classifier that generalizes across the landscape.

## TypeScript

```typescript
import { ZarrSourceManager } from '@ucam-eo/maplibre-zarr-tessera';
import { classifyTiles } from '@ucam-eo/tessera-tasks';

// Load embeddings for a region
const manager = new ZarrSourceManager(zones, { preview: 'rgb' });
const chunks = await manager.getChunksInRegion(cambridgePolygon);

// Classify using OSM training labels
const result = await classifyTiles(embeddings, trainingLabels, {
  k: 5,
  batchSize: 1024,
});
```

## Python

```python
import geotessera
import numpy as np
from sklearn.neighbors import KNeighborsClassifier

# Download TESSERA embeddings for Cambridge
gt = geotessera.GeoTessera()
tiles = gt.download(region="cambridge.geojson", format="numpy")

# Train k-NN on OSM-labeled pixels
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(training_embeddings, osm_labels)
predictions = knn.predict(tiles.reshape(-1, 128))
```

---

*Full example code and notebooks available on [GitHub](https://github.com/ucam-eo/geotessera-examples).*
```

- [ ] **Step 3: Create solar-panel-detection.svx**

```markdown
---
title: "Solar Panel Detection with UNet"
date: 2026-03-11
tags: [segmentation, solar]
languages: [TypeScript, Python]
author: "TESSERA Team"
description: "Detect solar panel installations using UNet segmentation on TESSERA embeddings"
---

# Solar Panel Detection with UNet

This example shows how to run a pre-trained UNet segmentation model on TESSERA embeddings
to detect solar panel installations from satellite imagery.

## Overview

The UNet model slides 64×64 patches across TESSERA embedding tiles, producing per-pixel
probability maps. Thresholding and polygon extraction yield GeoJSON outlines of detected
solar installations, with minimum area filtering at approximately 1 hectare.

## TypeScript

```typescript
import { SegmentationSession } from '@ucam-eo/tessera-tasks';

// Initialize ONNX Runtime segmentation session
const session = new SegmentationSession({
  modelUrl: '/models/solar-unet.onnx',
  statsUrl: '/models/solar-stats.json',
  patchSize: 64,
  stride: 32,
});

// Run segmentation on loaded embeddings
const polygons = await session.segment(embeddingRegion, {
  threshold: 0.5,
  minArea: 10000, // 1 hectare in m²
});
```

## Python

```python
import geotessera
import torch
from geotessera.models import load_unet

# Download embeddings
gt = geotessera.GeoTessera()
tiles = gt.download(region="cambridge.geojson", format="numpy")

# Run UNet segmentation
model = load_unet("solar-panels")
predictions = model.predict(tiles, patch_size=64, stride=32)
solar_polygons = predictions.to_geojson(threshold=0.5, min_area=10000)
```

---

*Pre-trained model weights and full pipeline available on [GitHub](https://github.com/ucam-eo/tessera-classification).*
```

- [ ] **Step 4: Create a blog post stub (content/blog/2026-03-11-introducing-tessera.svx)**

```markdown
---
title: "Introducing TESSERA"
date: 2026-03-11
tags: [announcement]
author: "TESSERA Team"
description: "TESSERA is a pixel-wise earth observation foundation model that generates 128-dimensional embeddings from Sentinel-1 and Sentinel-2 satellite imagery."
---

# Introducing TESSERA

TESSERA (Temporal Embeddings of Surface Spectra for Earth Representation and Analysis)
is a foundation model for earth observation. It compresses a full year of Sentinel-1 and
Sentinel-2 satellite observations into dense, 128-dimensional per-pixel embeddings at
10m spatial resolution.

## Why embeddings?

Traditional approaches to satellite image analysis require task-specific feature
engineering. TESSERA's self-supervised embeddings provide a general-purpose representation
that transfers across downstream tasks — from land cover classification to solar panel
detection — with minimal additional training.

## Getting started

Install the Python library:

```bash
pip install geotessera
```

Download embeddings for a region:

```python
import geotessera

gt = geotessera.GeoTessera()
tiles = gt.download(region="cambridge.geojson")
```

Or explore interactively in the browser using the [TESSERA Viewer](https://github.com/ucam-eo/tze).

---

*Read the [paper on arXiv](https://arxiv.org/abs/2025.xxxxx) for technical details.*
```

- [ ] **Step 5: Commit**

```bash
git add content/
git commit -m "feat: add content stubs — blog post, classification, and segmentation examples"
```

---

### Task 13: Blog listing and post pages

**Files:**
- Create: `src/pages/Blog.svelte`
- Create: `src/pages/BlogPost.svelte`
- Modify: `src/App.svelte`

- [ ] **Step 1: Create Blog.svelte**

```svelte
<script lang="ts">
  import { getAllContent } from '@/lib/content';
  import PostCard from '@/components/PostCard.svelte';
  import TagPill from '@/components/TagPill.svelte';
  import Footer from '@/components/Footer.svelte';

  const allPosts = getAllContent();

  // Collect unique tags
  const allTags = [...new Set(allPosts.flatMap((p) => p.tags))].sort();

  let activeTag = $state<string | null>(null);

  let filtered = $derived(
    activeTag ? allPosts.filter((p) => p.tags.includes(activeTag!)) : allPosts
  );
</script>

<div class="blog-page">
  <header>
    <h1>Blog</h1>
    <p class="subtitle">Updates, tutorials, and research from the TESSERA team</p>
  </header>

  <div class="filters">
    <button class:active={!activeTag} onclick={() => (activeTag = null)}>All</button>
    {#each allTags as tag}
      <button class:active={activeTag === tag} onclick={() => (activeTag = tag)}>{tag}</button>
    {/each}
  </div>

  <div class="posts">
    {#each filtered as post}
      <PostCard
        title={post.title}
        href={post.href}
        tags={post.tags}
        languages={post.languages}
      />
    {:else}
      <p class="empty">No posts yet.</p>
    {/each}
  </div>

  <Footer />
</div>

<style>
  .blog-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 48px 32px;
  }

  header {
    margin-bottom: 24px;
  }

  h1 {
    font-weight: 200;
    letter-spacing: 6px;
    font-size: 32px;
    margin-bottom: 8px;
  }

  .subtitle {
    font-size: 12px;
    letter-spacing: 2px;
    color: var(--text-muted);
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
  }

  .filters button {
    font-size: 10px;
    padding: 4px 12px;
    border: 1px solid var(--accent-border);
    border-radius: 20px;
    background: none;
    color: var(--text-muted);
    cursor: pointer;
    font-family: var(--font-sans);
    letter-spacing: 1px;
    transition: all 0.2s;
  }

  .filters button.active {
    background: var(--accent-faint);
    color: var(--accent-dim);
    border-color: var(--accent-dim);
  }

  .filters button:hover {
    border-color: var(--accent-dim);
  }

  .posts {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .empty {
    color: var(--text-muted);
    font-size: 14px;
  }
</style>
```

- [ ] **Step 2: Create BlogPost.svelte**

```svelte
<script lang="ts">
  import { getContentBySlug } from '@/lib/content';
  import TagPill from '@/components/TagPill.svelte';
  import Footer from '@/components/Footer.svelte';

  interface Props {
    slug: string;
  }

  let { slug }: Props = $props();
  let post = $derived(getContentBySlug(slug));
</script>

{#if post}
  <article class="post">
    <header>
      <div class="tags">
        {#each post.tags as tag}
          <TagPill {tag} href="/tasks/{tag}" />
        {/each}
      </div>
      <h1>{post.title}</h1>
      <div class="meta">
        {#if post.author}<span>{post.author}</span>{/if}
        <span>{post.date}</span>
      </div>
    </header>
    <div class="content">
      <svelte:component this={post.component} />
    </div>
  </article>
{:else}
  <div class="not-found">
    <h2>Post not found</h2>
    <p>{slug}</p>
  </div>
{/if}

<Footer />

<style>
  .post {
    max-width: 720px;
    margin: 0 auto;
    padding: 48px 32px;
  }

  header {
    margin-bottom: 32px;
  }

  .tags {
    display: flex;
    gap: 6px;
    margin-bottom: 12px;
  }

  h1 {
    font-weight: 300;
    letter-spacing: 2px;
    font-size: 28px;
    margin-bottom: 8px;
  }

  .meta {
    font-size: 12px;
    color: var(--text-muted);
    display: flex;
    gap: 12px;
  }

  .content {
    font-size: 15px;
    line-height: 1.8;
    color: var(--text-secondary);
  }

  .content :global(h2) {
    font-weight: 400;
    letter-spacing: 1px;
    font-size: 20px;
    margin-top: 32px;
    margin-bottom: 12px;
    color: var(--text-primary);
  }

  .content :global(p) {
    margin-bottom: 16px;
  }

  .content :global(pre) {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border-light);
    border-radius: 6px;
    padding: 16px;
    overflow-x: auto;
    margin-bottom: 16px;
    font-size: 13px;
    line-height: 1.6;
  }

  .content :global(code) {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
  }

  .content :global(a) {
    color: var(--accent-dim);
  }

  .content :global(hr) {
    border: none;
    border-top: 1px solid var(--border-subtle);
    margin: 32px 0;
  }

  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh;
    color: var(--text-muted);
  }
</style>
```

- [ ] **Step 3: Update App.svelte to route blog pages**

```svelte
<script lang="ts">
  import { currentRoute } from './lib/router';
  import Nav from './components/Nav.svelte';
  import Home from './pages/Home.svelte';
  import Blog from './pages/Blog.svelte';
  import BlogPost from './pages/BlogPost.svelte';

  let route = $derived($currentRoute);
</script>

<Nav />

<div class="page">
  {#if route.path === '/'}
    <Home />
  {:else if route.path === '/blog'}
    <Blog />
  {:else if route.path === '/blog/:slug'}
    <BlogPost slug={route.params.slug} />
  {:else}
    <div class="placeholder">
      <h2>{route.path}</h2>
      <p>Coming soon</p>
    </div>
  {/if}
</div>

<style>
  .page {
    padding-top: var(--nav-height);
  }

  .placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - var(--nav-height));
    color: var(--text-muted);
  }

  .placeholder h2 {
    font-weight: 300;
    letter-spacing: 4px;
    font-size: 24px;
    margin-bottom: 8px;
  }

  .placeholder p {
    font-size: 12px;
    letter-spacing: 2px;
  }
</style>
```

- [ ] **Step 4: Verify blog page renders**

Run: `pnpm dev`, navigate to `/blog`
Expected: Blog listing page shows two task example cards. Clicking one navigates to the post and renders the mdsvex content with syntax-highlighted code.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Blog.svelte src/pages/BlogPost.svelte src/App.svelte
git commit -m "feat: add blog listing and post pages"
```

---

### Task 14: Tasks pages

**Files:**
- Create: `src/pages/Tasks.svelte`
- Create: `src/pages/TaskTag.svelte`
- Create: `src/pages/TaskExample.svelte`
- Modify: `src/App.svelte`

- [ ] **Step 1: Create Tasks.svelte**

```svelte
<script lang="ts">
  import { siteConfig } from '@/lib/config';
  import { getContentByTag } from '@/lib/content';
  import { link } from '@/lib/router';
  import Footer from '@/components/Footer.svelte';
</script>

<div class="tasks-page">
  <header>
    <h1>Tasks</h1>
    <p class="subtitle">Downstream applications of TESSERA embeddings</p>
  </header>

  <div class="grid">
    {#each siteConfig.tasks as task}
      {@const examples = getContentByTag(task.tag)}
      <a href="/tasks/{task.tag}" use:link class="task-card">
        <h3>{task.name}</h3>
        <p class="desc">{task.description}</p>
        <span class="count">{examples.length} example{examples.length !== 1 ? 's' : ''}</span>
      </a>
    {/each}
  </div>

  <Footer />
</div>

<style>
  .tasks-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 48px 32px;
  }

  header {
    margin-bottom: 32px;
  }

  h1 {
    font-weight: 200;
    letter-spacing: 6px;
    font-size: 32px;
    margin-bottom: 8px;
  }

  .subtitle {
    font-size: 12px;
    letter-spacing: 2px;
    color: var(--text-muted);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .task-card {
    display: block;
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: 8px;
    padding: 20px;
    text-decoration: none;
    transition: border-color 0.2s, background 0.2s;
  }

  .task-card:hover {
    border-color: var(--accent-border);
    background: var(--bg-card-hover);
  }

  .task-card h3 {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 6px;
  }

  .desc {
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.5;
    margin-bottom: 8px;
  }

  .count {
    font-size: 10px;
    color: var(--accent-dim);
    letter-spacing: 1px;
  }
</style>
```

- [ ] **Step 2: Create TaskTag.svelte**

```svelte
<script lang="ts">
  import { siteConfig } from '@/lib/config';
  import { getContentByTag } from '@/lib/content';
  import PostCard from '@/components/PostCard.svelte';
  import Footer from '@/components/Footer.svelte';

  interface Props {
    tag: string;
  }

  let { tag }: Props = $props();
  let taskConfig = $derived(siteConfig.tasks.find((t) => t.tag === tag));
  let examples = $derived(getContentByTag(tag));
</script>

<div class="tag-page">
  <header>
    <h1>{taskConfig?.name ?? tag}</h1>
    {#if taskConfig?.description}
      <p class="subtitle">{taskConfig.description}</p>
    {/if}
  </header>

  <div class="posts">
    {#each examples as post}
      <PostCard
        title={post.title}
        href={post.href}
        tags={post.tags}
        languages={post.languages}
      />
    {:else}
      <p class="empty">No examples yet for this task.</p>
    {/each}
  </div>

  <Footer />
</div>

<style>
  .tag-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 48px 32px;
  }

  header { margin-bottom: 32px; }

  h1 {
    font-weight: 200;
    letter-spacing: 6px;
    font-size: 32px;
    margin-bottom: 8px;
  }

  .subtitle {
    font-size: 12px;
    letter-spacing: 2px;
    color: var(--text-muted);
  }

  .posts {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .empty {
    color: var(--text-muted);
    font-size: 14px;
  }
</style>
```

- [ ] **Step 3: Create TaskExample.svelte**

```svelte
<script lang="ts">
  import { getContentBySlug } from '@/lib/content';
  import TagPill from '@/components/TagPill.svelte';
  import Footer from '@/components/Footer.svelte';

  interface Props {
    tag: string;
    slug: string;
  }

  let { tag, slug }: Props = $props();
  let post = $derived(getContentBySlug(slug));
</script>

{#if post}
  <article class="example">
    <header>
      <div class="tags">
        {#each post.tags as t}
          <TagPill tag={t} href="/tasks/{t}" />
        {/each}
      </div>
      <h1>{post.title}</h1>
      <div class="meta">
        {#if post.author}<span>{post.author}</span>{/if}
        <span>{post.date}</span>
        {#if post.languages?.length}
          <span class="langs">{post.languages.join(' · ')}</span>
        {/if}
      </div>
    </header>
    <div class="content">
      <svelte:component this={post.component} />
    </div>
  </article>
{:else}
  <div class="not-found">
    <h2>Example not found</h2>
    <p>{slug}</p>
  </div>
{/if}

<Footer />

<style>
  .example {
    max-width: 720px;
    margin: 0 auto;
    padding: 48px 32px;
  }

  header { margin-bottom: 32px; }

  .tags {
    display: flex;
    gap: 6px;
    margin-bottom: 12px;
  }

  h1 {
    font-weight: 300;
    letter-spacing: 2px;
    font-size: 28px;
    margin-bottom: 8px;
  }

  .meta {
    font-size: 12px;
    color: var(--text-muted);
    display: flex;
    gap: 12px;
  }

  .langs {
    color: var(--accent-dim);
  }

  .content {
    font-size: 15px;
    line-height: 1.8;
    color: var(--text-secondary);
  }

  .content :global(h2) {
    font-weight: 400;
    letter-spacing: 1px;
    font-size: 20px;
    margin-top: 32px;
    margin-bottom: 12px;
    color: var(--text-primary);
  }

  .content :global(p) { margin-bottom: 16px; }

  .content :global(pre) {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border-light);
    border-radius: 6px;
    padding: 16px;
    overflow-x: auto;
    margin-bottom: 16px;
    font-size: 13px;
    line-height: 1.6;
  }

  .content :global(code) {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
  }

  .content :global(a) { color: var(--accent-dim); }

  .content :global(hr) {
    border: none;
    border-top: 1px solid var(--border-subtle);
    margin: 32px 0;
  }

  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh;
    color: var(--text-muted);
  }
</style>
```

- [ ] **Step 4: Update App.svelte with all routes**

```svelte
<script lang="ts">
  import { currentRoute } from './lib/router';
  import Nav from './components/Nav.svelte';
  import Home from './pages/Home.svelte';
  import Blog from './pages/Blog.svelte';
  import BlogPost from './pages/BlogPost.svelte';
  import Tasks from './pages/Tasks.svelte';
  import TaskTag from './pages/TaskTag.svelte';
  import TaskExample from './pages/TaskExample.svelte';

  let route = $derived($currentRoute);
</script>

<Nav />

<div class="page">
  {#if route.path === '/'}
    <Home />
  {:else if route.path === '/blog'}
    <Blog />
  {:else if route.path === '/blog/:slug'}
    <BlogPost slug={route.params.slug} />
  {:else if route.path === '/tasks'}
    <Tasks />
  {:else if route.path === '/tasks/:tag'}
    <TaskTag tag={route.params.tag} />
  {:else if route.path === '/tasks/:tag/:slug'}
    <TaskExample tag={route.params.tag} slug={route.params.slug} />
  {:else}
    <div class="placeholder">
      <h2>404</h2>
      <p>Page not found</p>
    </div>
  {/if}
</div>

<style>
  .page {
    padding-top: var(--nav-height);
  }

  .placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - var(--nav-height));
    color: var(--text-muted);
  }

  .placeholder h2 {
    font-weight: 300;
    letter-spacing: 4px;
    font-size: 48px;
    margin-bottom: 8px;
  }

  .placeholder p {
    font-size: 12px;
    letter-spacing: 2px;
  }
</style>
```

- [ ] **Step 5: Verify all routes work**

Run: `pnpm dev`
Test navigation:
- `/` → Homepage with globe
- `/blog` → Blog listing with 2 example cards
- `/tasks` → Tasks grid with 7 task cards, showing example counts
- `/tasks/classification` → Classification examples filtered
- `/tasks/classification/osm-land-classification` → Full rendered example with code
- `/tasks/segmentation/solar-panel-detection` → Solar panel example
- Click nav links and browser back/forward

Expected: All routes render correctly. Content pages show syntax-highlighted code. Tag pills link to filtered views.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Tasks.svelte src/pages/TaskTag.svelte src/pages/TaskExample.svelte src/App.svelte
git commit -m "feat: add Tasks overview, tag, and example pages — all routes complete"
```

---

### Task 15: SPA fallback and final polish

**Files:**
- Create: `public/_redirects`
- Modify: `src/App.svelte` (if needed)

- [ ] **Step 1: Create _redirects for Netlify SPA fallback**

```
/*    /index.html   200
```

- [ ] **Step 2: Add .superpowers to .gitignore**

Append to `.gitignore`:
```
.superpowers
```

- [ ] **Step 3: Verify full build succeeds**

Run: `cd /Users/avsm/src/git/ucam-eo/geotessera.org && pnpm build`
Expected: Build completes without errors. Output in `dist/` directory.

Run: `pnpm preview`
Expected: Preview server starts. All pages accessible. SPA routing works for direct URL navigation.

- [ ] **Step 4: Final commit**

```bash
git add public/_redirects .gitignore
git commit -m "feat: add SPA fallback and finalize project"
```

---

## Post-Implementation Notes

**Known issues to address after initial build:**

1. **Globe preview URL:** The `globalPreviewUrl` in config.ts may need adjustment based on actual STAC catalog structure. If tiles don't load, check the browser console for 404s and update the URL.

2. **mdsvex shiki integration:** The shiki highlighter configuration in `vite.config.ts` may need adjustment depending on exact mdsvex 0.12.x API. If syntax highlighting fails, fall back to `highlight.js` or check mdsvex docs for the current highlighter API.

3. **zarrita overrides:** The pnpm overrides for the custom zarrita fork need to match what the tze workspace uses. If dependency resolution fails, compare with `/Users/avsm/src/git/ucam-eo/tze/package.json` and align.

4. **Content styling:** The mdsvex-rendered content may need additional `:global()` styles in BlogPost.svelte and TaskExample.svelte depending on what HTML elements mdsvex outputs.

5. **CodeTabs integration:** The `CodeTabs.svelte` component is built but not yet used in content files. To use it, import it in `.svx` files: `<script> import CodeTabs from '@/components/CodeTabs.svelte'; </script>` and wrap language-specific sections. This can be done when content is fleshed out beyond stubs.

6. **`svelte:component` deprecation:** Svelte 5 prefers `<Component />` with a variable over `<svelte:component this={...} />`. If deprecation warnings appear, refactor BlogPost.svelte and TaskExample.svelte to use the new pattern.
