import { writable, derived } from 'svelte/store';

/** Strip Vite's base path to get the app-relative pathname. */
export const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');

function stripBase(pathname: string): string {
  if (base && pathname.startsWith(base)) {
    const stripped = pathname.slice(base.length);
    return stripped || '/';
  }
  return pathname;
}

export const currentPath = writable(stripBase(window.location.pathname));

window.addEventListener('popstate', () => {
  currentPath.set(stripBase(window.location.pathname));
});

export function navigate(path: string) {
  const [pathname, hash] = path.split('#');
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
  '/tasks',
  '/tasks/:tag',
  '/tasks/:tag/:slug',
  '/papers',
  '/videos',
  '/coverage',
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
