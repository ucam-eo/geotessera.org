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
