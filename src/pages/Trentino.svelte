<script lang="ts">
  import { link } from '@/lib/router';
  import Footer from '@/components/Footer.svelte';
</script>

<div class="trentino-page">
  <header>
    <div class="breadcrumb">
      <a href="/projects" use:link>Projects</a>
      <span class="sep">&rsaquo;</span>
      <span>Trentino</span>
    </div>
    <h1>High-Resolution Species Mapping in the Italian Alps</h1>
    <p class="subtitle">
      Geospatial foundation models enable data-efficient tree species mapping in temperate montane forests,
      substantially outperforming conventional satellite-based approaches.
    </p>
    <div class="stat-pills">
      <span class="pill">18 species classes</span>
      <span class="pill">10 m resolution</span>
      <span class="pill">6,200 km&sup2;</span>
      <span class="pill muted">Autonomous Province of Trento</span>
    </div>
  </header>

  <!-- Study Area -->
  <section class="section" id="study-area">
    <h2>Study Area</h2>
    <div class="two-col">
      <div>
        <p>
          The Autonomous Province of Trento in northern Italy provides a demanding test case for species-level mapping:
          steep environmental gradients spanning 65&ndash;3,769&nbsp;m elevation, mixed-species stands, and strong phenological
          variability throughout the year. The dense parcel-level forest inventory provides species composition data for
          over 83,000 forest parcels.
        </p>
        <p>
          We classify 18 species and species groups, including both conifers (<em>Picea abies</em>, <em>Larix decidua</em>,
          <em>Pinus sylvestris</em>) and broadleaf species (<em>Fagus sylvatica</em>, <em>Quercus ilex</em>,
          <em>Ostrya</em>&ndash;<em>Fraxinus ornus</em>), capturing the full range of Alpine forest diversity.
        </p>
        <p>
          Bidirectional reflectance distribution function (BRDF) effects from variable illumination, steep slopes,
          and shadowing make conventional spectral approaches unreliable in mountainous terrain &mdash; exactly the
          conditions where foundation model embeddings can demonstrate their advantage.
        </p>
      </div>
      <div class="figure-wrap">
        <img src="/projects/trentino/map_species_alt_web.jpg" alt="Forest inventory parcel labels across the Trentino region" />
        <span class="caption">Forest inventory labels across the Trentino landscape, showing parcel-level species composition from the provincial survey.</span>
      </div>
    </div>
  </section>

  <!-- Methods -->
  <section class="section" id="methods">
    <h2>Methods</h2>
    <p class="section-intro">
      We compare two globally pre-trained foundation-model embeddings against conventional Sentinel-1/2 composites,
      evaluating performance along five experimental axes.
    </p>

    <div class="method-grid">
      <div class="method-card accent-blue">
        <h3>Tessera</h3>
        <p>128-dimensional embeddings from multi-sensor seasonal composites (Sentinel-1 + Sentinel-2), capturing spectral-temporal dynamics at 10&nbsp;m with annual global coverage.</p>
      </div>
      <div class="method-card accent-purple">
        <h3>AlphaEarth (AEF)</h3>
        <p>64-dimensional embeddings from Google's AlphaEarth Foundations system, encoding multi-source satellite data (Sentinel-1, Sentinel-2, Landsat) with auxiliary targets including LiDAR structure and climate variables.</p>
      </div>
      <div class="method-card accent-neutral">
        <h3>Sentinel Composites (Baseline)</h3>
        <p>Conventional seasonal median composites from Sentinel-1 SAR and Sentinel-2 multispectral imagery &mdash; the standard approach in ecological remote sensing.</p>
      </div>
      <div class="method-card accent-amber">
        <h3>Soft-Label Training</h3>
        <p>Pixel-level targets are defined by parcel-level species proportions, enabling mixed parcels to contribute training signal via probabilistic soft targets rather than hard dominant-species assignments.</p>
      </div>
    </div>

    <div class="axes-panel">
      <h3>Five Experimental Axes</h3>
      <div class="axes-row">
        <div class="axis"><span class="axis-num">1</span><span class="axis-label">Classification accuracy &amp; ecological structure</span></div>
        <div class="axis"><span class="axis-num">2</span><span class="axis-label">Label efficiency as data is reduced</span></div>
        <div class="axis"><span class="axis-num">3</span><span class="axis-label">Robustness to label impurity</span></div>
        <div class="axis"><span class="axis-num">4</span><span class="axis-label">Contribution of ancillary covariates</span></div>
        <div class="axis"><span class="axis-num">5</span><span class="axis-label">Cross-year temporal transfer</span></div>
      </div>
    </div>
  </section>

  <!-- Key Results -->
  <section class="section" id="results">
    <h2>Key Results</h2>

    <!-- Result 1 -->
    <div class="result-block">
      <div class="two-col">
        <div>
          <span class="result-label">Result 1</span>
          <h3>Foundation Models Substantially Outperform Satellite Composites</h3>
          <p>
            Both Tessera and AlphaEarth embeddings achieve significantly higher classification accuracy than conventional
            Sentinel-1/2 composites across all metrics. Performance gains are largely driven by embedding quality rather
            than downstream model capacity.
          </p>
          <p>
            A compact neural network (MLP) provides the best results, outperforming Random Forest while matching deeper
            architectures &mdash; suggesting the embeddings already encode rich, species-discriminative structure.
          </p>
        </div>
        <div class="figure-wrap">
          <img src="/projects/trentino/model_comparison_bars.png" alt="Bar chart comparing classification accuracy across representations and classifiers" />
          <span class="caption">Classification performance across representations and classifier types. Foundation model embeddings (Tessera, AlphaEarth) vs conventional Sentinel composites.</span>
        </div>
      </div>
    </div>

    <!-- Result 2 -->
    <div class="result-block" id="embeddings">
      <span class="result-label">Result 2</span>
      <h3>Embedding Structure Reflects Ecological Organisation</h3>
      <p class="result-intro">
        UMAP projections of Tessera embeddings reveal that the latent space naturally separates species along
        ecologically meaningful axes. Conifers and broadleaves form distinct macro-clusters, while individual
        species and genera occupy well-defined regions &mdash; all without any ecological supervision during pre-training.
      </p>
      <div class="umap-grid">
        <div class="umap-panel">
          <img src="/projects/trentino/umap_species_tessera_web.jpg" alt="UMAP colored by species (Tessera)" />
          <span class="caption">Species &mdash; Tessera 2018</span>
        </div>
        <div class="umap-panel">
          <img src="/projects/trentino/umap_genus_tessera_web.jpg" alt="UMAP colored by genus (Tessera)" />
          <span class="caption">Genus &mdash; Tessera 2018</span>
        </div>
        <div class="umap-panel">
          <img src="/projects/trentino/umap_conifer_broadleaf_tessera_web.jpg" alt="UMAP colored by conifer/broadleaf (Tessera)" />
          <span class="caption">Conifer vs Broadleaf &mdash; Tessera 2018</span>
        </div>
        <div class="umap-panel">
          <img src="/projects/trentino/umap_elevation_tessera_web.jpg" alt="UMAP colored by elevation (Tessera)" />
          <span class="caption">Elevation gradient &mdash; Tessera 2018</span>
        </div>
      </div>
    </div>

    <!-- Result 3 -->
    <div class="result-block">
      <div class="two-col reverse">
        <div class="figure-wrap">
          <img src="/projects/trentino/fraction_curves_combined.png" alt="Label efficiency curves" />
          <span class="caption">Classification performance as training data is progressively reduced.</span>
        </div>
        <div>
          <span class="result-label">Result 3</span>
          <h3>Foundation Models Are Radically More Label-Efficient</h3>
          <p>
            When training data is progressively reduced, foundation model embeddings degrade far more gracefully than
            conventional composites. Tessera and AlphaEarth maintain strong performance with a fraction of the labels
            that baselines require.
          </p>
          <p>
            This is critical for practical applications where labelled ecological data is expensive, sparse, and
            regionally uneven &mdash; opening the door to species mapping in data-poor regions.
          </p>
        </div>
      </div>
    </div>

    <!-- Result 4 -->
    <div class="result-block">
      <div class="two-col">
        <div>
          <span class="result-label">Result 4</span>
          <h3>Robust to Label Impurity</h3>
          <p>
            Classification accuracy remains stable even when moderately impure (mixed-species) parcels are included
            in the training data. This allows the full forest inventory to be utilised without aggressive filtering,
            maximising data volume.
          </p>
          <p>
            Furthermore, incorporating parcel-level species fractions as soft labels during training helps the model
            extract information from mixed stands, improving performance for rarer species that typically occur in
            mixed parcels.
          </p>
        </div>
        <div class="figure-wrap">
          <img src="/projects/trentino/purity_metrics_compare.png" alt="Performance across label purity thresholds" />
          <span class="caption">Performance across label purity thresholds for different representations.</span>
        </div>
      </div>
    </div>

    <!-- Result 5 -->
    <div class="result-block">
      <div class="two-col reverse">
        <div class="figure-wrap">
          <img src="/projects/trentino/temporal_transfer.png" alt="Cross-year temporal transfer performance" />
          <span class="caption">Classification performance when models trained in one year are applied to subsequent years.</span>
        </div>
        <div>
          <span class="result-label">Result 5</span>
          <h3>Temporal Transfer: The Key Challenge</h3>
          <p>
            Cross-year transfer reveals notable performance degradation, particularly for rare species. Interannual
            variability in phenology and satellite acquisition conditions affects model transferability across years.
          </p>
          <p>
            This highlights the importance of multi-year training strategies and temporal alignment in operational
            forest monitoring &mdash; a key direction for future work.
          </p>
        </div>
      </div>
    </div>

    <!-- Final Map -->
    <div class="result-block">
      <span class="result-label">Output</span>
      <h3>Wall-to-Wall Species Map</h3>
      <p class="result-intro">
        The final species-prediction map across the entire Trentino landscape at 10&nbsp;m resolution, produced using
        Tessera embeddings and an MLP classifier trained with soft labels.
      </p>
      <div class="hero-figure">
        <img src="/projects/trentino/landscape_output_web.jpg" alt="Wall-to-wall tree species and land cover prediction map of the Trentino region" />
      </div>
    </div>
  </section>

  <!-- Takeaways -->
  <section class="section takeaways" id="takeaways">
    <h2>Key Takeaways</h2>
    <div class="takeaway-grid">
      <div class="takeaway-card">
        <h4>Embeddings encode species-discriminative information</h4>
        <p>Foundation model representations capture rich ecological structure aligned with functional and taxonomic groupings, without any ecological supervision.</p>
      </div>
      <div class="takeaway-card">
        <h4>The bottleneck shifts from features to labels</h4>
        <p>Foundation models reduce the need for hand-crafted features. The primary challenge becomes the availability, quality, and temporal alignment of reference data.</p>
      </div>
      <div class="takeaway-card">
        <h4>Simple classifiers suffice</h4>
        <p>A compact MLP matches or exceeds deeper models when applied to FM embeddings, suggesting the heavy lifting is done by the pre-trained representations.</p>
      </div>
      <div class="takeaway-card">
        <h4>Scalable to new regions</h4>
        <p>The data-efficient pipeline can be adapted to new study areas with limited local labels &mdash; opening the door to global species-level habitat mapping.</p>
      </div>
    </div>
  </section>

  <!-- Paper CTA -->
  <section class="section cta-section">
    <h3>Read the Full Paper</h3>
    <p class="cta-cite">
      <em>Geospatial foundation models enable data-efficient tree species mapping in temperate montane forests.</em><br/>
      Ball, Wicklein, Feng, Knezevic, Atzberger, Dalponte &amp; Coomes.
    </p>
    <div class="cta-links">
      <a href="https://doi.org/10.64898/2026.02.23.707022" target="_blank" rel="noopener" class="cta-primary">Read Preprint</a>
      <a href="https://github.com/PatBall1/trentino-trees" target="_blank" rel="noopener" class="cta-secondary">View Code on GitHub</a>
    </div>
  </section>

  <Footer />
</div>

<style>
  .trentino-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 48px 32px;
  }

  header { margin-bottom: 36px; }

  .breadcrumb {
    font-size: 12px;
    color: var(--text-muted);
    margin-bottom: 12px;
    letter-spacing: 0.5px;
  }

  .breadcrumb a {
    color: var(--accent-dim);
    text-decoration: none;
  }

  .breadcrumb a:hover { text-decoration: underline; }
  .sep { margin: 0 6px; opacity: 0.5; }

  h1 {
    font-size: 28px;
    font-weight: 500;
    line-height: 1.3;
    color: var(--text-primary);
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 15px;
    line-height: 1.7;
    color: var(--text-secondary);
    margin-bottom: 14px;
  }

  .stat-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .pill {
    font-size: 11px;
    letter-spacing: 0.5px;
    padding: 3px 10px;
    border-radius: 12px;
    color: var(--accent-dim);
    background: rgba(0, 229, 255, 0.06);
    border: 1px solid rgba(0, 229, 255, 0.15);
  }

  .pill.muted {
    color: var(--text-muted);
    background: rgba(255, 255, 255, 0.03);
    border-color: var(--border-subtle);
  }

  .section {
    margin-bottom: 48px;
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

  .section p, .section-intro {
    font-size: 14px;
    line-height: 1.8;
    color: var(--text-secondary);
    margin-bottom: 12px;
  }

  .section em {
    font-style: italic;
    color: var(--text-primary);
  }

  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    align-items: start;
  }

  .two-col.reverse { direction: rtl; }
  .two-col.reverse > * { direction: ltr; }

  .figure-wrap img {
    width: 100%;
    border-radius: 8px;
    border: 1px solid var(--border-subtle);
  }

  .caption {
    display: block;
    font-size: 11px;
    color: var(--text-faint);
    margin-top: 6px;
    line-height: 1.5;
  }

  .method-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 20px;
  }

  .method-card {
    padding: 16px;
    border-radius: 8px;
    border: 1px solid var(--border-subtle);
  }

  .method-card h3 {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 6px;
    color: var(--text-primary);
  }

  .method-card p {
    font-size: 13px;
    line-height: 1.6;
    color: var(--text-muted);
    margin: 0;
  }

  .accent-blue { border-color: rgba(99, 102, 241, 0.3); background: rgba(99, 102, 241, 0.04); }
  .accent-purple { border-color: rgba(139, 92, 246, 0.3); background: rgba(139, 92, 246, 0.04); }
  .accent-neutral { border-color: var(--border-subtle); background: rgba(255, 255, 255, 0.02); }
  .accent-amber { border-color: rgba(245, 158, 11, 0.3); background: rgba(245, 158, 11, 0.04); }

  .accent-blue h3 { color: rgb(129, 140, 248); }
  .accent-purple h3 { color: rgb(167, 139, 250); }
  .accent-amber h3 { color: rgb(251, 191, 36); }

  .axes-panel {
    padding: 20px;
    border-radius: 8px;
    border: 1px solid var(--border-subtle);
    background: rgba(255, 255, 255, 0.02);
  }

  .axes-panel h3 {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
    text-align: center;
    margin-bottom: 14px;
  }

  .axes-row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    text-align: center;
  }

  .axis-num {
    display: inline-flex;
    width: 28px;
    height: 28px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(0, 229, 255, 0.1);
    color: var(--accent-dim);
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .axis-label {
    display: block;
    font-size: 11px;
    color: var(--text-muted);
    line-height: 1.4;
  }

  .result-block {
    margin-bottom: 40px;
    padding-bottom: 40px;
    border-bottom: 1px solid var(--border-subtle);
  }

  .result-block:last-child {
    border-bottom: none;
  }

  .result-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--accent-dim);
    opacity: 0.7;
  }

  .result-block h3 {
    font-size: 18px;
    font-weight: 500;
    color: var(--text-primary);
    margin: 4px 0 10px;
    line-height: 1.4;
  }

  .result-intro {
    max-width: 640px;
    margin-bottom: 16px;
  }

  .umap-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .umap-panel {
    border: 1px solid var(--border-subtle);
    border-radius: 8px;
    padding: 8px;
  }

  .umap-panel img {
    width: 100%;
    border-radius: 4px;
  }

  .umap-panel .caption {
    text-align: center;
    margin-top: 4px;
  }

  .hero-figure {
    border: 1px solid var(--border-subtle);
    border-radius: 8px;
    padding: 8px;
  }

  .hero-figure img {
    width: 100%;
    border-radius: 4px;
  }

  .takeaways {
    padding: 32px;
    border-radius: 8px;
    background: rgba(0, 229, 255, 0.03);
    border: 1px solid rgba(0, 229, 255, 0.1);
  }

  .takeaway-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .takeaway-card {
    padding: 16px;
    border-radius: 6px;
    border: 1px solid rgba(0, 229, 255, 0.08);
    background: rgba(0, 229, 255, 0.02);
  }

  .takeaway-card h4 {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 6px;
  }

  .takeaway-card p {
    font-size: 13px;
    line-height: 1.6;
    color: var(--text-muted);
    margin: 0;
  }

  .cta-section {
    text-align: center;
    padding: 32px;
    border: 1px solid var(--border-subtle);
    border-radius: 8px;
  }

  .cta-section h3 {
    font-size: 18px;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 8px;
  }

  .cta-cite {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .cta-links {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .cta-primary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 20px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.5px;
    color: #fff;
    background: rgba(0, 229, 255, 0.15);
    border: 1px solid rgba(0, 229, 255, 0.3);
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s;
  }

  .cta-primary:hover {
    background: rgba(0, 229, 255, 0.25);
    border-color: rgba(0, 229, 255, 0.5);
  }

  .cta-secondary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 20px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.5px;
    color: var(--text-secondary);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s;
  }

  .cta-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    .trentino-page {
      padding: 32px 16px;
    }

    h1 { font-size: 22px; }

    .two-col, .method-grid, .takeaway-grid, .umap-grid {
      grid-template-columns: 1fr;
    }

    .two-col.reverse { direction: ltr; }

    .axes-row {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
