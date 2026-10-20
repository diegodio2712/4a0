/** 6. Inventário de bolas. */
import { h } from '../ui/dom.js';
import { screenHeader, ballCount, panel, stageNotice } from '../ui/components.js';
import { INITIAL_INVENTORY } from '../data/types.js';

export function render() {
  return h('div', { class: 'screen screen-inventory' },
    screenHeader('Inventário', 'Suas Poké Bolas'),
    h('div', { class: 'ball-row ball-row-lg' }, Object.entries(INITIAL_INVENTORY).map(([k, n]) => ballCount(k, n))),
    panel('Regras de reposição',
      h('ul', { class: 'rules' },
        h('li', {}, 'Poké Balls voltam a ser exatamente 5 no início de cada ciclo diário.'),
        h('li', {}, 'Master, Ultra e Great Balls não são repostas automaticamente.'),
        h('li', {}, 'Cada tentativa de captura consome uma bola, independentemente do resultado.'),
        h('li', {}, 'A Master Ball garante a captura.'))),
    stageNotice(3, 'o inventário mostrado será o seu, salvo e atualizado a cada tentativa.'));
}
