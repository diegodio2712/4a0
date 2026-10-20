/** 10. Tela de batalha por turnos (layout clássico, dados de exemplo). */
import { h } from '../ui/dom.js';
import { sprite, hpBar, statusBadge, stageNotice } from '../ui/components.js';
import { TYPES } from '../data/types.js';
import { MOCK_COLLECTION } from '../data/mock.js';

export function render() {
  const player = { ...MOCK_COLLECTION[0], hp: 112 };
  const foe = { dex: 87, name: 'Dewgong', level: 54, hp: 60, maxHp: 165, status: 'par', types: ['water', 'ice'] };

  const messages = h('div', { class: 'battle-log', 'aria-live': 'polite' },
    h('p', {}, 'Lorelei enviou Dewgong!'),
    h('p', {}, `Vai, ${player.name}!`));

  function say(text) {
    messages.append(h('p', {}, text));
    messages.scrollTop = messages.scrollHeight;
  }

  let view = 'fight';
  const menu = h('div', { class: 'battle-menu' });
  const tabs = h('div', { class: 'battle-tabs' });

  function renderMenu() {
    tabs.replaceChildren(...[['fight', 'Lutar'], ['switch', 'Trocar']].map(([k, label]) =>
      h('button', { type: 'button', class: ['tab', view === k && 'is-active'], 'aria-pressed': String(view === k),
        on: { click: () => { view = k; renderMenu(); } } }, label)));
    if (view === 'fight') {
      menu.replaceChildren(...player.moves.map((m) => h('button', {
        type: 'button',
        class: 'move-btn',
        style: `--type-color:${TYPES[m.type].color}`,
        disabled: m.pp === 0,
        on: { click: () => say(`${player.name} usaria ${m.name}. (Motor de batalha: Etapa 5)`) },
      }, h('strong', {}, m.name), h('small', {}, `${TYPES[m.type].label} · PP ${m.pp}/${m.maxPp}`))));
    } else {
      menu.replaceChildren(...MOCK_COLLECTION.slice(1).map((p) => h('button', {
        type: 'button',
        class: 'move-btn switch-btn',
        on: { click: () => say(`Trocar para ${p.name}. (Motor de batalha: Etapa 5)`) },
      }, sprite(p.dex, p.name, { size: 40 }), h('strong', {}, p.name), h('small', {}, `Nv ${p.level}`))));
    }
  }
  renderMenu();

  return h('div', { class: 'screen screen-battle' },
    h('div', { class: 'battle-header' }, h('span', {}, 'Elite dos 4 · 1/4'), h('strong', {}, 'Lorelei')),
    h('div', { class: 'battlefield' },
      h('div', { class: 'combatant foe' },
        h('div', { class: 'combatant-box' },
          h('div', { class: 'combatant-name' }, h('strong', {}, foe.name), statusBadge(foe.status), h('span', {}, `Nv${foe.level}`)),
          hpBar(foe.hp, foe.maxHp, { showNumbers: false })),
        sprite(foe.dex, foe.name, { size: 128, className: 'combatant-sprite' })),
      h('div', { class: 'combatant player' },
        sprite(player.dex, player.name, { size: 144, back: true, className: 'combatant-sprite' }),
        h('div', { class: 'combatant-box' },
          h('div', { class: 'combatant-name' }, h('strong', {}, player.name), statusBadge(null), h('span', {}, `Nv${player.level}`)),
          hpBar(player.hp, player.stats.hp)))),
    messages,
    tabs,
    menu,
    stageNotice(5, 'todas as ações serão resolvidas pelo motor de batalha, com estado salvo e RNG registrado.'));
}
