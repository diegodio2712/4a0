/**
 * Roteador por hash (#/caminho). Funciona em hospedagem estática sem
 * configuração de servidor.
 *
 * Cada rota: { path: '/captura/:slot', screen: {render}, title, auth }
 *  - `auth: true` exige sessão ativa; senão redireciona para /login.
 *  - `render(params)` devolve um Node que substitui o conteúdo de <main>.
 */

/** Converte '/captura/:slot' em uma RegExp e lista de nomes de parâmetros. */
export function compilePath(path) {
  const keys = [];
  const pattern = path
    .split('/')
    .map((seg) => {
      if (seg.startsWith(':')) {
        keys.push(seg.slice(1));
        return '([^/]+)';
      }
      return seg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    })
    .join('/');
  return { regex: new RegExp(`^${pattern}/?$`), keys };
}

/** Extrai o caminho de um hash: '#/colecao?x=1' -> '/colecao'. */
export function pathFromHash(hash) {
  const raw = (hash || '').replace(/^#/, '').split('?')[0];
  return raw.startsWith('/') ? raw : `/${raw}`;
}

/** Encontra a rota que casa com `path`. Retorna { route, params } ou null. */
export function matchRoute(routes, path) {
  for (const route of routes) {
    route._compiled ??= compilePath(route.path);
    const m = route._compiled.regex.exec(path);
    if (m) {
      const params = {};
      route._compiled.keys.forEach((k, i) => {
        params[k] = decodeURIComponent(m[i + 1]);
      });
      return { route, params };
    }
  }
  return null;
}

export function createRouter({ routes, outlet, isAuthenticated, notFound, onNavigate }) {
  function resolve() {
    const path = pathFromHash(window.location.hash);
    const found = matchRoute(routes, path);

    if (!found) {
      outlet.replaceChildren(notFound());
      onNavigate?.({ path, route: null });
      return;
    }
    if (found.route.auth && !isAuthenticated()) {
      navigate(`/login?next=${encodeURIComponent(path)}`, { replace: true });
      return;
    }

    document.title = `${found.route.title} · Pokémon Daily Challenge`;
    try {
      outlet.replaceChildren(found.route.screen.render(found.params));
    } catch (err) {
      console.error('[router] falha ao renderizar', path, err);
      outlet.replaceChildren(notFound('Ocorreu um erro ao abrir esta tela.'));
    }
    outlet.focus({ preventScroll: true });
    window.scrollTo(0, 0);
    onNavigate?.({ path, route: found.route });
  }

  function navigate(path, { replace = false } = {}) {
    const target = `#${path}`;
    if (replace) {
      history.replaceState(null, '', target);
      resolve();
    } else if (window.location.hash === target) {
      resolve();
    } else {
      window.location.hash = target; // dispara hashchange -> resolve()
    }
  }

  function start() {
    window.addEventListener('hashchange', resolve);
    if (!window.location.hash) history.replaceState(null, '', '#/');
    resolve();
  }

  return { start, navigate, resolve };
}

/** Navegação simples para uso pelas telas. */
export function go(path) {
  window.location.hash = `#${path}`;
}

/** Parâmetros de consulta do hash atual. */
export function hashQuery() {
  const q = window.location.hash.split('?')[1] || '';
  return Object.fromEntries(new URLSearchParams(q));
}
