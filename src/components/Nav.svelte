<script lang="ts">
  import { siteConfig } from '@/lib/config';
  import { currentPath, link } from '@/lib/router';
  import { scrollSections, activeScrollSection, scrollToSection } from '@/lib/scroll-state';

  let path = $derived($currentPath);
  let sections = $derived($scrollSections);
  let active = $derived($activeScrollSection);
  let onHome = $derived(path === '/');

  let tasksOpen = $state(false);

  function closeDropdown() {
    tasksOpen = false;
  }
</script>

<svelte:window onclick={closeDropdown} />

<header>
  <nav class="topbar">
    <a href="/" use:link class="wordmark">TESSERA</a>
    <div class="nav-links">
      <a href="/about" use:link class:active={path.startsWith('/about')}>About</a>
      <a href="/blog" use:link class:active={path.startsWith('/blog')}>Blog</a>
      <div class="dropdown">
        <button
          class:active={path.startsWith('/tasks')}
          onclick={(e) => { e.stopPropagation(); tasksOpen = !tasksOpen; }}
        >
          Tasks
        </button>
        {#if tasksOpen}
          <div class="dropdown-menu" onclick={(e) => e.stopPropagation()}>
            {#each siteConfig.tasks as task}
              <a href="/tasks/{task.tag}" use:link onclick={closeDropdown}>{task.name}</a>
            {/each}
          </div>
        {/if}
      </div>
      <a href={siteConfig.docs} target="_blank" rel="noopener">Docs</a>
      <a href="https://arxiv.org/abs/2506.20380" target="_blank" rel="noopener">Papers</a>
      <a href="/videos" use:link>Videos</a>
    </div>
  </nav>
  {#if onHome && sections.length > 0}
    <div class="scroll-bar">
      {#each sections as section, i}
        {#if i > 0}
          <span class="scroll-arrow" class:passed={i <= active}>&rarr;</span>
        {/if}
        <button class="scroll-label" class:active={i === active} class:passed={i < active} onclick={() => scrollToSection(section.start)}>
          {section.label}
        </button>
      {/each}
    </div>
  {/if}
</header>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }

  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    height: var(--nav-height);
    border-bottom: 1px solid var(--border-subtle);
    background: rgba(10, 10, 26, 0.9);
    backdrop-filter: blur(12px);
  }

  .wordmark {
    font-weight: 600;
    letter-spacing: 6px;
    font-size: 16px;
    color: var(--text-primary);
    text-decoration: none;
    flex-shrink: 0;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .nav-links a, .nav-links button {
    font-size: 13px;
    letter-spacing: 1.5px;
    color: var(--text-secondary);
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--font-sans);
    padding: 4px 0;
    margin: 0;
    line-height: 1;
    transition: color 0.2s;
    font-weight: 400;
  }

  .nav-links a:hover, .nav-links button:hover,
  .nav-links a.active, .nav-links button.active {
    color: #fff;
  }

  .dropdown {
    position: relative;
    display: flex;
    align-items: center;
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 12px);
    right: -8px;
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
    font-size: 12px;
    letter-spacing: 1px;
    color: var(--text-muted);
  }

  .dropdown-menu a:hover {
    color: var(--accent-dim);
    background: rgba(0, 200, 255, 0.05);
  }

  /* Scroll indicator bar */
  .scroll-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding: 0 32px;
    height: 34px;
    background: rgba(10, 10, 26, 0.75);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .scroll-label {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 500;
    font-family: var(--font-sans);
    color: var(--text-muted);
    padding: 4px 10px;
    border-radius: 4px;
    border: none;
    background: none;
    transition: color 0.3s ease, background 0.3s ease, opacity 0.3s ease;
    white-space: nowrap;
    cursor: pointer;
    opacity: 0.7;
    line-height: 1;
    margin: 0;
  }

  .scroll-label.passed {
    opacity: 0.85;
    color: var(--text-secondary);
  }

  .scroll-label.active {
    color: #fff;
    background: rgba(0, 229, 255, 0.1);
    opacity: 1;
  }

  .scroll-arrow {
    font-size: 10px;
    color: var(--text-faint);
    opacity: 0.4;
    transition: opacity 0.3s ease, color 0.3s ease;
    padding: 0 2px;
    user-select: none;
  }

  .scroll-arrow.passed {
    opacity: 0.6;
    color: var(--accent-dim);
  }
</style>
