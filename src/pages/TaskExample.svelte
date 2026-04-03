<script lang="ts">
  import { getContentBySlug } from '@/lib/content';
  import { resolveAuthors } from '@/lib/data/people';
  import TagPill from '@/components/TagPill.svelte';
  import Footer from '@/components/Footer.svelte';

  interface Props {
    tag: string;
    slug: string;
  }

  let { tag, slug }: Props = $props();
  let post = $derived(getContentBySlug(slug));
  let Component = $derived(post?.component);
  let jsonLd = $derived(post ? JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    datePublished: post.date,
    author: post.author
      ? resolveAuthors(post.author).map((ra) => ({ '@type': 'Person', name: ra.name, ...(ra.person?.url ? { url: ra.person.url } : {}) }))
      : { '@type': 'Organization', name: 'TESSERA Team' },
    publisher: { '@type': 'Organization', name: 'TESSERA', url: 'https://geotessera.org' },
    mainEntityOfPage: `https://geotessera.org/tasks/${tag}/${slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://geotessera.org' },
        { '@type': 'ListItem', position: 2, name: 'Tasks', item: 'https://geotessera.org/tasks' },
        { '@type': 'ListItem', position: 3, name: tag, item: `https://geotessera.org/tasks/${tag}` },
        { '@type': 'ListItem', position: 4, name: post.title },
      ],
    },
  }) : null);
</script>

<svelte:head>
  {#if jsonLd}
    {@html `<script type="application/ld+json">${jsonLd}</script>`}
  {/if}
</svelte:head>

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
        {#if post.author}<span class="post-author">{#each resolveAuthors(post.author) as ra, i}{#if i > 0}, {/if}{#if ra.person?.url}<a href={ra.person.url} target="_blank" rel="noopener" class="author-link">{ra.name}</a>{:else}{ra.name}{/if}{/each}</span>{/if}
        <span>{post.date}</span>
        {#if post.languages?.length}
          <span class="langs">{post.languages.join(' · ')}</span>
        {/if}
      </div>
    </header>
    <div class="content">
      {#if Component}
        <Component />
      {/if}
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

  .author-link {
    color: inherit;
    text-decoration: none;
  }

  .author-link:hover {
    color: var(--accent-dim);
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

  @media (max-width: 768px) {
    .example {
      padding: 32px 16px;
    }

    h1 {
      font-size: 22px;
      letter-spacing: 1px;
    }

    .content :global(pre) {
      padding: 12px;
      font-size: 12px;
    }
  }
</style>
