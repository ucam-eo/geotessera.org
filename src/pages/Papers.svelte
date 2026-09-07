<script lang="ts">
  import Footer from '@/components/Footer.svelte';

  interface PaperEntry {
    id: string;
    title: string;
    authors: string;
    venue: string;
    date: string;
    description: string;
    url: string;
    doi: string;
    icon: string;
    tag: string;
    blog?: string;
    pdf?: string;
    featured?: boolean;
  }

  const papers: PaperEntry[] = [
    {
      id: 'tessera-v2',
      title: 'TESSERA v2: Scaling Pixel-wise Earth Foundation Models',
      authors: 'Zhengpeng Feng, Sadiq Jaffer, Ira Shokar, Jovana Knezevic, Mark Elvers, Clement Atzberger, Robin Young, Aneesh Naik, Niall Robinson, Andrew Blake, David A. Coomes, Anil Madhavapeddy, Srinivasan Keshav',
      venue: 'arXiv preprint',
      date: 'Jul 2026',
      description: 'The largest controlled scaling study for Earth observation to date: 395 training runs on 1,024 GH200 superchips in a fixed pixel-wise Barlow Twins family, each evaluated on 15 downstream tasks. Pretraining loss barely predicts downstream performance, and the encoder and data should scale together while the projector stays fixed. The distilled 21-million-parameter TESSERA v2-1B-M outperforms all open and proprietary models tested, with Matryoshka embeddings that retain 92% of performance at 1/8 of the storage.',
      url: 'https://arxiv.org/abs/2607.03949',
      doi: '10.48550/arXiv.2607.03949',
      icon: 'M10 2L2 6.5l8 4.5 8-4.5zM2 10l8 4.5 8-4.5M2 13.5l8 4.5 8-4.5',
      tag: 'foundation model',
      featured: true,
    },
    {
      id: 'tessera',
      title: 'TESSERA: Temporal Embeddings of Surface Spectra for Earth Representation and Analysis',
      authors: 'Zhengpeng Feng, Clement Atzberger, Sadiq Jaffer, Jovana Knezevic, Silja Sormunen, Robin Young, Madeline C. Lisaius, Markus Immitzer, Toby Jackson, James Ball, David A. Coomes, Anil Madhavapeddy, Andrew Blake, Srinivasan Keshav',
      venue: 'CVPR 2026',
      date: 'Jun 2026',
      description: 'The core TESSERA foundation model paper. Introduces a pixel-wise, multi-modal (Sentinel-1/2) model that learns label-efficient temporal embeddings using Barlow Twins with sparse random temporal sampling, aided by global-shuffling and mix-based regularisers. Delivers state-of-the-art accuracy across classification, segmentation, and regression with only a small task head, and releases global, annual, 10m pixel-wise embeddings with open weights and code.',
      url: 'https://openaccess.thecvf.com/content/CVPR2026/html/Feng_TESSERA_Temporal_Embeddings_of_Surface_Spectra_for_Earth_Representation_and_CVPR_2026_paper.html',
      doi: '10.48550/arXiv.2506.20380',
      blog: 'https://geotessera.org/blog/2026-06-04-cvpr-earth-intelligence',
      pdf: 'https://openaccess.thecvf.com/content/CVPR2026/papers/Feng_TESSERA_Temporal_Embeddings_of_Surface_Spectra_for_Earth_Representation_and_CVPR_2026_paper.pdf',
      icon: 'M10 2L3 7v6l7 5 7-5V7z',
      tag: 'foundation model',
      featured: true,
    },
    {
      id: 'weather-downscaling',
      title: 'Earth observation embeddings are effective sub-grid descriptors for probabilistic weather downscaling',
      authors: 'Pedro Sousa, Will Tebbutt, Sadiq Jaffer, Robin Young, Anil Madhavapeddy, Richard E. Turner',
      venue: 'arXiv preprint',
      date: 'Aug 2026',
      description: 'Gives a probabilistic downscaling model a TESSERA embedding for each location, compressing a 640 m neighbourhood of 10 m pixels into a compact vector that takes over the job of describing the land surface. Across five climatically diverse regions and roughly 9,000 weather stations, every metric improves at stations and years never seen in training, with probabilistic skill (CRPS) gaining 11.5% for 2 m temperature and 6.2% for 10 m wind speed. The gains are largest where station networks are sparse, and the dense maps resolve three to four times more fine-scale wind structure than the terrain-only baseline.',
      url: 'https://arxiv.org/abs/2608.12271',
      doi: '10.48550/arXiv.2608.12271',
      icon: 'M3 6h7a2 2 0 1 0-2-2M3 10h11a2 2 0 1 1-2 2M3 14h6a2 2 0 1 0-2-2',
      tag: 'applications',
    },
    {
      id: 'crop-small-fields',
      title: 'Towards Improved Crop Type Classification: a Compact Embedding Approach Suitable for Small Fields',
      authors: 'Madeline C. Lisaius, Andrew Blake, Clement Atzberger, Srinivasan Keshav',
      venue: 'ISPRS Annals, Volume XI-2-2026',
      date: 'Jul 2026',
      description: 'Compares TESSERA embeddings against standard crop-classification methods for small-field systems in Austria. Reports a triple win: statistically significant accuracy gains (better F1 in 5 of 7 crop types, over 10% in one case), no feature engineering, and just 8% of the compute of raw-data approaches.',
      url: 'https://isprs-annals.copernicus.org/articles/XI-2-2026/873/2026/',
      doi: '10.5194/isprs-annals-XI-2-2026-873-2026',
      blog: 'https://geotessera.org/blog/2026-07-02-smallholder-farms',
      icon: 'M10 18v-6M10 12c-2.6 0-4-1.6-4-4 2.6 0 4 1.6 4 4zM10 12c2.6 0 4-1.6 4-4-2.6 0-4 1.6-4 4z',
      tag: 'applications',
    },
    {
      id: 'tree-species',
      title: 'Geospatial Foundation Models Enable Data-Efficient Tree Species Mapping in Temperate Mountain Forests',
      authors: 'James G.C. Ball, Jana Annika Wicklein, Zhengpeng Feng, Jovana Knezevic, Sadiq Jaffer, Anil Madhavapeddy, Clement Atzberger, Michele Dalponte, David Coomes',
      venue: 'Science of Remote Sensing, 14, 100466',
      date: 'Jul 2026',
      description: 'Evaluates TESSERA and AlphaEarth embeddings for tree species identification in heterogeneous mountain forests in Trentino, Italy. Foundation model embeddings achieve superior performance (weighted F1 = 0.83) with near-asymptotic accuracy using as few as 5% of available training parcels.',
      url: 'https://doi.org/10.1016/j.srs.2026.100466',
      doi: '10.1016/j.srs.2026.100466',
      icon: 'M10 18v-5M10 13c-3.3 0-5.5-2.2-5.5-5.5S6.7 2 10 2s5.5 3.2 5.5 5.5S13.3 13 10 13z',
      tag: 'applications',
    },
    {
      id: 'fungi',
      title: 'Below-ground Fungal Biodiversity Can be Monitored Using Self-Supervised Learning Satellite Features',
      authors: 'Robin Young, Michael E. Van Nuland, E. Toby Kiers, Tomáš Větrovský, Petr Kohout, Petr Baldrian, Srinivasan Keshav',
      venue: 'arXiv preprint',
      date: 'Apr 2026',
      description: 'This paper shows that self-supervised learning features from satellite imagery can predict below ground ectomycorrhizal fungal species richness across ~12,000 field samples, achieving a 10,000-fold resolution improvement over existing methods and enabling temporal monitoring of fungal biodiversity at landscape scales.',
      url: 'https://arxiv.org/abs/2604.09818',
      doi: '10.48550/arXiv.2604.09818',
      icon: 'M10 11v6M4.5 11a5.5 5.5 0 0 1 11 0z',
      tag: 'applications',
    },
    {
      id: 'gedi-temporal',
      title: 'Neural Processes Maintain Calibrated Biomass Estimates Across Spatiotemporal Gaps and Disturbance',
      authors: 'Robin Young, Srinivasan Keshav',
      venue: 'arXiv preprint',
      date: 'Apr 2026',
      description: 'This paper extends Attentive Neural Processes to fill spatiotemporal gaps in GEDI lidar biomass data using embeddings and space-for-time substitution to produce well-calibrated uncertainty estimates even through extended observation outages and forest disturbance events.',
      url: 'https://arxiv.org/abs/2604.03874',
      doi: '10.48550/arXiv.2604.03874',
      icon: 'M3 3v14h14M3 13c3 0 4-7 7-7s4 5 7 5',
      tag: 'applications',
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
      icon: 'M3 3h6v6H3zM11 3h6v6h-6zM3 11h6v6H3zM11 11h6v6h-6z',
      tag: 'applications',
    },
    {
      id: 'crop-senegal',
      title: 'Embedding-based Crop Type Classification in the Groundnut Basin of Senegal',
      authors: 'Madeline C. Lisaius, Srinivasan Keshav, Andrew Blake, Clement Atzberger',
      venue: 'arXiv preprint',
      date: 'Jan 2026',
      description: 'Establishes a four-part criteria for embedding-based crop mapping and evaluates TESSERA and AlphaEarth in Senegal\'s groundnut basin. The TESSERA-based approach achieves 28% higher accuracy than the next best method in temporal transfer, demonstrating effective crop classification for smallholder farming regions.',
      url: 'https://arxiv.org/abs/2601.16900',
      doi: '10.48550/arXiv.2601.16900',
      icon: 'M3 5h14M3 10h14M3 15h14M7 5v10M13 5v10',
      tag: 'applications',
    },
    {
      id: 'gedi-biomass',
      title: 'Interpolation of GEDI Biomass Estimates with Calibrated Uncertainty Quantification',
      authors: 'Robin Young, Srinivasan Keshav',
      venue: 'arXiv preprint',
      date: 'Jan 2026',
      description: 'Proposes Attentive Neural Processes for biomass density estimation using GEDI data and geospatial foundation model embeddings. Achieves competitive accuracy with near-ideal uncertainty calibration across five biomes from tropical Amazonian forests to boreal ecosystems, with few-shot cross-region transfer.',
      url: 'https://arxiv.org/abs/2601.16834',
      doi: '10.48550/arXiv.2601.16834',
      icon: 'M3 3v14h14M6 14v-3M10 14v-6M14 14v-9',
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
      doi: '10.1109/JSTARS.2024.3426044',
      icon: 'M8 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10M12 5a5 5 0 1 1 0 10',
      tag: 'method',
    },
  ];

  // The two core model papers stay pinned above the chronological list: they are the
  // canonical citation (/papers#tessera) and should not drift down as applications accumulate.
  const featuredPapers = papers.filter((p) => p.featured);
  const otherPapers = papers.filter((p) => !p.featured);

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

  <section class="paper-group">
    <h2 class="group-label"><span>The TESSERA model</span><span class="group-hint">Start here</span></h2>
    <div class="timeline featured">
      {#each featuredPapers as paper}
        {@render paperEntry(paper)}
      {/each}
    </div>
  </section>

  <section class="paper-group">
    <h2 class="group-label"><span>Applications &amp; methods</span><span class="group-hint">Newest first</span></h2>
    <div class="timeline">
      {#each otherPapers as paper}
        {@render paperEntry(paper)}
      {/each}
    </div>
  </section>

  <Footer />
</div>

{#snippet paperEntry(paper: PaperEntry)}
  <div class="timeline-entry" id={paper.id}>
    <div class="timeline-rail">
      <a class="timeline-icon" href={`#${paper.id}`} aria-label={paper.title}>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={paper.icon}/></svg>
      </a>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-content">
      <div class="paper-venue-line">
        <span class="paper-venue">{paper.venue}</span>
        <span class="paper-date">{paper.date}</span>
      </div>
      <h3><a href={paper.url} target="_blank" rel="noopener">{paper.title}&#8288;<svg class="external-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a></h3>
      <p class="paper-authors">{paper.authors}</p>
      <p class="paper-desc">{paper.description}</p>
      <div class="paper-links">
        <a href={paper.pdf ?? paper.url} target="_blank" rel="noopener" class="paper-action">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 2h6a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM6 5h4M6 7.5h4M6 10h2.5"/></svg>
          Read paper
        </a>
        {#if paper.blog}
          <a href={paper.blog} target="_blank" rel="noopener" class="paper-action">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3.5h7a1 1 0 0 1 1 1v8a1 1 0 0 0 1 1H4a1 1 0 0 1-1-1z"/><path d="M11 6.5h1.5a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1"/><path d="M5 6h3M5 8.5h3M5 11h2"/></svg>
            Blog post
          </a>
        {/if}
        <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener" class="paper-doi">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 9.5a3 3 0 0 0 4.2.3l1.5-1.5a3 3 0 0 0-4.2-4.2L6.5 5.5"/><path d="M9.5 6.5a3 3 0 0 0-4.2-.3L3.8 7.7a3 3 0 0 0 4.2 4.2l1.5-1.5"/></svg>
          {paper.doi}
        </a>
        <span class="paper-tag">{paper.tag}</span>
      </div>
    </div>
  </div>
{/snippet}


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

  /* Group headings: name the two tiers, and state the ordering rule */
  .paper-group + .paper-group {
    margin-top: 14px;
  }

  .group-label {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 16px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-secondary);
    padding-bottom: 9px;
    border-bottom: 1px solid var(--border-light);
    margin-bottom: 22px;
  }

  .group-hint {
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.5px;
    text-transform: none;
    color: var(--text-muted);
    white-space: nowrap;
  }

  /* Pinned pair: slightly brighter rail icon */
  .timeline.featured .timeline-icon {
    background: rgba(0, 210, 255, 0.18);
    border-color: var(--accent-border);
  }

  .timeline.featured .timeline-icon svg {
    color: var(--accent);
    opacity: 1;
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

  @media (max-width: 768px) {
    .papers-page {
      padding: 32px 16px;
    }

    .timeline-rail {
      width: 28px;
    }

    .timeline-icon {
      width: 22px;
      height: 22px;
    }

    .timeline-icon svg {
      width: 11px;
      height: 11px;
    }

    .timeline-content {
      padding-left: 10px;
      padding-bottom: 24px;
    }

    .timeline-content h3 {
      font-size: 15px;
    }

    .paper-links {
      gap: 8px;
    }

    .paper-doi {
      font-size: 10px;
    }
  }
</style>
