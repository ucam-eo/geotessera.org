<script lang="ts">
  import { link } from '@/lib/router';
  import Footer from '@/components/Footer.svelte';
</script>

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
        <a href="https://github.com/ucam-eo/tessera" target="_blank" rel="noopener">Tessera Training<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
        <span class="eco-desc">— Foundation model training code (MIT)</span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="14" height="14" rx="2"/><path d="M7 7h6M7 10h4"/></svg>
        <a href="https://pypi.org/project/geotessera/" target="_blank" rel="noopener">GeoTessera on PyPI<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
        <span class="eco-desc">— <code>pip install geotessera</code>, Python library for embeddings</span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7"/><path d="M10 3v14M3 10h14"/></svg>
        <a href="https://github.com/ucam-eo/geotessera" target="_blank" rel="noopener">GeoTessera Embeddings<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
        <span class="eco-desc">— Pre-computed global embeddings (CC0 license)</span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="16" height="11" rx="1.5"/><path d="M6 17h8M10 14v3"/></svg>
        <a href="https://github.com/ucam-eo/tee" target="_blank" rel="noopener">TEE<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
        <span class="eco-desc">— TESSERA Embeddings Explorer, interactive map viewer</span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l6 8 6-8"/><path d="M4 8l6 8 6-8"/></svg>
        <a href="https://github.com/ucam-eo/geotessera-examples" target="_blank" rel="noopener">Examples<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
        <span class="eco-desc">— Solar panel detection, UMAP visualisation, and more</span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><path d="M10 2a14 14 0 0 1 0 16M10 2a14 14 0 0 0 0 16M2.5 10h15"/></svg>
        <a href="https://github.com/ucam-eo/tessera-interactive-map" target="_blank" rel="noopener">Interactive Notebook<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
        <span class="eco-desc">— Jupyter notebook for interactive exploration</span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2h8l4 4v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/><path d="M12 2v4h4M7 10h6M7 14h4"/></svg>
        <a href="https://geotessera.readthedocs.io/" target="_blank" rel="noopener">Documentation<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
        <span class="eco-desc">— API reference and data documentation</span>
      </li>
    </ul>
  </section>

  <!-- People -->
  <section class="section" id="people">
    <h2>People</h2>

    <div class="people-group">
      <h3>Faculty</h3>
      <div class="people-list">
        <div class="person">
          <span class="person-name">Srinivasan Keshav</span>
          <span class="person-role">Robert Sansom Professor of Computer Science, Cambridge</span>
        </div>
        <div class="person">
          <span class="person-name">David A. Coomes</span>
          <span class="person-role">Professor of Forest Ecology, Cambridge</span>
        </div>
        <div class="person">
          <span class="person-name">Anil Madhavapeddy</span>
          <span class="person-role">Professor of Planetary Computing, Cambridge</span>
        </div>
        <div class="person">
          <span class="person-name">Sadiq Jaffer</span>
          <span class="person-role">Assistant Research Professor, Cambridge</span>
        </div>
      </div>
    </div>

    <div class="people-group">
      <h3>Researchers</h3>
      <div class="people-list">
        <div class="person">
          <span class="person-name">Zhengpeng Feng</span>
          <span class="person-role">PhD student</span>
        </div>
        <div class="person">
          <span class="person-name">Robin Young</span>
          <span class="person-role">PhD student</span>
        </div>
        <div class="person">
          <span class="person-name">Jovana Knezevic</span>
          <span class="person-role">PhD student</span>
        </div>
        <div class="person">
          <span class="person-name">Madeline C. Lisaius</span>
          <span class="person-role">Graduated PhD student</span>
        </div>
        <div class="person">
          <span class="person-name">James Ball</span>
          <span class="person-role">Postdoctoral researcher</span>
        </div>
      </div>
    </div>

    <div class="people-group">
      <h3>Collaborators</h3>
      <div class="people-list">
        <div class="person">
          <span class="person-name">Silja Sormunen</span>
          <span class="person-role">Researcher</span>
        </div>
        <div class="person">
          <span class="person-name">Toby Jackson</span>
          <span class="person-role">Senior research associate, University of Bristol</span>
        </div>
        <div class="person">
          <span class="person-name">Andrew Blake</span>
          <span class="person-role">Samsung AI Centre</span>
        </div>
        <div class="person">
          <span class="person-name">Clement Atzberger</span>
          <span class="person-role">Professor of Remote Sensing, BOKU Vienna</span>
        </div>
        <div class="person">
          <span class="person-name">Markus Immitzer</span>
          <span class="person-role">BOKU Vienna</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Get involved -->
  <section class="section" id="get-involved">
    <h2>Get involved</h2>
    <dl class="involve-list">
      <div class="involve-item">
        <dt>Request embeddings</dt>
        <dd>Need embeddings for a region or year (2017–2025) not yet covered? Open an <a href="https://github.com/ucam-eo/geotessera/issues/new?template=embedding-request.yml&labels=embedding-request" target="_blank" rel="noopener">embedding request</a> with your bounding box and we'll prioritise it.</dd>
      </div>
      <div class="involve-item">
        <dt>Contribute</dt>
        <dd>Code contributions are welcome across all repositories. See the <a href="https://github.com/ucam-eo/geotessera/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener">contributing guide</a> for details.</dd>
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
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid var(--border-subtle);
    font-size: 14px;
    line-height: 1.6;
  }

  .eco-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
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

  .eco-desc {
    color: var(--text-muted);
    font-size: 13px;
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

  @media (max-width: 640px) {
    .people-list {
      grid-template-columns: 1fr;
    }
  }
</style>
