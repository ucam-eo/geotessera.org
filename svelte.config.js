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
          return `{@html \`${html.replace(/`/g, '\\`')}\`}`;
        },
      },
    }),
  ],
  extensions: ['.svelte', '.svx'],
};
