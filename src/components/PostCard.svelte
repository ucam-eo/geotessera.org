<script lang="ts">
  import { link } from '@/lib/router';
  import TagPill from './TagPill.svelte';

  interface Props {
    title: string;
    href: string;
    tags: string[];
    languages?: string[];
  }

  let { title, href, tags, languages }: Props = $props();
</script>

<a {href} use:link class="card">
  <div class="tags">
    {#each tags as tag}
      <TagPill {tag} />
    {/each}
  </div>
  <div class="title">{title}</div>
  {#if languages?.length}
    <div class="languages">{languages.join(' · ')}</div>
  {/if}
</a>

<style>
  .card {
    display: block;
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: 6px;
    padding: 16px;
    text-decoration: none;
    transition: border-color 0.2s, background 0.2s;
  }

  .card:hover {
    border-color: var(--border-light);
    background: var(--bg-card-hover);
  }

  .tags {
    display: flex;
    gap: 6px;
    margin-bottom: 8px;
  }

  .title {
    font-size: 13px;
    color: var(--text-secondary);
    margin-bottom: 4px;
  }

  .languages {
    font-size: 11px;
    color: var(--text-muted);
  }
</style>
