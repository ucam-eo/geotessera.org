<script lang="ts">
  import Footer from '@/components/Footer.svelte';

  const videos = [
    {
      id: 'new-earth-language',
      title: 'TESSERA — A New Earth Language',
      source: 'GIS & Research Group',
      date: '2026',
      description: 'Overview of the TESSERA foundation model and its approach to encoding the Earth\'s surface as a new language for geospatial analysis.',
      url: 'https://www.youtube.com/watch?v=I4sBoCKMidA',
      thumb: 'https://i.ytimg.com/vi/I4sBoCKMidA/mqdefault.jpg',
      type: 'talk' as const,
    },
    {
      id: 'ai-for-good',
      title: 'Introduction to TESSERA: Time-series embeddings for geospatial analysis',
      source: 'AI for Good',
      date: '2025',
      description: 'Presentation at AI for Good introducing TESSERA\'s temporal embedding approach for satellite imagery, starting at the technical deep-dive.',
      url: 'https://youtu.be/9yrpwFrwbGY?t=645',
      thumb: 'https://i.ytimg.com/vi/9yrpwFrwbGY/mqdefault.jpg',
      type: 'talk' as const,
    },
    {
      id: 'geoawesome',
      title: 'Tessera: Building a Global Open-Source Geospatial Foundation Model',
      source: 'Geoawesome',
      date: '2025',
      description: 'Interview covering TESSERA\'s open-source philosophy, the engineering of a global-scale geospatial foundation model, and plans for the future.',
      url: 'https://www.youtube.com/watch?v=u3_HxRJE8Ss',
      thumb: 'https://i.ytimg.com/vi/u3_HxRJE8Ss/mqdefault.jpg',
      type: 'interview' as const,
    },
    {
      id: 'propl-embeddings',
      title: 'Challenges in Practice: Building a Usable Library for Planetary-Scale Embeddings',
      source: 'PROPL\'25 at ICFP/SPLASH',
      date: 'Oct 2025',
      description: 'Sadiq Jaffer and Robin Young present the GeoTessera library, demonstrating how foundation model embeddings democratize planetary-scale remote sensing analysis.',
      url: 'https://watch.eeg.cl.cam.ac.uk/w/trq77gFwc8ZbUeGqyDpzN7',
      thumb: 'https://watch.eeg.cl.cam.ac.uk/lazy-static/previews/d4c9ed4d-2d0f-41e7-8fd2-06b1dccd84d7.jpg',
      type: 'talk' as const,
    },
    {
      id: 'ecosystem-resilience',
      title: 'Foundational AI to Forecast Ecosystem Resilience',
      source: 'Cambridge CL EEG',
      date: 'Nov 2025',
      description: 'Workshop presentation at Pembroke College by Srinivasan Keshav and David Coomes on applying foundational AI methods to predict ecosystem health.',
      url: 'https://watch.eeg.cl.cam.ac.uk/w/hanDLh2nzjXY4yL1akVEYh',
      thumb: 'https://watch.eeg.cl.cam.ac.uk/lazy-static/previews/2b1fcfa9-f038-46d4-8b8b-ee22e6db39f8.jpg',
      type: 'workshop' as const,
    },
    {
      id: 'sidl-podcast',
      title: 'Tessera: A Temporal Foundation Model for Earth Observation',
      source: 'Satellite Image Deep Learning (Robin Cole)',
      date: 'Jan 2026',
      description: 'Podcast with Sadiq Jaffer and Frank Feng covering temporal embeddings, self-supervised training at petabyte scale, wildfire detection, and plans for TESSERA v2.',
      url: 'https://www.satellite-image-deep-learning.com/p/tessera-a-temporal-foundation-model',
      thumb: 'https://substack-post-media.s3.amazonaws.com/public/images/ba401d6f-4183-4b04-8783-3397005bf875_1280x720.jpeg',
      type: 'podcast' as const,
    },
    {
      id: 'france-tv-hedgehogs',
      title: 'Des satellites pour protéger les hérissons',
      source: 'France Télévisions',
      date: 'Jan 2026',
      description: 'French national TV segment on using TESSERA satellite embeddings for hedgehog habitat detection, featuring Anil Madhavapeddy discussing conservation applications.',
      url: 'https://crank.recoil.org/w/qaKi7kTYoD7ezxd81q3xex?start=1m49s',
      thumb: 'https://crank.recoil.org/lazy-static/thumbnails/132d98c3-082f-40ee-837d-36fbd5b34922.jpg',
      type: 'interview' as const,
    },
    {
      id: 'recoil-crank-conservation',
      title: 'How AI Could Transform Conservation',
      source: 'Conservation Evidence',
      date: 'Jan 2026',
      description: 'Anil Madhavapeddy presents at the Conservation Evidence conference at Pembroke College about effective conservation using geospatial foundation models like TESSERA.',
      url: 'https://crank.recoil.org/w/cheQBkBfSsZwGZP6F3jtaa',
      thumb: 'https://crank.recoil.org/lazy-static/previews/ae4a9924-1dfe-4304-a5e3-1e2efe14dc9a.jpg',
      type: 'talk' as const,
    },
    {
      id: 'ieee-grss-webinar',
      title: 'TESSERA: Precomputed FAIR Global Pixel Embeddings for Earth Representation and Analysis',
      source: 'IEEE GRSS',
      date: 'Dec 2025',
      description: 'IEEE Geoscience and Remote Sensing Society webinar presenting TESSERA\'s approach to precomputed FAIR global pixel embeddings for Earth observation analysis.',
      url: 'https://www.youtube.com/watch?v=J-QLuX9xcsI',
      thumb: 'https://i.ytimg.com/vi/J-QLuX9xcsI/mqdefault.jpg',
      type: 'webinar' as const,
    },
  ];

  const types = ['all', 'talk', 'interview', 'workshop', 'podcast', 'webinar'] as const;
  let activeType = $state<string>('all');
  let filtered = $derived(
    activeType === 'all' ? videos : videos.filter(v => v.type === activeType)
  );

  const videosJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'TESSERA Videos',
    description: 'Talks, interviews, and presentations about TESSERA',
    url: 'https://geotessera.org/videos',
    mainEntity: videos.map(v => ({
      '@type': 'VideoObject',
      name: v.title,
      description: v.description,
      thumbnailUrl: v.thumb,
      uploadDate: v.date,
      url: v.url,
    })),
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://geotessera.org' },
        { '@type': 'ListItem', position: 2, name: 'Videos' },
      ],
    },
  });
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${videosJsonLd}</script>`}
</svelte:head>

<div class="videos-page">
  <header>
    <span class="page-label">Videos</span>
    <p class="subtitle">Talks, interviews, and presentations about TESSERA</p>
  </header>

  <div class="filters">
    {#each types as t}
      <button class:active={activeType === t} onclick={() => (activeType = t)}>
        {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1) + 's'}
      </button>
    {/each}
  </div>

  <div class="video-grid">
    {#each filtered as video}
      <div class="video-card" id={video.id}>
        <a href={video.url} target="_blank" rel="noopener" class="video-thumb">
          <img
            src={video.thumb}
            alt={video.title}
            loading="lazy"
          />
          <span class="video-type">{video.type}</span>
          <div class="play-overlay">
            <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"/><polygon points="20,16 34,24 20,32" fill="rgba(255,255,255,0.9)"/></svg>
          </div>
        </a>
        <div class="video-info">
          <h3><a href={video.url} target="_blank" rel="noopener">{video.title}</a><a class="anchor" href={`#${video.id}`}>#</a></h3>
          <div class="video-meta">
            <span class="video-source">{video.source}</span>
            <span class="video-sep">&middot;</span>
            <span class="video-date">{video.date}</span>
          </div>
          <p>{video.description}</p>
        </div>
      </div>
    {/each}
  </div>

  <Footer />
</div>

<style>
  .videos-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 48px 32px;
  }

  header { margin-bottom: 24px; }

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

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 32px;
  }

  .filters button {
    font-size: 11px;
    padding: 5px 14px;
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

  .video-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .video-card {
    display: flex;
    gap: 20px;
    border: 1px solid var(--border-subtle);
    border-radius: 10px;
    overflow: hidden;
    background: rgba(15, 23, 42, 0.5);
    transition: border-color 0.2s, background 0.2s;
    scroll-margin-top: calc(var(--nav-height) + 16px);
  }

  .video-card:hover {
    border-color: var(--accent-border);
    background: rgba(15, 23, 42, 0.8);
  }

  .video-thumb {
    display: block;
    position: relative;
    flex-shrink: 0;
    width: 280px;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: #0a0a1a;
  }

  .video-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.85;
    transition: opacity 0.2s;
  }

  .video-card:hover .video-thumb img {
    opacity: 1;
  }

  .play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .play-overlay svg {
    width: 44px;
    height: 44px;
  }

  .video-card:hover .play-overlay {
    opacity: 1;
  }

  .video-type {
    position: absolute;
    top: 8px;
    left: 8px;
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--accent-dim);
    background: rgba(0, 0, 0, 0.75);
    padding: 3px 8px;
    border-radius: 3px;
    backdrop-filter: blur(4px);
  }

  .video-info {
    padding: 16px 20px 16px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
  }

  .video-info h3 {
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.3px;
    margin-bottom: 6px;
    line-height: 1.4;
  }

  .video-info h3 a {
    color: var(--text-primary);
    text-decoration: none;
    transition: color 0.2s;
  }

  .video-card:hover .video-info h3 a {
    color: var(--accent-dim);
  }

  .anchor {
    color: var(--text-faint);
    font-size: 14px;
    font-weight: 400;
    margin-left: 8px;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .video-card:hover .anchor {
    opacity: 1;
  }

  .anchor:hover {
    color: var(--accent-dim);
  }

  .video-meta {
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
    align-items: center;
  }

  .video-source {
    font-size: 12px;
    color: var(--text-secondary);
    letter-spacing: 0.3px;
  }

  .video-sep {
    color: var(--text-faint);
    font-size: 10px;
  }

  .video-date {
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 0.5px;
  }

  .video-info p {
    font-size: 13px;
    line-height: 1.7;
    color: var(--text-secondary);
    margin: 0;
  }

  @media (max-width: 640px) {
    .video-card {
      flex-direction: column;
    }
    .video-thumb {
      width: 100%;
    }
    .video-info {
      padding: 12px 16px 16px;
    }
  }
</style>
