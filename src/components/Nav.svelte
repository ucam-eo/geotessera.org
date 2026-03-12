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
    font-weight: 600;
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
    margin: 0;
    line-height: 1;
    transition: color 0.2s;
  }

  .nav-links a:hover, .nav-links button:hover,
  .nav-links a.active, .nav-links button.active {
    color: var(--accent-dim);
  }

  .dropdown {
    position: relative;
    display: flex;
    align-items: center;
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
