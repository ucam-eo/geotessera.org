import { defineConfig, type Plugin } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import fs from 'fs';
import { atomFeedPlugin } from './vite-plugin-atom-feed';
import { sitemapPlugin } from './vite-plugin-sitemap';
import { blogLinks } from './src/lib/blog-links';

/**
 * GitHub Pages SPA support: copy index.html into each known route directory
 * (e.g. dist/blog/index.html) so direct navigation returns a 200, plus a
 * catch-all 404.html for dynamic routes like /blog/:slug.
 */
function spa404Plugin(routes: string[]): Plugin {
  return {
    name: 'spa-404',
    writeBundle() {
      const dist = path.resolve(__dirname, 'dist');
      const index = path.join(dist, 'index.html');
      fs.copyFileSync(index, path.join(dist, '404.html'));
      for (const route of routes) {
        if (route === '/') continue;
        const dir = path.join(dist, route.slice(1));
        fs.mkdirSync(dir, { recursive: true });
        fs.copyFileSync(index, path.join(dir, 'index.html'));
      }
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
    spa404Plugin(['/', '/about', '/blog', '/tasks', '/papers', '/videos', '/coverage']),
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
