import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.svx'],
      highlight: {
        highlighter: async (code, lang) => {
          const { codeToHtml } = await import('shiki');
          const html = await codeToHtml(code, {
            lang: lang || 'text',
            theme: 'github-dark',
          });
          const wrapped = `<div class="code-block">${html}<button type="button" class="copy-code-btn" aria-label="Copy code">Copy</button></div>`;
          return `{@html \`${wrapped.replace(/`/g, '\\`')}\`}`;
        },
      },
    }),
  ],
  extensions: ['.svelte', '.svx'],
};
