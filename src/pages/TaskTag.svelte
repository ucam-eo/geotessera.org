<script lang="ts">
  import { navigate } from '@/lib/router';
  import { onMount } from 'svelte';

  interface Props {
    tag: string;
  }

  let { tag }: Props = $props();

  onMount(() => {
    navigate('/docs');
    requestAnimationFrame(() => {
      const el = document.getElementById(tag);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  });
</script>
