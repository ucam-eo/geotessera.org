<script lang="ts">
  import { currentRoute } from './lib/router';

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
