<script lang="ts">
  import { link } from '@/lib/router';
  import { projects } from '@/lib/data/projects';
  import { getPersonById } from '@/lib/data/people';
  import Footer from '@/components/Footer.svelte';

  const projectsJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects — TESSERA',
    description: 'Research projects applying TESSERA embeddings to habitat mapping at scale',
    url: 'https://geotessera.org/projects',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://geotessera.org' },
        { '@type': 'ListItem', position: 2, name: 'Projects' },
      ],
    },
  });
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${projectsJsonLd}</script>`}
</svelte:head>

<div class="projects-page">
  <header>
    <span class="page-label">Projects</span>
    <p class="subtitle">From species-level forest mapping in the Alps to continent-scale habitat classification in the tropics</p>
  </header>

  <section class="intro">
    <p>
      Our work spans regional to global scales, partnering with ecological networks and conservation
      organisations worldwide. Each project applies TESSERA and other geospatial foundation model embeddings
      to deliver fine-grained, species-level habitat maps with minimal labelled data.
    </p>
    <p>
      These are projects being run in-house by the Cambridge team, but there is a growing amount of
      work using TESSERA globally. If you'd like yours to be listed here too, get in touch on our
      <a href="https://eeg.zulipchat.com" target="_blank" rel="noopener">Zulip</a>!
    </p>
  </section>

  <div class="project-list">
    {#each projects as project}
      <article class="project-card" id={project.id}>
        <div class="card-header">
          <span class="status-badge {project.status}">{project.statusLabel}</span>
          <span class="region">{project.region}</span>
          {#if project.timeline}
            <span class="timeline">{project.timeline}</span>
          {/if}
        </div>

        <h2>
          {#if project.hasDetailPage}
            <a href="/projects/{project.id}" use:link>{project.title}</a>
          {:else}
            {project.title}
          {/if}
        </h2>

        <p class="description">{project.description}</p>

        <div class="tags">
          {#each project.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>

        {#if project.team.length > 0}
          <p class="team">
            <span class="team-label">Team:</span>
            {project.team.map(id => getPersonById(id)?.name ?? id).join(', ')}
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
          <div class="card-links">
            {#each project.links as link_item}
              {#if link_item.url.startsWith('/')}
                <a href={link_item.url} use:link class="card-action">{link_item.label}</a>
              {:else}
                <a href={link_item.url} target="_blank" rel="noopener" class="card-action">{link_item.label}
                  <svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg>
                </a>
              {/if}
            {/each}
          </div>
        {/if}
      </article>
    {/each}
  </div>

  <section class="callout">
    <h3>The Global Plot Alliance</h3>
    <p>
      To take full advantage of foundation models, we need expertly curated ground-truth datasets.
      We are building a global alliance of vegetation plot networks — assembling millions of survey records
      from botanists, ecologists, and foresters worldwide — to provide the reference data that will power
      the next generation of AI-driven habitat maps.
    </p>
    <p class="callout-partners">
      Partners include SPlot (3.3M plots), SynTreeSys, BIEN, UNEP-WCMC, and others.
    </p>
  </section>

  <Footer />
</div>

<style>
  .projects-page {
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

  .intro {
    margin-bottom: 32px;
  }

  .intro p {
    font-size: 15px;
    line-height: 1.8;
    color: var(--text-secondary);
  }

  .project-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .project-card {
    border: 1px solid var(--border-subtle);
    border-radius: 8px;
    padding: 24px;
    transition: border-color 0.2s;
    scroll-margin-top: calc(var(--nav-height) + 16px);
  }

  .project-card:hover {
    border-color: rgba(0, 229, 255, 0.3);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }

  .status-badge {
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 10px;
    font-weight: 600;
  }

  .status-badge.completed {
    color: #4ade80;
    background: rgba(74, 222, 128, 0.1);
  }

  .status-badge.in-progress {
    color: #facc15;
    background: rgba(250, 204, 21, 0.1);
  }

  .status-badge.planned {
    color: var(--text-muted);
    background: rgba(255, 255, 255, 0.05);
  }

  .region {
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 0.5px;
  }

  .timeline {
    font-size: 11px;
    color: var(--text-faint);
    letter-spacing: 0.5px;
  }

  .project-card h2 {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
    margin-bottom: 10px;
    color: var(--text-primary);
  }

  .project-card h2 a {
    color: var(--text-primary);
    text-decoration: none;
    transition: color 0.2s;
  }

  .project-card h2 a:hover {
    color: var(--accent-dim);
  }

  .description {
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-secondary);
    margin-bottom: 12px;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 12px;
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
    margin-bottom: 12px;
  }

  .team-label {
    font-weight: 500;
    color: var(--text-secondary);
  }

  .stats {
    display: flex;
    gap: 24px;
    margin-bottom: 12px;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stat-value {
    font-size: 16px;
    font-weight: 600;
    color: var(--accent-dim);
    letter-spacing: 0.5px;
  }

  .stat-label {
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .card-links {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 8px;
  }

  .card-action {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    letter-spacing: 0.5px;
    color: var(--accent-dim);
    text-decoration: none;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  .card-action:hover {
    opacity: 1;
  }

  .ext {
    display: inline;
    width: 10px;
    height: 10px;
    opacity: 0.4;
    vertical-align: middle;
  }

  .callout {
    margin-top: 40px;
    padding: 24px;
    border: 1px solid var(--border-subtle);
    border-radius: 8px;
    background: rgba(0, 229, 255, 0.03);
    margin-bottom: 40px;
  }

  .callout h3 {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 1px;
    color: var(--accent-dim);
    margin-bottom: 10px;
  }

  .callout p {
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }

  .callout-partners {
    font-size: 13px;
    color: var(--text-muted);
    font-style: italic;
  }

  @media (max-width: 768px) {
    .projects-page {
      padding: 32px 16px;
    }

    .project-card {
      padding: 16px;
    }

    .stats {
      gap: 16px;
    }
  }
</style>
