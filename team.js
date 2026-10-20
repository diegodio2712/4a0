/** 8. Montagem da equipe: selecionar, remover, reorganizar e inspecionar. */
import { h } from '../ui/dom.js';
import { icon } from '../ui/icons.js';
import { screenHeader, pokemonCard, sprite, typeList, stageNotice, emptyState } from '../ui/components.js';
import { detailPanel } from './collection.js';
import { MOCK_COLLECTION } from '../data/mock.js';

export const TEAM_MAX = 6;

// ETAPA 1: equipe em memória só para demonstrar a interação.
let team = ['mock-1', 'mock-2'];

export function render() {
  let inspecting = null;
  const slots = h('ol', { class: 'team-slots' });
  const pool = h('div', { class: 'card-grid' });
  const detail = h('div', { class: 'detail-slot' });
  const counter = h('span', { class: 'pill' });

  const byId = (id) => MOCK_COLLECTION.find((p) => p.id === id);

  function move(i, delta) {
    const j = i + delta;
    if (j < 0 || j >= team.length) return;
    [team[i], team[j]] = [team[j], team[i]];
    update();
  }

  function iconBtn(name, label, onClick, disabled = false) {
    return h('button', { type: 'button', class: 'icon-btn', 'aria-label': label, title: label, disabled, on: { click: onClick } },
      icon(name, { size: 20 }));
  }

  function update() {
    counter.textContent = `${team.length}/${TEAM_MAX}`;
    slots.replaceChildren(...Array.from({ length: TEAM_MAX }, (_, i) => {
      const p = byId(team[i]);
      if (!p) return h('li', { class: 'team-slot is-empty' }, h('span', { class: 'muted' }, `Posição ${i + 1} vazia`));
      return h('li', { class: 'team-slot' },
        h('span', { class: 'slot-index' }, i + 1),
        sprite(p.dex, p.name, { size: 56 }),
        h('div', { class: 'slot-info' }, h('strong', {}, p.name), h('small', {}, `Nv ${p.level}`), typeList(p.types)),
        h('div', { class: 'slot-actions' },
          iconBtn('up', `Mover ${p.name} para cima`, () => move(i, -1), i === 0),
          iconBtn('down', `Mover ${p.name} para baixo`, () => move(i, 1), i === team.length - 1),
          iconBtn('info', `Inspecionar ${p.name}`, () => { inspecting = inspecting === p.id ? null : p.id; update(); }),
          iconBtn('close', `Remover ${p.name} da equipe`, () => { team = team.filter((id) => id !== p.id); update(); })));
    }));

    const available = MOCK_COLLECTION.filter((p) => !team.includes(p.id));
    const full = team.length >= TEAM_MAX;
    pool.replaceChildren(...(available.length
      ? available.map((p) => pokemonCard(p, {
        badge: `Nv ${p.level}`,
        disabled: full,
        footer: h('span', { class: 'pill pill-ok' }, full ? 'Equipe cheia' : 'Adicionar'),
        onClick: () => { if (!full && !team.includes(p.id)) { team = [...team, p.id]; update(); } },
      }))
      : [emptyState('Todos os seus Pokémon já estão na equipe.')]));

    const sel = byId(inspecting);
    detail.replaceChildren(sel ? detailPanel(sel, () => { inspecting = null; update(); }) : '');
  }
  update();

  return h('div', { class: 'screen screen-team' },
    screenHeader('Equipe de batalha', 'Até 6 Pokémon da sua coleção. A ordem define quem entra primeiro.'),
    h('div', { class: 'section-head' }, h('h2', {}, 'Equipe'), counter),
    slots,
    detail,
    h('h2', {}, 'Coleção disponível'),
    pool,
    stageNotice(4, 'a equipe será salva e validada (sem duplicatas, apenas Pokémon seus) antes de cada desafio.'));
}
