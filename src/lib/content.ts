export interface ContentMeta {
  title: string;
  date: string;
  tags: string[];
  languages?: string[];
  author?: string;
  description?: string;
  slug: string;
  href: string;
  type: 'blog' | 'task';
  component: any;
}

export function getAllContent(): ContentMeta[] {
  return [
    { title: 'Land Classification with OSM Labels', date: '2026-03-11', tags: ['classification', 'osm'], languages: ['TypeScript', 'Python'], slug: 'osm-land-classification', href: '/tasks/classification/osm-land-classification', type: 'task', component: null },
    { title: 'Solar Panel Detection with UNet', date: '2026-03-11', tags: ['segmentation', 'solar'], languages: ['TypeScript', 'Python'], slug: 'solar-panel-detection', href: '/tasks/segmentation/solar-panel-detection', type: 'task', component: null },
  ];
}

export function getBlogPosts(): ContentMeta[] {
  return getAllContent().filter((c) => c.type === 'blog');
}

export function getTaskExamples(): ContentMeta[] {
  return getAllContent().filter((c) => c.type === 'task');
}

export function getContentByTag(tag: string): ContentMeta[] {
  return getAllContent().filter((c) => c.tags.includes(tag));
}

export function getContentBySlug(slug: string): ContentMeta | undefined {
  return getAllContent().find((c) => c.slug === slug);
}
