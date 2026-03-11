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
