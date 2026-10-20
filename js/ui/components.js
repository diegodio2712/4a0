/** Componentes reutilizáveis de interface. Todos retornam elementos DOM. */
import { h } from './dom.js';
import { icon } from './icons.js';
import { TYPES, STATUS, BALLS } from '../data/types.js';
import { spriteUrl } from '../data/mock.js';

export function typeBadge(type) {
  const t = TYPES[type] ?? { label: type, color: '#777' };
  return h('span', { class: 'type-badge', style: `--type-color:${t.color}` }, t.label);
}

export function typeList(types) {
  return h('span', { class: 'type-list' }, types.map(typeBadge));
}

export function statusBadge(status) {
  if (!status) return null;
  const s = STATUS[status];
  return h('span', { class: 'status-badge', style: `--status-color:${s.color}`, title: s.name }, s.label);
}

/** Sprite oficial; em falha mostra ícone de "imagem indisponível". */
export function sprite(dex, name, { back = false, size = 96, className = '' } = {}) {
  const wrap = h('span', { class: ['sprite', className], style: `--sprite-size:${size}px` });
  const img = h('img', {
    src: spriteUrl(dex, { back }),
    alt: name,
    width: size,
    height: size,
    loading: 'lazy',
    decoding: 'async',
  });
  img.addEventListener('error', () => {
    wrap.replaceChildren(icon('no-image', { size: size * 0.6, label: `Sprite de ${name} indisponível` }));
    wrap.classList.add('sprite-missing');
  }, { once: true });
  wrap.append(img);
  return wrap;
}

export function dexNumber(dex) {
  return `#${String(dex).padStart(3, '0')}`;
}

/** Botão. `variant`: primary | secondary | ghost | danger. */
export function button(label, { variant = 'primary', iconName, onClick, href, disabled, type = 'button', className, ...rest } = {}) {
  const content = [iconName ? icon(iconName, { size: 20 }) : null, h('span', {}, label)];
  const cls = ['btn', `btn-${variant}`, className];
  if (href && !disabled) return h('a', { ...rest, class: cls, href }, content);
  return h('button', { ...rest, class: cls, type, disabled, on: onClick ? { click: onClick } : undefined }, content);
}

/** Painel com borda estilo caixa de diálogo dos jogos clássicos. */
export function panel(title, ...children) {
  return h('section', { class: 'panel' }, title ? h('h2', { class: 'panel-title' }, title) : null, ...children);
}

export function screenHeader(title, subtitle) {
  return h('header', { class: 'screen-header' },
    h('h1', {}, title),
    subtitle ? h('p', { class: 'screen-subtitle' }, subtitle) : null);
}

/** Aviso de funcionalidade planejada para uma etapa futura. */
export function stageNotice(stage, text) {
  return h('p', { class: 'stage-notice', role: 'note' },
    icon('info', { size: 18 }), h('span', {}, h('strong', {}, `Etapa ${stage}: `), text));
}

/** Barra de HP com cores clássicas (verde > 50%, amarelo > 20%, vermelho). */
export function hpBar(current, max, { showNumbers = true } = {}) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (current / max) * 100)) : 0;
  const level = pct > 50 ? 'high' : pct > 20 ? 'mid' : 'low';
  return h('div', { class: 'hp' },
    h('div', { class: 'hp-row' },
      h('span', { class: 'hp-label' }, 'HP'),
      h('div', {
        class: 'hp-track',
        role: 'meter',
        'aria-valuemin': 0,
        'aria-valuemax': max,
        'aria-valuenow': current,
        'aria-label': 'Pontos de vida',
      }, h('div', { class: `hp-fill hp-${level}`, style: `width:${pct}%` }))),
    showNumbers ? h('div', { class: 'hp-numbers' }, `${current} / ${max}`) : null);
}

/** Cartão compacto de Pokémon (sorteio, coleção, equipe). */
export function pokemonCard(p, { badge, footer, onClick, selected = false, disabled = false } = {}) {
  const tag = onClick ? 'button' : 'article';
  return h(tag, {
    class: ['poke-card', selected && 'is-selected', disabled && 'is-disabled'],
    type: onClick ? 'button' : undefined,
    disabled: onClick && disabled,
    'aria-pressed': onClick ? String(selected) : undefined,
    on: onClick ? { click: onClick } : undefined,
  },
  badge ? h('span', { class: 'poke-card-badge' }, badge) : null,
  sprite(p.dex, p.name, { size: 96 }),
  h('span', { class: 'poke-card-dex' }, dexNumber(p.dex)),
  h('span', { class: 'poke-card-name' }, p.name),
  typeList(p.types),
  footer ?? null);
}

/** Contador de bolas com ícone SVG. */
export function ballCount(kind, count) {
  const b = BALLS[kind];
  return h('div', { class: ['ball-count', count === 0 && 'is-empty'] },
    icon(b.icon, { size: 36 }),
    h('span', { class: 'ball-count-name' }, b.label),
    h('span', { class: 'ball-count-qty' }, `×${count}`));
}

export const STAT_LABELS = { hp: 'HP', atk: 'Ataque', def: 'Defesa', spa: 'At. Esp.', spd: 'Def. Esp.', spe: 'Velocidade' };

/** Tabela de atributos com barras proporcionais. */
export function statTable(stats) {
  return h('dl', { class: 'stat-table' },
    Object.entries(STAT_LABELS).map(([key, label]) => h('div', { class: 'stat-row' },
      h('dt', {}, label),
      h('dd', {},
        h('span', { class: 'stat-value' }, stats[key]),
        h('span', { class: 'stat-bar' }, h('span', { style: `width:${Math.min(100, (stats[key] / 255) * 100)}%` }))))));
}

export function emptyState(text, action) {
  return h('div', { class: 'empty-state' }, h('p', {}, text), action ?? null);
}
