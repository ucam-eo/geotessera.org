<script lang="ts">
  import { link } from '@/lib/router';
  import { siteConfig } from '@/lib/config';
  import { getPeopleByRole } from '@/lib/data/people';
  import Footer from '@/components/Footer.svelte';

  const faculty = getPeopleByRole('faculty');
  const researchers = getPeopleByRole('researcher');
  const affiliates = getPeopleByRole('affiliate');
  const collaborators = getPeopleByRole('collaborator');

  const aboutJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About TESSERA',
    description: 'The TESSERA project at the University of Cambridge',
    url: 'https://geotessera.org/about',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://geotessera.org' },
        { '@type': 'ListItem', position: 2, name: 'About' },
      ],
    },
  });
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${aboutJsonLd}</script>`}
</svelte:head>

<div class="about-page">
  <header>
    <span class="page-label">About</span>
    <p class="subtitle">The TESSERA project at the University of Cambridge</p>
  </header>

  <!-- Overview -->
  <section class="section" id="overview">
    <h2>What is TESSERA?</h2>
    <p>
      TESSERA (Temporal Embeddings of Surface Spectra for Earth Representation and Analysis) is a
      foundation model for Earth observation developed at the University of Cambridge. It compresses
      a full year of Sentinel-1 and Sentinel-2 satellite observations into dense, 128-dimensional
      per-pixel embeddings at 10m spatial resolution.
    </p>
    <p>
      These self-supervised embeddings provide a general-purpose representation that transfers
      across <a href="/tasks" use:link>downstream tasks</a> — from
      <a href="/tasks/land-cover" use:link>land cover classification</a> to
      <a href="/tasks/solar" use:link>solar panel detection</a> — with minimal additional training.
      Over 90% of final task performance is achievable using less than 1% of available labelled data.
    </p>
  </section>

  <!-- Roadmap -->
  <section class="section" id="roadmap">
    <h2>Roadmap</h2>
    <p>Current status and planned milestones for TESSERA embeddings and model development. See the <a href="/coverage" use:link>coverage map</a> for current global progress.</p>
    <dl class="involve-list">
      {#each siteConfig.roadmap as item}
        <div class="involve-item">
          <dt><span class="roadmap-version">{item.version}</span> <span class="roadmap-status {item.status}">{item.statusLabel}</span></dt>
          <dd>{item.description}{#if item.linkText}{' '}{#if item.linkUrl.startsWith('/')}<a href={item.linkUrl} use:link>{item.linkText}</a>{:else}<a href={item.linkUrl} target="_blank" rel="noopener">{item.linkText}</a>{/if}{/if}{#if item.link2Text}{' · '}{#if item.link2Url.startsWith('/')}<a href={item.link2Url} use:link>{item.link2Text}</a>{:else}<a href={item.link2Url} target="_blank" rel="noopener">{item.link2Text}</a>{/if}{/if}</dd>
        </div>
      {/each}
    </dl>
  </section>

  <!-- People -->
  <section class="section" id="people">
    <h2>People</h2>

    {#snippet personRow(person)}
      {#if person.url}
        <a class="person" href={person.url} target="_blank" rel="noopener">
          <div class="avatar">
            {#if person.photo}
              <img src={person.photo} alt="Portrait of {person.name}" />
            {:else}
              {person.initials}
            {/if}
          </div>
          <div class="person-text">
            <span class="person-name">{person.name}</span>
            <span class="person-role">
              {#if person.title}<span class="role-line">{person.title}</span>{/if}
              {#if person.affiliation}<span class="role-line">{person.affiliation}</span>{/if}
            </span>
          </div>
        </a>
      {:else}
        <div class="person">
          <div class="avatar">
            {#if person.photo}
              <img src={person.photo} alt="Portrait of {person.name}" />
            {:else}
              {person.initials}
            {/if}
          </div>
          <div class="person-text">
            <span class="person-name">{person.name}</span>
            <span class="person-role">
              {#if person.title}<span class="role-line">{person.title}</span>{/if}
              {#if person.affiliation}<span class="role-line">{person.affiliation}</span>{/if}
            </span>
          </div>
        </div>
      {/if}
    {/snippet}

    <div class="people-group">
      <h3>Lead Faculty</h3>
      <div class="people-list">
        {#each faculty as person}
          {@render personRow(person)}
        {/each}
      </div>
    </div>

    <div class="people-group">
      <h3>Researchers</h3>
      <div class="people-list">
        {#each researchers as person}
          {@render personRow(person)}
        {/each}
      </div>
    </div>

    <div class="people-group">
      <h3>Research Affiliates</h3>
      <div class="people-list">
        {#each affiliates as person}
          {@render personRow(person)}
        {/each}
      </div>
    </div>

    <div class="people-group">
      <h3>Project Collaborators</h3>
      <div class="people-list collab">
        {#each collaborators as person}
          <div class="person">
            {#if person.url}
              <a class="person-name" href={person.url} target="_blank" rel="noopener">{person.name}</a>
            {:else}
              <span class="person-name">{person.name}</span>
            {/if}
            {#if person.affiliation || person.title}
              <span class="person-affil">{person.affiliation || person.title}</span>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <div class="people-group">
      <h3>Media &amp; Communications</h3>
      <div class="media-contact">
        <div class="media-contact-name">Constantino Panagopulos</div>
        <div class="media-contact-role">Communications Coordinator, Tessera</div>
        <div class="media-contact-lines">
          <a href="tel:+447356104073">+44 (0)7356 104 073</a>
          <a href="mailto:cp918@cam.ac.uk">cp918@cam.ac.uk</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Acknowledgments -->
  <section class="section" id="acknowledgments">
    <h2>Acknowledgments</h2>
    <p>
      We are grateful to <a href="https://www.hpc.cam.ac.uk/d-w-n" target="_blank" rel="noopener">DAWN</a>,
      the AI supercomputer at the University of Cambridge, and AMD for their generous support
      in computational resources and technical assistance. Satellite data is provided by the
      <a href="https://browser.dataspace.copernicus.eu/" target="_blank" rel="noopener">Copernicus programme</a>
      via Sentinel-1 and Sentinel-2.
    </p>
    <p>
      We also acknowledge compute resources from the <a href="https://www.isambard.ac.uk" target="_blank" rel="noopener">UKRI AIRR Isambard facility</a>, GPU hosting from <a href="https://www.vultr.com" target="_blank" rel="noopener">Vultr</a> and <a href="https://www.amd.com" target="_blank" rel="noopener">AMD</a>, and donations from <a href="https://www.janestreet.com" target="_blank" rel="noopener">Jane Street</a> to the University of Cambridge.
    </p>
  </section>

  <Footer />
</div>

<style>
  .about-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 48px 32px;
  }

  header { margin-bottom: 36px; }

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

  /* People */
  .people-group {
    margin-bottom: 30px;
  }

  .people-group h3 {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 14px;
  }

  .people-list {
    display: grid;
    grid-template-columns: 1fr;
  }

  .person {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    padding: 16px 0;
    min-width: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition:
      color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
      background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
      border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
      text-decoration-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .avatar {
    flex: none;
    width: 80px;
    height: 80px;
    align-self: flex-start;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.06);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.35);
    overflow: hidden;
    display: grid;
    place-items: center;
    font-size: 24px;
    font-weight: 300;
    letter-spacing: 0.5px;
    color: var(--accent-dim);
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.45s cubic-bezier(0, 0, 0.2, 1);
  }

  .person:hover .avatar img {
    transform: scale(1.06);
  }

  .person-text {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex-grow: 1;
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .person-name {
    display: block;
    font-size: 20px;
    font-weight: 400;
    line-height: 30px;
    color: var(--text-primary);
    letter-spacing: 0.2px;
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 3px;
    transition:
      text-decoration-color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
      color 0.2s;
  }

  a.person-name:hover {
    color: var(--accent);
  }

  .person:hover .person-name {
    text-decoration-color: rgba(0, 210, 255, 0.55);
  }

  .person-role {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 15px;
    line-height: 1.55;
    color: var(--text-secondary);
  }

  .person-role .role-line:last-child {
    color: var(--text-muted);
  }

  /* Project Collaborators — plain list of name + institution, no photo, no title */
  .people-list.collab {
    display: block;
  }

  .people-list.collab .person {
    display: block;
    padding: 9px 0;
    min-width: 0;
    border-bottom: 1px solid var(--border-subtle);
    background: none;
    border-radius: 0;
    gap: 0;
    cursor: default;
  }

  .people-list.collab .person:last-child {
    border-bottom: none;
  }

  .people-list.collab .person-name {
    display: inline;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.5;
    text-decoration: none;
  }

  .people-list.collab .person-affil {
    display: inline;
    font-size: 13px;
    color: var(--text-muted);
  }

  .people-list.collab .person-affil::before {
    content: '\00a0\2014\00a0';
  }

  /* Media & Communications — static single-entry card, toned down to the
     same type scale as Project Collaborators rather than the photo rows */
  .media-contact-name {
    font-size: 15px;
    font-weight: 500;
    line-height: 1.4;
    color: var(--text-primary);
  }

  .media-contact-role {
    font-size: 13px;
    line-height: 1.4;
    color: var(--text-muted);
    margin-top: 3px;
  }

  .media-contact-lines {
    display: flex;
    flex-direction: column;
    gap: 3px;
    margin-top: 8px;
    font-size: 13px;
    line-height: 1.4;
  }

  .media-contact-lines a {
    display: block;
    color: var(--accent-dim);
    text-decoration: none;
    width: fit-content;
  }

  .media-contact-lines a:hover {
    text-decoration: underline;
  }

  @media (min-width: 640px) {
    .person {
      gap: 24px;
      padding: 24px 0;
    }

    .avatar {
      width: 100px;
      height: 100px;
      font-size: 30px;
    }

    .person-text {
      gap: 12px;
    }
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

  /* Roadmap */
  .roadmap-version {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 13px;
    letter-spacing: 0.5px;
  }

  .roadmap-status {
    font-size: 11px;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 10px;
    margin-left: 8px;
  }

  .roadmap-status.available {
    color: #4ade80;
    background: rgba(74, 222, 128, 0.1);
  }

  .roadmap-status.ongoing {
    color: #facc15;
    background: rgba(250, 204, 21, 0.1);
  }

  .roadmap-status.planned {
    color: var(--text-muted);
    background: rgba(255, 255, 255, 0.05);
  }

  @media (max-width: 768px) {
    .about-page {
      padding: 32px 16px;
    }

    .involve-item {
      padding: 10px 0;
    }
  }

  @media (max-width: 640px) {
    .person-name {
      font-size: 18px;
      line-height: 26px;
    }
  }
</style>
