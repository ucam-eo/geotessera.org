<script lang="ts">
  import { onMount } from 'svelte';
  import { feature } from 'topojson-client';
  import { link } from '@/lib/router';
  import Footer from '@/components/Footer.svelte';

  let THREE: typeof import('three');

  const DATA_BASE = 'https://ucam-eo.github.io/tessera-coverage-map';
  const COUNTRIES_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
  const TILE_OFFSET = 0.05;

  let containerEl: HTMLDivElement;
  let globeInstance: any = null;

  // UI state
  let tileCount = $state(0);
  let landmaskCount = $state(0);
  let statusText = $state('Initializing...');

  // Tooltip state
  let tooltipVisible = $state(false);
  let tooltipX = $state(0);
  let tooltipY = $state(0);
  let tooltipTileName = $state('');
  let tooltipCountry = $state<string | null>(null);
  let tooltipType = $state<'coverage' | 'no-coverage' | 'ocean' | 'loading'>('loading');
  let tooltipYears = $state<number[]>([]);
  let tooltipTotalYears = $state(0);
  let tooltipMessage = $state('');

  // Internal state
  let overlayMaterial: any = null;
  let overlayMesh: any = null;
  let coverageData = $state<{ tiles: Record<string, number[]>; years: number[]; metadata: any } | null>(null);
  let textureImageData: ImageData | null = null;
  let countriesGeoJson: any = null;
  let tileCountryCache = new Map<string, string | null>();
  let raycaster: any = null;
  let lastHoveredTile: string | null = null;
  let resizeObserver: ResizeObserver | null = null;

  // --- Data loading ---

  async function loadCoverageData(): Promise<typeof coverageData> {
    try {
      const resp = await fetch(`${DATA_BASE}/coverage.json`);
      if (!resp.ok) return null;
      const main = await resp.json();

      const tiles: Record<string, number[]> = {};
      const results = await Promise.allSettled(
        main.years.map(async (year: number) => {
          const r = await fetch(`${DATA_BASE}/coverage_${year}.json`);
          if (!r.ok) return { year, coords: [] as string[] };
          return { year, coords: (await r.json()) as string[] };
        }),
      );

      for (const result of results) {
        if (result.status === 'fulfilled') {
          const { year, coords } = result.value;
          for (const key of coords) {
            if (!tiles[key]) tiles[key] = [];
            tiles[key].push(year);
          }
        }
      }

      return { tiles, years: main.years, metadata: main.metadata };
    } catch {
      return null;
    }
  }

  async function loadCountries(): Promise<any> {
    try {
      const resp = await fetch(COUNTRIES_URL);
      if (!resp.ok) return null;
      const topo = await resp.json();
      return feature(topo, topo.objects.countries);
    } catch {
      return null;
    }
  }

  // --- Geo helpers ---

  function isLandFromTexture(lon: number, lat: number): boolean {
    if (!textureImageData) return false;
    const x = Math.floor(((lon - TILE_OFFSET + 180) / 360) * 3600);
    const y = Math.floor(((90 - (lat + TILE_OFFSET)) / 180) * 1800);
    if (x < 0 || x >= 3600 || y < 0 || y >= 1800) return false;
    const idx = (y * 3600 + x) * 4;
    return textureImageData.data[idx + 3] > 0;
  }

  function crossesAntimeridian(polygon: number[][]): boolean {
    let minLon = Infinity,
      maxLon = -Infinity;
    for (const c of polygon) {
      if (c[0] < minLon) minLon = c[0];
      if (c[0] > maxLon) maxLon = c[0];
    }
    return maxLon - minLon > 180;
  }

  function pointInPolygon(point: [number, number], polygon: number[][]): boolean {
    const [testLon, testLat] = point;

    if (crossesAntimeridian(polygon)) {
      const normTest = testLon < 0 ? testLon + 360 : testLon;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const normI = polygon[i][0] < 0 ? polygon[i][0] + 360 : polygon[i][0];
        const normJ = polygon[j][0] < 0 ? polygon[j][0] + 360 : polygon[j][0];
        if (
          polygon[i][1] > testLat !== polygon[j][1] > testLat &&
          normTest < ((normJ - normI) * (testLat - polygon[i][1])) / (polygon[j][1] - polygon[i][1]) + normI
        ) {
          inside = !inside;
        }
      }
      return inside;
    }

    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      if (
        polygon[i][1] > testLat !== polygon[j][1] > testLat &&
        testLon <
          ((polygon[j][0] - polygon[i][0]) * (testLat - polygon[i][1])) / (polygon[j][1] - polygon[i][1]) +
            polygon[i][0]
      ) {
        inside = !inside;
      }
    }
    return inside;
  }

  function findCountry(lon: number, lat: number): string | null {
    if (!countriesGeoJson) return null;
    const key = `${lon.toFixed(2)},${lat.toFixed(2)}`;
    if (tileCountryCache.has(key)) return tileCountryCache.get(key)!;

    for (const feat of countriesGeoJson.features) {
      if (feat.geometry.type === 'Polygon') {
        if (pointInPolygon([lon, lat], feat.geometry.coordinates[0])) {
          tileCountryCache.set(key, feat.properties.name);
          return feat.properties.name;
        }
      } else if (feat.geometry.type === 'MultiPolygon') {
        for (const poly of feat.geometry.coordinates) {
          if (pointInPolygon([lon, lat], poly[0])) {
            tileCountryCache.set(key, feat.properties.name);
            return feat.properties.name;
          }
        }
      }
    }

    tileCountryCache.set(key, null);
    return null;
  }

  // --- Tooltip ---

  function updateTooltip(lon: number, lat: number, x: number, y: number) {
    tooltipTileName = `${lon.toFixed(2)}, ${lat.toFixed(2)}`;
    tooltipCountry = findCountry(lon, lat);
    tooltipX = x + 15;
    tooltipY = y + 15;

    if (!coverageData) {
      tooltipType = 'loading';
      tooltipMessage = 'Loading...';
    } else {
      const key = `${lon.toFixed(2)},${lat.toFixed(2)}`;
      const years = coverageData.tiles[key];
      if (years) {
        tooltipType = 'coverage';
        tooltipYears = years.sort((a, b) => a - b);
        tooltipTotalYears = coverageData.years.length;
      } else if (isLandFromTexture(lon, lat)) {
        tooltipType = 'no-coverage';
        tooltipMessage = 'No tiles generated yet';
      } else {
        tooltipType = 'ocean';
        tooltipMessage = 'Ocean (outside landmask)';
      }
    }
    tooltipVisible = true;
  }

  // --- Screen to LatLon ---

  function screenToLatLon(screenX: number, screenY: number): { lon: number; lat: number } | null {
    if (!raycaster || !overlayMesh || !globeInstance) return null;

    const rect = containerEl.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((screenX - rect.left) / rect.width) * 2 - 1,
      -((screenY - rect.top) / rect.height) * 2 + 1,
    );

    raycaster.setFromCamera(mouse, globeInstance.camera());
    const intersects = raycaster.intersectObject(overlayMesh);
    if (intersects.length === 0) return null;

    const p = intersects[0].point;
    const radius = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
    const lat = (Math.asin(p.y / radius) * 180) / Math.PI;
    const lon = (Math.atan2(p.x, p.z) * 180) / Math.PI;

    return {
      lon: Math.floor(lon * 10) / 10 + TILE_OFFSET,
      lat: Math.floor(lat * 10) / 10 + TILE_OFFSET,
    };
  }

  // --- Overlay texture ---

  function loadOverlayTexture(): Promise<void> {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        textureImageData = ctx.getImageData(0, 0, img.width, img.height);

        const texture = new THREE.Texture(img);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        texture.needsUpdate = true;

        if (!overlayMesh) {
          const geo = new THREE.SphereGeometry(101, 128, 128);
          overlayMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: false,
            alphaTest: 0.01,
            side: THREE.FrontSide,
            depthTest: true,
            depthWrite: true,
          });
          overlayMesh = new THREE.Mesh(geo, overlayMaterial);
          overlayMesh.name = 'tilesOverlay';
          overlayMesh.rotation.y = 4.71;
          globeInstance.scene().add(overlayMesh);
        } else {
          overlayMaterial!.map = texture;
          overlayMaterial!.needsUpdate = true;
        }

        resolve();
      };
      img.src = `${DATA_BASE}/coverage_texture.png`;
    });
  }

  // --- Mouse handlers ---

  function handleMouseMove(event: MouseEvent) {
    const tile = screenToLatLon(event.clientX, event.clientY);
    if (tile) {
      const key = `${tile.lon.toFixed(2)},${tile.lat.toFixed(2)}`;
      if (lastHoveredTile !== key) {
        lastHoveredTile = key;
        updateTooltip(tile.lon, tile.lat, event.clientX, event.clientY);
      } else {
        tooltipX = event.clientX + 15;
        tooltipY = event.clientY + 15;
      }
    } else {
      lastHoveredTile = null;
      tooltipVisible = false;
    }
  }

  function handleMouseLeave() {
    lastHoveredTile = null;
    tooltipVisible = false;
  }

  // --- Globe init ---

  async function initGlobe() {
    const [{ default: Globe }, threeModule] = await Promise.all([
      import('globe.gl'),
      import('three'),
    ]);
    THREE = threeModule;

    globeInstance = Globe()(containerEl)
      .globeImageUrl('')
      .showGlobe(false)
      .showAtmosphere(false)
      .backgroundColor('rgba(0,0,0,0)')
      .polygonsData([])
      .polygonCapColor(() => 'rgba(0, 0, 0, 0)')
      .polygonSideColor(() => 'rgba(0, 0, 0, 0)')
      .polygonStrokeColor(() => 'rgba(255, 255, 255, 0.35)')
      .polygonAltitude(0.006)
      .width(containerEl.clientWidth)
      .height(containerEl.clientHeight);

    globeInstance.pointOfView({ lat: 20, lng: 0, altitude: 2.0 });
    globeInstance.controls().autoRotate = false;
    globeInstance.controls().enableZoom = true;

    globeInstance.renderer().setClearColor(0x000000, 0);

    raycaster = new THREE.Raycaster();

    containerEl.addEventListener('mousemove', handleMouseMove);
    containerEl.addEventListener('mouseleave', handleMouseLeave);

    resizeObserver = new ResizeObserver(() => {
      if (globeInstance && containerEl) {
        globeInstance.width(containerEl.clientWidth).height(containerEl.clientHeight);
      }
    });
    resizeObserver.observe(containerEl);

    statusText = 'Loading country boundaries...';
    countriesGeoJson = await loadCountries();
    if (countriesGeoJson) {
      globeInstance.polygonsData(countriesGeoJson.features);
      statusText = 'Loading coverage data...';
    }

    coverageData = await loadCoverageData();
    if (coverageData) {
      tileCount = coverageData.metadata.total_tiles;
      landmaskCount = coverageData.metadata.total_landmasks;
    }

    statusText = 'Loading coverage texture...';
    await loadOverlayTexture();
    statusText = '';
  }

  function cleanup() {
    containerEl?.removeEventListener('mousemove', handleMouseMove);
    containerEl?.removeEventListener('mouseleave', handleMouseLeave);
    resizeObserver?.disconnect();
    if (overlayMesh) {
      overlayMesh.geometry.dispose();
      overlayMaterial?.map?.dispose();
      overlayMaterial?.dispose();
    }
    if (globeInstance) {
      globeInstance.controls()?.dispose();
      globeInstance.renderer()?.dispose();
    }
    if (containerEl) containerEl.innerHTML = '';
  }

  onMount(() => {
    initGlobe();
    return cleanup;
  });
</script>

<div class="coverage-page">
  <header>
    <span class="page-label">Coverage</span>
    <p class="intro">We are generating <a href="https://github.com/ucam-eo/geotessera" target="_blank" rel="noopener">TESSERA v1</a> embeddings for Sentinel-2 satellite imagery from 2017 to 2025. The globe below shows the <strong>{tileCount.toLocaleString()}</strong> coverage tiles processed so far across <strong>{coverageData ? coverageData.years.length : '—'}</strong>&nbsp;years, out of <strong>{landmaskCount.toLocaleString()}</strong> total land tiles in the global landmask. Hover to inspect per-tile coverage, drag to rotate, and scroll to zoom.</p>
  </header>

  <div class="globe-card">
    <div class="globe-container" bind:this={containerEl}></div>

    <div class="legend-overlay">
      <span class="legend-item"><span class="swatch full"></span>Full coverage</span>
      <span class="legend-item"><span class="swatch multi"></span>Multi-year</span>
      <span class="legend-item"><span class="swatch latest"></span>Latest year</span>
      <span class="legend-item"><span class="swatch older"></span>Older year</span>
      <span class="legend-item"><span class="swatch none"></span>No tiles yet</span>
      <span class="legend-item"><span class="swatch ocean"></span>Ocean</span>
      {#if statusText}
        <span class="legend-status">{statusText}</span>
      {/if}
    </div>

    {#if tooltipVisible}
      <div class="tooltip" style="left: {tooltipX}px; top: {tooltipY}px;">
        <div class="tile-name">{tooltipTileName}</div>
        <div class="tile-info">
          {#if tooltipCountry}
            <strong>{tooltipCountry}</strong><br />
          {/if}
          {#if tooltipType === 'ocean'}
            <span class="water">{tooltipMessage}</span>
          {:else if tooltipType === 'no-coverage'}
            <span class="no-data">{tooltipMessage}</span>
          {:else if tooltipType === 'coverage'}
            <strong>Coverage:</strong> {tooltipYears.length} of {tooltipTotalYears} years<br />
            <strong>Years:</strong>
            {#each tooltipYears as year}
              <span class="year-badge">{year}</span>
            {/each}
          {:else}
            {tooltipMessage}
          {/if}
        </div>
      </div>
    {/if}
  </div>

  <div class="section">
    <p>Embeddings are currently available as NumPy tiles via the <a href="https://pypi.org/project/geotessera/" target="_blank" rel="noopener">geotessera</a> Python package. We are also converting the tile archive into Zarr format for efficient HTTP streaming — check the <a href="/about#roadmap" use:link>roadmap</a> for the latest status on v1-zarr and upcoming releases.</p>
    <p>If you need coverage for a specific region or time period that isn't yet available, you can <a href="https://github.com/ucam-eo/geotessera/issues/new?template=embedding-request.yml&labels=embedding-request" target="_blank" rel="noopener">submit a priority request</a> on GitHub and we will prioritise generating those tiles. Coverage data on this page updates every 12&nbsp;hours from the <a href="https://github.com/ucam-eo/tessera-coverage-map" target="_blank" rel="noopener">tessera-coverage-map</a> repository.</p>
  </div>

  <Footer />
</div>

<style>
  .coverage-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 48px 32px;
  }

  header {
    margin-bottom: 24px;
  }

  .page-label {
    font-weight: 300;
    letter-spacing: 4px;
    font-size: 18px;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .intro {
    font-size: 14px;
    line-height: 1.8;
    color: var(--text-secondary);
    margin-top: 10px;
  }

  .intro strong {
    color: var(--text-primary);
    font-weight: 500;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 13px;
  }

  .intro a {
    color: var(--accent-dim);
    text-decoration: none;
  }

  .intro a:hover {
    text-decoration: underline;
  }

  /* Globe card */
  .globe-card {
    position: relative;
    border: 1px solid var(--border-subtle);
    border-radius: 10px;
    overflow: hidden;
    background: transparent;
    margin-bottom: 20px;
  }

  .globe-container {
    width: 100%;
    aspect-ratio: 5 / 3;
  }

  .globe-container :global(canvas) {
    display: block;
  }

  /* Legend inside globe */
  .legend-overlay {
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 8px 12px;
    background: rgba(10, 10, 26, 0.75);
    border-radius: 6px;
    backdrop-filter: blur(8px);
    z-index: 10;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 0.5px;
  }

  .legend-status {
    font-size: 10px;
    color: var(--text-faint);
    letter-spacing: 0.5px;
    font-style: italic;
  }

  .swatch {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 2px;
  }

  .swatch.full { background: #00c800; }
  .swatch.multi { background: #00b4ff; }
  .swatch.latest { background: #ffc800; }
  .swatch.older { background: #c86400; }
  .swatch.none { background: #666; }
  .swatch.ocean { background: rgba(255, 255, 255, 0.3); }

  /* Description section */
  .section {
    margin-bottom: 32px;
  }

  .section p {
    font-size: 14px;
    line-height: 1.8;
    color: var(--text-secondary);
    margin-bottom: 12px;
  }

  .section p:last-child {
    margin-bottom: 0;
  }

  .section a {
    color: var(--accent-dim);
    text-decoration: none;
  }

  .section a:hover {
    text-decoration: underline;
  }

  /* Tooltip */
  .tooltip {
    position: fixed;
    background: rgba(10, 10, 26, 0.95);
    color: var(--text-primary);
    padding: 10px 14px;
    border-radius: 8px;
    pointer-events: none;
    font-size: 12px;
    z-index: 1000;
    border: 1px solid var(--accent-border);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    min-width: 180px;
    backdrop-filter: blur(10px);
  }

  .tile-name {
    font-weight: 600;
    font-size: 13px;
    color: var(--accent-dim);
    margin-bottom: 6px;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    letter-spacing: 0.5px;
  }

  .tile-info {
    line-height: 1.6;
    color: var(--text-secondary);
  }

  .tile-info strong {
    color: var(--text-primary);
  }

  .year-badge {
    display: inline-block;
    background: var(--accent-faint);
    padding: 2px 6px;
    border-radius: 4px;
    margin: 2px;
    font-size: 11px;
    border: 1px solid var(--accent-border);
    color: var(--accent-dim);
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
  }

  .no-data {
    color: #ff9800;
    font-style: italic;
  }

  .water {
    color: var(--accent-dim);
    font-style: italic;
  }

  @media (max-width: 640px) {
    .globe-container {
      aspect-ratio: 1;
    }
    .legend-overlay {
      gap: 8px;
      padding: 6px 10px;
    }
  }
</style>
