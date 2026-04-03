import { blogLinks } from './blog-links';
import { resolveAuthors } from './data/people';

interface FeedEntry {
  id: string;
  title: string;
  date: string;
  author: string;
  description: string;
  url: string;
  tags: string[];
}

/** Blog modules are loaded at build time via import.meta.glob */
export function generateAtomFeed(
  siteUrl: string,
  blogEntries: FeedEntry[],
): string {
  const sorted = [...blogEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const updated = sorted[0]?.date ?? new Date().toISOString().slice(0, 10);

  const entries = sorted
    .map(
      (e) => `  <entry>
    <id>${escXml(e.url)}</id>
    <title>${escXml(e.title)}</title>
    <link href="${escXml(e.url)}" rel="alternate"/>
    <updated>${toISO(e.date)}</updated>
    ${resolveAuthors(e.author).map((ra) => `<author><name>${escXml(ra.name)}</name>${ra.person?.url ? `<uri>${escXml(ra.person.url)}</uri>` : ''}</author>`).join('\n    ')}
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
  <icon>${siteUrl}/favicon.ico</icon>
${entries}
</feed>
`;
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

/** Collect all blog entries for the feed (both .svx and link posts). */
export function collectFeedEntries(
  svxModules: Record<string, any>,
  siteUrl: string,
): FeedEntry[] {
  const svxEntries: FeedEntry[] = Object.entries(svxModules).map(
    ([path, mod]) => {
      const meta = (mod as any).metadata ?? {};
      const slug = path.split('/').pop()?.replace(/\.svx$/, '') ?? '';
      return {
        id: slug,
        title: meta.title ?? slug,
        date: meta.date ?? '1970-01-01',
        author: meta.author ?? 'TESSERA Team',
        description: meta.description ?? '',
        url: `${siteUrl}/blog/${slug}`,
        tags: meta.tags ?? [],
      };
    },
  );

  const linkEntries: FeedEntry[] = blogLinks.map((link) => ({
    id: link.id,
    title: link.title,
    date: link.date,
    author: link.author,
    description: link.description,
    url: link.url,
    tags: link.tags,
  }));

  return [...svxEntries, ...linkEntries];
}
