<script lang="ts">
  import { siteConfig } from '@/lib/config';
  import { getContentByTag } from '@/lib/content';
  import { link } from '@/lib/router';
  import Footer from '@/components/Footer.svelte';
</script>

<div class="tasks-page">
  <header>
    <h1>Tasks</h1>
    <p class="subtitle">Downstream applications of TESSERA embeddings</p>
  </header>

  <div class="grid">
    {#each siteConfig.tasks as task}
      {@const examples = getContentByTag(task.tag)}
      <a href="/tasks/{task.tag}" use:link class="task-card">
        <h3>{task.name}</h3>
        <p class="desc">{task.description}</p>
        <span class="count">{examples.length} example{examples.length !== 1 ? 's' : ''}</span>
      </a>
    {/each}
  </div>

  <Footer />
</div>

<style>
  .tasks-page {
    max-width: 900px;
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

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .task-card {
    display: block;
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: 8px;
    padding: 20px;
    text-decoration: none;
    transition: border-color 0.2s, background 0.2s;
  }

  .task-card:hover {
    border-color: var(--accent-border);
    background: var(--bg-card-hover);
  }

  .task-card h3 {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 6px;
  }

  .desc {
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.5;
    margin-bottom: 8px;
  }

  .count {
    font-size: 10px;
    color: var(--accent-dim);
    letter-spacing: 1px;
  }
</style>
