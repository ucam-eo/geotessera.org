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
</script>

<div class="papers-page">
  <header>
    <span class="page-label">Papers</span>
    <p class="subtitle">Research publications behind TESSERA</p>
  </header>

  <div class="paper-list">
    {#each papers as paper}
      <div class="paper-card" id={paper.id}>
        <div class="paper-tag">{paper.tag}</div>
        <h3><a href={paper.url} target="_blank" rel="noopener">{paper.title}</a><a class="anchor" href={`#${paper.id}`}>#</a></h3>
        <p class="paper-authors">{paper.authors}</p>
        <div class="paper-meta">
          <span class="paper-venue">{paper.venue}</span>
          <span class="paper-sep">&middot;</span>
          <span class="paper-date">{paper.date}</span>
          <span class="paper-sep">&middot;</span>
          <a class="paper-doi" href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener">{paper.doi}</a>
        </div>
        <p class="paper-desc">{paper.description}</p>
        <a href={paper.url} target="_blank" rel="noopener" class="paper-link">Read paper &rarr;</a>
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

  header { margin-bottom: 32px; }

  .page-label {
    font-weight: 300;
    letter-spacing: 4px;
    font-size: 18px;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .subtitle {
    font-size: 13px;
    letter-spacing: 1px;
    color: var(--text-muted);
    margin-top: 6px;
  }

  .paper-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .paper-card {
    display: block;
    border: 1px solid var(--border-subtle);
    border-radius: 10px;
    padding: 24px 28px;
    background: rgba(15, 23, 42, 0.5);
    transition: border-color 0.2s, background 0.2s;
    scroll-margin-top: calc(var(--nav-height) + 16px);
  }

  .paper-card:hover {
    border-color: var(--accent-border);
    background: rgba(15, 23, 42, 0.8);
  }

  .paper-tag {
    display: inline-block;
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--accent-dim);
    background: rgba(0, 229, 255, 0.08);
    border: 1px solid rgba(0, 229, 255, 0.15);
    padding: 2px 10px;
    border-radius: 3px;
    margin-bottom: 12px;
  }

  .paper-card h3 {
    font-size: 17px;
    font-weight: 500;
    line-height: 1.4;
    margin-bottom: 8px;
  }

  .paper-card h3 a {
    color: var(--text-primary);
    text-decoration: none;
    transition: color 0.2s;
  }

  .anchor {
    color: var(--text-faint) !important;
    font-size: 14px;
    font-weight: 400;
    margin-left: 8px;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .paper-card:hover .anchor {
    opacity: 1;
  }

  .anchor:hover {
    color: var(--accent-dim) !important;
  }

  .paper-card:hover h3 a {
    color: var(--accent-dim);
  }

  .paper-authors {
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.5;
    margin-bottom: 8px;
  }

  .paper-meta {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 12px;
  }

  .paper-venue {
    font-size: 12px;
    font-weight: 500;
    color: var(--text-secondary);
    letter-spacing: 0.3px;
  }

  .paper-sep {
    color: var(--text-faint);
    font-size: 10px;
  }

  .paper-date {
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 0.5px;
  }

  .paper-doi {
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 0.3px;
    text-decoration: none;
    transition: color 0.2s;
  }

  .paper-doi:hover {
    color: var(--accent-dim);
    text-decoration: underline;
  }

  .paper-desc {
    font-size: 13px;
    line-height: 1.7;
    color: var(--text-secondary);
    margin-bottom: 12px;
  }

  .paper-link {
    font-size: 12px;
    letter-spacing: 1px;
    color: var(--accent-dim);
    text-decoration: none;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .paper-card:hover .paper-link {
    opacity: 1;
  }
</style>
