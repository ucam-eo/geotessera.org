<script lang="ts">
  import { siteConfig } from '@/lib/config';
  import { getContentByTag } from '@/lib/content';
  import PostCard from '@/components/PostCard.svelte';
  import Footer from '@/components/Footer.svelte';

  interface Props {
    tag: string;
  }

  let { tag }: Props = $props();
  let taskConfig = $derived(siteConfig.tasks.find((t) => t.tag === tag));
  let examples = $derived(getContentByTag(tag));
</script>

<div class="tag-page">
  <header>
    <h1>{taskConfig?.name ?? tag}</h1>
    {#if taskConfig?.description}
      <p class="subtitle">{taskConfig.description}</p>
    {/if}
  </header>

  <div class="posts">
    {#each examples as post}
      <PostCard
        title={post.title}
        href={post.href}
        tags={post.tags}
        languages={post.languages}
      />
    {:else}
      <p class="empty">No examples yet for this task.</p>
    {/each}
  </div>

  <Footer />
</div>

<style>
  .tag-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 48px 32px;
  }

  header { margin-bottom: 32px; }

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
