import { defineConfig, type Plugin } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import fs from 'fs';
import { atomFeedPlugin } from './vite-plugin-atom-feed';
import { sitemapPlugin } from './vite-plugin-sitemap';
import { blogLinks } from './src/lib/blog-links';

/** Copy index.html → 404.html so GitHub Pages serves the SPA shell for all routes. */
function spa404Plugin(): Plugin {
  return {
    name: 'spa-404',
    closeBundle() {
      const dist = path.resolve(__dirname, 'dist');
      fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'));
    },
  };
}

export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [
    svelte(),
    atomFeedPlugin({
      siteUrl: 'https://geotessera.org',
      blogDir: path.resolve(__dirname, 'content/blog'),
      links: blogLinks,
    }),
    sitemapPlugin({
      siteUrl: 'https://geotessera.org',
      staticRoutes: ['/', '/about', '/blog', '/tasks', '/papers', '/videos', '/coverage'],
      blogDir: path.resolve(__dirname, 'content/blog'),
    }),
    spa404Plugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@content': path.resolve(__dirname, './content'),
    },
  },
  server: {
    fs: {
      allow: ['.', '../tze'],
    },
  },
});
