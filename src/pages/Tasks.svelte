<script lang="ts">
  import Footer from '@/components/Footer.svelte';

  const arxivHtml = 'https://arxiv.org/html/2506.20380v6';
  const tutorials = 'https://geotessera.readthedocs.io/en/latest/tutorials.html';

  /** SVG path data for icons */
  const icons = {
    classification: 'M3 3h6v6H3zM11 3h6v6h-6zM3 11h6v6H3zM11 11h6v6h-6z',
    segmentation:   'M2 2h16v16H2zM2 10h16M10 2v16',
    regression:     'M4 10h4l2-6 2 12 2-6h4',
    tree:           'M10 3l-5 6h3l-3 5h3l-3 5h10l-3-5h3l-3-5h3z',
    solar:          'M10 2v3M10 15v3M2 10h3M15 10h3M4.2 4.2l2.1 2.1M13.7 13.7l2.1 2.1M4.2 15.8l2.1-2.1M13.7 6.3l2.1-2.1M7 7h6v6H7z',
    leaf:           'M12 3c-4.4 0-8 3-8 6.5S7.6 16 12 16s8-3 8-6.5S16.4 3 12 3z',
    doc:            'M6 2h8l4 4v12H6V2zM14 2v4h4M10 10h4M10 14h2',
    paper:          'M5 2h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM7 6h6M7 9h6M7 12h4',
    code:           'M7 7l-4 3 4 3M13 7l4 3-4 3M9 17l2-14',
    python:         'M9 2c-3 0-5 1.5-5 3.5V8h6v1H4c-2 0-3 1.5-3 3.5S2 16 4 16h2v-2.5c0-2 1.5-3.5 3.5-3.5h5c1.5 0 2.5-1 2.5-2.5V5.5C17 3.5 15 2 12 2zm-1 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z',
  };

  const extIcon = 'M3.5 1.5h7v7M10 2L4 8';
</script>

<div class="tasks-page">
  <header>
    <span class="page-label">Tasks</span>
    <p class="subtitle">Downstream applications of TESSERA embeddings</p>
  </header>

  <!-- Jump links -->
  <nav class="jump-links">
    <a href="#approaches">Approaches</a>
    <a href="#classification">Classification</a>
    <a href="#segmentation">Segmentation</a>
    <a href="#regression">Regression</a>
    <a href="#getting-started">Getting started</a>
    <a href="#papers">Papers</a>
  </nav>

  <!-- Approaches overview -->
  <section class="task-section" id="approaches">
    <h2>
      <svg class="section-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h14v14H3zM3 10h14M10 3v14"/></svg>
      <a href="#approaches">Downstream approaches</a>
    </h2>
    <p class="task-desc">
      TESSERA embeddings encode rich spectral-temporal information at every 10m pixel. Downstream models operate on these embeddings using one of three approaches, depending on what you need to predict. Each approach is illustrated below with benchmarks from the <a href="https://arxiv.org/abs/2506.20380" target="_blank" rel="noopener">CVPR 2026 paper</a> and community examples.
    </p>
  </section>

  <!-- Classification -->
  <section class="task-section" id="classification">
    <h2>
      <svg class="section-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.classification}/></svg>
      <a href="#classification">Classification</a>
    </h2>
    <p class="task-desc">
      Assign each pixel or patch a discrete label from a fixed set of categories. Use when the output is a class — for example, identifying crop types, land cover categories, or tree species. Typically uses a lightweight head (k-NN, linear, or small MLP) on top of the embeddings.
    </p>

    <h3 class="sub-heading">Paper benchmarks</h3>
    <ul class="example-list">
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.paper}/></svg>
        <div>
          <a href="{arxivHtml}#S4.SS2.SSS0.Px1" target="_blank" rel="noopener">TreeSatAI-TS — Tree Species Classification<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
          <span class="ex-desc">— Patch-based classification of tree species in Germany using multi-temporal embeddings.</span>
        </div>
      </li>
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.paper}/></svg>
        <div>
          <a href="{arxivHtml}#S4.SS2.SSS0.Px2" target="_blank" rel="noopener">Austrian Crop Classification<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
          <span class="ex-desc">— Pixel-wise crop type classification from annual satellite observations in Austria.</span>
        </div>
      </li>
    </ul>

    <h3 class="sub-heading">Examples</h3>
    <ul class="example-list">
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.solar}/></svg>
        <div>
          <a href="https://toao.com/blog/earth-observation-budget-solar-farms-tiny-model" target="_blank" rel="noopener">Finding Solar Farms with a 42k-Parameter Model<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
          <span class="ex-author">Sadiq Jaffer</span>
          <span class="ex-desc">— Detecting and mapping solar farms across the UK using a compact neural network on TESSERA embeddings.</span>
        </div>
      </li>
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.leaf}/></svg>
        <div>
          <a href="https://toao.com/blog/can-we-really-see-brambles-from-space" target="_blank" rel="noopener">Can a model trained on satellite data really find brambles on the ground?<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
          <span class="ex-author">Sadiq Jaffer</span>
          <span class="ex-desc">— A field validation study testing TESSERA-based bramble prediction against ground truth.</span>
        </div>
      </li>
    </ul>

    <h3 class="sub-heading">Tutorials</h3>
    <ul class="example-list">
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.python}/></svg>
        <div>
          <a href="{tutorials}#tutorial-2-point-sampling-workflow" target="_blank" rel="noopener">Point Sampling Workflow<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
          <span class="ex-desc">— Sample embeddings at specific coordinates for point-based classification tasks.</span>
        </div>
      </li>
    </ul>
  </section>

  <!-- Segmentation -->
  <section class="task-section" id="segmentation">
    <h2>
      <svg class="section-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.segmentation}/></svg>
      <a href="#segmentation">Segmentation</a>
    </h2>
    <p class="task-desc">
      Produce a per-pixel label map that delineates object boundaries. Use when you need spatial outlines — for example, detecting solar panel installations, field parcel boundaries, or building footprints. Typically uses a UNet or similar convolutional architecture on embedding patches.
    </p>

    <h3 class="sub-heading">Paper benchmarks</h3>
    <ul class="example-list">
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.paper}/></svg>
        <div>
          <a href="{arxivHtml}#S4.SS3.SSS0.Px1" target="_blank" rel="noopener">PASTIS-R — Field Parcel Segmentation<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
          <span class="ex-desc">— Delineation of agricultural field boundaries in France.</span>
        </div>
      </li>
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.paper}/></svg>
        <div>
          <a href="{arxivHtml}#S4.SS3.SSS0.Px2" target="_blank" rel="noopener">Austrian Crop Segmentation<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
          <span class="ex-desc">— Regional crop type semantic segmentation at field level in Austria.</span>
        </div>
      </li>
    </ul>

    <h3 class="sub-heading">Examples</h3>
    <ul class="example-list">
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.code}/></svg>
        <div>
          <a href="https://github.com/sadiqj/tessera-cnn-example" target="_blank" rel="noopener">TESSERA CNN/UNet Example<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
          <span class="ex-author">Sadiq Jaffer</span>
          <span class="ex-desc">— Example CNN and UNet architectures for downstream classification and segmentation tasks.</span>
        </div>
      </li>
    </ul>

    <h3 class="sub-heading">Tutorials</h3>
    <ul class="example-list">
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.python}/></svg>
        <div>
          <a href="{tutorials}#tutorial-3-gis-integration-workflow" target="_blank" rel="noopener">GIS Integration Workflow<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
          <span class="ex-desc">— Integrate TESSERA data with GIS tools for land cover mapping and spatial analysis.</span>
        </div>
      </li>
    </ul>
  </section>

  <!-- Regression -->
  <section class="task-section" id="regression">
    <h2>
      <svg class="section-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.regression}/></svg>
      <a href="#regression">Regression</a>
    </h2>
    <p class="task-desc">
      Predict a continuous value at each pixel. Use when the output is a measurement — for example, estimating canopy height in metres or above-ground biomass in tonnes per hectare. Same model architectures as segmentation, but with a continuous output instead of discrete classes.
    </p>

    <h3 class="sub-heading">Paper benchmarks</h3>
    <ul class="example-list">
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.paper}/></svg>
        <div>
          <a href="{arxivHtml}#S4.SS4.SSS0.Px1" target="_blank" rel="noopener">Biomassters — Above-Ground Biomass Estimation<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
          <span class="ex-desc">— Predicting forest above-ground biomass in tonnes per hectare in Finland.</span>
        </div>
      </li>
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.tree}/></svg>
        <div>
          <a href="{arxivHtml}#S4.SS4.SSS0.Px2" target="_blank" rel="noopener">Borneo Canopy Height<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
          <span class="ex-desc">— Estimating forest canopy height in metres from satellite embeddings in Malaysia.</span>
        </div>
      </li>
    </ul>

    <h3 class="sub-heading">Tutorials</h3>
    <ul class="example-list">
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.python}/></svg>
        <div>
          <a href="{tutorials}#tutorial-4-large-scale-analysis" target="_blank" rel="noopener">Large-Scale Analysis<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
          <span class="ex-desc">— Work with large regions efficiently, handling tiling and batch processing of embeddings.</span>
        </div>
      </li>
    </ul>
  </section>

  <!-- Getting started -->
  <section class="task-section" id="getting-started">
    <h2>
      <svg class="section-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.doc}/></svg>
      <a href="#getting-started">Getting started</a>
    </h2>
    <p class="task-desc">
      The <a href="https://geotessera.readthedocs.io" target="_blank" rel="noopener">geotessera</a> Python library provides access to TESSERA embeddings for analysis and downstream tasks.
    </p>
    <ul class="example-list">
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.python}/></svg>
        <div>
          <a href="{tutorials}#tutorial-1-basic-data-analysis" target="_blank" rel="noopener">Basic Data Analysis<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
          <span class="ex-desc">— Load TESSERA embeddings for a location and explore the data structure, dimensions, and basic statistics.</span>
        </div>
      </li>
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.python}/></svg>
        <div>
          <a href="{tutorials}#tutorial-6-custom-analysis-workflows" target="_blank" rel="noopener">Custom Analysis Workflows<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
          <span class="ex-desc">— Build custom pipelines including PCA dimensionality reduction on TESSERA embeddings.</span>
        </div>
      </li>
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.python}/></svg>
        <div>
          <a href="{tutorials}#tutorial-7-cloud-native-analysis-with-zarr" target="_blank" rel="noopener">Cloud-Native Analysis with Zarr<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
          <span class="ex-desc">— Access TESSERA data directly from cloud storage using the Zarr format for scalable workflows.</span>
        </div>
      </li>
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.code}/></svg>
        <div>
          <a href="https://github.com/sadiqj/tessera-cnn-example" target="_blank" rel="noopener">CNN/UNet Architecture Example<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
          <span class="ex-author">Sadiq Jaffer</span>
          <span class="ex-desc">— Reference implementations of CNN and UNet architectures for downstream tasks on TESSERA embeddings.</span>
        </div>
      </li>
    </ul>
  </section>

  <!-- Papers -->
  <section class="task-section" id="papers">
    <h2>
      <svg class="section-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.paper}/></svg>
      <a href="#papers">Papers</a>
    </h2>
    <p class="task-desc">
      The benchmarks above are evaluated in these publications. All six benchmarks spanning classification, segmentation, and regression are from the CVPR paper; the SSRN paper extends to wildfire detection, biomass prediction, and carbon market stocking indices.
    </p>
    <ul class="example-list">
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.paper}/></svg>
        <div>
          <a href="https://arxiv.org/abs/2506.20380" target="_blank" rel="noopener">TESSERA: Temporal Embeddings of Surface Spectra for Earth Representation and Analysis<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
          <span class="ex-author">Feng et al., CVPR 2026</span>
        </div>
      </li>
      <li>
        <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.paper}/></svg>
        <div>
          <a href="https://ssrn.com/abstract=6142416" target="_blank" rel="noopener">Applications of the TESSERA Geospatial Foundation Model to Diverse Environmental Mapping Tasks<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
          <span class="ex-author">Feng et al., SSRN preprint</span>
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

  /* Sub-headings within sections */
  .sub-heading {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin: 20px 0 0;
    opacity: 0.7;
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
</style>
