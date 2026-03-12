<script lang="ts">
  import { siteConfig } from '@/lib/config';
  import { getContentByTag, type ContentMeta } from '@/lib/content';
  import { link } from '@/lib/router';
  import Footer from '@/components/Footer.svelte';

  const arxivHtml = 'https://arxiv.org/html/2506.20380v6';

  /** SVG path data for icons */
  const icons = {
    classification: 'M3 3h6v6H3zM11 3h6v6h-6zM3 11h6v6H3zM11 11h6v6h-6z',
    segmentation:   'M2 2h16v16H2zM2 10h16M10 2v16',
    regression:     'M4 10h4l2-6 2 12 2-6h4',
    'canopy-height':'M10 2v16M6 8l4-6 4 6M4 14l6-4 6 4',
    'land-cover':   'M2 14l5-4 3 2 4-6 4 5M2 16h16',
    'crop-mapping': 'M10 2v5M6 4l4 3 4-3M4 10c0-3 2.7-5 6-5s6 2 6 5M7 10v6M10 10v6M13 10v6',
    solar:          'M10 2v3M10 15v3M2 10h3M15 10h3M4.2 4.2l2.1 2.1M13.7 13.7l2.1 2.1M4.2 15.8l2.1-2.1M13.7 6.3l2.1-2.1M7 7h6v6H7z',
    'change-detection': 'M3 10a7 7 0 0 1 14 0M5 10a5 5 0 0 1 10 0M8 10a2 2 0 0 1 4 0',
    biomass:        'M10 18V8M6 12l4-4 4 4M4 18h12',
    tree:           'M10 3l-5 6h3l-3 5h3l-3 5h10l-3-5h3l-3-5h3z',
    community:      'M10 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM4 17c0-3.3 2.7-6 6-6s6 2.7 6 6M16 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 15c0-2-1.3-3.5-3-4',
    leaf:           'M12 3c-4.4 0-8 3-8 6.5S7.6 16 12 16s8-3 8-6.5S16.4 3 12 3z',
    doc:            'M6 2h8l4 4v12H6V2zM14 2v4h4M10 10h4M10 14h2',
  };

  // Build application task sections with their examples
  let taskSections = $derived(
    siteConfig.tasks.map((task) => ({
      ...task,
      icon: (icons as Record<string, string>)[task.tag] ?? icons.doc,
      examples: getContentByTag(task.tag).filter((e) => e.type === 'task'),
    }))
  );
</script>

<div class="tasks-page">
  <header>
    <span class="page-label">Tasks</span>
    <p class="subtitle">Downstream applications of TESSERA embeddings</p>
  </header>

  <!-- Jump links -->
  <nav class="jump-links">
    <a href="#approaches">Approaches</a>
    {#each taskSections as task}
      <a href="#{task.tag}">
        <svg class="jump-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={task.icon}/></svg>
        {task.name}
      </a>
    {/each}
    <a href="#paper-benchmarks">Benchmarks</a>
    <a href="#community-examples">Community</a>
  </nav>

  <!-- Approaches overview -->
  <section class="task-section" id="approaches">
    <h2>
      <svg class="section-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h14v14H3zM3 10h14M10 3v14"/></svg>
      <a href="#approaches">Downstream approaches</a>
    </h2>
    <p class="task-desc">
      TESSERA embeddings encode rich spectral-temporal information at every 10m pixel. Downstream models operate on these embeddings using one of three approaches, depending on what you need to predict.
    </p>
    <dl class="approach-list">
      <div class="approach-item" id="approach-classification">
        <dt>
          <svg class="approach-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.classification}/></svg>
          Classification
        </dt>
        <dd>Assign each pixel or patch a discrete label from a fixed set of categories. Use when the output is a class — for example, identifying <a href="#crop-mapping">crop types</a>, <a href="#land-cover">land cover categories</a>, or tree species. Typically uses a lightweight head (k-NN, linear, or small MLP) on top of the embeddings.</dd>
      </div>
      <div class="approach-item" id="approach-segmentation">
        <dt>
          <svg class="approach-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.segmentation}/></svg>
          Segmentation
        </dt>
        <dd>Produce a per-pixel label map that delineates object boundaries. Use when you need spatial outlines — for example, detecting <a href="#solar">solar panel installations</a>, field parcel boundaries, or building footprints. Typically uses a UNet or similar convolutional architecture on embedding patches.</dd>
      </div>
      <div class="approach-item" id="approach-regression">
        <dt>
          <svg class="approach-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.regression}/></svg>
          Regression
        </dt>
        <dd>Predict a continuous value at each pixel. Use when the output is a measurement — for example, estimating <a href="#canopy-height">canopy height</a> in metres or above-ground biomass in tonnes per hectare. Same model architectures as segmentation, but with a continuous output instead of discrete classes.</dd>
      </div>
    </dl>
  </section>

  <!-- Application task sections -->
  {#each taskSections as task}
    <section class="task-section" id={task.tag}>
      <h2>
        <svg class="section-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={task.icon}/></svg>
        <a href="#{task.tag}">{task.name}</a>
      </h2>
      <p class="task-desc">{task.description}</p>
      {#if task.examples.length > 0}
        <ul class="example-list">
          {#each task.examples as ex}
            <li>
              <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.doc}/></svg>
              <div>
                <a href={ex.href} use:link>{ex.title}</a>
                {#if ex.languages?.length}
                  <span class="ex-langs">{ex.languages.join(' · ')}</span>
                {/if}
                {#if ex.description}
                  <span class="ex-desc">— {ex.description}</span>
                {/if}
              </div>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="empty">No examples yet.</p>
      {/if}
    </section>
  {/each}

  <!-- Paper benchmarks -->
  <section class="task-section" id="paper-benchmarks">
    <h2>
      <svg class="section-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 2h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM7 6h6M7 9h6M7 12h4"/></svg>
      <a href="#paper-benchmarks">Paper benchmarks</a>
    </h2>
    <p class="task-desc">
      Evaluated in <a href="https://arxiv.org/abs/2506.20380" target="_blank" rel="noopener">Feng et al., CVPR 2026</a>
      across six benchmarks spanning classification, segmentation, and regression.
      See also <a href="https://ssrn.com/abstract=6142416" target="_blank" rel="noopener">Feng et al., "Applications of the TESSERA Geospatial Foundation Model to Diverse Environmental Mapping Tasks"</a> for downstream evaluations on crop classification, wildfire burn area detection, canopy height, biomass prediction, and carbon market stocking indices.
    </p>
    <ul class="example-list">
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.classification}/></svg>
        <div>
          <a href="{arxivHtml}#S4.SS2.SSS0.Px1" target="_blank" rel="noopener">TreeSatAI-TS — Tree Species Classification<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
          <span class="ex-desc">— Patch-based classification of tree species in Germany using multi-temporal embeddings.</span>
        </div>
      </li>
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.classification}/></svg>
        <div>
          <a href="{arxivHtml}#S4.SS2.SSS0.Px2" target="_blank" rel="noopener">Austrian Crop Classification<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
          <span class="ex-desc">— Pixel-wise crop type classification from annual satellite observations in Austria.</span>
        </div>
      </li>
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.segmentation}/></svg>
        <div>
          <a href="{arxivHtml}#S4.SS3.SSS0.Px1" target="_blank" rel="noopener">PASTIS-R — Field Parcel Segmentation<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
          <span class="ex-desc">— Delineation of agricultural field boundaries in France.</span>
        </div>
      </li>
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.segmentation}/></svg>
        <div>
          <a href="{arxivHtml}#S4.SS3.SSS0.Px2" target="_blank" rel="noopener">Austrian Crop Segmentation<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
          <span class="ex-desc">— Regional crop type semantic segmentation at field level in Austria.</span>
        </div>
      </li>
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.regression}/></svg>
        <div>
          <a href="{arxivHtml}#S4.SS4.SSS0.Px1" target="_blank" rel="noopener">Biomassters — Above-Ground Biomass Estimation<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
          <span class="ex-desc">— Predicting forest above-ground biomass in tonnes per hectare in Finland.</span>
        </div>
      </li>
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons['canopy-height']}/></svg>
        <div>
          <a href="{arxivHtml}#S4.SS4.SSS0.Px2" target="_blank" rel="noopener">Borneo Canopy Height<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
          <span class="ex-desc">— Estimating forest canopy height in metres from satellite embeddings in Malaysia.</span>
        </div>
      </li>
    </ul>
  </section>

  <!-- Community examples -->
  <section class="task-section" id="community-examples">
    <h2>
      <svg class="section-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.community}/></svg>
      <a href="#community-examples">Community examples</a>
    </h2>
    <p class="task-desc">Tutorials, blog posts, and code from the TESSERA community</p>
    <ul class="example-list">
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.solar}/></svg>
        <div>
          <a href="https://toao.com/blog/earth-observation-budget-solar-farms-tiny-model" target="_blank" rel="noopener">Finding Solar Farms with a 42k-Parameter Model<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
          <span class="ex-author">Sadiq Jaffer</span>
          <span class="ex-desc">— Detecting and mapping solar farms across the UK using a compact neural network on TESSERA embeddings.</span>
        </div>
      </li>
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.segmentation}/></svg>
        <div>
          <a href="https://github.com/sadiqj/tessera-cnn-example" target="_blank" rel="noopener">TESSERA CNN/UNet Example<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
          <span class="ex-author">Sadiq Jaffer</span>
          <span class="ex-desc">— Example CNN and UNet architectures for downstream classification and segmentation tasks.</span>
        </div>
      </li>
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.leaf}/></svg>
        <div>
          <a href="https://toao.com/blog/can-we-really-see-brambles-from-space" target="_blank" rel="noopener">Can a model trained on satellite data really find brambles on the ground?<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 1.5h7v7M10 2L4 8"/></svg></a>
          <span class="ex-author">Sadiq Jaffer</span>
          <span class="ex-desc">— A field validation study testing TESSERA-based bramble prediction against ground truth.</span>
        </div>
      </li>
    </ul>
  </section>

  <Footer />
</div>

<style>
  .tasks-page {
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

  /* Jump links */
  .jump-links {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 16px;
    margin-bottom: 36px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border-subtle);
  }

  .jump-links a {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
    color: var(--text-muted);
    text-decoration: none;
    letter-spacing: 0.5px;
    transition: color 0.2s;
  }

  .jump-icon {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    opacity: 0.5;
  }

  .jump-links a:hover .jump-icon {
    opacity: 0.9;
  }

  .jump-links a:hover {
    color: var(--accent);
  }

  /* Task sections */
  .task-section {
    margin-bottom: 36px;
    scroll-margin-top: calc(var(--nav-height) + 16px);
  }

  .task-section h2 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent-dim);
    margin-bottom: 6px;
    opacity: 0.8;
  }

  .section-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    opacity: 0.7;
  }

  .task-section h2 a {
    color: inherit;
    text-decoration: none;
  }

  .task-section h2 a:hover {
    opacity: 1;
  }

  .task-desc {
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-secondary);
    margin-bottom: 12px;
  }

  .task-desc a {
    color: var(--accent-dim);
    text-decoration: none;
  }

  .task-desc a:hover {
    text-decoration: underline;
  }

  /* Approaches list */
  .approach-list {
    border-top: 1px solid var(--border-subtle);
  }

  .approach-item {
    padding: 14px 0;
    border-bottom: 1px solid var(--border-subtle);
    scroll-margin-top: calc(var(--nav-height) + 16px);
  }

  .approach-item dt {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 6px;
    letter-spacing: 0.3px;
  }

  .approach-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--accent-dim);
    opacity: 0.7;
  }

  .approach-item dd {
    font-size: 13px;
    line-height: 1.7;
    color: var(--text-secondary);
    margin: 0;
  }

  .approach-item dd a {
    color: var(--accent-dim);
    text-decoration: none;
  }

  .approach-item dd a:hover {
    text-decoration: underline;
  }

  /* Example lists */
  .example-list {
    list-style: none;
    border-top: 1px solid var(--border-subtle);
  }

  .example-list li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid var(--border-subtle);
    font-size: 14px;
    line-height: 1.6;
  }

  .li-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--accent-dim);
    opacity: 0.5;
    margin-top: 3px;
  }

  .example-list a {
    font-weight: 500;
    color: var(--text-primary);
    text-decoration: none;
    transition: color 0.2s;
  }

  .example-list a:hover {
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

  .ex-langs {
    font-size: 11px;
    color: var(--accent-dim);
    margin-left: 8px;
    letter-spacing: 0.5px;
  }

  .ex-author {
    display: block;
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 2px;
  }

  .ex-desc {
    color: var(--text-muted);
    font-size: 13px;
  }

  .empty {
    font-size: 13px;
    color: var(--text-faint);
    font-style: italic;
  }
</style>
