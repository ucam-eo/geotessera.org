<script lang="ts">
  import { getBlogPosts } from '@/lib/content';
  import PostCard from '@/components/PostCard.svelte';
  import TagPill from '@/components/TagPill.svelte';
  import Footer from '@/components/Footer.svelte';

  const allPosts = getBlogPosts();
  const allTags = [...new Set(allPosts.flatMap((p) => p.tags))].sort();

  let activeTag = $state<string | null>(null);

  let filtered = $derived(
    activeTag ? allPosts.filter((p) => p.tags.includes(activeTag!)) : allPosts
  );
</script>

<div class="blog-page">
  <header>
    <h1>Blog</h1>
    <p class="subtitle">Updates, tutorials, and research from the TESSERA team</p>
  </header>

  <div class="filters">
    <button class:active={!activeTag} onclick={() => (activeTag = null)}>All</button>
    {#each allTags as tag}
      <button class:active={activeTag === tag} onclick={() => (activeTag = tag)}>{tag}</button>
    {/each}
  </div>

  <div class="posts">
    {#each filtered as post}
      <PostCard
        title={post.title}
        href={post.href}
        tags={post.tags}
        languages={post.languages}
      />
    {:else}
      <p class="empty">No posts yet.</p>
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

  header { margin-bottom: 24px; }

  h1 {
    font-weight: 200;
    letter-spacing: 6px;
    font-size: 32px;
    margin-bottom: 8px;
  }

  .subtitle {
    font-size: 12px;
    letter-spacing: 2px;
    color: var(--text-muted);
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
  }

  .filters button {
    font-size: 10px;
    padding: 4px 12px;
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

  .posts {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .empty {
    color: var(--text-muted);
    font-size: 14px;
  }
</style>
