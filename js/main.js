/** Ponto de entrada: registra rotas, monta navegação e inicia o roteador. */
import { createRouter } from './core/router.js';
import { isAuthenticated, currentUser, signOut, onSessionChange } from './core/session.js';
import { h } from './ui/dom.js';
import { icon, hydrateIcons } from './ui/icons.js';

import * as home from './screens/home.js';
import * as login from './screens/login.js';
import * as dashboard from './screens/dashboard.js';
import * as daily from './screens/daily.js';
import * as capture from './screens/capture.js';
import * as inventory from './screens/inventory.js';
import * as collection from './screens/collection.js';
import * as team from './screens/team.js';
import * as elitePrep from './screens/elitePrep.js';
import * as battle from './screens/battle.js';
import * as history from './screens/history.js';
import * as notFound from './screens/notFound.js';

const routes = [
  { path: '/', screen: home, title: 'Início', auth: false },
  { path: '/login', screen: login, title: 'Entrar', auth: false },
  { path: '/painel', screen: dashboard, title: 'Painel', auth: true },
  { path: '/sorteio', screen: daily, title: 'Sorteio diário', auth: true },
  { path: '/captura/:slot', screen: capture, title: 'Captura', auth: true },
  { path: '/inventario', screen: inventory, title: 'Inventário', auth: true },
  { path: '/colecao', screen: collection, title: 'Coleção', auth: true },
  { path: '/equipe', screen: team, title: 'Equipe', auth: true },
  { path: '/elite', screen: elitePrep, title: 'Elite dos 4', auth: true },
  { path: '/batalha', screen: battle, title: 'Batalha', auth: true },
  { path: '/historico', screen: history, title: 'Histórico', auth: true },
];

/** Itens de navegação. `match` define quais rotas destacam o item. */
const NAV = [
  { href: '#/painel', label: 'Painel', icon: 'home', match: ['/painel'] },
  { href: '#/sorteio', label: 'Sorteio', icon: 'dice', match: ['/sorteio', '/captura'] },
  { href: '#/colecao', label: 'Coleção', icon: 'book', match: ['/colecao', '/inventario'] },
  { href: '#/equipe', label: 'Equipe', icon: 'team', match: ['/equipe'] },
  { href: '#/elite', label: 'Elite 4', icon: 'crown', match: ['/elite', '/batalha', '/historico'] },
];

const topNav = document.getElementById('top-nav');
const bottomNav = document.getElementById('bottom-nav');
const headerUser = document.getElementById('header-user');

function renderNav(path) {
  const logged = isAuthenticated();
  document.body.classList.toggle('is-logged', logged);
  const items = logged
    ? NAV.map((item) => {
      const active = item.match.some((m) => path === m || path.startsWith(`${m}/`));
      return h('a', { href: item.href, class: ['nav-item', active && 'is-active'], 'aria-current': active ? 'page' : undefined },
        icon(item.icon, { size: 22 }), h('span', {}, item.label));
    })
    : [];
  topNav.replaceChildren(...items);
  bottomNav.replaceChildren(...items.map((el) => el.cloneNode(true)));

  headerUser.replaceChildren(logged
    ? h('button', { type: 'button', class: 'btn btn-ghost btn-sm', on: { click: () => { signOut(); router.navigate('/'); } } },
      icon('logout', { size: 18 }), h('span', { class: 'hide-sm' }, currentUser().username))
    : h('a', { class: 'btn btn-secondary btn-sm', href: '#/login' }, 'Entrar'));
}

const router = createRouter({
  routes,
  outlet: document.getElementById('app'),
  isAuthenticated,
  notFound: (msg) => notFound.render(msg),
  onNavigate: ({ path }) => renderNav(path),
});

onSessionChange(() => renderNav(window.location.hash.replace(/^#/, '').split('?')[0]));
hydrateIcons();
router.start();
