/** 4. Sorteio diário com os dez Pokémon. */
import { h } from '../ui/dom.js';
import { screenHeader, pokemonCard, stageNotice } from '../ui/components.js';
import { gameDay } from '../core/clock.js';
import { go } from '../core/router.js';
import { MOCK_DAILY } from '../data/mock.js';

export function render() {
  return h('div', { class: 'screen screen-daily' },
    screenHeader('Sorteio diário', `Ciclo ${gameDay()} · escolha 1 entre 10. Após escolher, o alvo não pode ser trocado.`),
    h('div', { class: 'legend' },
      h('span', { class: 'pill pill-ok' }, 'Disponível'),
      h('span', { class: 'pill pill-off' }, 'Indisponível'),
      h('span', { class: 'pill pill-done' }, 'Capturado')),
    h('div', { class: 'card-grid' },
      MOCK_DAILY.map((p, slot) => pokemonCard(p, {
        badge: `${slot + 1}`,
        footer: h('span', { class: 'pill pill-ok' }, 'Disponível'),
        onClick: () => go(`/captura/${slot}`),
      }))),
    stageNotice(3, 'o sorteio será gerado e fixado por dia para a sua conta, com bloqueio de alvo e de captura.'));
}
