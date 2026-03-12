import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import { atomFeedPlugin } from './vite-plugin-atom-feed';
import { blogLinks } from './src/lib/blog-links';

export default defineConfig({
  plugins: [
    svelte(),
    atomFeedPlugin({
      siteUrl: 'https://geotessera.org',
      blogDir: path.resolve(__dirname, 'content/blog'),
      links: blogLinks,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@content': path.resolve(__dirname, './content'),
      '@ucam-eo/maplibre-zarr-tessera': path.resolve(__dirname, '../tze/packages/maplibre-zarr-tessera/src/index.ts'),
    },
  },
  server: {
    fs: {
      allow: ['.', '../tze'],
    },
  },
});
