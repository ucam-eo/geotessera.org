<script lang="ts">
  import { currentRoute } from './lib/router';
  import Nav from './components/Nav.svelte';
  import TileBackground from './components/TileBackground.svelte';
  import Home from './pages/Home.svelte';
  import Blog from './pages/Blog.svelte';
  import BlogPost from './pages/BlogPost.svelte';
  import Tasks from './pages/Tasks.svelte';
  import TaskTag from './pages/TaskTag.svelte';
  import TaskExample from './pages/TaskExample.svelte';
  import About from './pages/About.svelte';
  import Papers from './pages/Papers.svelte';
  import Videos from './pages/Videos.svelte';
  import Coverage from './pages/Coverage.svelte';
  import CropUmapPage from './pages/CropUmapPage.svelte';

  let route = $derived($currentRoute);
  let isHome = $derived(route.path === '/');
</script>

{#if !isHome}
  <TileBackground />
{/if}
<Nav />

<div class="page">
  {#if route.path === '/'}
    <Home />
  {:else}
    <div class="content-backdrop">
      {#if route.path === '/coverage'}
        <Coverage />
      {:else if route.path === '/about'}
        <About />
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
      {:else if route.path === '/papers'}
        <Papers />
      {:else if route.path === '/videos'}
        <Videos />
      {:else if route.path === '/crop-umap'}
        <CropUmapPage />
      {:else}
        <div class="placeholder">
          <h2>404</h2>
          <p>Page not found</p>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .page {
    padding-top: var(--nav-height);
  }

  .content-backdrop {
    max-width: 900px;
    margin: 0 auto;
    background: rgba(10, 10, 26, 0.9);
    min-height: calc(100vh - var(--nav-height));
  }

  @media (max-width: 959px) {
    .content-backdrop {
      max-width: 100%;
      background: var(--bg-primary);
    }
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
