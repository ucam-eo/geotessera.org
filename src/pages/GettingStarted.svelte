<script lang="ts">
  import { link } from '@/lib/router';
  import Footer from '@/components/Footer.svelte';
  import CropUmap from '@/components/CropUmap.svelte';

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
    globe:          'M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 2a6 6 0 0 1 4.9 9.4L5.6 4.1A6 6 0 0 1 10 4z',
  };

  const extIcon = 'M3.5 1.5h7v7M10 2L4 8';

  const gettingStartedJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Getting Started with TESSERA',
    description: 'Libraries, tools, tutorials, and downstream applications of TESSERA embeddings',
    url: 'https://geotessera.org/getting-started',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://geotessera.org' },
        { '@type': 'ListItem', position: 2, name: 'Getting Started' },
      ],
    },
  });
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${gettingStartedJsonLd}</script>`}
</svelte:head>

<div class="gs-page">
  <header>
    <span class="page-label">Getting Started</span>
    <p class="subtitle">Libraries, tools, tutorials, and downstream applications of TESSERA embeddings</p>
  </header>

  <!-- Jump links -->
  <nav class="jump-links">
    <a href="#ecosystem">Ecosystem</a>
    <a href="#tools">Tools &amp; Resources</a>
    <a href="#what-you-can-do">What you can do</a>
    <a href="#get-involved">Get involved</a>
  </nav>

  <!-- Ecosystem -->
  <section class="section" id="ecosystem">
    <h2>Ecosystem</h2>
    <ul class="eco-list">
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0-1.4l-1.6-1.6a1 1 0 0 0-1.4 0l-2 2 3 3zM3 13.5V17h3.5L13.4 10l-3-3z"/></svg>
        <a href="https://github.com/ucam-eo/tessera" target="_blank" rel="noopener">Tessera Training&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
        <span class="eco-desc">— Foundation model training code (MIT)</span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7"/><path d="M10 3v14M3 10h14"/></svg>
        <a href="https://github.com/ucam-eo/geotessera" target="_blank" rel="noopener">GeoTessera Embeddings&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
        <span class="eco-desc">— Pre-computed global embeddings (CC0 license). <a href="/coverage" use:link>View coverage</a></span>
      </li>
    </ul>

    <h3 class="eco-subheading">Language libraries</h3>
    <ul class="eco-list">
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="14" height="14" rx="2"/><path d="M7 7h6M7 10h4"/></svg>
        <a href="https://pypi.org/project/geotessera/" target="_blank" rel="noopener">Python&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
        <span class="eco-desc">— <code>pip install geotessera</code> <span class="eco-badge mature">mature</span></span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="14" height="14" rx="2"/><path d="M7 7h6M7 10h4"/></svg>
        <a href="https://lassa-sentinel.github.io/GeoTessera/" target="_blank" rel="noopener">R&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
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
  </section>

  <!-- Tools & Resources -->
  <section class="section" id="tools">
    <h2>Tools &amp; Resources</h2>
    <ul class="eco-list">
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="16" height="11" rx="1.5"/><path d="M6 17h8M10 14v3"/></svg>
        <a href="https://github.com/ucam-eo/tee" target="_blank" rel="noopener">TEE&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
        <span class="eco-desc">— TESSERA Embeddings Explorer, interactive map viewer</span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l6 8 6-8"/><path d="M4 8l6 8 6-8"/></svg>
        <a href="https://github.com/ucam-eo/geotessera-examples" target="_blank" rel="noopener">Examples&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
        <span class="eco-desc">— Solar panel detection, UMAP visualisation, and more</span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3v4l3 2"/><circle cx="10" cy="10" r="7"/></svg>
        <a href="https://isaac.earth/geospatial-skills" target="_blank" rel="noopener">Geospatial Skills for Claude&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
        <span class="eco-desc">— Claude Code skills for working with TESSERA via Python and R, by <a href="https://github.com/isaaccorley" target="_blank" rel="noopener">Isaac Corley</a> <span class="eco-badge contributed">contributed</span></span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><path d="M10 2a14 14 0 0 1 0 16M10 2a14 14 0 0 0 0 16M2.5 10h15"/></svg>
        <a href="https://github.com/ucam-eo/tessera-interactive-map" target="_blank" rel="noopener">Interactive Notebook&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
        <span class="eco-desc">— Jupyter notebook for interactive exploration</span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l6 8 6-8"/><path d="M4 8l6 8 6-8"/></svg>
        <a href="https://www.linkedin.com/pulse/from-pixels-embeddings-tessera-earth-observation-gijs-van-den-dool-uti7e/" target="_blank" rel="noopener">TESSERA on Google Colab&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
        <span class="eco-desc">— Custom inference pipeline for running TESSERA in Google Colab, by <a href="https://www.linkedin.com/in/gijsvandendool/" target="_blank" rel="noopener">Gijs van den Dool</a> <span class="eco-badge contributed">contributed</span></span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h14M3 6l2-3h10l2 3M3 6v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6M8 10h4"/></svg>
        <a href="https://github.com/montimaj/agribound" target="_blank" rel="noopener">Agribound&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
        <span class="eco-desc">— Agricultural field boundary delineation using TESSERA embeddings, by <a href="https://www.linkedin.com/in/siddharth-majumdar/" target="_blank" rel="noopener">Siddharth Majumdar</a> <span class="eco-badge contributed">contributed</span></span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2h8l4 4v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/><path d="M12 2v4h4M7 10h6M7 14h4"/></svg>
        <a href="https://geotessera.readthedocs.io/" target="_blank" rel="noopener">Documentation&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
        <span class="eco-desc">— API reference and data documentation</span>
      </li>
      <li>
        <svg class="eco-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="16" height="11" rx="1.5"/><path d="M6 17h8M10 14v3"/></svg>
        <a href="https://tee.cl.cam.ac.uk/user_guide.html" target="_blank" rel="noopener">TEE User Guide&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
        <span class="eco-desc">— Guide for the TESSERA Embeddings Explorer</span>
      </li>
    </ul>
  </section>

  <!-- What you can do -->
  <section class="section" id="what-you-can-do">
    <h2>What you can do</h2>
    <p class="section-intro">
      TESSERA embeddings encode rich spectral-temporal information at every 10m pixel. Downstream models operate on these embeddings using one of three approaches, depending on what you need to predict. Each approach is illustrated below with benchmarks from the <a href="https://arxiv.org/abs/2506.20380" target="_blank" rel="noopener">CVPR 2026 paper</a> and community examples.
    </p>

    <!-- Classification -->
    <div class="task-block" id="classification">
      <h3>
        <svg class="section-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.classification}/></svg>
        <a href="#classification">Classification</a>
      </h3>
      <p class="task-desc">
        Assign each pixel or patch a discrete label from a fixed set of categories. Use when the output is a class — for example, identifying crop types, land cover categories, or tree species. Typically uses a lightweight head (k-NN, linear, or small MLP) on top of the embeddings.
      </p>

      <h4 class="sub-heading">Paper benchmarks</h4>
      <ul class="example-list">
        <li>
          <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.paper}/></svg>
          <div>
            <a href="{arxivHtml}#S4.SS2.SSS0.Px1" target="_blank" rel="noopener">TreeSatAI-TS — Tree Species Classification&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
            <span class="ex-desc">— Patch-based classification of tree species in Germany using multi-temporal embeddings.</span>
          </div>
        </li>
        <li>
          <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.paper}/></svg>
          <div>
            <a href="{arxivHtml}#S4.SS2.SSS0.Px2" target="_blank" rel="noopener">Austrian Crop Classification&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
            <span class="ex-desc">— Pixel-wise crop type classification from annual satellite observations in Austria.</span>
          </div>
        </li>
      </ul>

      <h4 class="sub-heading">Examples</h4>
      <ul class="example-list">
        <li>
          <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.solar}/></svg>
          <div>
            <a href="https://toao.com/blog/earth-observation-budget-solar-farms-tiny-model" target="_blank" rel="noopener">Finding Solar Farms with a 42k-Parameter Model&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
            <span class="ex-author">Sadiq Jaffer</span>
            <span class="ex-desc">— Detecting and mapping solar farms across the UK using a compact neural network on TESSERA embeddings.</span>
          </div>
        </li>
        <li>
          <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.leaf}/></svg>
          <div>
            <a href="https://toao.com/blog/can-we-really-see-brambles-from-space" target="_blank" rel="noopener">Can a model trained on satellite data really find brambles on the ground?&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
            <span class="ex-author">Sadiq Jaffer</span>
            <span class="ex-desc">— A field validation study testing TESSERA-based bramble prediction against ground truth.</span>
          </div>
        </li>
        <li>
          <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.globe}/></svg>
          <div>
            <span class="ex-title">CROME-TESSERA 3D Crop UMAP</span>
            <span class="ex-author">Sadiq Jaffer</span>
            <span class="ex-desc">— Interactive 3D UMAP of 210k crop cells from England's CROME 2024, coloured by crop class and linked to satellite imagery. <a href="/crop-umap" use:link class="fullscreen-reveal">Open dedicated viewer.</a></span>
          </div>
        </li>
      </ul>

      <CropUmap />

      <h4 class="sub-heading">Tutorials</h4>
      <ul class="example-list">
        <li>
          <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.python}/></svg>
          <div>
            <a href="{tutorials}#tutorial-2-point-sampling-workflow" target="_blank" rel="noopener">Point Sampling Workflow&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
            <span class="ex-desc">— Sample embeddings at specific coordinates for point-based classification tasks.</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- Segmentation -->
    <div class="task-block" id="segmentation">
      <h3>
        <svg class="section-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.segmentation}/></svg>
        <a href="#segmentation">Segmentation</a>
      </h3>
      <p class="task-desc">
        Produce a per-pixel label map that delineates object boundaries. Use when you need spatial outlines — for example, detecting solar panel installations, field parcel boundaries, or building footprints. Typically uses a UNet or similar convolutional architecture on embedding patches.
      </p>

      <h4 class="sub-heading">Paper benchmarks</h4>
      <ul class="example-list">
        <li>
          <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.paper}/></svg>
          <div>
            <a href="{arxivHtml}#S4.SS3.SSS0.Px1" target="_blank" rel="noopener">PASTIS-R — Field Parcel Segmentation&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
            <span class="ex-desc">— Delineation of agricultural field boundaries in France.</span>
          </div>
        </li>
        <li>
          <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.paper}/></svg>
          <div>
            <a href="{arxivHtml}#S4.SS3.SSS0.Px2" target="_blank" rel="noopener">Austrian Crop Segmentation&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
            <span class="ex-desc">— Regional crop type semantic segmentation at field level in Austria.</span>
          </div>
        </li>
      </ul>

      <h4 class="sub-heading">Examples</h4>
      <ul class="example-list">
        <li>
          <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.code}/></svg>
          <div>
            <a href="https://github.com/sadiqj/tessera-cnn-example" target="_blank" rel="noopener">TESSERA CNN/UNet Example&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
            <span class="ex-author">Sadiq Jaffer</span>
            <span class="ex-desc">— Example CNN and UNet architectures for downstream classification and segmentation tasks.</span>
          </div>
        </li>
      </ul>

      <h4 class="sub-heading">Tutorials</h4>
      <ul class="example-list">
        <li>
          <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.python}/></svg>
          <div>
            <a href="{tutorials}#tutorial-3-gis-integration-workflow" target="_blank" rel="noopener">GIS Integration Workflow&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
            <span class="ex-desc">— Integrate TESSERA data with GIS tools for land cover mapping and spatial analysis.</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- Regression -->
    <div class="task-block" id="regression">
      <h3>
        <svg class="section-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.regression}/></svg>
        <a href="#regression">Regression</a>
      </h3>
      <p class="task-desc">
        Predict a continuous value at each pixel. Use when the output is a measurement — for example, estimating canopy height in metres or above-ground biomass in tonnes per hectare. Same model architectures as segmentation, but with a continuous output instead of discrete classes.
      </p>

      <h4 class="sub-heading">Paper benchmarks</h4>
      <ul class="example-list">
        <li>
          <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.paper}/></svg>
          <div>
            <a href="{arxivHtml}#S4.SS4.SSS0.Px1" target="_blank" rel="noopener">Biomassters — Above-Ground Biomass Estimation&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
            <span class="ex-desc">— Predicting forest above-ground biomass in tonnes per hectare in Finland.</span>
          </div>
        </li>
        <li>
          <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.tree}/></svg>
          <div>
            <a href="{arxivHtml}#S4.SS4.SSS0.Px2" target="_blank" rel="noopener">Borneo Canopy Height&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
            <span class="ex-desc">— Estimating forest canopy height in metres from satellite embeddings in Malaysia.</span>
          </div>
        </li>
      </ul>

      <h4 class="sub-heading">Tutorials</h4>
      <ul class="example-list">
        <li>
          <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.python}/></svg>
          <div>
            <a href="{tutorials}#tutorial-4-large-scale-analysis" target="_blank" rel="noopener">Large-Scale Analysis&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
            <span class="ex-desc">— Work with large regions efficiently, handling tiling and batch processing of embeddings.</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- Tutorials & Getting started -->
    <div class="task-block" id="tutorials">
      <h3>
        <svg class="section-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.doc}/></svg>
        <a href="#tutorials">Tutorials</a>
      </h3>
      <p class="task-desc">
        The <a href="https://geotessera.readthedocs.io" target="_blank" rel="noopener">geotessera</a> Python library provides access to TESSERA embeddings for analysis and downstream tasks.
      </p>
      <ul class="example-list">
        <li>
          <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.python}/></svg>
          <div>
            <a href="{tutorials}#tutorial-1-basic-data-analysis" target="_blank" rel="noopener">Basic Data Analysis&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
            <span class="ex-desc">— Load TESSERA embeddings for a location and explore the data structure, dimensions, and basic statistics.</span>
          </div>
        </li>
        <li>
          <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.python}/></svg>
          <div>
            <a href="{tutorials}#tutorial-6-custom-analysis-workflows" target="_blank" rel="noopener">Custom Analysis Workflows&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
            <span class="ex-desc">— Build custom pipelines including PCA dimensionality reduction on TESSERA embeddings.</span>
          </div>
        </li>
        <li>
          <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.python}/></svg>
          <div>
            <a href="{tutorials}#tutorial-7-cloud-native-analysis-with-zarr" target="_blank" rel="noopener">Cloud-Native Analysis with Zarr&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
            <span class="ex-desc">— Access TESSERA data directly from cloud storage using the Zarr format for scalable workflows.</span>
          </div>
        </li>
        <li>
          <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.code}/></svg>
          <div>
            <a href="https://github.com/sadiqj/tessera-cnn-example" target="_blank" rel="noopener">CNN/UNet Architecture Example&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
            <span class="ex-author">Sadiq Jaffer</span>
            <span class="ex-desc">— Reference implementations of CNN and UNet architectures for downstream tasks on TESSERA embeddings.</span>
          </div>
        </li>
      </ul>
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

  <Footer />
</div>

<style>
  .gs-page {
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
    gap: 8px;
    margin-bottom: 36px;
    padding: 14px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .jump-links a {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 5px 14px;
    border: 1px solid var(--accent-border);
    border-radius: 20px;
    color: var(--text-muted);
    text-decoration: none;
    transition: all 0.2s;
  }

  .jump-links a:hover {
    color: var(--accent-dim);
    border-color: var(--accent-dim);
  }

  /* Sections */
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

  .section-intro {
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-secondary);
    margin-bottom: 20px;
  }

  .section-intro a {
    color: var(--accent-dim);
    text-decoration: none;
  }

  .section-intro a:hover {
    text-decoration: underline;
  }

  /* Task blocks (h3 subsections under "What you can do") */
  .task-block {
    margin-bottom: 32px;
    padding-top: 16px;
    border-top: 1px solid var(--border-subtle);
    scroll-margin-top: calc(var(--nav-height) + 16px);
  }

  .task-block h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 2.5px;
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

  .task-block h3 a {
    color: inherit;
    text-decoration: none;
  }

  .task-block h3 a:hover {
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

  /* Sub-headings within task blocks */
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
  }

  .example-list li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 6px 0;
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

  .ex-author {
    display: block;
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 2px;
  }

  .ex-title {
    font-weight: 500;
    color: var(--text-primary);
  }

  .ex-desc {
    color: var(--text-muted);
    font-size: 13px;
  }

  .fullscreen-reveal {
    color: var(--accent-dim);
    text-decoration: none;
    cursor: pointer;
  }

  .fullscreen-reveal:hover {
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

  .eco-desc a {
    color: var(--accent-dim);
    text-decoration: none;
  }

  .eco-desc a:hover {
    text-decoration: underline;
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

  .involve-item a {
    color: var(--accent-dim);
    text-decoration: none;
  }

  .involve-item a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .gs-page {
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
</style>
