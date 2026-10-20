/** 3. Painel do jogador. */
import { h } from '../ui/dom.js';
import { icon } from '../ui/icons.js';
import { screenHeader, ballCount, stageNotice } from '../ui/components.js';
import { currentUser } from '../core/session.js';
import { gameDay, msUntilReset, formatDuration } from '../core/clock.js';
import { INITIAL_INVENTORY } from '../data/types.js';
import { MOCK_COLLECTION } from '../data/mock.js';

const SHORTCUTS = [
  { href: '#/sorteio', icon: 'dice', label: 'Sorteio diário' },
  { href: '#/inventario', icon: 'bag', label: 'Inventário' },
  { href: '#/colecao', icon: 'book', label: 'Coleção' },
  { href: '#/equipe', icon: 'team', label: 'Equipe' },
  { href: '#/elite', icon: 'crown', label: 'Elite dos 4' },
  { href: '#/historico', icon: 'history', label: 'Histórico' },
];

export function render() {
  const user = currentUser();
  const countdown = h('strong', { class: 'countdown' }, formatDuration(msUntilReset()));

  // Atualiza o contador enquanto a tela estiver no documento.
  const timer = setInterval(() => {
    if (!countdown.isConnected) return clearInterval(timer);
    countdown.textContent = formatDuration(msUntilReset());
  }, 1000);

  return h('div', { class: 'screen screen-dashboard' },
    screenHeader(`Olá, ${user?.username ?? 'Treinador'}!`, `Dia de jogo: ${gameDay()} (America/Sao_Paulo)`),
    h('div', { class: 'dash-grid' },
      h('div', { class: 'dash-card dash-cycle' },
        icon('clock', { size: 32 }),
        h('div', {}, h('span', { class: 'muted' }, 'Próximo ciclo em'), countdown),
        h('span', { class: 'pill pill-ok' }, 'Captura disponível')),
      h('div', { class: 'dash-card' },
        icon('book', { size: 32 }),
        h('div', {}, h('span', { class: 'muted' }, 'Coleção'), h('strong', {}, `${MOCK_COLLECTION.length} Pokémon`))),
      h('div', { class: 'dash-card' },
        icon('trophy', { size: 32 }),
        h('div', {}, h('span', { class: 'muted' }, 'Elite dos 4'), h('strong', {}, '0 vitórias')))),
    h('div', { class: 'ball-row' }, Object.entries(INITIAL_INVENTORY).map(([k, n]) => ballCount(k, n))),
    h('nav', { class: 'shortcut-grid', 'aria-label': 'Atalhos' },
      SHORTCUTS.map((s) => h('a', { class: 'shortcut', href: s.href }, icon(s.icon, { size: 32 }), h('span', {}, s.label)))),
    stageNotice(2, 'os números acima passarão a vir do seu progresso salvo.'));
}
