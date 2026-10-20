/** 9. Preparação para a Elite dos 4. */
import { h } from '../ui/dom.js';
import { icon } from '../ui/icons.js';
import { screenHeader, panel, sprite, typeBadge, button, stageNotice } from '../ui/components.js';
import { ELITE_FOUR } from '../data/mock.js';

export function render() {
  return h('div', { class: 'screen screen-elite' },
    screenHeader('Elite dos 4', 'Quatro treinadores em sequência. Sem volta à preparação entre as lutas.'),
    h('ol', { class: 'elite-list' },
      ELITE_FOUR.map((t, i) => h('li', { class: 'elite-card' },
        h('div', { class: 'elite-order' }, i + 1),
        h('div', { class: 'elite-body' },
          h('h3', {}, t.name),
          typeBadge(t.specialty),
          h('div', { class: 'elite-team' }, t.dex.map((d) => sprite(d, `Pokémon de ${t.name}`, { size: 48 }))))))),
    panel('Regras do desafio',
      h('ul', { class: 'rules' },
        h('li', {}, 'Sua equipe atual fica bloqueada durante todo o desafio.'),
        h('li', {}, 'HP e PP NÃO são restaurados entre os treinadores.'),
        h('li', {}, 'Itens de recuperação não estão habilitados nesta versão.'),
        h('li', {}, 'Se toda a sua equipe desmaiar, o desafio termina em derrota.'))),
    h('div', { class: 'actions' },
      button('Revisar equipe', { href: '#/equipe', variant: 'secondary', iconName: 'team' }),
      button('Iniciar desafio', { href: '#/batalha', iconName: 'swords' })),
    h('p', { class: 'muted small center' }, icon('lock', { size: 14 }), ' A equipe será validada antes do início.'),
    stageNotice(6, 'validação da equipe, bloqueio, sequência real e registro do resultado.'));
}
