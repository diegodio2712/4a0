/** 11. Histórico de desafios e estatísticas. */
import { h } from '../ui/dom.js';
import { icon } from '../ui/icons.js';
import { screenHeader, stageNotice, emptyState } from '../ui/components.js';
import { MOCK_HISTORY, MOCK_COLLECTION } from '../data/mock.js';

export function render() {
  const wins = MOCK_HISTORY.filter((r) => r.result === 'vitória').length;
  const stats = [
    { icon: 'swords', label: 'Desafios', value: MOCK_HISTORY.length },
    { icon: 'trophy', label: 'Vitórias', value: wins },
    { icon: 'close', label: 'Derrotas', value: MOCK_HISTORY.length - wins },
    { icon: 'book', label: 'Capturas', value: MOCK_COLLECTION.length },
  ];

  return h('div', { class: 'screen screen-history' },
    screenHeader('Histórico', 'Seus desafios e estatísticas'),
    h('div', { class: 'stat-tiles' }, stats.map((s) => h('div', { class: 'stat-tile' },
      icon(s.icon, { size: 28 }), h('strong', {}, s.value), h('span', {}, s.label)))),
    MOCK_HISTORY.length
      ? h('div', { class: 'table-wrap' }, h('table', { class: 'history-table' },
        h('thead', {}, h('tr', {}, h('th', {}, 'Data'), h('th', {}, 'Resultado'), h('th', {}, 'Chegou até'), h('th', {}, 'Turnos'))),
        h('tbody', {}, MOCK_HISTORY.map((r) => h('tr', {},
          h('td', {}, r.date),
          h('td', {}, h('span', { class: ['pill', r.result === 'vitória' ? 'pill-ok' : 'pill-bad'] }, r.result)),
          h('td', {}, r.reached),
          h('td', {}, r.turns))))))
      : emptyState('Você ainda não desafiou a Elite dos 4.'),
    stageNotice(6, 'histórico real registrado ao final de cada desafio.'));
}
