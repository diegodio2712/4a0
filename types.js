/**
 * Os 15 tipos da 1ª geração com nome em português e cor de exibição.
 * (Aço, Sombrio e Fada não existem na Gen 1.)
 */
export const TYPES = {
  normal: { label: 'Normal', color: '#a8a878' },
  fire: { label: 'Fogo', color: '#f08030' },
  water: { label: 'Água', color: '#6890f0' },
  electric: { label: 'Elétrico', color: '#e0b800' },
  grass: { label: 'Planta', color: '#78c850' },
  ice: { label: 'Gelo', color: '#68c8c8' },
  fighting: { label: 'Lutador', color: '#c03028' },
  poison: { label: 'Veneno', color: '#a040a0' },
  ground: { label: 'Terra', color: '#c8a048' },
  flying: { label: 'Voador', color: '#9080e0' },
  psychic: { label: 'Psíquico', color: '#f85888' },
  bug: { label: 'Inseto', color: '#98a820' },
  rock: { label: 'Pedra', color: '#b8a038' },
  ghost: { label: 'Fantasma', color: '#705898' },
  dragon: { label: 'Dragão', color: '#7038f8' },
};

/** Estados de status e suas siglas clássicas. */
export const STATUS = {
  par: { label: 'PAR', name: 'Paralisado', color: '#e0b800' },
  brn: { label: 'BRN', name: 'Queimado', color: '#f08030' },
  psn: { label: 'PSN', name: 'Envenenado', color: '#a040a0' },
  slp: { label: 'SLP', name: 'Dormindo', color: '#8a8a8a' },
  frz: { label: 'FRZ', name: 'Congelado', color: '#68c8c8' },
};

/** Bolas disponíveis no jogo (as taxas reais ficam no módulo de captura). */
export const BALLS = {
  masterball: { label: 'Master Ball', icon: 'masterball' },
  ultraball: { label: 'Ultra Ball', icon: 'ultraball' },
  greatball: { label: 'Great Ball', icon: 'greatball' },
  pokeball: { label: 'Poké Ball', icon: 'pokeball' },
};

export const INITIAL_INVENTORY = { masterball: 1, ultraball: 2, greatball: 3, pokeball: 5 };
