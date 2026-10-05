<script lang="ts">
  import { fundingSources } from '@/lib/data/funding';
</script>

<p class="funding-intro">Tessera is hosted by the University of Cambridge. Satellite data is provided by the <a href="https://browser.dataspace.copernicus.eu/" target="_blank" rel="noopener">Copernicus programme</a> via Sentinel-1 and Sentinel-2. We gratefully acknowledge the following organisations and individuals for funding and supporting Tessera.</p>
<dl class="funding-list">
  {#each fundingSources as source}
    <div class="funding-item">
      <dt>{#if source.url}<a href={source.url} target="_blank" rel="noopener">{source.name}</a>{:else}{source.name}{/if}{#if source.grantRef}{' '}<span class="grant-ref">[{source.grantRef}]</span>{/if}</dt>
      {#if source.description}<dd>{source.description}</dd>{/if}
    </div>
  {/each}
</dl>

<style>
  .funding-intro {
    font-size: 13px;
    line-height: 1.7;
    color: var(--text-secondary);
    margin: 0 0 16px;
  }

  .funding-intro a {
    color: var(--accent-dim);
    text-decoration: none;
  }

  .funding-intro a:hover {
    text-decoration: underline;
  }

  .funding-list {
    border-top: 1px solid var(--border-subtle);
  }

  .funding-item {
    padding: 12px 0;
    border-bottom: 1px solid var(--border-subtle);
  }

  .funding-item dt {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 4px;
    letter-spacing: 0.2px;
  }

  .funding-item dd {
    font-size: 13px;
    line-height: 1.7;
    color: var(--text-secondary);
    margin: 0;
  }

  .funding-item dt a {
    color: var(--text-primary);
  }

  .grant-ref {
    font-weight: 400;
    color: var(--text-muted);
    white-space: nowrap;
  }

  .funding-item a {
    color: var(--accent-dim);
    text-decoration: none;
  }

  .funding-item a:hover {
    text-decoration: underline;
  }
</style>
