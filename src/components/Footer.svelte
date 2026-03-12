<script lang="ts">
  import { siteConfig } from '@/lib/config';
</script>

<footer>
  <div class="social-links">
    <a href={siteConfig.social.github} target="_blank" rel="noopener" aria-label="GitHub">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
    </a>
    <a href={siteConfig.social.bluesky} target="_blank" rel="noopener" aria-label="Bluesky">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.785 2.627 3.588 3.476 6.182 3.21-4.037.6-7.588 2.048-3.413 7.24C7.478 25.67 9.93 21.34 12 18.67c2.07 2.67 4.523 7 8.607 2.027 4.175-5.192.625-6.64-3.413-7.24 2.594.266 5.397-.583 6.182-3.21.246-.828.624-5.788.624-6.479 0-.688-.139-1.86-.902-2.203-.659-.3-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z"/></svg>
    </a>
    <a href={siteConfig.social.twitter} target="_blank" rel="noopener" aria-label="X / Twitter">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    </a>
    <a href={siteConfig.social.zulip} target="_blank" rel="noopener" aria-label="Zulip">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 2C3.12 2 2 3.12 2 4.5v2.03c0 .9.47 1.73 1.24 2.2L12 14l8.76-5.27A2.62 2.62 0 0 0 22 6.53V4.5C22 3.12 20.88 2 19.5 2h-15zm0 20C3.12 22 2 20.88 2 19.5v-2.03c0-.9.47-1.73 1.24-2.2L12 10l8.76 5.27c.77.47 1.24 1.3 1.24 2.2v2.03c0 1.38-1.12 2.5-2.5 2.5h-15z"/></svg>
    </a>
  </div>
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

  .social-links {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .social-links a {
    color: var(--text-muted);
    opacity: 0.5;
    transition: opacity 0.2s, color 0.2s;
    display: flex;
  }

  .social-links a:hover {
    opacity: 1;
    color: var(--accent-dim);
  }

  .social-links svg {
    width: 18px;
    height: 18px;
  }

  footer a {
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s;
  }

  footer a:hover {
    color: var(--accent-dim);
  }
</style>
