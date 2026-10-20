/** 5. Tela de captura e escolha de Poké Ball. */
import { h } from '../ui/dom.js';
import { icon } from '../ui/icons.js';
import { screenHeader, sprite, typeList, dexNumber, button, stageNotice, emptyState } from '../ui/components.js';
import { BALLS, INITIAL_INVENTORY } from '../data/types.js';
import { MOCK_DAILY } from '../data/mock.js';

export function render({ slot }) {
  const target = MOCK_DAILY[Number(slot)];
  if (!target) {
    return h('div', { class: 'screen' },
      emptyState('Pokémon não encontrado no sorteio de hoje.', button('Voltar ao sorteio', { href: '#/sorteio' })));
  }

  let chosen = null;
  const log = h('p', { class: 'dialog-box', 'aria-live': 'polite' }, `Um ${target.name} selvagem apareceu!`);
  const throwBtn = button('Arremessar', { iconName: 'pokeball', disabled: true });
  const ballButtons = h('div', { class: 'ball-picker', role: 'radiogroup', 'aria-label': 'Escolha a bola' });

  function renderBalls() {
    ballButtons.replaceChildren(...Object.entries(BALLS).map(([kind, b]) => {
      const qty = INITIAL_INVENTORY[kind];
      return h('button', {
        type: 'button',
        role: 'radio',
        class: ['ball-option', chosen === kind && 'is-selected'],
        'aria-checked': String(chosen === kind),
        disabled: qty === 0,
        on: { click: () => { chosen = kind; throwBtn.disabled = false; renderBalls(); } },
      }, icon(b.icon, { size: 40 }), h('span', {}, b.label), h('small', {}, `×${qty}`));
    }));
  }
  renderBalls();

  throwBtn.addEventListener('click', () => {
    log.textContent = `Você arremessou uma ${BALLS[chosen].label}… (simulação: a captura real será calculada na Etapa 3)`;
  });

  return h('div', { class: 'screen screen-capture' },
    screenHeader('Captura', 'Cada tentativa consome uma bola, acertando ou não.'),
    h('div', { class: 'capture-stage' },
      sprite(target.dex, target.name, { size: 160 }),
      h('div', { class: 'capture-info' },
        h('span', { class: 'muted' }, dexNumber(target.dex)),
        h('h2', {}, target.name),
        typeList(target.types))),
    log,
    ballButtons,
    h('div', { class: 'actions' }, button('Voltar', { href: '#/sorteio', variant: 'secondary' }), throwBtn),
    stageNotice(3, 'fórmula de captura documentada (bola × espécie), consumo atômico de bolas e limite de 1 captura por ciclo.'));
}
