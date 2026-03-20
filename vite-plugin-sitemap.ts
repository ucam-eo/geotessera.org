import type { Plugin } from 'vite';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

interface SitemapOpts {
  siteUrl: string;
  staticRoutes: string[];
  blogDir: string;
}

export function sitemapPlugin(opts: SitemapOpts): Plugin {
  function buildSitemap(): string {
    const urls = [...opts.staticRoutes];

    // Add blog post slugs
    try {
      const files = readdirSync(opts.blogDir).filter((f) => f.endsWith('.svx'));
      for (const file of files) {
        const content = readFileSync(join(opts.blogDir, file), 'utf-8');
        const draftMatch = content.match(/^---\n[\s\S]*?\ndraft:\s*(true|false)[\s\S]*?\n---/);
        if (draftMatch && draftMatch[1] === 'true') continue;
        const slug = file.replace(/\.svx$/, '');
        urls.push(`/blog/${slug}`);
      }
    } catch {
      // no blog dir yet
    }

    const entries = urls
      .map(
        (path) =>
          `  <url>\n    <loc>${opts.siteUrl}${path}</loc>\n  </url>`,
      )
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
  }

  return {
    name: 'sitemap',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.end(buildSitemap());
          return;
        }
        next();
      });
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: buildSitemap(),
      });
    },
  };
}
