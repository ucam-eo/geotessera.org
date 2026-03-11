<script lang="ts">
  import { link } from '@/lib/router';

  interface Props {
    tag: string;
    href?: string;
  }

  let { tag, href }: Props = $props();
</script>

{#if href}
  <a {href} use:link class="pill">{tag}</a>
{:else}
  <span class="pill">{tag}</span>
{/if}

<style>
  .pill {
    font-size: 9px;
    padding: 2px 8px;
    background: var(--accent-faint);
    border-radius: 10px;
    color: var(--accent-dim);
    letter-spacing: 1px;
    text-decoration: none;
    transition: background 0.2s;
  }

  a.pill:hover {
    background: rgba(0, 200, 255, 0.2);
  }
</style>
