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

const blogModules = import.meta.glob('../../content/blog/*.svx', { eager: true }) as Record<string, any>;
const taskModules = import.meta.glob('../../content/tasks/*.svx', { eager: true }) as Record<string, any>;

function extractSlug(path: string): string {
  const filename = path.split('/').pop() ?? '';
  return filename.replace(/\.svx$/, '');
}

function loadModules(modules: Record<string, any>, type: 'blog' | 'task'): ContentMeta[] {
  return Object.entries(modules).map(([path, mod]) => {
    const meta = mod.metadata ?? {};
    const slug = extractSlug(path);
    const tags: string[] = meta.tags ?? [];
    const href = type === 'blog'
      ? `/blog/${slug}`
      : `/tasks/${tags[0] ?? 'uncategorized'}/${slug}`;
    return {
      title: meta.title ?? slug,
      date: meta.date ?? '1970-01-01',
      tags,
      languages: meta.languages,
      author: meta.author,
      description: meta.description,
      slug,
      href,
      type,
      component: mod.default,
    };
  });
}

let _allContent: ContentMeta[] | null = null;

export function getAllContent(): ContentMeta[] {
  if (!_allContent) {
    const blogs = loadModules(blogModules, 'blog');
    const tasks = loadModules(taskModules, 'task');
    _allContent = [...blogs, ...tasks].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  return _allContent;
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
