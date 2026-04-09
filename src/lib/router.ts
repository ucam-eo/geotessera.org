import { writable, derived } from 'svelte/store';

/** Strip Vite's base path to get the app-relative pathname. */
export const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');

function stripBase(pathname: string): string {
  let p = pathname;
  if (base && p.startsWith(base)) {
    p = p.slice(base.length) || '/';
  }
  // Strip trailing slash so /blog/ matches the /blog route
  if (p !== '/' && p.endsWith('/')) {
    p = p.slice(0, -1);
  }
  return p;
}

/** Permanent redirects — old URL → new URL. Uses replaceState so the old path never appears in history. */
const redirects: Record<string, string> = {
  '/tasks': '/docs#tasks',
  '/getting-started': '/docs',
};

const initialPath = stripBase(window.location.pathname);
export const currentPath = writable(initialPath);

/** Notify Matomo of a client-side navigation. */
function trackPageView() {
  const _paq = (window as any)._paq;
  if (!_paq) return;
  _paq.push(['setCustomUrl', window.location.href]);
  _paq.push(['setDocumentTitle', document.title]);
  _paq.push(['trackPageView']);
}

/** Check for redirects and apply them with replaceState. Returns true if redirected. */
function applyRedirect(pathname: string): boolean {
  const target = redirects[pathname];
  if (!target) return false;
  const [newPath, hash] = target.split('#');
  const fullPath = base + newPath + (hash ? `#${hash}` : '');
  window.history.replaceState(null, '', fullPath);
  currentPath.set(newPath);
  if (hash) {
    requestAnimationFrame(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }
  return true;
}

// Apply redirect on initial page load (e.g. direct visit to /tasks)
applyRedirect(initialPath);

window.addEventListener('popstate', () => {
  const p = stripBase(window.location.pathname);
  if (applyRedirect(p)) return;
  currentPath.set(p);
  trackPageView();
});

export function navigate(path: string) {
  const [pathname, hash] = path.split('#');
  if (applyRedirect(pathname)) return;
  const fullPath = base + (pathname === '/' ? '/' : pathname) + (hash ? `#${hash}` : '');
  if (fullPath === window.location.pathname + window.location.hash && !hash) return;
  window.history.pushState(null, '', fullPath);
  currentPath.set(pathname);
  if (hash) {
    requestAnimationFrame(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  } else {
    window.scrollTo(0, 0);
  }
  trackPageView();
}

export function link(node: HTMLAnchorElement) {
  function handleClick(e: MouseEvent) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const href = node.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('//')) return;
    e.preventDefault();
    navigate(href);
  }
  node.addEventListener('click', handleClick);
  return {
    destroy() {
      node.removeEventListener('click', handleClick);
    },
  };
}

interface Route {
  pattern: RegExp;
  params: string[];
}

function compileRoute(path: string): Route {
  const params: string[] = [];
  const pattern = path.replace(/:(\w+)/g, (_, name) => {
    params.push(name);
    return '([^/]+)';
  });
  return { pattern: new RegExp(`^${pattern}$`), params };
}

const routes: { path: string; route: Route }[] = [
  '/',
  '/about',
  '/blog',
  '/blog/:slug',
  '/projects',
  '/projects/:id',
  '/tasks/:tag',
  '/tasks/:tag/:slug',
  '/papers',
  '/videos',
  '/coverage',
  '/crop-umap',
  '/docs',
].map((path) => ({ path, route: compileRoute(path) }));

export const currentRoute = derived(currentPath, ($path) => {
  for (const { path, route } of routes) {
    const match = $path.match(route.pattern);
    if (match) {
      const params: Record<string, string> = {};
      route.params.forEach((name, i) => {
        params[name] = match[i + 1];
      });
      return { path, params };
    }
  }
  return { path: '/404', params: {} };
});
