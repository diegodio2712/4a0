/** 7. Coleção de Pokémon: busca, filtro por tipo e detalhes. */
import { h } from '../ui/dom.js';
import { icon } from '../ui/icons.js';
import { screenHeader, pokemonCard, statTable, typeList, sprite, dexNumber, emptyState, stageNotice, button } from '../ui/components.js';
import { TYPES } from '../data/types.js';
import { MOCK_COLLECTION } from '../data/mock.js';

export function render() {
  let query = '';
  let type = '';
  let selectedId = null;

  const grid = h('div', { class: 'card-grid' });
  const detail = h('div', { class: 'detail-slot' });

  const search = h('input', {
    type: 'search',
    placeholder: 'Buscar por nome ou número',
    'aria-label': 'Buscar Pokémon',
    on: { input: (e) => { query = e.target.value.trim().toLowerCase(); update(); } },
  });
  const filter = h('select', { 'aria-label': 'Filtrar por tipo', on: { change: (e) => { type = e.target.value; update(); } } },
    h('option', { value: '' }, 'Todos os tipos'),
    Object.entries(TYPES).map(([k, t]) => h('option', { value: k }, t.label)));

  function update() {
    const list = MOCK_COLLECTION.filter((p) =>
      (!type || p.types.includes(type)) &&
      (!query || p.name.toLowerCase().includes(query) || String(p.dex) === query.replace('#', '').replace(/^0+/, '')));
    grid.replaceChildren(...(list.length
      ? list.map((p) => pokemonCard(p, {
        badge: `Nv ${p.level}`,
        selected: p.id === selectedId,
        onClick: () => { selectedId = p.id === selectedId ? null : p.id; update(); },
      }))
      : [emptyState('Nenhum Pokémon encontrado.')]));
    const sel = MOCK_COLLECTION.find((p) => p.id === selectedId);
    detail.replaceChildren(sel ? detailPanel(sel, () => { selectedId = null; update(); }) : '');
  }
  update();

  return h('div', { class: 'screen screen-collection' },
    screenHeader('Coleção', 'Todos os Pokémon que você capturou'),
    h('div', { class: 'toolbar' }, h('label', { class: 'search-field' }, icon('search', { size: 20 }), search), filter),
    detail,
    grid,
    stageNotice(4, 'coleção real persistida, com identificador individual e data de captura.'));
}

export function detailPanel(p, onClose) {
  return h('section', { class: 'panel detail-panel', 'aria-label': `Detalhes de ${p.name}` },
    h('div', { class: 'detail-head' },
      sprite(p.dex, p.name, { size: 120 }),
      h('div', {},
        h('span', { class: 'muted' }, `${dexNumber(p.dex)} · Nv ${p.level}`),
        h('h2', {}, p.name),
        typeList(p.types),
        h('p', { class: 'muted small' }, `Capturado em ${p.caughtAt} · ID ${p.id}`)),
      onClose ? button('Fechar', { variant: 'ghost', iconName: 'close', onClick: onClose, className: 'detail-close' }) : null),
    statTable(p.stats),
    h('h3', {}, 'Golpes'),
    h('ul', { class: 'move-list' }, p.moves.map((m) => h('li', { class: 'move-chip', style: `--type-color:${TYPES[m.type].color}` },
      h('span', {}, m.name), h('small', {}, `${TYPES[m.type].label} · PP ${m.pp}/${m.maxPp}`)))));
}
