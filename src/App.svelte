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
