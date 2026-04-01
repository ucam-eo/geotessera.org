<script lang="ts">
  import { link } from '@/lib/router';
  import { siteConfig } from '@/lib/config';
  import { getPeopleByRole } from '@/lib/data/people';
  import { projects } from '@/lib/data/projects';
  import { fundingSources } from '@/lib/data/funding';
  import { partners } from '@/lib/data/partners';
  import Footer from '@/components/Footer.svelte';

  const faculty = getPeopleByRole('faculty');
  const researchers = getPeopleByRole('researcher');
  const collaborators = getPeopleByRole('collaborator');

  const aboutJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About TESSERA',
    description: 'The TESSERA project at the University of Cambridge',
    url: 'https://geotessera.org/about',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://geotessera.org' },
        { '@type': 'ListItem', position: 2, name: 'About' },
      ],
    },
  });
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${aboutJsonLd}</script>`}
</svelte:head>

<div class="about-page">
  <header>
    <span class="page-label">About</span>
    <p class="subtitle">The TESSERA project at the University of Cambridge</p>
  </header>

  <!-- Overview -->
  <section class="section" id="overview">
    <h2>What is TESSERA?</h2>
    <p>
      TESSERA (Temporal Embeddings of Surface Spectra for Earth Representation and Analysis) is a
      foundation model for Earth observation developed at the University of Cambridge. It compresses
      a full year of Sentinel-1 and Sentinel-2 satellite observations into dense, 128-dimensional
      per-pixel embeddings at 10m spatial resolution.
    </p>
    <p>
      These self-supervised embeddings provide a general-purpose representation that transfers
      across <a href="/tasks" use:link>downstream tasks</a> — from
      <a href="/tasks/land-cover" use:link>land cover classification</a> to
      <a href="/tasks/solar" use:link>solar panel detection</a> — with minimal additional training.
      Over 90% of final task performance is achievable using less than 1% of available labelled data.
    </p>
  </section>

  <!-- Ecosystem -->
  <section class="section" id="ecosystem">
    <h2>Ecosystem</h2>
    <ul class="eco-list">
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0-1.4l-1.6-1.6a1 1 0 0 0-1.4 0l-2 2 3 3zM3 13.5V17h3.5L13.4 10l-3-3z"/></svg>
        <a href="https://github.com/ucam-eo/tessera" target="_blank" rel="noopener">Tessera Training&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
        <span class="eco-desc">— Foundation model training code (MIT)</span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7"/><path d="M10 3v14M3 10h14"/></svg>
        <a href="https://github.com/ucam-eo/geotessera" target="_blank" rel="noopener">GeoTessera Embeddings&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
        <span class="eco-desc">— Pre-computed global embeddings (CC0 license). <a href="/coverage" use:link>View coverage</a></span>
      </li>
    </ul>

    <h3 class="eco-subheading">Language libraries</h3>
    <ul class="eco-list">
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="14" height="14" rx="2"/><path d="M7 7h6M7 10h4"/></svg>
        <a href="https://pypi.org/project/geotessera/" target="_blank" rel="noopener">Python&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
        <span class="eco-desc">— <code>pip install geotessera</code> <span class="eco-badge mature">mature</span></span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="14" height="14" rx="2"/><path d="M7 7h6M7 10h4"/></svg>
        <a href="https://lassa-sentinel.github.io/GeoTessera/" target="_blank" rel="noopener">R&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
        <span class="eco-desc">— Community contribution by <a href="https://www.microsoft.com/en-us/research/people/sdwfrost/" target="_blank" rel="noopener">Simon Frost</a> <span class="eco-badge contributed">contributed</span></span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="14" height="14" rx="2"/><path d="M7 7h6M7 10h4"/></svg>
        <span class="eco-link-muted">OCaml</span>
        <span class="eco-desc">— In development by the core team <span class="eco-badge dev">in development</span></span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="14" height="14" rx="2"/><path d="M7 7h6M7 10h4"/></svg>
        <span class="eco-link-muted">TypeScript</span>
        <span class="eco-desc">— In development, powering the <a href="/viewer" use:link>interactive map viewer</a> <span class="eco-badge dev">in development</span></span>
      </li>
    </ul>

    <h3 class="eco-subheading">Tools &amp; resources</h3>
    <ul class="eco-list">
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="16" height="11" rx="1.5"/><path d="M6 17h8M10 14v3"/></svg>
        <a href="https://github.com/ucam-eo/tee" target="_blank" rel="noopener">TEE&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
        <span class="eco-desc">— TESSERA Embeddings Explorer, interactive map viewer</span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l6 8 6-8"/><path d="M4 8l6 8 6-8"/></svg>
        <a href="https://github.com/ucam-eo/geotessera-examples" target="_blank" rel="noopener">Examples&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
        <span class="eco-desc">— Solar panel detection, UMAP visualisation, and more</span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3v4l3 2"/><circle cx="10" cy="10" r="7"/></svg>
        <a href="https://isaac.earth/geospatial-skills" target="_blank" rel="noopener">Geospatial Skills for Claude&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
        <span class="eco-desc">— Claude Code skills for working with TESSERA via Python and R, by <a href="https://github.com/isaaccorley" target="_blank" rel="noopener">Isaac Corley</a> <span class="eco-badge contributed">contributed</span></span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><path d="M10 2a14 14 0 0 1 0 16M10 2a14 14 0 0 0 0 16M2.5 10h15"/></svg>
        <a href="https://github.com/ucam-eo/tessera-interactive-map" target="_blank" rel="noopener">Interactive Notebook&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
        <span class="eco-desc">— Jupyter notebook for interactive exploration</span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l6 8 6-8"/><path d="M4 8l6 8 6-8"/></svg>
        <a href="https://www.linkedin.com/pulse/from-pixels-embeddings-tessera-earth-observation-gijs-van-den-dool-uti7e/" target="_blank" rel="noopener">TESSERA on Google Colab&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
        <span class="eco-desc">— Custom inference pipeline for running TESSERA in Google Colab, by <a href="https://www.linkedin.com/in/gijsvandendool/" target="_blank" rel="noopener">Gijs van den Dool</a> <span class="eco-badge contributed">contributed</span></span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2h8l4 4v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/><path d="M12 2v4h4M7 10h6M7 14h4"/></svg>
        <a href="https://geotessera.readthedocs.io/" target="_blank" rel="noopener">Documentation&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
        <span class="eco-desc">— API reference and data documentation</span>
      </li>
    </ul>
  </section>

  <!-- Projects -->
  <section class="section" id="projects">
    <h2>Projects</h2>
    <p>Ongoing research projects applying TESSERA embeddings to real-world environmental mapping at scale.</p>
    <ul class="eco-list">
      {#each projects.slice(0, 5) as project}
        <li>
          <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-4.4 0-8 3-8 6.5S7.6 16 12 16s8-3 8-6.5S16.4 3 12 3z"/></svg>
          {#if project.hasDetailPage}
            <a href="/projects/{project.id}" use:link>{project.title}&#8288;</a>
          {:else}
            <span class="eco-link-muted">{project.title}</span>
          {/if}
          <span class="eco-desc">— {project.subtitle}</span>
          <span class="eco-badge {project.status === 'completed' ? 'mature' : project.status === 'in-progress' ? 'contributed' : 'dev'}">{project.statusLabel}</span>
        </li>
      {/each}
    </ul>
    <p style="margin-top: 12px;"><a href="/projects" use:link style="font-size: 13px; color: var(--accent-dim); text-decoration: none;">View all {projects.length} projects &rarr;</a></p>
  </section>

  <!-- Roadmap -->
  <section class="section" id="roadmap">
    <h2>Roadmap</h2>
    <p>Current status and planned milestones for TESSERA embeddings and model development. See the <a href="/coverage" use:link>coverage map</a> for current global progress.</p>
    <dl class="involve-list">
      {#each siteConfig.roadmap as item}
        <div class="involve-item">
          <dt><span class="roadmap-version">{item.version}</span> <span class="roadmap-status {item.status}">{item.statusLabel}</span></dt>
          <dd>{item.description}{#if item.linkText}{' '}{#if item.linkUrl.startsWith('/')}<a href={item.linkUrl} use:link>{item.linkText}</a>{:else}<a href={item.linkUrl} target="_blank" rel="noopener">{item.linkText}</a>{/if}{/if}{#if item.link2Text}{' · '}{#if item.link2Url.startsWith('/')}<a href={item.link2Url} use:link>{item.link2Text}</a>{:else}<a href={item.link2Url} target="_blank" rel="noopener">{item.link2Text}</a>{/if}{/if}</dd>
        </div>
      {/each}
    </dl>
  </section>

  <!-- People -->
  <section class="section" id="people">
    <h2>People</h2>

    <div class="people-group">
      <h3>Lead Faculty</h3>
      <div class="people-list">
        {#each faculty as person}
          <div class="person">
            {#if person.url}
              <a class="person-name" href={person.url} target="_blank" rel="noopener">{person.name}</a>
            {:else}
              <span class="person-name">{person.name}</span>
            {/if}
            <span class="person-role">{person.title}{person.affiliation ? `, ${person.affiliation}` : ''}</span>
          </div>
        {/each}
      </div>
    </div>

    <div class="people-group">
      <h3>Researchers</h3>
      <div class="people-list">
        {#each researchers as person}
          <div class="person">
            {#if person.url}
              <a class="person-name" href={person.url} target="_blank" rel="noopener">{person.name}</a>
            {:else}
              <span class="person-name">{person.name}</span>
            {/if}
            <span class="person-role">{person.title}{person.affiliation ? `, ${person.affiliation}` : ''}</span>
          </div>
        {/each}
      </div>
    </div>

    <div class="people-group">
      <h3>Collaborators</h3>
      <div class="people-list">
        {#each collaborators as person}
          <div class="person">
            {#if person.url}
              <a class="person-name" href={person.url} target="_blank" rel="noopener">{person.name}</a>
            {:else}
              <span class="person-name">{person.name}</span>
            {/if}
            <span class="person-role">{person.title}{person.affiliation ? `, ${person.affiliation}` : ''}</span>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Get involved -->
  <section class="section" id="get-involved">
    <h2>Get involved</h2>
    <dl class="involve-list">
      <div class="involve-item">
        <dt>Request embeddings</dt>
        <dd>Need embeddings for a region or year (2017–2025) not yet covered? Check the <a href="/coverage" use:link>coverage map</a> to see what's available, then open an <a href="https://github.com/ucam-eo/geotessera/issues/new?template=embedding-request.yml&labels=embedding-request" target="_blank" rel="noopener">embedding request</a> with your bounding box and we'll prioritise it.</dd>
      </div>
      <div class="involve-item">
        <dt>Contribute</dt>
        <dd>Code contributions are welcome across all repositories: <a href="https://github.com/ucam-eo/tessera" target="_blank" rel="noopener">tessera</a> (model training and inference), <a href="https://github.com/ucam-eo/geotessera" target="_blank" rel="noopener">geotessera</a> (Python library and embeddings access), and <a href="https://github.com/ucam-eo/geotessera.org" target="_blank" rel="noopener">geotessera.org</a> (this website — add your own examples and use cases).</dd>
      </div>
      <div class="involve-item">
        <dt>Cite TESSERA</dt>
        <dd>If you use TESSERA in your research, please cite the <a href="/papers#tessera" use:link>CVPR 2026 paper</a>. See the <a href="/papers" use:link>papers page</a> for all publications.</dd>
      </div>
      <div class="involve-item">
        <dt>Join the community</dt>
        <dd>We have an active community on <a href="https://eeg.zulipchat.com" target="_blank" rel="noopener">Zulip</a> with open registration — everyone is welcome to join the discussion.</dd>
      </div>
      <div class="involve-item">
        <dt>Report issues</dt>
        <dd>Found a bug or have a feature request? File an issue on the relevant <a href="https://github.com/ucam-eo" target="_blank" rel="noopener">ucam-eo</a> repository.</dd>
      </div>
    </dl>
  </section>

  <!-- Funding -->
  <section class="section" id="funding">
    <h2>Funding</h2>
    <dl class="involve-list">
      {#each fundingSources as source}
        <div class="involve-item">
          <dt>{source.name}</dt>
          <dd>{source.description}{#if source.url}{' '}<a href={source.url} target="_blank" rel="noopener">Learn more</a>{/if}</dd>
        </div>
      {/each}
    </dl>
  </section>

  <!-- Partner Institutions -->
  <section class="section" id="partners">
    <h2>Partner Institutions</h2>
    <div class="people-list">
      {#each partners as partner}
        <div class="person">
          {#if partner.url && partner.url !== '#'}
            <a class="person-name" href={partner.url} target="_blank" rel="noopener">{partner.name}</a>
          {:else}
            <span class="person-name">{partner.name}</span>
          {/if}
        </div>
      {/each}
    </div>
  </section>

  <!-- Acknowledgments -->
  <section class="section" id="acknowledgments">
    <h2>Acknowledgments</h2>
    <p>
      We are grateful to <a href="https://www.hpc.cam.ac.uk/d-w-n" target="_blank" rel="noopener">DAWN</a>,
      the AI supercomputer at the University of Cambridge, and AMD for their generous support
      in computational resources and technical assistance. Satellite data is provided by the
      <a href="https://browser.dataspace.copernicus.eu/" target="_blank" rel="noopener">Copernicus programme</a>
      via Sentinel-1 and Sentinel-2.
    </p>
    <p>
      We also acknowledge compute resources from the <a href="https://www.isambard.ac.uk" target="_blank" rel="noopener">UKRI AIRR Isambard facility</a>, GPU hosting from <a href="https://www.vultr.com" target="_blank" rel="noopener">Vultr</a> and <a href="https://www.amd.com" target="_blank" rel="noopener">AMD</a>, and donations from <a href="https://www.janestreet.com" target="_blank" rel="noopener">Jane Street</a> to the University of Cambridge.
    </p>
  </section>

  <Footer />
</div>

<style>
  .about-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 48px 32px;
  }

  header { margin-bottom: 36px; }

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

  .section {
    margin-bottom: 40px;
    scroll-margin-top: calc(var(--nav-height) + 16px);
  }

  .section h2 {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent-dim);
    margin-bottom: 16px;
    opacity: 0.8;
  }

  .section p {
    font-size: 15px;
    line-height: 1.8;
    color: var(--text-secondary);
    margin-bottom: 12px;
  }

  .section p a, .involve-item a {
    color: var(--accent-dim);
    text-decoration: none;
  }

  .section p a:hover, .involve-item a:hover {
    text-decoration: underline;
  }

  /* Ecosystem list */
  .eco-list {
    list-style: none;
    border-top: 1px solid var(--border-subtle);
  }

  .eco-list li {
    padding: 10px 0;
    padding-left: 26px;
    position: relative;
    border-bottom: 1px solid var(--border-subtle);
    font-size: 14px;
    line-height: 1.6;
  }

  .eco-icon {
    width: 16px;
    height: 16px;
    position: absolute;
    left: 0;
    top: 13px;
    color: var(--accent-dim);
    opacity: 0.6;
  }

  .eco-list a {
    font-weight: 500;
    color: var(--text-primary);
    text-decoration: none;
    transition: color 0.2s;
  }

  .eco-list a:hover {
    color: var(--accent);
  }

  .ext {
    display: inline;
    width: 10px;
    height: 10px;
    opacity: 0.35;
    vertical-align: middle;
    margin-left: 3px;
  }

  @media (max-width: 768px) {
    .ext { display: none; }
  }

  .eco-desc {
    color: var(--text-muted);
    font-size: 13px;
  }

  .eco-subheading {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-top: 20px;
    margin-bottom: 8px;
  }

  .eco-link-muted {
    font-weight: 500;
    color: var(--text-muted);
  }

  .eco-badge {
    font-size: 10px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    padding: 1px 6px;
    border-radius: 8px;
    margin-left: 4px;
  }

  .eco-badge.mature {
    color: #4ade80;
    background: rgba(74, 222, 128, 0.1);
  }

  .eco-badge.contributed {
    color: #60a5fa;
    background: rgba(96, 165, 250, 0.1);
  }

  .eco-badge.dev {
    color: var(--text-muted);
    background: rgba(255, 255, 255, 0.05);
  }

  .eco-desc code {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 11px;
    color: var(--text-secondary);
    background: rgba(255, 255, 255, 0.05);
    padding: 1px 5px;
    border-radius: 3px;
  }

  /* People */
  .people-group {
    margin-bottom: 24px;
  }

  .people-group h3 {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 12px;
  }

  .people-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 24px;
  }

  .person {
    padding: 8px 0;
  }

  .person-name {
    display: block;
    font-size: 15px;
    font-weight: 500;
    color: var(--text-primary);
    letter-spacing: 0.2px;
    text-decoration: none;
    transition: color 0.2s;
  }

  a.person-name:hover {
    color: var(--accent);
  }

  .person-role {
    display: block;
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 2px;
    line-height: 1.4;
  }

  /* Get involved */
  .involve-list {
    border-top: 1px solid var(--border-subtle);
  }

  .involve-item {
    padding: 12px 0;
    border-bottom: 1px solid var(--border-subtle);
  }

  .involve-item dt {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 4px;
    letter-spacing: 0.2px;
  }

  .involve-item dd {
    font-size: 13px;
    line-height: 1.7;
    color: var(--text-secondary);
    margin: 0;
  }

  /* Roadmap */
  .roadmap-version {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 13px;
    letter-spacing: 0.5px;
  }

  .roadmap-status {
    font-size: 11px;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 10px;
    margin-left: 8px;
  }

  .roadmap-status.available {
    color: #4ade80;
    background: rgba(74, 222, 128, 0.1);
  }

  .roadmap-status.ongoing {
    color: #facc15;
    background: rgba(250, 204, 21, 0.1);
  }

  .roadmap-status.planned {
    color: var(--text-muted);
    background: rgba(255, 255, 255, 0.05);
  }

  @media (max-width: 768px) {
    .about-page {
      padding: 32px 16px;
    }

    .eco-list li {
      padding: 8px 0 8px 26px;
      font-size: 13px;
    }

    .involve-item {
      padding: 10px 0;
    }
  }

  @media (max-width: 640px) {
    .people-list {
      grid-template-columns: 1fr;
    }
  }
</style>
