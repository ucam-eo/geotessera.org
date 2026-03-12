<script lang="ts">
  import Footer from '@/components/Footer.svelte';

  const papers = [
    {
      id: 'tessera',
      title: 'TESSERA: Temporal Embeddings of Surface Spectra for Earth Representation and Analysis',
      authors: 'Zhengpeng Feng, Clement Atzberger, Sadiq Jaffer, Jovana Knezevic, Silja Sormunen, Robin Young, Madeline C. Lisaius, Markus Immitzer, Toby Jackson, James Ball, David A. Coomes, Anil Madhavapeddy, Andrew Blake, Srinivasan Keshav',
      venue: 'CVPR 2026',
      date: 'Jun 2025',
      description: 'The core TESSERA foundation model paper. Introduces self-supervised temporal embeddings from Sentinel-1 and Sentinel-2 using Barlow Twins with sparse random temporal sampling. Demonstrates strong performance across classification, segmentation, and regression with minimal labels. Includes release of pre-computed global embeddings at 10m resolution.',
      url: 'https://arxiv.org/abs/2506.20380',
      doi: '10.48550/arXiv.2506.20380',
      tag: 'foundation model',
    },
    {
      id: 'applications',
      title: 'Applications of the TESSERA Geospatial Foundation Model to Diverse Environmental Mapping Tasks',
      authors: 'Zhengpeng Feng, Clement Atzberger, Sadiq Jaffer, Jovana Knezevic, Silja Sormunen, Robin Young, Madeline C. Lisaius, Markus Immitzer, Toby Jackson, James Ball, David A. Coomes, Anil Madhavapeddy, Andrew Blake, Srinivasan Keshav',
      venue: 'SSRN preprint',
      date: 'Jan 2026',
      description: 'Demonstrates TESSERA across five environmental tasks: crop classification in Austria, wildfire detection in California, canopy height estimation in Borneo, biomass forecasting in Finland, and agroforestry in Brazil. Achieves over 90% of final performance using less than 1% of available training data.',
      url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6142416',
      doi: '10.2139/ssrn.6142416',
      tag: 'applications',
    },
    {
      id: 'barlow-twins',
      title: 'Using Barlow Twins to Create Representations From Cloud-Corrupted Remote Sensing Time Series',
      authors: 'Madeline C. Lisaius, Andrew Blake, Srinivasan Keshav, Clement Atzberger',
      venue: 'IEEE JSTARS, Volume 17',
      date: 'Jul 2024',
      description: 'Introduces spectral-temporal Barlow Twins (ST-BT), the self-supervised approach underpinning TESSERA. Achieves F1 scores of 0.94 and 0.90 on crop classification benchmarks even with 50% cloud cover, using only a few labelled samples.',
      url: 'https://ieeexplore.ieee.org/document/10592304',
      doi: '10.1109/JSTARS.2024.3425588',
      tag: 'method',
    },
  ];

  /** Icon per tag */
  const tagIcons: Record<string, string> = {
    'foundation model': 'M10 2L3 7v6l7 5 7-5V7z',
    'applications': 'M3 3h6v6H3zM11 3h6v6h-6zM3 11h6v6H3zM11 11h6v6h-6z',
    'method': 'M8 2v3M4.9 4.9l2.1 2.1M2 8h3M4.9 11.1l2.1-2.1M8 14v-3M11.1 11.1l-2.1-2.1M14 8h-3M11.1 4.9L9 7',
  };

  function getIcon(tag: string): string {
    return tagIcons[tag] ?? 'M5 2h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM7 6h6M7 9h6M7 12h4';
  }

  const papersJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'TESSERA Papers',
    description: 'Research publications behind TESSERA',
    url: 'https://geotessera.org/papers',
    mainEntity: papers.map(p => ({
      '@type': 'ScholarlyArticle',
      headline: p.title,
      author: p.authors.split(', ').map(name => ({ '@type': 'Person', name })),
      datePublished: p.date,
      publisher: p.venue,
      url: p.url,
      sameAs: `https://doi.org/${p.doi}`,
    })),
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://geotessera.org' },
        { '@type': 'ListItem', position: 2, name: 'Papers' },
      ],
    },
  });
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${papersJsonLd}</script>`}
</svelte:head>

<div class="papers-page">
  <header>
    <span class="page-label">Papers</span>
    <p class="subtitle">Research publications behind TESSERA</p>
  </header>

  <div class="timeline">
    {#each papers as paper}
      <div class="timeline-entry" id={paper.id}>
        <div class="timeline-rail">
          <a class="timeline-icon" href={`#${paper.id}`} aria-label={paper.title}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={getIcon(paper.tag)}/></svg>
          </a>
          <div class="timeline-line"></div>
        </div>
        <div class="timeline-content">
          <div class="paper-venue-line">
            <span class="paper-venue">{paper.venue}</span>
            <span class="paper-date">{paper.date}</span>
          </div>
          <h3><a href={paper.url} target="_blank" rel="noopener">{paper.title}<svg class="external-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a></h3>
          <p class="paper-authors">{paper.authors}</p>
          <p class="paper-desc">{paper.description}</p>
          <div class="paper-links">
            <a href={paper.url} target="_blank" rel="noopener" class="paper-action">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 2h6a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM6 5h4M6 7.5h4M6 10h2.5"/></svg>
              Read paper
            </a>
            <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener" class="paper-doi">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 9.5a3 3 0 0 0 4.2.3l1.5-1.5a3 3 0 0 0-4.2-4.2L6.5 5.5"/><path d="M9.5 6.5a3 3 0 0 0-4.2-.3L3.8 7.7a3 3 0 0 0 4.2 4.2l1.5-1.5"/></svg>
              {paper.doi}
            </a>
            <span class="paper-tag">{paper.tag}</span>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <Footer />
</div>

<style>
  .papers-page {
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

  /* Timeline layout */
  .timeline {
    display: flex;
    flex-direction: column;
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

  .timeline-entry:last-child .timeline-line {
    background: none;
  }

  .timeline-content {
    flex: 1;
    padding: 0 0 32px 12px;
    min-width: 0;
  }

  /* Venue + date line */
  .paper-venue-line {
    display: flex;
    gap: 8px;
    align-items: baseline;
    margin-bottom: 4px;
  }

  .paper-venue {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--accent-dim);
    opacity: 0.8;
  }

  .paper-date {
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 0.5px;
  }

  /* Title */
  .timeline-content h3 {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
    margin-bottom: 8px;
  }

  .timeline-content h3 a {
    color: var(--text-primary);
    text-decoration: none;
    transition: color 0.2s;
  }

  .timeline-entry:hover h3 a {
    color: var(--accent-dim);
  }

  .external-icon {
    display: inline;
    width: 12px;
    height: 12px;
    vertical-align: middle;
    margin-left: 5px;
    opacity: 0.3;
  }

  /* Authors */
  .paper-authors {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.5;
    margin-bottom: 8px;
  }

  /* Description */
  .paper-desc {
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-secondary);
    margin-bottom: 10px;
  }

  /* Links row */
  .paper-links {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }

  .paper-action {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    letter-spacing: 0.5px;
    color: var(--accent-dim);
    text-decoration: none;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .paper-action:hover {
    opacity: 1;
  }

  .paper-action svg {
    width: 14px;
    height: 14px;
  }

  .paper-doi {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    font-family: var(--font-mono, monospace);
    letter-spacing: 0.3px;
    color: var(--text-muted);
    text-decoration: none;
    opacity: 0.6;
    transition: opacity 0.2s, color 0.2s;
  }

  .paper-doi:hover {
    opacity: 1;
    color: var(--accent-dim);
  }

  .paper-doi svg {
    width: 13px;
    height: 13px;
  }

  .paper-tag {
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--text-muted);
    opacity: 0.5;
  }

  .paper-tag::before {
    content: '#';
    opacity: 0.5;
  }
</style>
