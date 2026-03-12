<script lang="ts">
  import { getBlogPosts, type ContentMeta } from '@/lib/content';
  import { link } from '@/lib/router';
  import Footer from '@/components/Footer.svelte';

  const allPosts = getBlogPosts();
  const allTags = [...new Set(allPosts.flatMap((p) => p.tags))].sort();

  let activeTag = $state<string | null>(null);

  let filtered = $derived(
    activeTag ? allPosts.filter((p) => p.tags.includes(activeTag!)) : allPosts
  );

  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  function monthYear(date: string): string {
    return new Date(date).toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric',
    });
  }

  /** Group posts by month for timeline headers */
  function groupByMonth(posts: ContentMeta[]): { month: string; posts: ContentMeta[] }[] {
    const groups: { month: string; posts: ContentMeta[] }[] = [];
    let current = '';
    for (const post of posts) {
      const m = monthYear(post.date);
      if (m !== current) {
        current = m;
        groups.push({ month: m, posts: [] });
      }
      groups[groups.length - 1].posts.push(post);
    }
    return groups;
  }

  let grouped = $derived(groupByMonth(filtered));

  /** Icon per tag — first matching tag wins */
  const tagIcons: Record<string, string> = {
    announcement: 'M10 2L3 7v6l7 5 7-5V7z', // megaphone-ish
    engineering: 'M14.7 6.3a1 1 0 0 0 0-1.4l-1.6-1.6a1 1 0 0 0-1.4 0l-2 2 3 3zM3 13.5V17h3.5L13.4 10l-3-3z', // wrench
    web: 'M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 2a6 6 0 0 1 4.9 9.4L5.6 4.1A6 6 0 0 1 10 4z', // globe
    community: 'M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-8 6s-1-3 4-3h8c5 0 4 3 4 3', // people
    hackathon: 'M13 2L3 14h4l-1 6 10-12h-4z', // lightning
    research: 'M8 2v3M4.9 4.9l2.1 2.1M2 8h3M4.9 11.1l2.1-2.1M8 14v-3M11.1 11.1l-2.1-2.1M14 8h-3M11.1 4.9L9 7', // science
    conservation: 'M12 3c-4.4 0-8 3-8 6.5S7.6 16 12 16s8-3 8-6.5S16.4 3 12 3z', // leaf-ish
    ocaml: 'M4 4l6 8 6-8M4 8l6 8 6-8', // lambda
    classification: 'M3 3h6v6H3zM11 3h6v6h-6zM3 11h6v6H3zM11 11h6v6h-6z', // grid
    release: 'M10 2v4l3 2-3 2v4a6 6 0 1 1 0-12z', // tag/release
    python: 'M9 2c-3 0-5 1.5-5 3.5V8h6v1H4c-2 0-3 1.5-3 3.5S2 16 4 16h2v-2.5c0-2 1.5-3.5 3.5-3.5h5c1.5 0 2.5-1 2.5-2.5V5.5C17 3.5 15 2 12 2zm-1 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z', // python snake
    video: 'M4 4h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM8 7v6l5-3z', // play button
  };

  function domain(url: string): string {
    try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; }
  }

  function getIcon(tags: string[]): string {
    for (const t of tags) {
      if (tagIcons[t]) return tagIcons[t];
    }
    // default: document icon
    return 'M6 2h8l4 4v12H6V2zM14 2v4h4M10 10h4M10 14h2';
  }
</script>

<div class="blog-page">
  <header>
    <span class="page-label">Blog</span>
    <p class="subtitle">Updates, tutorials, and research from the TESSERA community</p>
    <div class="feed-links">
      <a href="/blog/feed.xml" class="feed-link" target="_blank" rel="noopener">
        <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14"><circle cx="3.5" cy="12.5" r="2"/><path d="M1.5 6.5a7 7 0 0 1 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M1.5 1.5a12 12 0 0 1 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        All posts
      </a>
      <a href="/blog/feed-original.xml" class="feed-link" target="_blank" rel="noopener">
        <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14"><circle cx="3.5" cy="12.5" r="2"/><path d="M1.5 6.5a7 7 0 0 1 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M1.5 1.5a12 12 0 0 1 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        Original only
      </a>
    </div>
  </header>

  <div class="filters">
    <button class:active={!activeTag} onclick={() => (activeTag = null)}>All</button>
    {#each allTags as tag}
      <button class:active={activeTag === tag} onclick={() => (activeTag = tag)}>{tag}</button>
    {/each}
  </div>

  <div class="timeline">
    {#each grouped as group}
      <div class="month-header">{group.month}</div>
      {#each group.posts as post}
        <div class="timeline-entry" class:is-link={!!post.externalUrl} class:is-minor={!!post.minor} id={post.slug}>
          <div class="timeline-rail">
            <a class="timeline-icon" href={`#${post.slug}`} aria-label={post.title}>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={getIcon(post.tags)}/></svg>
            </a>
            <div class="timeline-line"></div>
          </div>
          <div class="timeline-content">
            {#if post.minor && post.externalUrl}
              <a href={post.externalUrl} target="_blank" rel="noopener" class="minor-link"><span class="minor-title">{post.title}</span><span class="minor-domain">{domain(post.externalUrl)}</span><svg class="external-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
            {:else if post.externalUrl}
              <div class="link-row">
                <a href={post.externalUrl} target="_blank" rel="noopener" class="link-title">{post.title}<span class="nowrap">&thinsp;<svg class="external-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></span></a>
                <span class="link-meta">
                  {#if post.author}<span class="link-author">{post.author}</span>{/if}
                  <span class="link-date">{formatDate(post.date)}</span>
                </span>
              </div>
              {#if post.description}
                <p class="link-desc">{post.description}</p>
              {/if}
            {:else}
              <div class="post-date">{formatDate(post.date)}</div>
              <h3><a href={post.href} use:link>{post.title}</a></h3>
              <div class="post-meta">
                {#if post.author}
                  <svg class="meta-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="5" r="3"/><path d="M2.5 14a5.5 5.5 0 0 1 11 0"/></svg>
                  <span class="post-author">{post.author}</span>
                {/if}
                <div class="post-tags">
                  {#each post.tags as tag}
                    <span class="tag-pill">{tag}</span>
                  {/each}
                </div>
              </div>
              {#if post.description}
                <p class="post-desc">{post.description}</p>
              {/if}
            {/if}
          </div>
        </div>
      {/each}
    {:else}
      <p class="empty">No posts match this filter.</p>
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

  header { margin-bottom: 28px; }

  .page-label {
    font-weight: 300;
    letter-spacing: 4px;
    font-size: 18px;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .subtitle {
    font-size: 14px;
    letter-spacing: 0.5px;
    color: var(--text-muted);
    margin-top: 6px;
  }

  .feed-links {
    display: flex;
    gap: 16px;
    margin-top: 12px;
  }

  .feed-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    letter-spacing: 1px;
    color: var(--accent-dim);
    text-decoration: none;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .feed-link:hover {
    opacity: 1;
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 36px;
  }

  .filters button {
    font-size: 11px;
    padding: 5px 14px;
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

  /* Timeline layout */
  .timeline {
    display: flex;
    flex-direction: column;
  }

  .month-header {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent-dim);
    padding: 20px 0 12px 52px;
    opacity: 0.8;
  }

  .month-header:first-child {
    padding-top: 0;
  }

  .timeline-entry {
    display: flex;
    gap: 0;
    scroll-margin-top: calc(var(--nav-height) + 16px);
  }

  .timeline-rail {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40px;
    flex-shrink: 0;
    padding-top: 3px;
  }

  .timeline-icon {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(0, 229, 255, 0.08);
    border: 1px solid rgba(0, 229, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s;
  }

  .timeline-entry:hover .timeline-icon,
  .timeline-icon:hover {
    background: rgba(0, 229, 255, 0.15);
    border-color: rgba(0, 229, 255, 0.4);
  }

  .timeline-icon svg {
    width: 14px;
    height: 14px;
    color: var(--accent-dim);
    opacity: 0.8;
  }

  .timeline-line {
    width: 1px;
    flex: 1;
    background: rgba(0, 229, 255, 0.1);
    min-height: 12px;
  }

  .timeline-content {
    flex: 1;
    padding: 0 0 28px 12px;
    min-width: 0;
  }

  .post-date {
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }

  .timeline-content h3 {
    font-size: 19px;
    font-weight: 500;
    line-height: 1.4;
    margin-bottom: 6px;
  }

  .timeline-content h3 a {
    color: var(--text-primary);
    text-decoration: none;
    transition: color 0.2s;
  }

  .timeline-entry:hover h3 a {
    color: var(--accent-dim);
  }

  .nowrap {
    white-space: nowrap;
  }

  .external-icon {
    display: inline;
    width: 12px;
    height: 12px;
    vertical-align: middle;
    margin-left: 5px;
    opacity: 0.4;
  }

  .post-meta {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 8px;
    flex-wrap: wrap;
  }

  .meta-icon {
    width: 13px;
    height: 13px;
    color: var(--text-muted);
    opacity: 0.7;
    flex-shrink: 0;
  }

  .post-author {
    font-size: 13px;
    color: var(--text-secondary);
    letter-spacing: 0.3px;
  }

  .post-tags {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .tag-pill {
    font-size: 10px;
    letter-spacing: 1px;
    color: var(--text-muted);
  }

  .tag-pill::before {
    content: '#';
    opacity: 0.5;
  }

  .post-desc {
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-secondary);
    margin: 0;
  }

  /* Link log entries — compact style */
  .is-link .timeline-icon {
    width: 22px;
    height: 22px;
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .is-link .timeline-icon svg {
    width: 11px;
    height: 11px;
    color: var(--text-muted);
  }

  .is-link:hover .timeline-icon {
    background: rgba(0, 229, 255, 0.1);
    border-color: rgba(0, 229, 255, 0.3);
  }

  .is-link .timeline-content {
    padding-bottom: 18px;
  }

  .link-row {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 8px;
  }

  .link-title {
    font-size: 15px;
    font-weight: 400;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.2s;
    line-height: 1.4;
  }

  .is-link:hover .link-title {
    color: var(--accent-dim);
  }

  .link-meta {
    display: flex;
    gap: 6px;
    align-items: baseline;
    flex-shrink: 0;
  }

  .link-author {
    font-size: 12px;
    color: var(--text-muted);
  }

  .link-author::after {
    content: '\00b7';
    margin-left: 6px;
    opacity: 0.5;
  }

  .link-date {
    font-size: 11px;
    color: var(--text-faint);
    letter-spacing: 0.3px;
  }

  .link-desc {
    font-size: 13px;
    line-height: 1.6;
    color: var(--text-muted);
    margin: 4px 0 0;
  }

  /* Minor posts — compact one-liner */
  .is-minor .timeline-icon {
    width: 18px;
    height: 18px;
    background: rgba(255, 255, 255, 0.03);
    border-color: rgba(255, 255, 255, 0.08);
  }

  .is-minor .timeline-icon svg {
    width: 9px;
    height: 9px;
    color: var(--text-faint);
  }

  .is-minor:hover .timeline-icon {
    background: rgba(0, 229, 255, 0.08);
    border-color: rgba(0, 229, 255, 0.2);
  }

  .is-minor .timeline-content {
    padding-bottom: 10px;
  }

  .minor-link {
    display: inline-flex;
    align-items: baseline;
    gap: 6px;
    font-size: 13px;
    text-decoration: none;
    opacity: 0.7;
    transition: opacity 0.2s;
    line-height: 1.4;
  }

  .minor-link:hover {
    opacity: 1;
  }

  .minor-title {
    color: var(--text-secondary);
  }

  .minor-link:hover .minor-title {
    color: var(--accent-dim);
  }

  .minor-domain {
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 0.3px;
  }

  .minor-link .external-icon {
    opacity: 0.3;
  }

  .empty {
    color: var(--text-muted);
    font-size: 14px;
    padding-left: 52px;
  }
</style>
