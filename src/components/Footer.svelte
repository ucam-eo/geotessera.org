<script lang="ts">
  import SocialIcons from './SocialIcons.svelte';
</script>

<footer>
  <SocialIcons />
  <span>&copy; 2025–2026, <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener">CC0</a> licensed.</span>
</footer>

<style>
  footer {
    padding: 20px 32px;
    border-top: 1px solid var(--border-subtle);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;
    font-size: 10px;
    color: var(--text-faint);
    letter-spacing: 1px;
  }

  footer :global(.social-links a) {
    opacity: 0.5;
  }

  footer a {
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s;
  }

  footer a:hover {
    color: var(--accent-dim);
  }

  @media (max-width: 768px) {
    footer {
      padding: 20px 16px;
    }
  }
</style>
