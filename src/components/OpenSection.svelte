<script lang="ts">
  import { siteConfig } from '@/lib/config';
</script>

<section class="open-section">
  <div class="header">
    <span class="label">FULLY OPEN</span>
    <div class="line"></div>
    <a href={siteConfig.social.github} target="_blank" rel="noopener">
      github.com/ucam-eo →
    </a>
  </div>
  <div class="grid">
    <div class="pillar">
      <div class="icon">⚖</div>
      <div class="name">Open Weights</div>
      <div class="desc">Model checkpoints freely available</div>
    </div>
    <div class="pillar">
      <div class="icon">◈</div>
      <div class="name">Open Data</div>
      <div class="desc">Pre-computed embeddings downloadable</div>
    </div>
    <div class="pillar">
      <div class="icon">⟳</div>
      <div class="name">Open Training</div>
      <div class="desc">Full training pipeline reproducible</div>
    </div>
    <div class="pillar">
      <div class="icon">▷</div>
      <div class="name">Open Inference</div>
      <div class="desc">Run locally or in the browser</div>
    </div>
  </div>
</section>

<style>
  .open-section {
    padding: 32px;
    border-top: 1px solid var(--border-subtle);
  }

  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .label {
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--text-faint);
    white-space: nowrap;
  }

  .line {
    flex: 1;
    height: 1px;
    background: var(--border-subtle);
  }

  .header a {
    font-size: 11px;
    color: var(--accent-dim);
    letter-spacing: 1px;
    white-space: nowrap;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  .pillar {
    text-align: center;
    padding: 16px 12px;
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: 6px;
  }

  .icon {
    font-size: 18px;
    margin-bottom: 6px;
  }

  .name {
    font-size: 11px;
    color: var(--accent-dim);
    letter-spacing: 1px;
    margin-bottom: 4px;
  }

  .desc {
    font-size: 10px;
    color: var(--text-faint);
  }
</style>
