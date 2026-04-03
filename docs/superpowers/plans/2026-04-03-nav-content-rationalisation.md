# Nav & Content Rationalisation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Slim the nav from 9+2 items to 6+1 by creating a Getting Started page (combining ecosystem, tasks, get-involved), trimming About to team/mission, and folding Coverage into the Explore dropdown.

**Architecture:** The Getting Started page (`GettingStarted.svelte`) absorbs content from three sources: the Ecosystem and Get Involved sections currently on About, and the entire Tasks page. About loses those sections plus the Projects preview. The nav drops Tasks, Coverage, and the Docs dropdown. Task sub-routes (`/tasks/:tag`, `/tasks/:tag/:slug`) keep working by redirecting to Getting Started.

**Tech Stack:** Svelte 5 (runes), TypeScript, existing router in `src/lib/router.ts`

---

### Task 1: Create the Getting Started page

**Files:**
- Create: `src/pages/GettingStarted.svelte`

This is the largest task — it assembles content from About's Ecosystem + Get Involved sections and the full Tasks page into a single new page.

- [ ] **Step 1: Create `src/pages/GettingStarted.svelte`**

```svelte
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
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify({
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
  })}</script>`}
</svelte:head>

<div class="gs-page">
  <header>
    <span class="page-label">Getting Started</span>
    <p class="subtitle">Libraries, tools, tutorials, and downstream applications of TESSERA embeddings</p>
  </header>

  <!-- Jump links -->
  <nav class="jump-links">
    <a href="#ecosystem">Ecosystem</a>
    <a href="#tools">Tools</a>
    <a href="#tasks">What you can do</a>
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

  <!-- What you can do (Tasks) -->
  <section class="section" id="tasks">
    <h2>What you can do</h2>
    <p class="task-desc">
      TESSERA embeddings encode rich spectral-temporal information at every 10m pixel. Downstream models operate on these embeddings using one of three approaches, depending on what you need to predict. Each approach is illustrated below with benchmarks from the <a href="https://arxiv.org/abs/2506.20380" target="_blank" rel="noopener">CVPR 2026 paper</a> and community examples.
    </p>

    <!-- Classification -->
    <div class="task-subsection" id="classification">
      <h3>
        <svg class="section-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.classification}/></svg>
        Classification
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
            <span class="ex-desc">— Detecting and mapping solar farms across the UK using a compact neural network on TESSERA embeddings.</span>
          </div>
        </li>
        <li>
          <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.leaf}/></svg>
          <div>
            <a href="https://toao.com/blog/can-we-really-see-brambles-from-space" target="_blank" rel="noopener">Can a model trained on satellite data really find brambles on the ground?&#8288;<svg class="ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d={extIcon}/></svg></a>
            <span class="ex-desc">— A field validation study testing TESSERA-based bramble prediction against ground truth.</span>
          </div>
        </li>
        <li>
          <svg class="li-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.globe}/></svg>
          <div>
            <span class="ex-title">CROME-TESSERA 3D Crop UMAP</span>
            <span class="ex-desc">— Interactive 3D UMAP of 210k crop cells from England's CROME 2024, coloured by crop class and linked to satellite imagery. <a href="/crop-umap" class="fullscreen-reveal">Open dedicated viewer.</a></span>
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
    <div class="task-subsection" id="segmentation">
      <h3>
        <svg class="section-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.segmentation}/></svg>
        Segmentation
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
    <div class="task-subsection" id="regression">
      <h3>
        <svg class="section-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.regression}/></svg>
        Regression
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

    <!-- Getting started tutorials -->
    <div class="task-subsection" id="tutorials">
      <h3>
        <svg class="section-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d={icons.doc}/></svg>
        Tutorials
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
            <span class="ex-desc">— Reference implementations of CNN and UNet architectures for downstream tasks on TESSERA embeddings.</span>
          </div>
        </li>
      </ul>
    </div>
  </section>

  <!-- Get Involved -->
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

  /* Task subsections */
  .task-subsection {
    margin: 28px 0;
    scroll-margin-top: calc(var(--nav-height) + 16px);
  }

  .task-subsection h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-secondary);
    margin-bottom: 6px;
  }

  .section-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    opacity: 0.7;
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
```

- [ ] **Step 2: Verify the file was created**

Run: `ls -la src/pages/GettingStarted.svelte`
Expected: file exists

- [ ] **Step 3: Commit**

```bash
git add src/pages/GettingStarted.svelte
git commit -m "feat: add Getting Started page combining ecosystem, tasks, and get-involved"
```

---

### Task 2: Wire up routing for Getting Started

**Files:**
- Modify: `src/lib/router.ts:81-95`
- Modify: `src/App.svelte`

- [ ] **Step 1: Add `/getting-started` route and keep `/tasks` routes**

In `src/lib/router.ts`, add `/getting-started` to the routes array. Keep all existing `/tasks` routes so old URLs don't break.

Change the routes array to:

```typescript
const routes: { path: string; route: Route }[] = [
  '/',
  '/about',
  '/blog',
  '/blog/:slug',
  '/projects',
  '/projects/:id',
  '/getting-started',
  '/tasks',
  '/tasks/:tag',
  '/tasks/:tag/:slug',
  '/papers',
  '/videos',
  '/coverage',
  '/crop-umap',
].map((path) => ({ path, route: compileRoute(path) }));
```

- [ ] **Step 2: Update `src/App.svelte` imports and routing**

Add the GettingStarted import and route. Change `/tasks` to render GettingStarted instead of Tasks.

Replace the full script and template:

```svelte
<script lang="ts">
  import { currentRoute } from './lib/router';
  import Nav from './components/Nav.svelte';
  import TileBackground from './components/TileBackground.svelte';
  import Home from './pages/Home.svelte';
  import Blog from './pages/Blog.svelte';
  import BlogPost from './pages/BlogPost.svelte';
  import Projects from './pages/Projects.svelte';
  import ProjectDetail from './pages/ProjectDetail.svelte';
  import GettingStarted from './pages/GettingStarted.svelte';
  import TaskTag from './pages/TaskTag.svelte';
  import TaskExample from './pages/TaskExample.svelte';
  import About from './pages/About.svelte';
  import Papers from './pages/Papers.svelte';
  import Videos from './pages/Videos.svelte';
  import Coverage from './pages/Coverage.svelte';
  import CropUmapPage from './pages/CropUmapPage.svelte';

  let route = $derived($currentRoute);
  let isHome = $derived(route.path === '/');
</script>

{#if !isHome}
  <TileBackground />
{/if}
<Nav />

<div class="page">
  {#if route.path === '/'}
    <Home />
  {:else}
    <div class="content-backdrop">
      {#if route.path === '/coverage'}
        <Coverage />
      {:else if route.path === '/about'}
        <About />
      {:else if route.path === '/blog'}
        <Blog />
      {:else if route.path === '/blog/:slug'}
        <BlogPost slug={route.params.slug} />
      {:else if route.path === '/projects'}
        <Projects />
      {:else if route.path === '/projects/:id'}
        <ProjectDetail id={route.params.id} />
      {:else if route.path === '/getting-started'}
        <GettingStarted />
      {:else if route.path === '/tasks'}
        <GettingStarted />
      {:else if route.path === '/tasks/:tag'}
        <TaskTag tag={route.params.tag} />
      {:else if route.path === '/tasks/:tag/:slug'}
        <TaskExample tag={route.params.tag} slug={route.params.slug} />
      {:else if route.path === '/papers'}
        <Papers />
      {:else if route.path === '/videos'}
        <Videos />
      {:else if route.path === '/crop-umap'}
        <CropUmapPage />
      {:else}
        <div class="placeholder">
          <h2>404</h2>
          <p>Page not found</p>
        </div>
      {/if}
    </div>
  {/if}
</div>
```

Note: The `Tasks` import is removed. `/tasks` now renders `GettingStarted`. `TaskTag` still redirects to `/tasks` (which now shows GettingStarted and scrolls to the anchor). `TaskExample` pages still work for individual task detail pages.

- [ ] **Step 3: Update `TaskTag.svelte` to redirect to `/getting-started`**

In `src/pages/TaskTag.svelte`, change the navigate target:

```svelte
<script lang="ts">
  import { navigate } from '@/lib/router';
  import { onMount } from 'svelte';

  interface Props {
    tag: string;
  }

  let { tag }: Props = $props();

  onMount(() => {
    navigate('/getting-started');
    requestAnimationFrame(() => {
      const el = document.getElementById(tag);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  });
</script>
```

- [ ] **Step 4: Build and verify**

Run: `pnpm build 2>&1 | tail -5`
Expected: `✓ built in` with no errors

- [ ] **Step 5: Commit**

```bash
git add src/lib/router.ts src/App.svelte src/pages/TaskTag.svelte
git commit -m "feat: wire Getting Started route, redirect /tasks to it"
```

---

### Task 3: Update the nav bar

**Files:**
- Modify: `src/components/Nav.svelte:36-118`

- [ ] **Step 1: Replace the nav links section**

Replace the entire `<div class="nav-links">` content (lines 36–122 of Nav.svelte) with the new structure. This removes Tasks, Coverage, and the Docs dropdown. Adds Getting Started. Adds Coverage to the Explore dropdown.

Replace from `<div class="nav-links"` to the closing `</div>` before `<div class="nav-social">`:

```svelte
    <div class="nav-links" class:mobile-open={mobileOpen}>
      <a href="/about" use:link class:active={path.startsWith('/about') || scrolledToAbout} onclick={closeAll}>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="7" r="3.5"/><path d="M3.5 17.5a6.5 6.5 0 0 1 13 0"/></svg>
        About
      </a>
      <a href="/projects" use:link class:active={path.startsWith('/projects')} onclick={closeAll}>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h6v6H3zM11 3h6v6h-6zM3 11h6v6H3zM11 14.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0"/></svg>
        Projects
      </a>
      <a href="/blog" use:link class:active={path.startsWith('/blog')} onclick={closeAll}>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h14M3 8h10M3 12h12M3 16h8"/></svg>
        Blog
      </a>
      <a href="/papers" use:link class:active={path.startsWith('/papers')} onclick={closeAll}>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 2h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/><path d="M7 6h6M7 9h6M7 12h4"/><circle cx="13" cy="14" r="1.5"/></svg>
        Papers
      </a>
      <a href="/videos" use:link class:active={path.startsWith('/videos')} onclick={closeAll}>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="12" height="12" rx="1.5"/><path d="M14 8l4-2v8l-4-2"/></svg>
        Videos
      </a>
      <a href="/getting-started" use:link class:active={path.startsWith('/getting-started') || path.startsWith('/tasks')} onclick={closeAll}>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2h8l4 4v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/><path d="M12 2v4h4M7 10h6M7 14h4"/></svg>
        Getting Started
      </a>
      <div class="dropdown">
        <button
          class="dd-btn explore-btn"
          onclick={(e) => { e.stopPropagation(); exploreOpen = !exploreOpen; }}
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><path d="M10 2a14 14 0 0 1 0 16M10 2a14 14 0 0 0 0 16M2.5 7.5h15M2.5 12.5h15"/></svg>
          Explore
        </button>
        {#if exploreOpen}
          <div class="dropdown-menu dd-rich-menu" role="menu" tabindex="-1" onkeydown={(e) => { if (e.key === 'Escape') closeDropdown(); }} onclick={(e) => e.stopPropagation()}>
            <a href="https://tee.cl.cam.ac.uk" target="_blank" rel="noopener" onclick={closeAll}>
              <svg class="dd-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="16" height="11" rx="1.5"/><path d="M6 17h8M10 14v3"/></svg>
              <div>
                <span class="dd-label">TEE Hosted</span>
                <span class="dd-desc">Full viewer at tee.cl.cam.ac.uk</span>
              </div>
            </a>
            <a href="https://tze.geotessera.org" target="_blank" rel="noopener" onclick={closeAll}>
              <svg class="dd-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><path d="M10 2a14 14 0 0 1 0 16M10 2a14 14 0 0 0 0 16M2.5 10h15"/></svg>
              <div>
                <span class="dd-label">TEE Browser</span>
                <span class="dd-desc">Lightweight in-browser explorer</span>
              </div>
            </a>
            <a href="/coverage" use:link onclick={closeAll}>
              <svg class="dd-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><path d="M2 10h16"/><path d="M10 2c-2.7 2.7-2.7 13.3 0 16"/><path d="M10 2c2.7 2.7 2.7 13.3 0 16"/></svg>
              <div>
                <span class="dd-label">Coverage Globe</span>
                <span class="dd-desc">3D globe of embedding availability</span>
              </div>
            </a>
          </div>
        {/if}
      </div>
      <div class="nav-social">
        <SocialIcons />
      </div>
    </div>
```

- [ ] **Step 2: Clean up the script section**

In the `<script>` block, remove the `docsOpen` state variable since the Docs dropdown is gone. Change the `closeDropdown` function to only close `exploreOpen`.

Replace:
```typescript
  let docsOpen = $state(false);
  let exploreOpen = $state(false);
  let mobileOpen = $state(false);

  function closeDropdown() {
    docsOpen = false;
    exploreOpen = false;
  }
```

With:
```typescript
  let exploreOpen = $state(false);
  let mobileOpen = $state(false);

  function closeDropdown() {
    exploreOpen = false;
  }
```

- [ ] **Step 3: Remove the `.docs-btn` CSS rules**

Delete these CSS blocks since the Docs dropdown is gone:

```css
  .docs-btn {
    background: rgba(255, 255, 255, 0.06) !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    color: var(--text-secondary) !important;
  }

  .docs-btn:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    border-color: rgba(255, 255, 255, 0.3) !important;
    color: #fff !important;
  }
```

- [ ] **Step 4: Build and verify**

Run: `pnpm build 2>&1 | tail -5`
Expected: `✓ built in` with no errors

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.svelte
git commit -m "feat: slim nav to 6 items + Explore dropdown, add Coverage to Explore"
```

---

### Task 4: Slim the About page

**Files:**
- Modify: `src/pages/About.svelte`

- [ ] **Step 1: Remove the Ecosystem, Projects, and Get Involved sections**

In `src/pages/About.svelte`, remove the following sections:
- The entire `<!-- Ecosystem -->` section (lines ~59–136 — from `<section class="section" id="ecosystem">` through its closing `</section>`)
- The entire `<!-- Projects -->` section (lines ~138–157 — from `<section class="section" id="projects">` through its closing `</section>`)
- The entire `<!-- Get involved -->` section (lines ~227–251 — from `<section class="section" id="get-involved">` through its closing `</section>`)

- [ ] **Step 2: Remove unused imports**

In the `<script>` block, remove the imports that are no longer needed:

Remove these lines:
```typescript
  import { projects } from '@/lib/data/projects';
```

The `link` import is still needed for roadmap links. The `fundingSources` and `partners` imports are still needed.

- [ ] **Step 3: Remove unused CSS**

Remove the styles that were only used by the Ecosystem and Projects sections. These CSS classes are no longer referenced:

- `.eco-list`, `.eco-list li`, `.eco-icon`, `.eco-list a`, `.eco-list a:hover`, `.ext`, `.eco-desc`, `.eco-subheading`, `.eco-link-muted`, `.eco-badge`, `.eco-badge.mature`, `.eco-badge.contributed`, `.eco-badge.dev`, `.eco-desc code`
- The mobile media query for `.eco-list li` and `.ext`

Keep all other styles (`.people-*`, `.involve-*`, `.roadmap-*`, `.section`, etc.) since they're used by the remaining sections.

- [ ] **Step 4: Build and verify**

Run: `pnpm build 2>&1 | tail -5`
Expected: `✓ built in` with no errors

- [ ] **Step 5: Commit**

```bash
git add src/pages/About.svelte
git commit -m "refactor: slim About page to team, mission, funding, and acknowledgments"
```

---

### Task 5: Update vite config and sitemap

**Files:**
- Modify: `vite.config.ts`

- [ ] **Step 1: Add `/getting-started` to static routes and SPA fallback**

In `vite.config.ts`, update the `sitemapPlugin` and `spa404Plugin` calls to include `/getting-started` and remove `/tasks` from the sitemap (it now redirects):

Replace:
```typescript
    sitemapPlugin({
      siteUrl: 'https://geotessera.org',
      staticRoutes: ['/', '/about', '/blog', '/projects', '/tasks', '/papers', '/videos', '/coverage'],
      blogDir: path.resolve(__dirname, 'content/blog'),
    }),
    spa404Plugin(['/', '/about', '/blog', '/projects', '/tasks', '/papers', '/videos', '/coverage']),
```

With:
```typescript
    sitemapPlugin({
      siteUrl: 'https://geotessera.org',
      staticRoutes: ['/', '/about', '/blog', '/projects', '/getting-started', '/papers', '/videos', '/coverage'],
      blogDir: path.resolve(__dirname, 'content/blog'),
    }),
    spa404Plugin(['/', '/about', '/blog', '/projects', '/getting-started', '/tasks', '/papers', '/videos', '/coverage']),
```

Note: `/tasks` stays in `spa404Plugin` so old URLs still get the SPA shell (which redirects to Getting Started), but is removed from the sitemap since it's no longer the canonical URL.

- [ ] **Step 2: Build and verify**

Run: `pnpm build 2>&1 | tail -5`
Expected: `✓ built in` with no errors

- [ ] **Step 3: Verify the sitemap includes getting-started**

Run: `grep getting-started dist/sitemap.xml`
Expected: a `<url>` entry containing `getting-started`

- [ ] **Step 4: Commit**

```bash
git add vite.config.ts
git commit -m "chore: add /getting-started to sitemap and SPA fallback"
```

---

### Task 6: Final verification

- [ ] **Step 1: Full build**

Run: `pnpm build 2>&1 | tail -10`
Expected: `✓ built in` with no errors

- [ ] **Step 2: Check for broken imports**

Run: `grep -r "from.*Tasks'" src/` — should only find `TaskTag` and `TaskExample`, not `Tasks`.
Run: `grep -r "from.*pages/Tasks" src/` — should return nothing (the old Tasks page import is removed from App.svelte).

- [ ] **Step 3: Verify old Tasks page file can be deleted**

The file `src/pages/Tasks.svelte` is no longer imported by anything. It can be safely deleted:

```bash
rm src/pages/Tasks.svelte
```

- [ ] **Step 4: Build again after deletion**

Run: `pnpm build 2>&1 | tail -5`
Expected: `✓ built in` with no errors

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: remove unused Tasks page"
```
