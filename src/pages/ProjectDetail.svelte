<script lang="ts">
  import { link } from '@/lib/router';
  import { getProjectById } from '@/lib/data/projects';
  import { getPersonById } from '@/lib/data/people';
  import Trentino from './Trentino.svelte';
  import Footer from '@/components/Footer.svelte';

  let { id }: { id: string } = $props();

  let project = $derived(getProjectById(id));
</script>

{#if id === 'trentino'}
  <Trentino />
{:else if project}
  <div class="detail-page">
    <header>
      <div class="breadcrumb">
        <a href="/projects" use:link>Projects</a>
        <span class="sep">&rsaquo;</span>
        <span>{project.region}</span>
      </div>
      <div class="card-header">
        <span class="status-badge {project.status}">{project.statusLabel}</span>
        <span class="region">{project.region}</span>
      </div>
      <h1>{project.title}</h1>
      <p class="subtitle">{project.subtitle}</p>
    </header>

    <section class="section">
      <p class="description">{project.description}</p>

      <div class="tags">
        {#each project.tags as tag}
          <span class="tag">{tag}</span>
        {/each}
      </div>

      {#if project.team.length > 0}
        <p class="team">
          <span class="team-label">Team:</span>
          {project.team.map(tid => getPersonById(tid)?.name ?? tid).join(', ')}
        </p>
      {/if}

      {#if project.stats}
        <div class="stats">
          {#each project.stats as stat}
            <div class="stat">
              <span class="stat-value">{stat.value}</span>
              <span class="stat-label">{stat.label}</span>
            </div>
          {/each}
        </div>
      {/if}

      {#if project.links}
        <div class="link-row">
          {#each project.links as link_item}
            {#if link_item.url.startsWith('/')}
              <a href={link_item.url} use:link class="card-action">{link_item.label}</a>
            {:else}
              <a href={link_item.url} target="_blank" rel="noopener" class="card-action">{link_item.label}</a>
            {/if}
          {/each}
        </div>
      {/if}
    </section>

    <Footer />
  </div>
{:else}
  <div class="detail-page">
    <div class="not-found">
      <h2>Project not found</h2>
      <p>No project matching "{id}".</p>
      <a href="/projects" use:link>Back to projects</a>
    </div>
  </div>
{/if}

<style>
  .detail-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 48px 32px;
  }

  header { margin-bottom: 32px; }

  .breadcrumb {
    font-size: 12px;
    color: var(--text-muted);
    margin-bottom: 12px;
    letter-spacing: 0.5px;
  }

  .breadcrumb a {
    color: var(--accent-dim);
    text-decoration: none;
  }

  .breadcrumb a:hover { text-decoration: underline; }
  .sep { margin: 0 6px; opacity: 0.5; }

  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .status-badge {
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 10px;
    font-weight: 600;
  }

  .status-badge.completed { color: #4ade80; background: rgba(74, 222, 128, 0.1); }
  .status-badge.in-progress { color: #facc15; background: rgba(250, 204, 21, 0.1); }
  .status-badge.planned { color: var(--text-muted); background: rgba(255, 255, 255, 0.05); }

  .region {
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 0.5px;
  }

  h1 {
    font-size: 24px;
    font-weight: 500;
    line-height: 1.3;
    color: var(--text-primary);
    margin-bottom: 8px;
  }

  .subtitle {
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-secondary);
  }

  .section { margin-bottom: 40px; }

  .description {
    font-size: 14px;
    line-height: 1.8;
    color: var(--text-secondary);
    margin-bottom: 16px;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 16px;
  }

  .tag {
    font-size: 10px;
    letter-spacing: 0.5px;
    color: var(--accent-dim);
    background: rgba(0, 229, 255, 0.06);
    border: 1px solid rgba(0, 229, 255, 0.15);
    border-radius: 4px;
    padding: 2px 8px;
  }

  .team {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.5;
    margin-bottom: 16px;
  }

  .team-label {
    font-weight: 500;
    color: var(--text-secondary);
  }

  .stats {
    display: flex;
    gap: 24px;
    margin-bottom: 16px;
  }

  .stat { display: flex; flex-direction: column; align-items: center; }

  .stat-value {
    font-size: 16px;
    font-weight: 600;
    color: var(--accent-dim);
  }

  .stat-label {
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .link-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .card-action {
    font-size: 12px;
    color: var(--accent-dim);
    text-decoration: none;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  .card-action:hover { opacity: 1; }

  .not-found {
    text-align: center;
    padding: 80px 0;
    color: var(--text-muted);
  }

  .not-found h2 {
    font-size: 24px;
    font-weight: 300;
    letter-spacing: 3px;
    margin-bottom: 8px;
    color: var(--text-secondary);
  }

  .not-found a {
    color: var(--accent-dim);
    text-decoration: none;
    margin-top: 16px;
    display: inline-block;
  }

  @media (max-width: 768px) {
    .detail-page { padding: 32px 16px; }
    h1 { font-size: 20px; }
  }
</style>
