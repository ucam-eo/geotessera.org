<script lang="ts">
  import { getContentBySlug } from '@/lib/content';
  import TagPill from '@/components/TagPill.svelte';
  import Footer from '@/components/Footer.svelte';

  interface Props {
    slug: string;
  }

  let { slug }: Props = $props();
  let post = $derived(getContentBySlug(slug));
  let Component = $derived(post?.component);
  let jsonLd = $derived(post ? JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.date,
    author: post.author ? { '@type': 'Person', name: post.author } : { '@type': 'Organization', name: 'TESSERA Team' },
    publisher: { '@type': 'Organization', name: 'TESSERA', url: 'https://geotessera.org' },
    mainEntityOfPage: `https://geotessera.org/blog/${slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://geotessera.org' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://geotessera.org/blog' },
        { '@type': 'ListItem', position: 3, name: post.title },
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
  <article class="post">
    <header>
      <div class="tags">
        {#each post.tags as tag}
          <TagPill {tag} href="/tasks/{tag}" />
        {/each}
      </div>
      <h1>{post.title}</h1>
      <div class="meta">
        {#if post.author}<span>{post.author}</span>{/if}
        <span>{post.date}</span>
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
    <h2>Post not found</h2>
    <p>{slug}</p>
  </div>
{/if}

<Footer />

<style>
  .post {
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
</style>
