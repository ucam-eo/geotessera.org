<script lang="ts">
  import Globe from '@/components/Globe.svelte';
  import OpenSection from '@/components/OpenSection.svelte';
  import PostCard from '@/components/PostCard.svelte';
  import Footer from '@/components/Footer.svelte';
  import { link } from '@/lib/router';
  import { getAllContent } from '@/lib/content';

  let scrollContainer: HTMLElement;

  const allContent = getAllContent();
  const latest = allContent.slice(0, 2);
</script>

<div class="home" bind:this={scrollContainer}>
  <Globe {scrollContainer} />

  <div class="scroll-spacer"></div>

  <div class="content">
    <OpenSection />

    <section class="latest">
      <div class="section-header">
        <span class="section-label">LATEST</span>
        <a href="/blog" use:link>View all →</a>
      </div>
      <div class="grid">
        {#each latest as post}
          <PostCard
            title={post.title}
            href={post.href}
            tags={post.tags}
            languages={post.languages}
          />
        {/each}
      </div>
    </section>

    <Footer />
  </div>
</div>

<style>
  .home {
    height: 100vh;
    overflow-y: auto;
  }

  .scroll-spacer {
    height: 300vh;
    pointer-events: none;
  }

  .content {
    position: relative;
    background: var(--bg-primary);
  }

  .latest {
    padding: 32px;
    border-top: 1px solid var(--border-subtle);
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .section-label {
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--text-faint);
  }

  .section-header a {
    font-size: 11px;
    color: var(--accent-dim);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
</style>
