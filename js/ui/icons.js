/**
 * Ícones SVG próprios do projeto (interface, bolas, indicadores).
 * Todos usam viewBox 0 0 24 24. Os sprites de Pokémon NÃO são desenhados
 * aqui: vêm do repositório de sprites da PokéAPI.
 */

const SVG_NS = 'http://www.w3.org/2000/svg';

/** Bola genérica: metade superior colorida, faixa e botão central. */
function ball(top, extra = '') {
  return `
    <circle cx="12" cy="12" r="10.5" fill="#fff" stroke="#1d1d1d" stroke-width="1.5"/>
    <path d="M1.5 12a10.5 10.5 0 0 1 21 0z" fill="${top}" stroke="#1d1d1d" stroke-width="1.5"/>
    ${extra}
    <path d="M1.5 12h21" stroke="#1d1d1d" stroke-width="2"/>
    <circle cx="12" cy="12" r="3.2" fill="#fff" stroke="#1d1d1d" stroke-width="1.6"/>`;
}

const ICONS = {
  pokeball: ball('#e3350d'),
  greatball: ball(
    '#2f6fd6',
    '<path d="M4.2 6.5 8 9.2M19.8 6.5 16 9.2" stroke="#e3350d" stroke-width="2.4" stroke-linecap="round"/>'
  ),
  ultraball: ball(
    '#2b2b2b',
    '<path d="M8 2.6v6.6M16 2.6v6.6" stroke="#f2c230" stroke-width="2.6"/>'
  ),
  masterball: ball(
    '#7b3fa0',
    `<circle cx="7.2" cy="7.6" r="1.9" fill="#e86aa6"/><circle cx="16.8" cy="7.6" r="1.9" fill="#e86aa6"/>
     <path d="M9.6 9.6 10.6 5.6 12 8.2 13.4 5.6 14.4 9.6" fill="none" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/>`
  ),
  home: '<path d="M3 11 12 3.5 21 11v9.5a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" fill="currentColor"/>',
  grid: '<path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" fill="currentColor"/>',
  dice: `<rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="2"/>
         <circle cx="8" cy="8" r="1.6" fill="currentColor"/><circle cx="16" cy="16" r="1.6" fill="currentColor"/>
         <circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="16" cy="8" r="1.6" fill="currentColor"/>
         <circle cx="8" cy="16" r="1.6" fill="currentColor"/>`,
  bag: `<path d="M5 8h14l-1.2 12.1a1 1 0 0 1-1 .9H7.2a1 1 0 0 1-1-.9z" fill="currentColor"/>
        <path d="M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="2"/>`,
  book: `<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v15H6a2 2 0 0 0-2 2z" fill="currentColor"/>
         <path d="M4 20a2 2 0 0 1 2-2h13v3H6a2 2 0 0 1-2-1z" fill="currentColor" opacity=".55"/>`,
  team: `<circle cx="8" cy="8" r="3.2" fill="currentColor"/><circle cx="16.5" cy="9" r="2.6" fill="currentColor" opacity=".7"/>
         <path d="M2 20c0-3.6 2.7-6 6-6s6 2.4 6 6z" fill="currentColor"/>
         <path d="M13.5 20c0-2.3-.7-4.1-1.9-5.3a5 5 0 0 1 9.4 3.2V20z" fill="currentColor" opacity=".7"/>`,
  crown: '<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z" fill="currentColor"/>',
  swords: `<path d="M4 4l9 9M20 4l-9 9" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
           <path d="M7 15l-3 3 2 2 3-3M17 15l3 3-2 2-3-3" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>`,
  trophy: `<path d="M7 3h10v5a5 5 0 0 1-10 0z" fill="currentColor"/>
           <path d="M7 5H4v1.5A3.5 3.5 0 0 0 7.5 10M17 5h3v1.5a3.5 3.5 0 0 1-3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <path d="M10.5 13h3v4h-3zM7.5 18h9v3h-9z" fill="currentColor"/>`,
  history: `<path d="M4 12a8 8 0 1 0 2.4-5.7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M3 4v4h4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 8v4.5l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  clock: `<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M12 7v5l3.5 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  lock: `<rect x="5" y="10.5" width="14" height="10" rx="2" fill="currentColor"/>
         <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="currentColor" stroke-width="2"/>`,
  check: '<path d="M4.5 12.5l5 5L19.5 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
  close: '<path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
  logout: `<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" fill="none" stroke="currentColor" stroke-width="2"/>
           <path d="M10 8l-4 4 4 4M6 12h10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
  search: `<circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2.2"/>
           <path d="M15.5 15.5 21 21" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>`,
  up: '<path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
  down: '<path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
  info: `<circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2"/>
         <path d="M12 11v6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="7.5" r="1.4" fill="currentColor"/>`,
  heart: '<path d="M12 20.5S3 15 3 8.8A4.8 4.8 0 0 1 12 6.4a4.8 4.8 0 0 1 9 2.4C21 15 12 20.5 12 20.5z" fill="currentColor"/>',
  // Exibido quando o sprite não carrega. Não imita um Pokémon.
  'no-image': `<rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-dasharray="3 2"/>
               <path d="M7 16l3-4 2.5 3 2-2.5L17 16z" fill="currentColor" opacity=".6"/><circle cx="9" cy="8.5" r="1.5" fill="currentColor" opacity=".6"/>`,
};

/** Cria um <svg> com o ícone `name`. `label` torna o ícone acessível. */
export function icon(name, { size = 24, label = null, className = '' } = {}) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('class', `icon icon-${name} ${className}`.trim());
  if (label) {
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', label);
  } else {
    svg.setAttribute('aria-hidden', 'true');
  }
  // Conteúdo estático e confiável definido neste arquivo.
  svg.innerHTML = ICONS[name] ?? ICONS.info;
  return svg;
}

/** Substitui elementos [data-icon] já presentes no HTML. */
export function hydrateIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach((el) => {
    el.replaceChildren(icon(el.dataset.icon, { size: Number(el.dataset.size) || 28 }));
  });
}
