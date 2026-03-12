import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  plugins: [svelte()],
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
