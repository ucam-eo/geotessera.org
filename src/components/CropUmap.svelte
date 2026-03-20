<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  import maplibregl from 'maplibre-gl';

  let wrapper: HTMLDivElement;
  let scatterEl: HTMLDivElement;
  let mapEl: HTMLDivElement;
  let legendEl: HTMLDivElement;
  let infoEl: HTMLDivElement;
  let loadingEl: HTMLDivElement;
  let statsText = $state('');
  let isFullscreen = $state(false);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      wrapper.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  onMount(() => {
    let destroyed = false;
    let animId = 0;
    let glMap: maplibregl.Map | null = null;
    let renderer: THREE.WebGLRenderer | null = null;

    (async () => {
      // ── Helpers ──────────────────────────────────────────────
      function b64ToF32(b64: string) {
        const bin = atob(b64);
        const buf = new ArrayBuffer(bin.length);
        const u8 = new Uint8Array(buf);
        for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
        return new Float32Array(buf);
      }
      function b64ToU8(b64: string) {
        const bin = atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
        return arr;
      }
      function hexToRGB(hex: string): [number, number, number] {
        return [
          parseInt(hex.slice(1, 3), 16) / 255,
          parseInt(hex.slice(3, 5), 16) / 255,
          parseInt(hex.slice(5, 7), 16) / 255,
        ];
      }
      function luminance(hex: string) {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        return 0.299 * r + 0.587 * g + 0.114 * b;
      }

      // ── Fetch data ──────────────────────────────────────────
      const resp = await fetch('/blog/umap_data.json');
      if (!resp.ok) throw new Error('Failed to load umap_data.json: ' + resp.status);
      const D = await resp.json();
      if (destroyed) return;

      const N: number = D.nPoints;
      const positions = b64ToF32(D.positions);
      const cropIdx = b64ToU8(D.cropIdx);
      const ptLons = b64ToF32(D.lons);
      const ptLats = b64ToF32(D.lats);
      const cropNames: string[] = D.cropNames;
      const cropColors: Record<string, string> = D.cropColors;
      const cropLucodes: string[] = D.cropLucodes;
      const cropCounts: Record<string, number> = D.cropCounts;
      const cromeIds: string[] = D.cromeIds;

      if (loadingEl) loadingEl.style.display = 'none';
      statsText = `${N.toLocaleString()} cells · ${cropNames.length} crop classes · TESSERA 128-dim · CROME 2024`;

      // ── WFS ─────────────────────────────────────────────────
      const wfsBase =
        'https://environment.data.gov.uk/spatialdata/crop-map-of-england-2024/wfs' +
        '?service=WFS&version=2.0.0&request=GetFeature' +
        '&typeNames=dataset-0903079b-35a2-47de-b805-77a0cc0c57bf:Crop_Map_of_England_2024' +
        '&outputFormat=application/json&CQL_FILTER=cromeid%3D%27';

      // ── Legend ──────────────────────────────────────────────
      const hiddenCrops = new Set<number>();
      let html = '';
      cropNames.forEach((crop, ci) => {
        const color = cropColors[crop];
        const count = cropCounts[crop] || 0;
        html +=
          `<div class="legend-item" data-ci="${ci}" data-crop="${crop}">` +
          `<div class="swatch" style="background:${color}"></div>` +
          `<span>${crop}</span>` +
          `<span class="count">${count.toLocaleString()}</span></div>`;
      });
      legendEl.innerHTML = html;

      function updateVisibility() {
        for (let i = 0; i < N; i++) sizes[i] = hiddenCrops.has(cropIdx[i]) ? 0.0 : 1.0;
        geometry.attributes.aSize.needsUpdate = true;
      }

      legendEl.addEventListener('click', (e) => {
        const item = (e.target as HTMLElement).closest('.legend-item') as HTMLElement | null;
        if (!item) return;
        const ci = parseInt(item.dataset.ci!, 10);
        if (hiddenCrops.has(ci)) hiddenCrops.delete(ci);
        else hiddenCrops.add(ci);
        updateVisibility();
        legendEl.querySelectorAll(`.legend-item[data-crop="${cropNames[ci]}"]`)
          .forEach((el) => el.classList.toggle('hidden'));
      });

      legendEl.addEventListener('mouseenter', (e) => {
        const item = (e.target as HTMLElement).closest('.legend-item') as HTMLElement | null;
        if (!item) return;
        const ci = parseInt(item.dataset.ci!, 10);
        for (let i = 0; i < N; i++) {
          if (hiddenCrops.has(cropIdx[i])) { alphas[i] = 0.0; continue; }
          alphas[i] = cropIdx[i] === ci ? 1.0 : 0.08;
        }
        geometry.attributes.aAlpha.needsUpdate = true;
        material.depthWrite = false;
      }, true);

      legendEl.addEventListener('mouseleave', (e) => {
        const item = (e.target as HTMLElement).closest('.legend-item') as HTMLElement | null;
        if (!item) return;
        for (let i = 0; i < N; i++) alphas[i] = hiddenCrops.has(cropIdx[i]) ? 0.0 : 1.0;
        geometry.attributes.aAlpha.needsUpdate = true;
        material.depthWrite = true;
      }, true);

      // ── Three.js scene ─────────────────────────────────────
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60, scatterEl.clientWidth / scatterEl.clientHeight, 0.1, 1000,
      );
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setSize(scatterEl.clientWidth, scatterEl.clientHeight);
      renderer.setClearColor(0x0a0a0f);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      scatterEl.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;

      // ── Point cloud ────────────────────────────────────────
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const colors = new Float32Array(N * 3);
      const colorLUT = cropNames.map((c) => hexToRGB(cropColors[c] || '#888888'));
      for (let i = 0; i < N; i++) {
        const rgb = colorLUT[cropIdx[i]] || [0.5, 0.5, 0.5];
        colors[i * 3] = rgb[0];
        colors[i * 3 + 1] = rgb[1];
        colors[i * 3 + 2] = rgb[2];
      }
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const sizes = new Float32Array(N); sizes.fill(1.0);
      geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

      const alphas = new Float32Array(N); alphas.fill(1.0);
      geometry.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uPixelRatio: { value: renderer.getPixelRatio() },
          uBaseSize: { value: 3.0 },
        },
        vertexShader: `
          attribute float aSize;
          attribute float aAlpha;
          varying vec3 vColor;
          varying float vAlpha;
          uniform float uPixelRatio;
          uniform float uBaseSize;
          void main() {
            vColor = color;
            vAlpha = aAlpha;
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPos;
            if (aSize == 0.0) { gl_Position = vec4(2.0,2.0,2.0,1.0); gl_PointSize = 0.0; return; }
            gl_PointSize = aSize * uBaseSize * uPixelRatio * (80.0 / -mvPos.z);
            gl_PointSize = clamp(gl_PointSize, 1.0, 30.0);
          }`,
        fragmentShader: `
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            vec2 c = gl_PointCoord - 0.5;
            float dist = length(c) * 2.0;
            if (dist > 1.0) discard;
            float coreAlpha = 1.0 - smoothstep(0.6, 1.0, dist);
            float glow = 0.15 * (1.0 - smoothstep(0.3, 1.0, dist));
            float light = 1.0 - dist * 0.3;
            float finalAlpha = (coreAlpha + glow) * vAlpha;
            if (finalAlpha < 0.005) discard;
            gl_FragColor = vec4(vColor * light, finalAlpha);
          }`,
        vertexColors: true,
        transparent: true,
        depthWrite: true,
      });

      scene.add(new THREE.Points(geometry, material));

      // ── Highlight sphere ───────────────────────────────────
      let highlightMesh: THREE.Mesh | null = null;
      function highlightPoint(idx: number) {
        if (highlightMesh) scene.remove(highlightMesh);
        const x = positions[idx * 3], y = positions[idx * 3 + 1], z = positions[idx * 3 + 2];
        highlightMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.4, 12, 8),
          new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.85 }),
        );
        highlightMesh.position.set(x, y, z);
        scene.add(highlightMesh);
      }

      // ── Hover / Click ray picking ─────────────────────────
      let hoveredIdx = -1;
      let hoveredOrigColor = [0, 0, 0];
      const colorArr = geometry.attributes.color.array as Float32Array;

      function rayPick(mx: number, my: number): number {
        const ray = new THREE.Raycaster();
        ray.setFromCamera(new THREE.Vector2(mx, my), camera);
        const orig = ray.ray.origin, dir = ray.ray.direction;
        let closestDist = Infinity, closestIdx = -1;
        const thresh2 = 0.36;
        for (let i = 0; i < N; i++) {
          if (sizes[i] === 0) continue;
          const px = positions[i * 3] - orig.x, py = positions[i * 3 + 1] - orig.y, pz = positions[i * 3 + 2] - orig.z;
          const proj = px * dir.x + py * dir.y + pz * dir.z;
          if (proj <= 0) continue;
          const cx = orig.x + dir.x * proj - positions[i * 3];
          const cy = orig.y + dir.y * proj - positions[i * 3 + 1];
          const cz = orig.z + dir.z * proj - positions[i * 3 + 2];
          const d2 = cx * cx + cy * cy + cz * cz;
          if (d2 < thresh2) {
            const camD2 = px * px + py * py + pz * pz;
            if (camD2 < closestDist) { closestDist = camD2; closestIdx = i; }
          }
        }
        return closestIdx;
      }

      let lastHoverTime = 0;
      renderer.domElement.addEventListener('mousemove', (event) => {
        const now = performance.now();
        if (now - lastHoverTime < 60) return;
        lastHoverTime = now;
        const rect = renderer!.domElement.getBoundingClientRect();
        const mx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const my = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        const idx = rayPick(mx, my);

        if (idx >= 0) {
          if (hoveredIdx >= 0 && hoveredIdx !== idx) {
            colorArr[hoveredIdx * 3] = hoveredOrigColor[0];
            colorArr[hoveredIdx * 3 + 1] = hoveredOrigColor[1];
            colorArr[hoveredIdx * 3 + 2] = hoveredOrigColor[2];
            sizes[hoveredIdx] = hiddenCrops.has(cropIdx[hoveredIdx]) ? 0.0 : 1.0;
          }
          if (hoveredIdx !== idx) {
            hoveredOrigColor = [colorArr[idx * 3], colorArr[idx * 3 + 1], colorArr[idx * 3 + 2]];
            colorArr[idx * 3] = 1.0; colorArr[idx * 3 + 1] = 1.0; colorArr[idx * 3 + 2] = 1.0;
            sizes[idx] = 2.0;
            geometry.attributes.color.needsUpdate = true;
            geometry.attributes.aSize.needsUpdate = true;
          }
          hoveredIdx = idx;
          renderer!.domElement.style.cursor = 'pointer';
        } else {
          if (hoveredIdx >= 0) {
            colorArr[hoveredIdx * 3] = hoveredOrigColor[0];
            colorArr[hoveredIdx * 3 + 1] = hoveredOrigColor[1];
            colorArr[hoveredIdx * 3 + 2] = hoveredOrigColor[2];
            sizes[hoveredIdx] = hiddenCrops.has(cropIdx[hoveredIdx]) ? 0.0 : 1.0;
            geometry.attributes.color.needsUpdate = true;
            geometry.attributes.aSize.needsUpdate = true;
            hoveredIdx = -1;
          }
          renderer!.domElement.style.cursor = '';
        }
      });

      renderer.domElement.addEventListener('click', (event) => {
        const rect = renderer!.domElement.getBoundingClientRect();
        const mx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const my = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        const idx = rayPick(mx, my);
        if (idx >= 0) selectPoint(idx);
      });

      // ── MapLibre GL map ────────────────────────────────────
      glMap = new maplibregl.Map({
        container: mapEl,
        style: {
          version: 8,
          sources: {
            satellite: {
              type: 'raster',
              tiles: ['https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2021_3857/default/GoogleMapsCompatible/{z}/{y}/{x}.jpg'],
              tileSize: 256,
              attribution: 'Sentinel-2 cloudless by <a href="https://s2maps.eu">EOX</a>',
            },
          },
          layers: [
            { id: 'bg', type: 'background', paint: { 'background-color': '#0a0a1a' } },
            { id: 'satellite', type: 'raster', source: 'satellite' },
          ],
        },
        center: [-1.5, 52.5],
        zoom: 5,
        interactive: true,
        attributionControl: false,
      });

      function makeHexCoords(lon: number, lat: number): [number, number][] {
        const latRad = lat * Math.PI / 180;
        const mPerDegLat = 111320;
        const mPerDegLon = 111320 * Math.cos(latRad);
        const R = 40;
        const pts: [number, number][] = [];
        for (let a = 0; a < 6; a++) {
          const angle = (Math.PI / 3) * a;
          pts.push([lon + R * Math.cos(angle) / mPerDegLon, lat + R * Math.sin(angle) / mPerDegLat]);
        }
        pts.push(pts[0]);
        return pts;
      }

      let cellSourceAdded = false;

      function selectPoint(idx: number) {
        highlightPoint(idx);
        const ci = cropIdx[idx];
        const crop = cropNames[ci];
        const lucode = cropLucodes[ci];
        const lon = ptLons[idx];
        const lat = ptLats[idx];
        const color = cropColors[crop] || '#888';
        const textColor = luminance(color) > 0.4 ? '#111' : '#fff';
        const cromeId = cromeIds[idx];
        const wfsUrl = wfsBase + cromeId + '%27';

        infoEl.innerHTML =
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 12px;">' +
          `<div><span class="label">Crop</span><br>` +
          `<span class="crop-badge" style="background:${color};color:${textColor}">${crop}</span></div>` +
          `<div><span class="label">LUCODE</span><br><span class="value">${lucode}</span></div>` +
          `<div><span class="label">CROME ID</span><br><span class="value">${cromeId}</span></div>` +
          `<div><span class="label">Coordinates</span><br><span class="value">${lon.toFixed(5)}, ${lat.toFixed(5)}</span></div></div>` +
          `<a class="wfs-link" href="${wfsUrl}" target="_blank" rel="noopener">View CROME record &#x2197;</a>`;

        const hexCoords = makeHexCoords(lon, lat);
        const geojson: GeoJSON.Feature = {
          type: 'Feature',
          geometry: { type: 'Polygon', coordinates: [hexCoords] },
          properties: {},
        };

        if (glMap) {
          if (cellSourceAdded) {
            (glMap.getSource('cell') as maplibregl.GeoJSONSource).setData(geojson);
            glMap.setPaintProperty('cell-fill', 'fill-color', color);
            glMap.setPaintProperty('cell-line', 'line-color', color);
          } else {
            glMap.addSource('cell', { type: 'geojson', data: geojson });
            glMap.addLayer({ id: 'cell-fill', type: 'fill', source: 'cell', paint: { 'fill-color': color, 'fill-opacity': 0.35 } });
            glMap.addLayer({ id: 'cell-line', type: 'line', source: 'cell', paint: { 'line-color': color, 'line-width': 2 } });
            cellSourceAdded = true;
          }
          glMap.flyTo({ center: [lon, lat], zoom: 16, duration: 1500 });
        }
      }

      // ── Camera + animation ─────────────────────────────────
      camera.position.set(65, 55, 65);
      camera.lookAt(0, 0, 0);
      scene.add(new THREE.AmbientLight(0xffffff, 0.5));

      function animate() {
        if (destroyed) return;
        animId = requestAnimationFrame(animate);
        controls.update();
        renderer!.render(scene, camera);
      }
      animate();

      function onResize() {
        if (!renderer || destroyed) return;
        const w = scatterEl.clientWidth, h = scatterEl.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        glMap?.resize();
      }
      window.addEventListener('resize', onResize);

      function onKey(e: KeyboardEvent) {
        if (e.code === 'Space' && document.activeElement === renderer?.domElement) {
          e.preventDefault();
          camera.position.set(65, 55, 65);
          camera.lookAt(0, 0, 0);
          controls.reset();
        }
      }
      document.addEventListener('keydown', onKey);

      function onFullscreenChange() {
        isFullscreen = !!document.fullscreenElement;
        // Give the browser a frame to reflow, then resize the renderer + map
        requestAnimationFrame(onResize);
      }
      document.addEventListener('fullscreenchange', onFullscreenChange);

      // Store cleanup refs
      (wrapper as any).__cleanup = () => {
        window.removeEventListener('resize', onResize);
        document.removeEventListener('keydown', onKey);
        document.removeEventListener('fullscreenchange', onFullscreenChange);
      };
    })();

    return () => {
      destroyed = true;
      cancelAnimationFrame(animId);
      renderer?.dispose();
      glMap?.remove();
      (wrapper as any).__cleanup?.();
    };
  });
</script>

<div class="umap-wrapper" bind:this={wrapper}>
  <div class="umap-header">
    <span class="umap-title">CROME-TESSERA <span class="accent">3D UMAP</span></span>
    <div class="umap-header-right">
      <span class="umap-stats">{statsText}</span>
      <button class="fullscreen-btn" onclick={toggleFullscreen} title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
        {#if isFullscreen}
          <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path d="M3 12h4v4h2v-6H3v2zm4-8H3v2h4v4h2V4H7zm6 12h4v-2h-4v-4h-2v6h2zm-2-12v6h2V8h4V6h-4V4h-2z"/></svg>
        {:else}
          <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path d="M3 3h6v2H5v4H3V3zm8 0h6v6h-2V5h-4V3zM5 11H3v6h6v-2H5v-4zm10 0v4h-4v2h6v-6h-2z"/></svg>
        {/if}
      </button>
    </div>
  </div>
  <div class="umap-body">
    <div class="umap-scatter-pane">
      <div class="umap-loading" bind:this={loadingEl}>Loading data&hellip;</div>
      <div class="umap-scatter" bind:this={scatterEl}></div>
      <div class="umap-legend" bind:this={legendEl}></div>
      <div class="umap-hint">
        Drag: rotate · Scroll: zoom · Right-drag: pan<br>
        Click point: inspect · Space: reset view
      </div>
    </div>
    <div class="umap-map-pane">
      <div class="umap-map" bind:this={mapEl}></div>
      <div class="umap-info" bind:this={infoEl}>
        <p class="placeholder-text">Click a point in the 3D scatter to inspect cell details</p>
      </div>
    </div>
  </div>
</div>

<style>
  .umap-wrapper {
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    overflow: hidden;
    background: #0a0a0f;
    margin: 24px -24px;
  }

  .umap-header {
    height: 40px;
    background: linear-gradient(135deg, #0f1923 0%, #1a2a3a 60%, #1e3322 100%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .umap-title { font-size: 13px; font-weight: 600; letter-spacing: 0.5px; color: #f0f0f0; }
  .umap-title .accent { font-weight: 300; color: #8ab4a0; margin-left: 4px; }
  .umap-stats { font-size: 11px; color: #9aa; }

  .umap-header-right { display: flex; align-items: center; gap: 10px; }

  .fullscreen-btn {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 4px;
    color: #aab;
    cursor: pointer;
    padding: 4px 6px;
    display: flex;
    align-items: center;
    transition: background 0.15s, color 0.15s;
  }
  .fullscreen-btn:hover { background: rgba(255,255,255,0.15); color: #e0e0e0; }

  .umap-body { display: flex; height: 550px; }

  .umap-wrapper:fullscreen .umap-body { height: calc(100vh - 40px); }

  .umap-scatter-pane { width: 60%; height: 100%; position: relative; background: #0a0a0f; }
  .umap-scatter { width: 100%; height: 100%; }

  .umap-map-pane {
    width: 40%; height: 100%;
    display: flex; flex-direction: column;
    border-left: 1px solid rgba(255,255,255,0.08);
  }
  .umap-map { flex: 1; min-height: 0; }

  .umap-loading {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0f; z-index: 200; font-size: 14px; color: #8a9a9a;
  }

  .umap-info {
    max-height: 160px; background: #111820;
    padding: 12px 14px;
    border-top: 1px solid rgba(255,255,255,0.08);
    overflow-y: auto; font-size: 12px; line-height: 1.6;
  }
  .umap-info :global(.label) { color: #7a8a8a; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; }
  .umap-info :global(.value) { color: #e0e8e4; font-weight: 500; }
  .umap-info :global(.crop-badge) {
    display: inline-block; padding: 2px 8px;
    border-radius: 10px; font-size: 12px; font-weight: 600; margin-top: 2px;
  }
  .umap-info :global(.wfs-link) {
    display: inline-block; margin-top: 6px; padding: 3px 10px;
    background: rgba(66,153,225,0.15); border: 1px solid rgba(66,153,225,0.4);
    border-radius: 6px; color: #63b3ed; text-decoration: none; font-size: 11px;
    transition: background 0.15s;
  }
  .umap-info :global(.wfs-link:hover) { background: rgba(66,153,225,0.3); }
  .placeholder-text { color: #5a6a6a; text-align: center; padding-top: 12px; }

  .umap-legend {
    position: absolute; bottom: 10px; left: 10px;
    background: rgba(10,12,18,0.92); backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
    padding: 8px 10px; z-index: 100;
    max-height: calc(100% - 20px); overflow-y: auto; min-width: 130px;
  }
  .umap-legend :global(.legend-item) {
    display: flex; align-items: center; gap: 6px;
    padding: 1px 0; cursor: pointer; font-size: 11px;
    user-select: none; transition: opacity 0.15s;
  }
  .umap-legend :global(.legend-item:hover) { opacity: 0.85; }
  .umap-legend :global(.legend-item.hidden) { opacity: 0.3; }
  .umap-legend :global(.swatch) { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
  .umap-legend :global(.count) { margin-left: auto; color: #6a7a7a; font-size: 10px; }

  .umap-hint {
    position: absolute; top: 8px; right: 8px;
    background: rgba(10,12,18,0.85); backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.08); border-radius: 6px;
    padding: 5px 8px; font-size: 10px; color: #7a8a8a;
    z-index: 100; line-height: 1.5;
  }

  @media (max-width: 700px) {
    .umap-wrapper { margin: 16px -12px; }
    .umap-body { flex-direction: column; height: 700px; }
    .umap-scatter-pane { width: 100%; height: 55%; }
    .umap-map-pane { width: 100%; height: 45%; border-left: none; border-top: 1px solid rgba(255,255,255,0.08); }
    .umap-stats { display: none; }
  }
</style>
