/** Tela de rota inexistente ou erro de renderização. */
import { h } from '../ui/dom.js';
import { button, emptyState } from '../ui/components.js';

export function render(message = 'Esta página não existe.') {
  return h('div', { class: 'screen' }, emptyState(message, button('Voltar ao início', { href: '#/', iconName: 'home' })));
}
