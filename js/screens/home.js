/** 1. Página inicial. */
import { h } from '../ui/dom.js';
import { icon } from '../ui/icons.js';
import { button, sprite } from '../ui/components.js';
import { isAuthenticated } from '../core/session.js';

const FEATURES = [
  { icon: 'dice', title: '10 Pokémon por dia', text: 'Um novo sorteio a cada ciclo diário (horário de Brasília).' },
  { icon: 'pokeball', title: '1 captura por ciclo', text: 'Escolha bem o alvo e a bola. Falhou? Tente de novo no mesmo Pokémon.' },
  { icon: 'book', title: 'Coleção permanente', text: 'Tudo que você captura fica salvo para sempre.' },
  { icon: 'crown', title: 'Elite dos 4', text: 'Lorelei, Bruno, Agatha e Lance em sequência, sem curar entre lutas.' },
];

export function render() {
  const logged = isAuthenticated();
  return h('div', { class: 'screen screen-home' },
    h('section', { class: 'hero' },
      h('div', { class: 'hero-sprites', 'aria-hidden': 'true' },
        sprite(25, 'Pikachu', { size: 96 }), sprite(6, 'Charizard', { size: 120 }), sprite(149, 'Dragonite', { size: 96 })),
      h('h1', { class: 'hero-title' }, 'Pokémon Daily Challenge'),
      h('p', { class: 'hero-text' }, 'Capture um Pokémon por dia, monte sua equipe e desafie a Elite dos 4.'),
      h('div', { class: 'hero-actions' },
        logged
          ? button('Ir para o painel', { href: '#/painel', iconName: 'home' })
          : [button('Começar', { href: '#/login?modo=cadastro', iconName: 'pokeball' }),
            button('Já tenho conta', { href: '#/login', variant: 'secondary' })])),
    h('ul', { class: 'feature-grid' },
      FEATURES.map((f) => h('li', { class: 'feature' },
        icon(f.icon, { size: 36 }), h('h3', {}, f.title), h('p', {}, f.text)))));
}
