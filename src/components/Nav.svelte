<script lang="ts">
  import { siteConfig } from '@/lib/config';
  import { currentPath, link } from '@/lib/router';
  import { scrollSections, activeScrollSection, homePastStory, scrollToSection } from '@/lib/scroll-state';

  let path = $derived($currentPath);
  let sections = $derived($scrollSections);
  let active = $derived($activeScrollSection);
  let onHome = $derived(path === '/');
  let scrolledToAbout = $derived($homePastStory);

  let docsOpen = $state(false);
  let exploreOpen = $state(false);
  let mobileOpen = $state(false);

  function closeDropdown() {
    docsOpen = false;
    exploreOpen = false;
  }

  function closeAll() {
    closeDropdown();
    mobileOpen = false;
  }
</script>

<svelte:window onclick={closeDropdown} />

<header>
  <nav class="topbar">
    <a href="/" use:link class="wordmark">TESSERA</a>
    <button class="hamburger" class:open={mobileOpen} onclick={(e) => { e.stopPropagation(); mobileOpen = !mobileOpen; }} aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <div class="nav-links" class:mobile-open={mobileOpen}>
      <a href="/about" use:link class:active={path.startsWith('/about') || scrolledToAbout} onclick={closeAll}>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="7" r="3.5"/><path d="M3.5 17.5a6.5 6.5 0 0 1 13 0"/></svg>
        About
      </a>
      <a href="/blog" use:link class:active={path.startsWith('/blog')} onclick={closeAll}>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h14M3 8h10M3 12h12M3 16h8"/></svg>
        Blog
      </a>
      <a href="/tasks" use:link class:active={path.startsWith('/tasks')} onclick={closeAll}>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="11" y="3" width="6" height="6" rx="1"/><rect x="3" y="11" width="6" height="6" rx="1"/><rect x="11" y="11" width="6" height="6" rx="1"/></svg>
        Tasks
      </a>
      <a href="/papers" use:link class:active={path.startsWith('/papers')} onclick={closeAll}>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 2h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/><path d="M7 6h6M7 9h6M7 12h4"/><circle cx="13" cy="14" r="1.5"/></svg>
        Papers
      </a>
      <a href="/videos" use:link class:active={path.startsWith('/videos')} onclick={closeAll}>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="12" height="12" rx="1.5"/><path d="M14 8l4-2v8l-4-2"/></svg>
        Videos
      </a>
      <div class="dropdown docs-dropdown">
        <button
          class="docs-btn"
          onclick={(e) => { e.stopPropagation(); docsOpen = !docsOpen; }}
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2h8l4 4v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/><path d="M12 2v4h4M7 10h6M7 14h4"/></svg>
          Docs
        </button>
        {#if docsOpen}
          <div class="dropdown-menu docs-menu" role="menu" tabindex="-1" onkeydown={(e) => { if (e.key === 'Escape') closeDropdown(); }} onclick={(e) => e.stopPropagation()}>
            <a href={siteConfig.docs} target="_blank" rel="noopener" onclick={closeAll}>
              <svg class="docs-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4a1 1 0 0 1 1-1h4l2 2h6a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/></svg>
              <div>
                <span class="docs-option-label">Geotessera Docs <svg class="external-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></span>
                <span class="docs-option-desc">API reference &amp; data documentation</span>
              </div>
            </a>
            <a href="https://tee.cl.cam.ac.uk/user_guide.html" target="_blank" rel="noopener" onclick={closeAll}>
              <svg class="docs-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="16" height="11" rx="1.5"/><path d="M6 17h8M10 14v3"/></svg>
              <div>
                <span class="docs-option-label">TEE User Guide <svg class="external-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></span>
                <span class="docs-option-desc">Guide for the Embeddings Explorer</span>
              </div>
            </a>
          </div>
        {/if}
      </div>
      <div class="dropdown explore-dropdown">
        <button
          class="explore-btn"
          onclick={(e) => { e.stopPropagation(); exploreOpen = !exploreOpen; }}
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><path d="M10 2a14 14 0 0 1 0 16M10 2a14 14 0 0 0 0 16M2.5 7.5h15M2.5 12.5h15"/></svg>
          Explore
        </button>
        {#if exploreOpen}
          <div class="dropdown-menu explore-menu" role="menu" tabindex="-1" onkeydown={(e) => { if (e.key === 'Escape') closeDropdown(); }} onclick={(e) => e.stopPropagation()}>
            <a href="https://tee.cl.cam.ac.uk" target="_blank" rel="noopener" onclick={closeAll}>
              <svg class="explore-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="16" height="11" rx="1.5"/><path d="M6 17h8M10 14v3"/></svg>
              <div>
                <span class="explore-option-label">Hosted</span>
                <span class="explore-option-desc">Full viewer at tee.cl.cam.ac.uk</span>
              </div>
            </a>
            <a href="https://tze.geotessera.org" target="_blank" rel="noopener" onclick={closeAll}>
              <svg class="explore-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><path d="M10 2a14 14 0 0 1 0 16M10 2a14 14 0 0 0 0 16M2.5 10h15"/></svg>
              <div>
                <span class="explore-option-label">Browser</span>
                <span class="explore-option-desc">Lightweight in-browser explorer</span>
              </div>
            </a>
          </div>
        {/if}
      </div>
      <div class="nav-social">
        <a href={siteConfig.social.github} target="_blank" rel="noopener" aria-label="GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
        </a>
        <a href={siteConfig.social.bluesky} target="_blank" rel="noopener" aria-label="Bluesky">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.785 2.627 3.588 3.476 6.182 3.21-4.037.6-7.588 2.048-3.413 7.24C7.478 25.67 9.93 21.34 12 18.67c2.07 2.67 4.523 7 8.607 2.027 4.175-5.192.625-6.64-3.413-7.24 2.594.266 5.397-.583 6.182-3.21.246-.828.624-5.788.624-6.479 0-.688-.139-1.86-.902-2.203-.659-.3-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z"/></svg>
        </a>
        <a href={siteConfig.social.twitter} target="_blank" rel="noopener" aria-label="X / Twitter">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href={siteConfig.social.zulip} target="_blank" rel="noopener" aria-label="Zulip">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 2C3.12 2 2 3.12 2 4.5v2.03c0 .9.47 1.73 1.24 2.2L12 14l8.76-5.27A2.62 2.62 0 0 0 22 6.53V4.5C22 3.12 20.88 2 19.5 2h-15zm0 20C3.12 22 2 20.88 2 19.5v-2.03c0-.9.47-1.73 1.24-2.2L12 10l8.76 5.27c.77.47 1.24 1.3 1.24 2.2v2.03c0 1.38-1.12 2.5-2.5 2.5h-15z"/></svg>
        </a>
      </div>
    </div>
  </nav>
</header>

{#if onHome && sections.length > 0 && !scrolledToAbout}
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

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }

  .topbar {
    position: relative;
    z-index: 2;
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
    gap: 18px;
  }

  .nav-links a, .nav-links button {
    display: flex;
    align-items: center;
    gap: 5px;
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

  .nav-links svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .nav-links a:hover svg, .nav-links button:hover svg {
    opacity: 1;
  }

  .nav-links a:hover, .nav-links button:hover {
    color: #fff;
  }

  .nav-links a.active {
    color: var(--accent);
    border-bottom: 2px solid var(--accent);
    padding-bottom: 2px;
  }

  .nav-links a.active svg {
    opacity: 1;
    color: var(--accent);
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
    z-index: 10;
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

  .docs-btn {
    background: rgba(255, 255, 255, 0.06) !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    border-radius: 5px !important;
    padding: 5px 14px !important;
    color: var(--text-secondary) !important;
    font-weight: 500 !important;
    letter-spacing: 1.5px !important;
    transition: background 0.2s, border-color 0.2s, color 0.2s !important;
  }

  .docs-btn:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    border-color: rgba(255, 255, 255, 0.3) !important;
    color: #fff !important;
  }

  .docs-menu {
    min-width: 240px !important;
    right: -8px !important;
  }

  .docs-menu a {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 10px !important;
    padding: 10px 16px !important;
  }

  .docs-icon {
    width: 20px !important;
    height: 20px !important;
    flex-shrink: 0;
    color: var(--text-secondary);
    opacity: 0.8 !important;
  }

  .docs-option-label {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 500;
    color: var(--text-primary);
    letter-spacing: 1px;
  }

  .docs-option-desc {
    display: block;
    font-size: 10px;
    color: var(--text-faint);
    letter-spacing: 0.5px;
    margin-top: 1px;
  }

  .docs-menu a:hover .docs-option-label {
    color: var(--accent-dim);
  }

  .docs-menu a:hover .docs-icon {
    color: var(--accent-dim);
  }

  .docs-menu a:hover .docs-option-desc {
    color: var(--text-muted);
  }

  .external-icon {
    width: 10px !important;
    height: 10px !important;
    opacity: 0.5;
    vertical-align: middle;
  }

  .explore-btn {
    background: rgba(0, 229, 255, 0.12) !important;
    border: 1px solid rgba(0, 229, 255, 0.3) !important;
    border-radius: 5px !important;
    padding: 5px 14px !important;
    color: var(--accent-dim) !important;
    font-weight: 500 !important;
    letter-spacing: 1.5px !important;
    transition: background 0.2s, border-color 0.2s, color 0.2s !important;
  }

  .explore-btn:hover {
    background: rgba(0, 229, 255, 0.2) !important;
    border-color: rgba(0, 229, 255, 0.5) !important;
    color: #fff !important;
  }

  .explore-menu {
    min-width: 240px !important;
    right: 0 !important;
  }

  .explore-menu a {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 10px !important;
    padding: 10px 16px !important;
  }

  .explore-icon {
    width: 20px !important;
    height: 20px !important;
    flex-shrink: 0;
    color: var(--accent-dim);
    opacity: 0.8 !important;
  }

  .explore-option-label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: var(--text-primary);
    letter-spacing: 1px;
  }

  .explore-option-desc {
    display: block;
    font-size: 10px;
    color: var(--text-faint);
    letter-spacing: 0.5px;
    margin-top: 1px;
  }

  .explore-menu a:hover .explore-option-label {
    color: var(--accent-dim);
  }

  .explore-menu a:hover .explore-option-desc {
    color: var(--text-muted);
  }

  /* Social icons in nav */
  .nav-social {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 8px;
    padding-left: 14px;
    border-left: 1px solid rgba(255, 255, 255, 0.08);
  }

  .nav-social a {
    display: flex;
    color: var(--text-muted);
    opacity: 0.55;
    transition: opacity 0.2s, color 0.2s;
    padding: 0 !important;
  }

  .nav-social a:hover {
    opacity: 1;
    color: var(--accent-dim);
  }

  .nav-social svg {
    width: 14px;
    height: 14px;
  }

  /* Scroll indicator bar — fixed at bottom */
  .scroll-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding: 0 32px;
    height: 34px;
    background: rgba(10, 10, 26, 0.75);
    backdrop-filter: blur(8px);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
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

  /* Hamburger button — hidden on desktop */
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    z-index: 11;
  }

  .hamburger span {
    display: block;
    width: 20px;
    height: 1.5px;
    background: var(--text-secondary);
    border-radius: 1px;
    transition: transform 0.25s, opacity 0.25s;
  }

  .hamburger.open span:nth-child(1) {
    transform: translateY(6.5px) rotate(45deg);
  }

  .hamburger.open span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.open span:nth-child(3) {
    transform: translateY(-6.5px) rotate(-45deg);
  }

  @media (max-width: 768px) {
    .topbar {
      padding: 0 16px;
    }

    .hamburger {
      display: flex;
    }

    .nav-links {
      display: none;
      position: absolute;
      top: var(--nav-height);
      left: 0;
      right: 0;
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      background: rgba(10, 10, 26, 0.97);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-subtle);
      padding: 8px 0;
      z-index: 10;
    }

    .nav-links.mobile-open {
      display: flex;
    }

    .nav-links a, .nav-links button {
      padding: 12px 20px !important;
      font-size: 14px;
      letter-spacing: 1px;
    }

    .nav-links svg {
      width: 16px;
      height: 16px;
    }

    .dropdown {
      flex-direction: column;
      align-items: stretch;
    }

    .dropdown-menu {
      position: static !important;
      border: none !important;
      border-radius: 0 !important;
      background: rgba(255, 255, 255, 0.03) !important;
      backdrop-filter: none !important;
      min-width: 0 !important;
      padding: 0 !important;
    }

    .dropdown-menu a {
      padding: 10px 20px 10px 44px !important;
    }

    .docs-btn, .explore-btn {
      border-radius: 0 !important;
      border-left: none !important;
      border-right: none !important;
      border-top: none !important;
      border-bottom: none !important;
      background: none !important;
      padding: 12px 20px !important;
      justify-content: flex-start;
    }

    .nav-social {
      margin-left: 0;
      padding-left: 0;
      border-left: none;
      padding: 8px 20px;
      gap: 16px;
    }

    .nav-social svg {
      width: 16px;
      height: 16px;
    }

    .scroll-bar {
      padding: 0 16px;
      overflow-x: auto;
      justify-content: flex-start;
    }

    .scroll-label {
      font-size: 10px;
      padding: 4px 8px;
    }
  }
</style>
