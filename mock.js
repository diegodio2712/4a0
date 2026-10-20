/**
 * ETAPA 1 — dados de EXEMPLO apenas para visualizar as telas.
 * Nada aqui é estado real do jogador. Será removido quando os serviços
 * (Etapas 2–6) passarem a fornecer os dados.
 */

export const SPRITE_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

export function spriteUrl(dex, { back = false } = {}) {
  return `${SPRITE_BASE}/${back ? 'back/' : ''}${dex}.png`;
}

export const MOCK_DAILY = [
  { dex: 1, name: 'Bulbasaur', types: ['grass', 'poison'] },
  { dex: 4, name: 'Charmander', types: ['fire'] },
  { dex: 7, name: 'Squirtle', types: ['water'] },
  { dex: 25, name: 'Pikachu', types: ['electric'] },
  { dex: 39, name: 'Jigglypuff', types: ['normal'] },
  { dex: 63, name: 'Abra', types: ['psychic'] },
  { dex: 66, name: 'Machop', types: ['fighting'] },
  { dex: 92, name: 'Gastly', types: ['ghost', 'poison'] },
  { dex: 133, name: 'Eevee', types: ['normal'] },
  { dex: 147, name: 'Dratini', types: ['dragon'] },
];

export const MOCK_COLLECTION = [
  {
    id: 'mock-1',
    dex: 6,
    name: 'Charizard',
    types: ['fire', 'flying'],
    level: 50,
    stats: { hp: 153, atk: 104, def: 98, spa: 129, spd: 105, spe: 120 },
    moves: [
      { name: 'Flamethrower', type: 'fire', pp: 15, maxPp: 15 },
      { name: 'Slash', type: 'normal', pp: 20, maxPp: 20 },
      { name: 'Earthquake', type: 'ground', pp: 10, maxPp: 10 },
      { name: 'Fire Spin', type: 'fire', pp: 15, maxPp: 15 },
    ],
    caughtAt: '2026-10-18',
  },
  {
    id: 'mock-2',
    dex: 131,
    name: 'Lapras',
    types: ['water', 'ice'],
    level: 50,
    stats: { hp: 190, atk: 105, def: 100, spa: 105, spd: 115, spe: 80 },
    moves: [
      { name: 'Surf', type: 'water', pp: 15, maxPp: 15 },
      { name: 'Ice Beam', type: 'ice', pp: 10, maxPp: 10 },
      { name: 'Body Slam', type: 'normal', pp: 15, maxPp: 15 },
      { name: 'Sing', type: 'normal', pp: 15, maxPp: 15 },
    ],
    caughtAt: '2026-10-19',
  },
  {
    id: 'mock-3',
    dex: 94,
    name: 'Gengar',
    types: ['ghost', 'poison'],
    level: 50,
    stats: { hp: 120, atk: 85, def: 80, spa: 150, spd: 95, spe: 130 },
    moves: [
      { name: 'Night Shade', type: 'ghost', pp: 15, maxPp: 15 },
      { name: 'Hypnosis', type: 'psychic', pp: 20, maxPp: 20 },
      { name: 'Psychic', type: 'psychic', pp: 10, maxPp: 10 },
      { name: 'Thunderbolt', type: 'electric', pp: 15, maxPp: 15 },
    ],
    caughtAt: '2026-10-20',
  },
];

export const ELITE_FOUR = [
  { key: 'lorelei', name: 'Lorelei', specialty: 'ice', dex: [87, 91, 80, 124, 131] },
  { key: 'bruno', name: 'Bruno', specialty: 'fighting', dex: [95, 107, 106, 95, 68] },
  { key: 'agatha', name: 'Agatha', specialty: 'ghost', dex: [94, 42, 93, 24, 94] },
  { key: 'lance', name: 'Lance', specialty: 'dragon', dex: [130, 148, 148, 142, 149] },
];

export const MOCK_HISTORY = [
  { date: '2026-10-19', result: 'derrota', reached: 'Agatha', turns: 47 },
  { date: '2026-10-17', result: 'derrota', reached: 'Bruno', turns: 29 },
];
