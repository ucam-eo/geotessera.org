<script lang="ts">
  import Globe from '@/components/Globe.svelte';
  import About from '@/pages/About.svelte';
  import { link, base } from '@/lib/router';
  import { siteConfig } from '@/lib/config';
  import { totalScrollVh, getTransitionIntensity } from '@/lib/globe';
  import { scrollSections, activeScrollSection, homePastStory, registerScrollTo, unregisterScrollTo } from '@/lib/scroll-state';
  import { onMount } from 'svelte';

  let scrollContainer = $state<HTMLElement>(null!);

  let scrollTop = $state(0);
  let vh = $state(0);
  let isMobile = $state(typeof window !== 'undefined' && window.innerWidth < 768);
  // On mobile, compress all scroll distances by this factor
  let scale = $derived(isMobile ? 0.5 : 1);
  let scrollVh = $derived(vh > 0 ? scrollTop / vh / scale : 0);

  // Fade tessera tiles: ramp from 0 to 0.6 by scroll=1vh, then continue
  // rising to 0.95 by scroll=11vh so they stay visible when zoomed out.
  // During map transitions, fade down to reveal satellite basemap underneath,
  // then smoothly recover to full opacity on a timer when scrolling pauses.
  let baseOpacity = $derived(
    scrollVh <= 0 ? 0 :
    scrollVh <= 1 ? scrollVh * 0.6 :
    Math.min(0.6 + (scrollVh - 1) * 0.035, 0.95)
  );
  let transitionFade = $derived(getTransitionIntensity(scrollVh));
  let recoveryAmount = $state(0); // 0 = no recovery, 1 = fully recovered
  let recoveryTimer = 0;
  let recoveryRaf = 0;
  let recoveryStart = 0;
  const RECOVERY_DELAY = 300;  // ms before recovery begins
  const RECOVERY_DURATION = 1500; // ms to fade back to full

  $effect(() => {
    // When transition intensity changes, reset recovery
    if (transitionFade > 0.05) {
      recoveryAmount = 0;
      cancelAnimationFrame(recoveryRaf);
      clearTimeout(recoveryTimer);
      recoveryTimer = window.setTimeout(() => {
        recoveryStart = performance.now();
        function animate() {
          const elapsed = performance.now() - recoveryStart;
          recoveryAmount = Math.min(elapsed / RECOVERY_DURATION, 1);
          if (recoveryAmount < 1) {
            recoveryRaf = requestAnimationFrame(animate);
          }
        }
        recoveryRaf = requestAnimationFrame(animate);
      }, RECOVERY_DELAY);
    } else {
      // No transition — full opacity, clear timers
      recoveryAmount = 1;
      clearTimeout(recoveryTimer);
      cancelAnimationFrame(recoveryRaf);
    }
  });

  let effectiveFade = $derived(transitionFade * (1 - recoveryAmount));
  let tileOpacity = $derived(baseOpacity * (1 - effectiveFade * 0.85));

  // Panel visibility thresholds (in vh of scroll, unscaled — scale is applied to scrollVh)
  let pixelVisible = $derived(scrollVh >= 1);
  let pixelRevealLeft = $derived(scrollVh >= 2);
  let pixelRevealRight = $derived(scrollVh >= 2.5);
  let pipelineVisible = $derived(scrollVh >= 5);
  let tasksVisible = $derived(scrollVh >= 8);
  let openVisible = $derived(scrollVh >= 11);
  let openStep1 = $derived(scrollVh >= 11.5);
  let openStep2 = $derived(scrollVh >= 12);
  let openStep3 = $derived(scrollVh >= 12.5);
  let openStep4 = $derived(scrollVh >= 13);
  let coverageVisible = $derived(scrollVh >= 15);
  let coverageV1 = $derived(scrollVh >= 15.5);
  let coverageV1Zarr = $derived(scrollVh >= 16);
  let coverageV11 = $derived(scrollVh >= 16.5);
  let coverageV2 = $derived(scrollVh >= 17);

  function onScroll() {
    scrollTop = scrollContainer?.scrollTop ?? 0;
    vh = window.innerHeight;
    isMobile = window.innerWidth < 768;
  }

  // Section starts use scaled values so the scroll-bar nav works on mobile
  let sections = $derived([
    { label: 'Home',  start: 0 },
    { label: 'What',  start: 1 * scale },
    { label: 'How',   start: 5 * scale },
    { label: 'Why',   start: 8 * scale },
    { label: 'Where', start: 11 * scale },
    { label: 'When',  start: 15 * scale },
  ]);

  let activeSection = $derived(
    scrollVh >= 15 ? 5 :
    scrollVh >= 11 ? 4 :
    scrollVh >= 8 ? 3 :
    scrollVh >= 5 ? 2 :
    scrollVh >= 1 ? 1 : 0
  );

  // Publish scroll state to nav
  onMount(() => {
    scrollSections.set(sections);
    registerScrollTo((targetVh: number) => {
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: targetVh * window.innerHeight, behavior: 'smooth' });
      }
    });

    // Scroll to hash on load
    const hash = window.location.hash.slice(1).toLowerCase();
    if (hash) {
      const target = sections.find(s => s.label.toLowerCase() === hash);
      if (target && scrollContainer) {
        requestAnimationFrame(() => {
          scrollContainer.scrollTo({ top: target.start * window.innerHeight });
        });
      }
    }

    return () => {
      scrollSections.set([]);
      activeScrollSection.set(-1);
      homePastStory.set(false);
      unregisterScrollTo();
    };
  });

  // Detect when user scrolls past the story into the about section
  let pastStory = $derived(scrollVh >= 19);
  $effect(() => { homePastStory.set(pastStory); });

  // Update hash and store when active section changes
  let prevSection = -1;
  let prevUrl = '';
  $effect(() => {
    activeScrollSection.set(activeSection);
    const newUrl = pastStory
      ? (base || '') + '/about'
      : (() => {
          const label = sections[activeSection].label.toLowerCase();
          const hash = label === 'home' ? '' : `#${label}`;
          return (base || '') + '/' + hash;
        })();
    if (newUrl !== prevUrl) {
      prevUrl = newUrl;
      if (activeSection !== prevSection || pastStory) {
        prevSection = activeSection;
        history.replaceState(null, '', newUrl);
      }
    }
  });
</script>

<div class="home" bind:this={scrollContainer} onscroll={onScroll}>
  <Globe {scrollContainer} {tileOpacity} scrollScale={scale} />

  <div class="story">
    <!-- Hero: scroll 0–1vh (100vh) -->
    <section class="panel panel-hero">
      <div class="panel-card hero-card">
        <h1 class="title">{siteConfig.title}</h1>
        <p class="subtitle">{siteConfig.subtitle}</p>
        <span class="scroll-cue">scroll to explore ↓</span>
      </div>
    </section>

    <!-- Pixels: scroll 1–4vh (300vh) — progressive reveal -->
    <section class="panel-tall panel-pixels">
      <div class="sticky-wrap">
        <div class="panel-card wide-card" class:active={pixelVisible}>
          <h2>What are you seeing?</h2>
          <p>The coloured overlay is not a photograph. Each coloured square is a <strong>10m&times;10m pixel</strong> on the ground — but instead of storing 3 numbers, TESSERA stores <strong>128 numbers</strong> encoding a full year of satellite observations.</p>
          <div class="diagram-split">
            <div class="diagram-half" class:revealed={pixelRevealLeft}>
              {@html rgbDiagram}
            </div>
            <div class="diagram-divider" class:revealed={pixelRevealLeft}></div>
            <div class="diagram-half" class:revealed={pixelRevealRight}>
              {@html embeddingDiagram}
            </div>
          </div>
          <p class="caption" class:revealed={pixelRevealRight}>3 numbers describe a colour — 128 numbers describe a landscape. Similar colours in the overlay mean similar land surface.</p>
        </div>
      </div>
    </section>

    <!-- Pipeline: scroll 4–7vh (300vh) — map holds at zoom 14 -->
    <section class="panel-tall panel-pipeline">
      <div class="sticky-wrap">
        <div class="panel-card wide-card" class:active={pipelineVisible}>
          <h2>How are embeddings made? <a class="info-link" href="https://arxiv.org/abs/2506.20380" target="_blank" rel="noopener" title="Read the CVPR 2026 paper"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 2h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/><path d="M7 6h6M7 9h6M7 12h4"/></svg></a></h2>
          <p>Millions of Sentinel-1 (radar) and Sentinel-2 (optical) satellite passes over a year are fed through a self-supervised encoder. No human labels are needed during training — the model learns by comparing random temporal views of the same pixel. As a result, downstream tasks require far fewer labels to achieve high accuracy.</p>
          <div class="diagram">
            {@html pipelineDiagram}
          </div>
          <p class="caption">A field that greens in spring and turns golden in autumn gets a very different embedding from evergreen forest, even if a single snapshot looks similar.</p>
        </div>
      </div>
    </section>

    <!-- Tasks: scroll 8–11vh (300vh) — gentle zoom out -->
    <section class="panel-tall panel-tasks">
      <div class="sticky-wrap">
        <div class="panel-card wide-card" class:active={tasksVisible}>
          <h2>What is it for?</h2>
          <p>TESSERA embeddings are a general-purpose representation. Attach a small task-specific head and fine-tune on a handful of labels to solve downstream problems:</p>
          <div class="diagram-split">
            <div class="diagram-half" class:revealed={tasksVisible}>
              {@html classificationDiagram}
            </div>
            <div class="diagram-divider" class:revealed={tasksVisible}></div>
            <div class="diagram-half" class:revealed={tasksVisible}>
              {@html segmentationDiagram}
            </div>
          </div>
          <div class="task-links">
            <a href="/tasks#classification" use:link class="task-link">Classification</a>
            <a href="/tasks#segmentation" use:link class="task-link">Segmentation</a>
            <a href="/tasks#regression" use:link class="task-link">Regression</a>
            <a href="/docs#tutorials" use:link class="task-link">Tutorials</a>
            <a href="/papers" use:link class="task-link">Papers</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Open: scroll 11–15vh (400vh) — progressive reveal -->
    <section class="panel-tall panel-open">
      <div class="sticky-wrap">
        <div class="panel-card open-card" class:active={openVisible}>
          <h2>Open &amp; sovereign, end to end</h2>
          <p class="open-intro">One global representation, fully open. Every layer can be customised.</p>
          <div class="open-pipeline">
            <div class="open-step" class:revealed={openStep1}>
              <div class="open-icon">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="12" r="6"/><path d="M6 28a10 10 0 0 1 20 0"/><path d="M22 6l3-3M10 6L7 3M16 4V1"/></svg>
              </div>
              <div class="open-text">
                <span class="open-label">Open Data</span>
                <span class="open-desc">Sentinel-1 &amp; Sentinel-2 — free satellite imagery from ESA, available via <a href="https://browser.dataspace.copernicus.eu/" target="_blank" rel="noopener">Copernicus Data Space</a></span>
              </div>
            </div>
            <div class="open-connector" class:revealed={openStep2}></div>
            <div class="open-step" class:revealed={openStep2}>
              <div class="open-icon">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 20l-2 8h16l-2-8"/><rect x="6" y="4" width="20" height="16" rx="2"/><path d="M16 14V9M13 12l3-3 3 3"/></svg>
              </div>
              <div class="open-text">
                <span class="open-label">Open Training</span>
                <span class="open-desc">Self-supervised encoder is <a href="https://github.com/ucam-eo/tessera" target="_blank" rel="noopener">MIT licensed</a> — inspect, modify, retrain. <a href="/blog/2026-03-10-tessera-v1-weights" use:link>Beta weights available →</a></span>
              </div>
            </div>
            <div class="open-connector" class:revealed={openStep3}></div>
            <div class="open-step" class:revealed={openStep3}>
              <div class="open-icon">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="24" height="20" rx="2"/><path d="M4 12h24M10 18h4M10 22h8"/><circle cx="24" cy="10" r="0.5" fill="currentColor"/></svg>
              </div>
              <div class="open-text">
                <span class="open-label">Open Embeddings</span>
                <span class="open-desc">Pre-computed embeddings are <a href="https://github.com/ucam-eo/geotessera" target="_blank" rel="noopener">CC0 licensed</a> — download and use freely. <a href="/coverage" use:link>View coverage →</a></span>
              </div>
            </div>
            <div class="open-connector" class:revealed={openStep4}></div>
            <div class="open-step" class:revealed={openStep4}>
              <div class="open-icon">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="4" width="16" height="10" rx="2"/><rect x="4" y="18" width="10" height="10" rx="2"/><rect x="18" y="18" width="10" height="10" rx="2"/><path d="M16 14v4M11 18v0M23 18v0"/></svg>
              </div>
              <div class="open-text">
                <span class="open-label">Open Downstream</span>
                <span class="open-desc">Fine-tune on a CPU with a handful of labels — cheap, fast, no GPU needed. <a href="/tasks/classification" use:link>Explore tasks</a> or try the <a href="https://tee.cl.cam.ac.uk" target="_blank" rel="noopener">Embeddings Explorer</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Coverage: scroll 15–19vh (400vh) — timeline progressive reveal -->
    <section class="panel-tall panel-coverage">
      <div class="sticky-wrap">
        <div class="panel-card open-card" class:active={coverageVisible}>
          <h2>Roadmap</h2>
          <p class="open-intro">Global terrestrial coverage at 10m resolution. Built in the open at Cambridge. <a href="/about#roadmap" use:link>Full roadmap →</a></p>
          <div class="coverage-timeline">
            {#each siteConfig.roadmap as item, i}
              {@const revealed = i === 0 ? coverageV1 : i === 1 ? coverageV1Zarr : i === 2 ? coverageV11 : coverageV2}
              <div class="cov-entry" class:revealed>
                <div class="cov-marker {item.status}"></div>
                <div class="cov-content">
                  <span class="cov-version">{item.version}</span>
                  <span class="cov-status {item.status}">{item.statusLabel}</span>
                  <span class="cov-desc">{item.description}{#if item.linkText}{' '}{#if item.linkUrl.startsWith('/')}<a href={item.linkUrl} use:link>{item.linkText}</a>{:else}<a href={item.linkUrl} target="_blank" rel="noopener">{item.linkText}</a>{/if}{/if}{#if item.link2Text}{' · '}{#if item.link2Url.startsWith('/')}<a href={item.link2Url} use:link>{item.link2Text}</a>{:else}<a href={item.link2Url} target="_blank" rel="noopener">{item.link2Text}</a>{/if}{/if}</span>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </section>
  </div>

  <div class="content">
    <div class="content-backdrop">
      <About />
    </div>
  </div>
</div>

<script lang="ts" module>
  // --- RGB pixel diagram (left half) ---
  const rgbDiagram = `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
  <rect width="200" height="240" rx="6" fill="#0a0a0e" stroke="#374151" stroke-width="0.5" opacity="0.9"/>
  <text x="100" y="20" text-anchor="middle" fill="#9ca3af" font-size="10" font-family="monospace" font-weight="bold">A colour photograph</text>
  <line x1="16" y1="28" x2="184" y2="28" stroke="#1e293b" stroke-width="0.5"/>

  <!-- 4x4 pixel grid -->
  <g transform="translate(52,38)">
    <rect x="0"  y="0"  width="22" height="22" fill="#4a7c59" stroke="#2a4a35" stroke-width="0.5"/>
    <rect x="22" y="0"  width="22" height="22" fill="#5a8c69" stroke="#2a4a35" stroke-width="0.5"/>
    <rect x="44" y="0"  width="22" height="22" fill="#3d6b4a" stroke="#2a4a35" stroke-width="0.5"/>
    <rect x="66" y="0"  width="22" height="22" fill="#6a9c79" stroke="#2a4a35" stroke-width="0.5"/>
    <rect x="0"  y="22" width="22" height="22" fill="#5a8c69" stroke="#2a4a35" stroke-width="0.5"/>
    <rect x="22" y="22" width="22" height="22" fill="#c4956a" stroke="#8a6540" stroke-width="0.5"/>
    <rect x="44" y="22" width="22" height="22" fill="#b8875e" stroke="#8a6540" stroke-width="0.5"/>
    <rect x="66" y="22" width="22" height="22" fill="#4a7c59" stroke="#2a4a35" stroke-width="0.5"/>
    <rect x="0"  y="44" width="22" height="22" fill="#3d6b4a" stroke="#2a4a35" stroke-width="0.5"/>
    <rect x="24" y="44" width="22" height="22" fill="#b8875e" stroke="#8a6540" stroke-width="0.5"/>
    <rect x="44" y="44" width="22" height="22" fill="#5577aa" stroke="#3a5580" stroke-width="0.5"/>
    <rect x="66" y="44" width="22" height="22" fill="#4a6699" stroke="#3a5580" stroke-width="0.5"/>
    <rect x="0"  y="66" width="22" height="22" fill="#6a9c79" stroke="#2a4a35" stroke-width="0.5"/>
    <rect x="22" y="66" width="22" height="22" fill="#4a7c59" stroke="#2a4a35" stroke-width="0.5"/>
    <rect x="44" y="66" width="22" height="22" fill="#4a6699" stroke="#3a5580" stroke-width="0.5"/>
    <rect x="66" y="66" width="22" height="22" fill="#5577aa" stroke="#3a5580" stroke-width="0.5"/>
    <rect x="22" y="22" width="22" height="22" fill="none" stroke="#f59e0b" stroke-width="2"/>
  </g>

  <line x1="85" y1="84" x2="85" y2="136" stroke="#f59e0b" stroke-width="1" marker-end="url(#pa1)"/>

  <!-- RGB bars -->
  <g transform="translate(52,144)">
    <rect x="0"  y="0" width="24" height="20" rx="3" fill="#ef4444" opacity="0.8"/>
    <text x="12" y="14" text-anchor="middle" fill="#fff" font-size="9" font-family="monospace">R</text>
    <rect x="30" y="0" width="24" height="20" rx="3" fill="#22c55e" opacity="0.8"/>
    <text x="42" y="14" text-anchor="middle" fill="#fff" font-size="9" font-family="monospace">G</text>
    <rect x="60" y="0" width="24" height="20" rx="3" fill="#3b82f6" opacity="0.8"/>
    <text x="72" y="14" text-anchor="middle" fill="#fff" font-size="9" font-family="monospace">B</text>
  </g>
  <text x="64" y="182" fill="#f59e0b" font-size="9" font-family="monospace">0.76</text>
  <text x="94" y="182" fill="#f59e0b" font-size="9" font-family="monospace">0.59</text>
  <text x="122" y="182" fill="#f59e0b" font-size="9" font-family="monospace">0.42</text>

  <text x="100" y="208" text-anchor="middle" fill="#d1d5db" font-size="12" font-family="monospace" font-weight="bold">3 numbers</text>
  <text x="100" y="224" text-anchor="middle" fill="#6b7280" font-size="9" font-family="monospace">per pixel = a colour</text>

  <defs>
    <marker id="pa1" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
      <path d="M0,0 L6,2.5 L0,5" fill="none" stroke="#f59e0b" stroke-width="0.8"/>
    </marker>
  </defs>
</svg>`;

  // --- Embedding pixel diagram (right half) ---
  function pseudoHeight(i: number): number {
    return 4 + ((i * 7 + 13) * 17 % 20);
  }
  const embBars = Array.from({ length: 32 }, (_, i) => {
    const h = pseudoHeight(i);
    const op = 0.4 + (h / 24) * 0.5;
    return `<rect x="${i * 4}" y="${24 - h}" width="3" height="${h}" rx="0.5" fill="#00e5ff" opacity="${op.toFixed(2)}"/>`;
  }).join('');

  const embeddingDiagram = `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
  <rect width="200" height="240" rx="6" fill="#0a0a0e" stroke="#374151" stroke-width="0.5" opacity="0.9"/>
  <text x="100" y="20" text-anchor="middle" fill="#00e5ff" font-size="10" font-family="monospace" font-weight="bold">A TESSERA embedding</text>
  <line x1="16" y1="28" x2="184" y2="28" stroke="#1e293b" stroke-width="0.5"/>

  <!-- 4x4 pixel grid (embedding colours) -->
  <g transform="translate(52,38)">
    <rect x="0"  y="0"  width="22" height="22" fill="#134e4a" stroke="#0d9488" stroke-width="0.5" opacity="0.7"/>
    <rect x="22" y="0"  width="22" height="22" fill="#1e3a5f" stroke="#0d9488" stroke-width="0.5" opacity="0.6"/>
    <rect x="44" y="0"  width="22" height="22" fill="#134e4a" stroke="#0d9488" stroke-width="0.5" opacity="0.8"/>
    <rect x="66" y="0"  width="22" height="22" fill="#2d1b4e" stroke="#0d9488" stroke-width="0.5" opacity="0.7"/>
    <rect x="0"  y="22" width="22" height="22" fill="#1e3a5f" stroke="#0d9488" stroke-width="0.5" opacity="0.6"/>
    <rect x="22" y="22" width="22" height="22" fill="#3a1f2e" stroke="#0d9488" stroke-width="0.5" opacity="0.8"/>
    <rect x="44" y="22" width="22" height="22" fill="#2d4a1e" stroke="#0d9488" stroke-width="0.5" opacity="0.7"/>
    <rect x="66" y="22" width="22" height="22" fill="#134e4a" stroke="#0d9488" stroke-width="0.5" opacity="0.6"/>
    <rect x="0"  y="44" width="22" height="22" fill="#1e3a5f" stroke="#0d9488" stroke-width="0.5" opacity="0.7"/>
    <rect x="22" y="44" width="22" height="22" fill="#2d4a1e" stroke="#0d9488" stroke-width="0.5" opacity="0.6"/>
    <rect x="44" y="44" width="22" height="22" fill="#1a2a4a" stroke="#0d9488" stroke-width="0.5" opacity="0.8"/>
    <rect x="66" y="44" width="22" height="22" fill="#1a2a4a" stroke="#0d9488" stroke-width="0.5" opacity="0.7"/>
    <rect x="0"  y="66" width="22" height="22" fill="#2d1b4e" stroke="#0d9488" stroke-width="0.5" opacity="0.6"/>
    <rect x="22" y="66" width="22" height="22" fill="#134e4a" stroke="#0d9488" stroke-width="0.5" opacity="0.7"/>
    <rect x="44" y="66" width="22" height="22" fill="#1a2a4a" stroke="#0d9488" stroke-width="0.5" opacity="0.6"/>
    <rect x="66" y="66" width="22" height="22" fill="#1e3a5f" stroke="#0d9488" stroke-width="0.5" opacity="0.8"/>
    <rect x="22" y="22" width="22" height="22" fill="none" stroke="#00e5ff" stroke-width="2"/>
  </g>
  <text x="100" y="132" text-anchor="middle" fill="#6b7280" font-size="7" font-family="monospace">10m \u00d7 10m each</text>

  <line x1="85" y1="84" x2="85" y2="136" stroke="#00e5ff" stroke-width="1" marker-end="url(#pa2)"/>

  <!-- 128-dim bars -->
  <g transform="translate(36,148)">
    ${embBars}
  </g>
  <text x="100" y="186" text-anchor="middle" fill="#6b7280" font-size="7" font-family="monospace">d\u2081 d\u2082 d\u2083 \u2026 d\u2081\u2082\u2087 d\u2081\u2082\u2088</text>

  <text x="100" y="208" text-anchor="middle" fill="#d1d5db" font-size="12" font-family="monospace" font-weight="bold">128 numbers</text>
  <text x="100" y="224" text-anchor="middle" fill="#6b7280" font-size="9" font-family="monospace">per pixel = an embedding</text>

  <defs>
    <marker id="pa2" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
      <path d="M0,0 L6,2.5 L0,5" fill="none" stroke="#00e5ff" stroke-width="0.8"/>
    </marker>
  </defs>
</svg>`;

  // --- Classification diagram SVG ---
  const classificationDiagram = `<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
  <rect width="200" height="260" rx="6" fill="#0a0a0e" stroke="#374151" stroke-width="0.5" opacity="0.9"/>
  <text x="100" y="20" text-anchor="middle" fill="#f59e0b" font-size="10" font-family="monospace" font-weight="bold">Classification</text>
  <line x1="16" y1="28" x2="184" y2="28" stroke="#1e293b" stroke-width="0.5"/>
  <g transform="translate(52,36)">
    <rect x="0" y="0" width="22" height="22" fill="#134e4a" stroke="#0d9488" stroke-width="0.5" opacity="0.7"/>
    <rect x="22" y="0" width="22" height="22" fill="#1e3a5f" stroke="#0d9488" stroke-width="0.5" opacity="0.6"/>
    <rect x="44" y="0" width="22" height="22" fill="#134e4a" stroke="#0d9488" stroke-width="0.5" opacity="0.8"/>
    <rect x="66" y="0" width="22" height="22" fill="#2d1b4e" stroke="#0d9488" stroke-width="0.5" opacity="0.7"/>
    <rect x="0" y="22" width="22" height="22" fill="#1e3a5f" stroke="#0d9488" stroke-width="0.5" opacity="0.6"/>
    <rect x="22" y="22" width="22" height="22" fill="#3a1f2e" stroke="#0d9488" stroke-width="0.5" opacity="0.8"/>
    <rect x="44" y="22" width="22" height="22" fill="#2d4a1e" stroke="#0d9488" stroke-width="0.5" opacity="0.7"/>
    <rect x="66" y="22" width="22" height="22" fill="#134e4a" stroke="#0d9488" stroke-width="0.5" opacity="0.6"/>
    <rect x="0" y="44" width="22" height="22" fill="#1e3a5f" stroke="#0d9488" stroke-width="0.5" opacity="0.7"/>
    <rect x="22" y="44" width="22" height="22" fill="#2d4a1e" stroke="#0d9488" stroke-width="0.5" opacity="0.6"/>
    <rect x="44" y="44" width="22" height="22" fill="#1a2a4a" stroke="#0d9488" stroke-width="0.5" opacity="0.8"/>
    <rect x="66" y="44" width="22" height="22" fill="#1a2a4a" stroke="#0d9488" stroke-width="0.5" opacity="0.7"/>
    <rect x="0" y="66" width="22" height="22" fill="#2d1b4e" stroke="#0d9488" stroke-width="0.5" opacity="0.6"/>
    <rect x="22" y="66" width="22" height="22" fill="#134e4a" stroke="#0d9488" stroke-width="0.5" opacity="0.7"/>
    <rect x="44" y="66" width="22" height="22" fill="#1a2a4a" stroke="#0d9488" stroke-width="0.5" opacity="0.6"/>
    <rect x="66" y="66" width="22" height="22" fill="#1e3a5f" stroke="#0d9488" stroke-width="0.5" opacity="0.8"/>
  </g>
  <text x="100" y="132" text-anchor="middle" fill="#6b7280" font-size="7" font-family="monospace">128-d embeddings</text>
  <line x1="100" y1="136" x2="100" y2="152" stroke="#f59e0b" stroke-width="1" marker-end="url(#ca1)"/>
  <text x="100" y="148" text-anchor="end" fill="#f59e0b" font-size="7" font-family="monospace" dx="-8">classify</text>
  <g transform="translate(52,158)">
    <rect x="0" y="0" width="22" height="22" fill="#22c55e" stroke="#166534" stroke-width="0.5" opacity="0.85"/>
    <rect x="22" y="0" width="22" height="22" fill="#94a3b8" stroke="#64748b" stroke-width="0.5" opacity="0.85"/>
    <rect x="44" y="0" width="22" height="22" fill="#22c55e" stroke="#166534" stroke-width="0.5" opacity="0.85"/>
    <rect x="66" y="0" width="22" height="22" fill="#15803d" stroke="#166534" stroke-width="0.5" opacity="0.85"/>
    <rect x="0" y="22" width="22" height="22" fill="#94a3b8" stroke="#64748b" stroke-width="0.5" opacity="0.85"/>
    <rect x="22" y="22" width="22" height="22" fill="#94a3b8" stroke="#64748b" stroke-width="0.5" opacity="0.85"/>
    <rect x="44" y="22" width="22" height="22" fill="#22c55e" stroke="#166534" stroke-width="0.5" opacity="0.85"/>
    <rect x="66" y="22" width="22" height="22" fill="#22c55e" stroke="#166534" stroke-width="0.5" opacity="0.85"/>
    <rect x="0" y="44" width="22" height="22" fill="#3b82f6" stroke="#1d4ed8" stroke-width="0.5" opacity="0.85"/>
    <rect x="22" y="44" width="22" height="22" fill="#3b82f6" stroke="#1d4ed8" stroke-width="0.5" opacity="0.85"/>
    <rect x="44" y="44" width="22" height="22" fill="#3b82f6" stroke="#1d4ed8" stroke-width="0.5" opacity="0.85"/>
    <rect x="66" y="44" width="22" height="22" fill="#22c55e" stroke="#166534" stroke-width="0.5" opacity="0.85"/>
    <rect x="0" y="66" width="22" height="22" fill="#15803d" stroke="#166534" stroke-width="0.5" opacity="0.85"/>
    <rect x="22" y="66" width="22" height="22" fill="#22c55e" stroke="#166534" stroke-width="0.5" opacity="0.85"/>
    <rect x="44" y="66" width="22" height="22" fill="#3b82f6" stroke="#1d4ed8" stroke-width="0.5" opacity="0.85"/>
    <rect x="66" y="66" width="22" height="22" fill="#3b82f6" stroke="#1d4ed8" stroke-width="0.5" opacity="0.85"/>
  </g>
  <g transform="translate(24,248)">
    <rect x="0" y="0" width="8" height="8" fill="#22c55e" rx="1"/>
    <text x="11" y="8" fill="#9ca3af" font-size="7" font-family="monospace">Crop</text>
    <rect x="42" y="0" width="8" height="8" fill="#94a3b8" rx="1"/>
    <text x="53" y="8" fill="#9ca3af" font-size="7" font-family="monospace">Urban</text>
    <rect x="90" y="0" width="8" height="8" fill="#3b82f6" rx="1"/>
    <text x="101" y="8" fill="#9ca3af" font-size="7" font-family="monospace">Water</text>
    <rect x="136" y="0" width="8" height="8" fill="#15803d" rx="1"/>
    <text x="147" y="8" fill="#9ca3af" font-size="7" font-family="monospace">Forest</text>
  </g>
  <defs>
    <marker id="ca1" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
      <path d="M0,0 L6,2.5 L0,5" fill="none" stroke="#f59e0b" stroke-width="0.8"/>
    </marker>
  </defs>
</svg>`;

  // --- Segmentation diagram SVG ---
  const segmentationDiagram = `<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
  <rect width="200" height="260" rx="6" fill="#0a0a0e" stroke="#374151" stroke-width="0.5" opacity="0.9"/>
  <text x="100" y="20" text-anchor="middle" fill="#00e5ff" font-size="10" font-family="monospace" font-weight="bold">Segmentation</text>
  <line x1="16" y1="28" x2="184" y2="28" stroke="#1e293b" stroke-width="0.5"/>
  <g transform="translate(52,36)">
    <rect x="0" y="0" width="22" height="22" fill="#134e4a" stroke="#0d9488" stroke-width="0.5" opacity="0.7"/>
    <rect x="22" y="0" width="22" height="22" fill="#1e3a5f" stroke="#0d9488" stroke-width="0.5" opacity="0.6"/>
    <rect x="44" y="0" width="22" height="22" fill="#134e4a" stroke="#0d9488" stroke-width="0.5" opacity="0.8"/>
    <rect x="66" y="0" width="22" height="22" fill="#2d1b4e" stroke="#0d9488" stroke-width="0.5" opacity="0.7"/>
    <rect x="0" y="22" width="22" height="22" fill="#1e3a5f" stroke="#0d9488" stroke-width="0.5" opacity="0.6"/>
    <rect x="22" y="22" width="22" height="22" fill="#3a1f2e" stroke="#0d9488" stroke-width="0.5" opacity="0.8"/>
    <rect x="44" y="22" width="22" height="22" fill="#2d4a1e" stroke="#0d9488" stroke-width="0.5" opacity="0.7"/>
    <rect x="66" y="22" width="22" height="22" fill="#134e4a" stroke="#0d9488" stroke-width="0.5" opacity="0.6"/>
    <rect x="0" y="44" width="22" height="22" fill="#1e3a5f" stroke="#0d9488" stroke-width="0.5" opacity="0.7"/>
    <rect x="22" y="44" width="22" height="22" fill="#2d4a1e" stroke="#0d9488" stroke-width="0.5" opacity="0.6"/>
    <rect x="44" y="44" width="22" height="22" fill="#1a2a4a" stroke="#0d9488" stroke-width="0.5" opacity="0.8"/>
    <rect x="66" y="44" width="22" height="22" fill="#1a2a4a" stroke="#0d9488" stroke-width="0.5" opacity="0.7"/>
    <rect x="0" y="66" width="22" height="22" fill="#2d1b4e" stroke="#0d9488" stroke-width="0.5" opacity="0.6"/>
    <rect x="22" y="66" width="22" height="22" fill="#134e4a" stroke="#0d9488" stroke-width="0.5" opacity="0.7"/>
    <rect x="44" y="66" width="22" height="22" fill="#1a2a4a" stroke="#0d9488" stroke-width="0.5" opacity="0.6"/>
    <rect x="66" y="66" width="22" height="22" fill="#1e3a5f" stroke="#0d9488" stroke-width="0.5" opacity="0.8"/>
  </g>
  <text x="100" y="132" text-anchor="middle" fill="#6b7280" font-size="7" font-family="monospace">128-d embeddings</text>
  <line x1="100" y1="136" x2="100" y2="152" stroke="#00e5ff" stroke-width="1" marker-end="url(#sa1)"/>
  <text x="100" y="148" text-anchor="end" fill="#00e5ff" font-size="7" font-family="monospace" dx="-8">segment</text>
  <g transform="translate(52,158)">
    <rect x="0" y="0" width="22" height="22" fill="#4a7c59" stroke="#2a4a35" stroke-width="0.5" opacity="0.5"/>
    <rect x="22" y="0" width="22" height="22" fill="#5a8c69" stroke="#2a4a35" stroke-width="0.5" opacity="0.5"/>
    <rect x="44" y="0" width="22" height="22" fill="#3d6b4a" stroke="#2a4a35" stroke-width="0.5" opacity="0.5"/>
    <rect x="66" y="0" width="22" height="22" fill="#1a5e2f" stroke="#2a4a35" stroke-width="0.5" opacity="0.5"/>
    <rect x="0" y="22" width="22" height="22" fill="#5a8c69" stroke="#2a4a35" stroke-width="0.5" opacity="0.5"/>
    <rect x="22" y="22" width="22" height="22" fill="#c4956a" stroke="#8a6540" stroke-width="0.5" opacity="0.5"/>
    <rect x="44" y="22" width="22" height="22" fill="#b8875e" stroke="#8a6540" stroke-width="0.5" opacity="0.5"/>
    <rect x="66" y="22" width="22" height="22" fill="#4a7c59" stroke="#2a4a35" stroke-width="0.5" opacity="0.5"/>
    <rect x="0" y="44" width="22" height="22" fill="#3d6b4a" stroke="#2a4a35" stroke-width="0.5" opacity="0.5"/>
    <rect x="22" y="44" width="22" height="22" fill="#b8875e" stroke="#8a6540" stroke-width="0.5" opacity="0.5"/>
    <rect x="44" y="44" width="22" height="22" fill="#5577aa" stroke="#3a5580" stroke-width="0.5" opacity="0.5"/>
    <rect x="66" y="44" width="22" height="22" fill="#4a6699" stroke="#3a5580" stroke-width="0.5" opacity="0.5"/>
    <rect x="0" y="66" width="22" height="22" fill="#1a5e2f" stroke="#2a4a35" stroke-width="0.5" opacity="0.5"/>
    <rect x="22" y="66" width="22" height="22" fill="#4a7c59" stroke="#2a4a35" stroke-width="0.5" opacity="0.5"/>
    <rect x="44" y="66" width="22" height="22" fill="#4a6699" stroke="#3a5580" stroke-width="0.5" opacity="0.5"/>
    <rect x="66" y="66" width="22" height="22" fill="#5577aa" stroke="#3a5580" stroke-width="0.5" opacity="0.5"/>
    <path d="M0,0 L66,0 L66,22 L22,22 L22,44 L0,44 Z" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linejoin="round" opacity="0.9"/>
    <path d="M66,0 L88,0 L88,44 L66,44 L66,22 L44,22 L44,0" fill="none" stroke="#a855f7" stroke-width="2.5" stroke-linejoin="round" opacity="0.9"/>
    <path d="M22,22 L66,22 L66,44 L22,44 Z" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linejoin="round" opacity="0.9"/>
    <path d="M0,44 L22,44 L22,88 L0,88 Z" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3,2" stroke-linejoin="round" opacity="0.7"/>
    <path d="M44,44 L88,44 L88,88 L44,88 Z" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linejoin="round" opacity="0.9"/>
  </g>
  <g transform="translate(24,248)">
    <line x1="0" y1="4" x2="10" y2="4" stroke="#f59e0b" stroke-width="2"/>
    <text x="14" y="8" fill="#9ca3af" font-size="7" font-family="monospace">Field</text>
    <line x1="42" y1="4" x2="52" y2="4" stroke="#ef4444" stroke-width="2"/>
    <text x="56" y="8" fill="#9ca3af" font-size="7" font-family="monospace">Building</text>
    <line x1="98" y1="4" x2="108" y2="4" stroke="#3b82f6" stroke-width="2"/>
    <text x="112" y="8" fill="#9ca3af" font-size="7" font-family="monospace">Water</text>
    <line x1="142" y1="4" x2="152" y2="4" stroke="#a855f7" stroke-width="2"/>
    <text x="156" y="8" fill="#9ca3af" font-size="7" font-family="monospace">Trees</text>
  </g>
  <defs>
    <marker id="sa1" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
      <path d="M0,0 L6,2.5 L0,5" fill="none" stroke="#00e5ff" stroke-width="0.8"/>
    </marker>
  </defs>
</svg>`;

  // --- Pipeline diagram SVG (from tze) ---
  const pipelineDiagram = `<svg viewBox="0 0 490 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
  <rect width="490" height="380" rx="6" fill="#0a0a0e" stroke="#374151" stroke-width="0.5" opacity="0.9"/>
  <a href="https://arxiv.org/abs/2506.20380" target="_blank" rel="noopener">
    <text x="245" y="24" text-anchor="middle" fill="#00e5ff" font-size="14" font-family="monospace" font-weight="bold" text-decoration="underline" style="cursor:pointer">TESSERA \u2014 How Embeddings Are Made</text>
  </a>
  <line x1="30" y1="34" x2="460" y2="34" stroke="#1e293b" stroke-width="0.5"/>
  <rect x="16" y="46" width="130" height="108" rx="5" fill="#0f172a" stroke="#4b5563" stroke-width="0.6"/>
  <text x="81" y="64" text-anchor="middle" fill="#f59e0b" font-size="12" font-family="monospace" font-weight="bold">Sentinel-2</text>
  <text x="81" y="78" text-anchor="middle" fill="#9ca3af" font-size="9" font-family="monospace">spectral \u2022 10 bands</text>
  <g transform="translate(26,88)">
    <rect x="0" y="0" width="66" height="5" rx="1.5" fill="#065f46" opacity="0.6"/>
    <rect x="0" y="7" width="66" height="5" rx="1.5" fill="#0d9488" opacity="0.5"/>
    <rect x="0" y="14" width="66" height="5" rx="1.5" fill="#14b8a6" opacity="0.7"/>
    <rect x="0" y="21" width="66" height="5" rx="1.5" fill="#0d9488" opacity="0.6"/>
    <rect x="0" y="28" width="66" height="5" rx="1.5" fill="#065f46" opacity="0.8"/>
    <rect x="0" y="35" width="66" height="5" rx="1.5" fill="#065f46" opacity="0.5"/>
    <text x="72" y="7" fill="#9ca3af" font-size="8" font-family="monospace">Jan</text>
    <text x="72" y="21" fill="#9ca3af" font-size="8" font-family="monospace">Jun</text>
    <text x="72" y="35" fill="#9ca3af" font-size="8" font-family="monospace">Dec</text>
  </g>
  <text x="81" y="146" text-anchor="middle" fill="#6b7280" font-size="8" font-family="monospace">~100 passes/yr</text>
  <rect x="16" y="162" width="130" height="108" rx="5" fill="#0f172a" stroke="#4b5563" stroke-width="0.6"/>
  <text x="81" y="180" text-anchor="middle" fill="#f59e0b" font-size="12" font-family="monospace" font-weight="bold">Sentinel-1</text>
  <text x="81" y="194" text-anchor="middle" fill="#9ca3af" font-size="9" font-family="monospace">SAR \u2022 microwave</text>
  <g transform="translate(26,204)">
    <rect x="0" y="0" width="66" height="5" rx="1.5" fill="#312e81" opacity="0.7"/>
    <rect x="0" y="7" width="66" height="5" rx="1.5" fill="#4338ca" opacity="0.5"/>
    <rect x="0" y="14" width="66" height="5" rx="1.5" fill="#6366f1" opacity="0.6"/>
    <rect x="0" y="21" width="66" height="5" rx="1.5" fill="#4338ca" opacity="0.7"/>
    <rect x="0" y="28" width="66" height="5" rx="1.5" fill="#312e81" opacity="0.5"/>
    <rect x="0" y="35" width="66" height="5" rx="1.5" fill="#312e81" opacity="0.6"/>
    <text x="72" y="7" fill="#9ca3af" font-size="8" font-family="monospace">Jan</text>
    <text x="72" y="21" fill="#9ca3af" font-size="8" font-family="monospace">Jun</text>
    <text x="72" y="35" fill="#9ca3af" font-size="8" font-family="monospace">Dec</text>
  </g>
  <text x="81" y="256" text-anchor="middle" fill="#6b7280" font-size="8" font-family="monospace">~100 passes/yr</text>
  <text x="81" y="266" text-anchor="middle" fill="#6b7280" font-size="7" font-family="monospace">sees through clouds</text>
  <line x1="152" y1="100" x2="180" y2="170" stroke="#00e5ff" stroke-width="1.2" opacity="0.6" marker-end="url(#arr)"/>
  <line x1="152" y1="216" x2="180" y2="186" stroke="#00e5ff" stroke-width="1.2" opacity="0.6" marker-end="url(#arr)"/>
  <rect x="182" y="120" width="150" height="148" rx="6" fill="#0f172a" stroke="#00e5ff" stroke-width="0.7" opacity="0.85"/>
  <text x="257" y="140" text-anchor="middle" fill="#00e5ff" font-size="12" font-family="monospace" font-weight="bold">Self-Supervised</text>
  <text x="257" y="155" text-anchor="middle" fill="#00e5ff" font-size="12" font-family="monospace" font-weight="bold">Encoder</text>
  <text x="257" y="170" text-anchor="middle" fill="#9ca3af" font-size="9" font-family="monospace">(Barlow Twins)</text>
  <g transform="translate(200,180)">
    <rect x="0" y="0" width="48" height="18" rx="3" fill="#1e293b" stroke="#00e5ff" stroke-width="0.5"/>
    <text x="24" y="13" text-anchor="middle" fill="#d1d5db" font-size="9" font-family="monospace">view A</text>
    <rect x="62" y="0" width="48" height="18" rx="3" fill="#1e293b" stroke="#00e5ff" stroke-width="0.5"/>
    <text x="86" y="13" text-anchor="middle" fill="#d1d5db" font-size="9" font-family="monospace">view B</text>
    <text x="55" y="32" text-anchor="middle" fill="#6b7280" font-size="8" font-family="monospace">random temporal samples</text>
    <rect x="6" y="40" width="98" height="18" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="0.5"/>
    <text x="55" y="53" text-anchor="middle" fill="#f59e0b" font-size="9" font-family="monospace">cross-correlation</text>
    <text x="55" y="70" text-anchor="middle" fill="#6b7280" font-size="8" font-family="monospace">no labels needed</text>
  </g>
  <line x1="338" y1="194" x2="360" y2="194" stroke="#00e5ff" stroke-width="1.5" marker-end="url(#arr)"/>
  <rect x="362" y="72" width="114" height="240" rx="6" fill="#0f172a" stroke="#4b5563" stroke-width="0.6"/>
  <text x="419" y="92" text-anchor="middle" fill="#00e5ff" font-size="12" font-family="monospace" font-weight="bold">Embedding</text>
  <text x="419" y="106" text-anchor="middle" fill="#9ca3af" font-size="9" font-family="monospace">per 10m\u00b2 pixel</text>
  <g transform="translate(374,116)">
    <rect x="0" y="2" width="5" height="22" rx="1.5" fill="#00e5ff" opacity="0.9"/>
    <rect x="8" y="6" width="5" height="18" rx="1.5" fill="#00e5ff" opacity="0.7"/>
    <rect x="16" y="0" width="5" height="24" rx="1.5" fill="#00e5ff" opacity="0.8"/>
    <rect x="24" y="9" width="5" height="15" rx="1.5" fill="#00e5ff" opacity="0.6"/>
    <rect x="32" y="3" width="5" height="21" rx="1.5" fill="#00e5ff" opacity="0.75"/>
    <rect x="40" y="12" width="5" height="12" rx="1.5" fill="#00e5ff" opacity="0.5"/>
    <rect x="48" y="1" width="5" height="23" rx="1.5" fill="#00e5ff" opacity="0.85"/>
    <rect x="56" y="7" width="5" height="17" rx="1.5" fill="#00e5ff" opacity="0.65"/>
    <rect x="64" y="10" width="5" height="14" rx="1.5" fill="#00e5ff" opacity="0.55"/>
    <rect x="72" y="0" width="5" height="24" rx="1.5" fill="#00e5ff" opacity="0.8"/>
    <rect x="80" y="5" width="5" height="19" rx="1.5" fill="#00e5ff" opacity="0.7"/>
    <rect x="88" y="14" width="5" height="10" rx="1.5" fill="#00e5ff" opacity="0.45"/>
  </g>
  <text x="419" y="152" text-anchor="middle" fill="#6b7280" font-size="9" font-family="monospace">\u2026</text>
  <g transform="translate(374,160)">
    <rect x="0" y="5" width="5" height="19" rx="1.5" fill="#00e5ff" opacity="0.75"/>
    <rect x="8" y="10" width="5" height="14" rx="1.5" fill="#00e5ff" opacity="0.6"/>
    <rect x="16" y="0" width="5" height="24" rx="1.5" fill="#00e5ff" opacity="0.9"/>
    <rect x="24" y="7" width="5" height="17" rx="1.5" fill="#00e5ff" opacity="0.65"/>
    <rect x="32" y="13" width="5" height="11" rx="1.5" fill="#00e5ff" opacity="0.5"/>
    <rect x="40" y="2" width="5" height="22" rx="1.5" fill="#00e5ff" opacity="0.85"/>
    <rect x="48" y="8" width="5" height="16" rx="1.5" fill="#00e5ff" opacity="0.55"/>
    <rect x="56" y="0" width="5" height="24" rx="1.5" fill="#00e5ff" opacity="0.8"/>
    <rect x="64" y="6" width="5" height="18" rx="1.5" fill="#00e5ff" opacity="0.7"/>
    <rect x="72" y="12" width="5" height="12" rx="1.5" fill="#00e5ff" opacity="0.5"/>
    <rect x="80" y="3" width="5" height="21" rx="1.5" fill="#00e5ff" opacity="0.75"/>
    <rect x="88" y="1" width="5" height="23" rx="1.5" fill="#00e5ff" opacity="0.9"/>
  </g>
  <text x="419" y="200" text-anchor="middle" fill="#00e5ff" font-size="13" font-family="monospace" font-weight="bold">128 dim</text>
  <text x="419" y="214" text-anchor="middle" fill="#9ca3af" font-size="9" font-family="monospace">int8 values</text>
  <text x="419" y="234" text-anchor="middle" fill="#d1d5db" font-size="9" font-family="monospace">annual summary</text>
  <text x="419" y="248" text-anchor="middle" fill="#d1d5db" font-size="9" font-family="monospace">global coverage</text>
  <text x="419" y="262" text-anchor="middle" fill="#d1d5db" font-size="9" font-family="monospace">downloadable</text>
  <text x="419" y="276" text-anchor="middle" fill="#d1d5db" font-size="9" font-family="monospace">stored as Zarr</text>
  <text x="419" y="290" text-anchor="middle" fill="#d1d5db" font-size="9" font-family="monospace">label-efficient</text>
  <text x="419" y="304" text-anchor="middle" fill="#d1d5db" font-size="9" font-family="monospace">preserve temporality</text>
  <rect x="16" y="320" width="458" height="48" rx="5" fill="#0f172a" opacity="0.7"/>
  <g transform="translate(26,328)">
    <rect x="0" y="0" width="12" height="12" fill="#134e4a" stroke="#0d9488" stroke-width="0.5" opacity="0.7"/>
    <rect x="12" y="0" width="12" height="12" fill="#1e3a5f" stroke="#0d9488" stroke-width="0.5" opacity="0.6"/>
    <rect x="24" y="0" width="12" height="12" fill="#134e4a" stroke="#0d9488" stroke-width="0.5" opacity="0.8"/>
    <rect x="0" y="12" width="12" height="12" fill="#1e3a5f" stroke="#0d9488" stroke-width="0.5" opacity="0.6"/>
    <rect x="12" y="12" width="12" height="12" fill="#134e4a" stroke="#0d9488" stroke-width="0.5" opacity="0.9"/>
    <rect x="24" y="12" width="12" height="12" fill="#1e3a5f" stroke="#0d9488" stroke-width="0.5" opacity="0.5"/>
  </g>
  <line x1="66" y1="346" x2="80" y2="346" stroke="#6b7280" stroke-width="0.7" marker-end="url(#arr2)"/>
  <text x="88" y="340" fill="#d1d5db" font-size="10" font-family="monospace">Each 10m\u00b2 pixel \u2192 128-d vector from a full year of S1+S2.</text>
  <text x="88" y="356" fill="#d1d5db" font-size="10" font-family="monospace">Self-supervised \u2014 no human labels needed to train.</text>
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6" fill="none" stroke="#00e5ff" stroke-width="1"/>
    </marker>
    <marker id="arr2" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
      <path d="M0,0 L6,2.5 L0,5" fill="none" stroke="#6b7280" stroke-width="0.7"/>
    </marker>
  </defs>
</svg>`;
</script>

<style>

  .home {
    height: 100vh;
    overflow-y: auto;
  }

  .story {
    position: relative;
    z-index: 1;
    margin-top: -100vh;
    pointer-events: none;
  }

  .panel {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px;
  }

  .panel-hero     { height: 100vh; }

  /* Tall panels use a sticky inner wrapper so the card stays on screen */
  .panel-tall {
    pointer-events: none;
  }

  .panel-pixels   { height: 400vh; }
  .panel-pipeline { height: 300vh; }
  .panel-tasks     { height: 300vh; }
  .panel-open      { height: 400vh; }
  .panel-coverage  { height: 400vh; }

  @media (max-width: 767px) {
    .panel-hero     { height: 50vh; }
    .panel-pixels   { height: 200vh; }
    .panel-pipeline { height: 150vh; }
    .panel-tasks     { height: 150vh; }
    .panel-open      { height: 200vh; }
    .panel-coverage  { height: 200vh; }
  }

  .sticky-wrap {
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px;
  }

  .panel-card {
    pointer-events: auto;
    background: rgba(10, 10, 26, 0.95);
    backdrop-filter: blur(16px);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    padding: 36px 40px;
    max-width: 420px;
    text-align: center;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .panel-card.active,
  .hero-card {
    opacity: 1;
    transform: translateY(0);
  }

  .wide-card {
    max-width: 560px;
    text-align: left;
  }

  .title {
    font-weight: 600;
    letter-spacing: 10px;
    font-size: 48px;
    color: var(--text-primary);
    margin-bottom: 12px;
  }

  .subtitle {
    font-size: 13px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent-dim);
    line-height: 1.6;
  }

  .scroll-cue {
    display: inline-block;
    margin-top: 24px;
    font-size: 11px;
    letter-spacing: 2px;
    color: var(--text-muted);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  .panel-card h2 {
    font-weight: 300;
    letter-spacing: 3px;
    font-size: 20px;
    color: var(--text-primary);
    margin-bottom: 12px;
  }

  .info-link {
    display: inline-block;
    vertical-align: middle;
    pointer-events: auto;
    opacity: 0.4;
    transition: opacity 0.2s;
  }

  .info-link:hover {
    opacity: 1;
  }

  .info-link svg {
    width: 16px;
    height: 16px;
  }

  .panel-card p {
    font-size: 13px;
    line-height: 1.8;
    color: var(--text-secondary);
    margin-bottom: 12px;
  }

  .panel-card p:last-child {
    margin-bottom: 0;
  }

  .panel-card :global(strong) {
    color: var(--accent-dim);
    font-weight: 500;
  }

  /* Split diagram: two halves side by side */
  .diagram-split {
    display: flex;
    gap: 12px;
    margin: 16px 0;
    align-items: stretch;
  }

  .diagram-half {
    flex: 1;
    border-radius: 8px;
    overflow: hidden;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .diagram-half.revealed {
    opacity: 1;
    transform: translateY(0);
  }

  .diagram-divider {
    width: 1px;
    background: var(--border-subtle);
    opacity: 0;
    transition: opacity 0.6s ease;
  }

  .diagram-divider.revealed {
    opacity: 1;
  }

  .caption {
    font-size: 12px !important;
    color: var(--text-muted) !important;
    font-style: italic;
    line-height: 1.7 !important;
    opacity: 0;
    transition: opacity 0.6s ease;
  }

  .caption.revealed {
    opacity: 1;
  }

  .diagram {
    margin: 16px 0;
    border-radius: 8px;
    overflow: hidden;
  }

  .task-links {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
    pointer-events: auto;
  }

  .task-link {
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--text-muted);
    border: 1px solid var(--border-subtle);
    border-radius: 4px;
    padding: 4px 10px;
    text-decoration: none;
    transition: color 0.2s, border-color 0.2s;
  }

  .task-link:hover {
    color: var(--accent-dim);
    border-color: var(--accent-dim);
  }

  .open-card {
    max-width: 480px;
    text-align: left;
  }

  .open-intro {
    font-size: 14px !important;
    color: var(--text-secondary) !important;
    margin-bottom: 20px !important;
  }

  .open-pipeline {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .open-step {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 14px 16px;
    border: 1px solid var(--border-subtle);
    border-radius: 8px;
    background: rgba(0, 229, 255, 0.03);
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.5s ease;
  }

  .open-step.revealed {
    opacity: 1;
    transform: translateY(0);
    border-color: var(--accent-border, rgba(0, 229, 255, 0.2));
  }

  .open-icon {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    color: var(--accent-dim);
    margin-top: 2px;
  }

  .open-text {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .open-label {
    font-size: 13px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--accent-dim);
    font-weight: 600;
  }

  .open-desc {
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.5;
  }

  .open-desc a {
    color: var(--text-secondary);
    text-decoration: underline;
    text-decoration-color: var(--border-subtle);
    text-underline-offset: 2px;
    pointer-events: auto;
    transition: color 0.2s;
  }

  .open-desc a:hover {
    color: var(--accent-dim);
  }

  .open-connector {
    width: 1px;
    height: 16px;
    margin-left: 30px;
    background: var(--border-subtle);
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .open-connector.revealed {
    opacity: 1;
  }

  .coverage-timeline {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
    padding-left: 16px;
  }

  .coverage-timeline::before {
    content: '';
    position: absolute;
    left: 5px;
    top: 8px;
    bottom: 8px;
    width: 1px;
    background: var(--border-subtle);
  }

  .cov-entry {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 12px 0;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .cov-entry.revealed {
    opacity: 1;
    transform: translateY(0);
  }

  .cov-marker {
    flex-shrink: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-top: 4px;
    margin-left: -20px;
    border: 2px solid;
  }

  .cov-marker.available {
    background: #22c55e;
    border-color: #22c55e;
  }

  .cov-marker.ongoing {
    background: #f59e0b;
    border-color: #f59e0b;
  }

  .cov-marker.planned {
    background: transparent;
    border-color: var(--text-faint);
  }

  .cov-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .cov-version {
    font-size: 14px;
    font-family: monospace;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: 1px;
  }

  .cov-status {
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-weight: 500;
  }

  .cov-status.available {
    color: #22c55e;
  }

  .cov-status.ongoing {
    color: #f59e0b;
  }

  .cov-status.planned {
    color: var(--text-faint);
  }

  .cov-desc {
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.5;
  }

  .cov-desc a {
    color: var(--text-secondary);
    text-decoration: underline;
    text-decoration-color: var(--border-subtle);
    text-underline-offset: 2px;
    pointer-events: auto;
    transition: color 0.2s;
  }

  .cov-desc a:hover {
    color: var(--accent-dim);
  }

  .content {
    position: relative;
    z-index: 1;
  }

  .content-backdrop {
    max-width: 900px;
    margin: 0 auto;
    background: rgba(10, 10, 26, 0.9);
    min-height: 100vh;
  }

  @media (max-width: 959px) {
    .content-backdrop {
      max-width: 100%;
      background: var(--bg-primary);
    }
  }

  @media (max-width: 767px) {
    .panel-card {
      padding: 16px 14px;
      border-radius: 8px;
      max-width: 100%;
      max-height: calc(100vh - var(--nav-height) - 40px);
      overflow: hidden;
    }

    .sticky-wrap {
      padding: 16px;
      align-items: flex-start;
      padding-top: calc(var(--nav-height) + 12px);
      padding-bottom: 12px;
    }

    .title {
      font-size: 32px;
      letter-spacing: 6px;
    }

    .panel-card h2 {
      font-size: 16px;
      letter-spacing: 2px;
      margin-bottom: 8px;
    }

    .panel-card p {
      font-size: 12px;
      line-height: 1.7;
      margin-bottom: 8px;
    }

    .diagram-split {
      flex-direction: column;
      gap: 8px;
    }

    .diagram-half {
      max-height: 160px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .diagram-half :global(svg) {
      max-height: 160px;
      width: auto;
    }

    .diagram-divider {
      width: 100%;
      height: 1px;
    }

    .diagram {
      margin: 8px 0;
    }

    .caption {
      font-size: 11px !important;
      line-height: 1.5 !important;
    }

    .open-card {
      max-width: 100%;
    }

    .wide-card {
      max-width: 100%;
    }

    .open-step {
      padding: 10px 12px;
      gap: 10px;
    }

    .open-icon {
      width: 22px;
      height: 22px;
    }

    .open-label {
      font-size: 11px;
      letter-spacing: 1.5px;
    }

    .open-desc {
      font-size: 11px;
    }

    .open-connector {
      height: 10px;
    }

    .open-intro {
      font-size: 12px !important;
      margin-bottom: 12px !important;
    }

    .cov-entry {
      padding: 8px 0;
      gap: 10px;
    }

    .cov-version {
      font-size: 12px;
    }

    .cov-desc {
      font-size: 11px;
    }

    .task-links {
      gap: 6px;
      margin-top: 10px;
    }

    .task-link {
      font-size: 9px;
      padding: 3px 8px;
    }
  }
</style>
