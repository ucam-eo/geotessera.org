import type { Plugin } from 'vite';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

interface BlogLinkEntry {
  id: string;
  title: string;
  date: string;
  author: string;
  description: string;
  url: string;
  tags: string[];
}

interface SvxMeta {
  title?: string;
  date?: string;
  author?: string;
  description?: string;
  tags?: string[];
}

function parseFrontmatter(content: string): SvxMeta {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const meta: Record<string, any> = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w+):\s*(.+)$/);
    if (m) {
      let val = m[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      if (val.startsWith('[') && val.endsWith(']')) {
        meta[m[1]] = val
          .slice(1, -1)
          .split(',')
          .map((s) => s.trim());
      } else {
        meta[m[1]] = val;
      }
    }
  }
  return meta as SvxMeta;
}

function escXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function toISO(date: string): string {
  return new Date(date).toISOString();
}

function buildFeed(siteUrl: string, blogDir: string, links: BlogLinkEntry[]): string {
  const entries: { title: string; date: string; author: string; description: string; url: string; tags: string[] }[] = [];

  // Read .svx files
  try {
    const files = readdirSync(blogDir).filter((f) => f.endsWith('.svx'));
    for (const file of files) {
      const content = readFileSync(join(blogDir, file), 'utf-8');
      const meta = parseFrontmatter(content);
      const slug = file.replace(/\.svx$/, '');
      entries.push({
        title: meta.title ?? slug,
        date: meta.date ?? '1970-01-01',
        author: meta.author ?? 'TESSERA Team',
        description: meta.description ?? '',
        url: `${siteUrl}/blog/${slug}`,
        tags: meta.tags ?? [],
      });
    }
  } catch {
    // no blog dir yet
  }

  // Add link posts
  for (const link of links) {
    entries.push({
      title: link.title,
      date: link.date,
      author: link.author,
      description: link.description,
      url: link.url,
      tags: link.tags,
    });
  }

  entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const updated = entries[0]?.date ?? new Date().toISOString().slice(0, 10);

  const xml = entries
    .map(
      (e) => `  <entry>
    <id>${escXml(e.url)}</id>
    <title>${escXml(e.title)}</title>
    <link href="${escXml(e.url)}" rel="alternate"/>
    <updated>${toISO(e.date)}</updated>
    <author><name>${escXml(e.author)}</name></author>
    <summary>${escXml(e.description)}</summary>
    ${e.tags.map((t) => `<category term="${escXml(t)}"/>`).join('\n    ')}
  </entry>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${siteUrl}/blog</id>
  <title>TESSERA Blog</title>
  <subtitle>Updates, tutorials, and research from the TESSERA community</subtitle>
  <link href="${siteUrl}/blog" rel="alternate"/>
  <link href="${siteUrl}/blog/feed.xml" rel="self"/>
  <updated>${toISO(updated)}</updated>
${xml}
</feed>
`;
}

export function atomFeedPlugin(opts: { siteUrl: string; blogDir: string; links: BlogLinkEntry[] }): Plugin {
  const feedPath = '/blog/feed.xml';
  let feedContent = '';

  return {
    name: 'atom-feed',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === feedPath) {
          feedContent = buildFeed(opts.siteUrl, opts.blogDir, opts.links);
          res.setHeader('Content-Type', 'application/atom+xml; charset=utf-8');
          res.end(feedContent);
          return;
        }
        next();
      });
    },
    generateBundle() {
      feedContent = buildFeed(opts.siteUrl, opts.blogDir, opts.links);
      this.emitFile({
        type: 'asset',
        fileName: 'blog/feed.xml',
        source: feedContent,
      });
    },
  };
}
