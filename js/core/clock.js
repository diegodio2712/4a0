/**
 * "Relógio do servidor": o dia de jogo é sempre calculado no fuso
 * America/Sao_Paulo, independentemente do fuso configurado no aparelho.
 *
 * Todas as funções aceitam `now` para facilitar testes.
 */

export const GAME_TZ = 'America/Sao_Paulo';

const partsFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: GAME_TZ,
  hourCycle: 'h23',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

/** Componentes de data/hora de `date` vistos em São Paulo. */
function zonedParts(date) {
  const out = {};
  for (const p of partsFormatter.formatToParts(date)) {
    if (p.type !== 'literal') out[p.type] = Number(p.value);
  }
  return out;
}

/** Diferença (ms) entre o horário de parede em SP e UTC no instante `date`. */
function zoneOffsetMs(date) {
  const p = zonedParts(date);
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return asUtc - Math.floor(date.getTime() / 1000) * 1000;
}

/** Identificador do dia de jogo: 'AAAA-MM-DD' em São Paulo. */
export function gameDay(now = new Date()) {
  const p = zonedParts(now);
  return `${p.year}-${String(p.month).padStart(2, '0')}-${String(p.day).padStart(2, '0')}`;
}

/** Instante (Date) da próxima meia-noite em São Paulo. */
export function nextResetAt(now = new Date()) {
  const p = zonedParts(now);
  // Meia-noite do dia seguinte como "horário de parede" em UTC...
  const wallMidnight = Date.UTC(p.year, p.month - 1, p.day + 1, 0, 0, 0);
  // ...convertida para instante real usando o offset do fuso. Recalcula uma
  // vez com o offset do próprio instante, para o caso de mudança de horário.
  let instant = wallMidnight - zoneOffsetMs(now);
  instant = wallMidnight - zoneOffsetMs(new Date(instant));
  return new Date(instant);
}

/** Milissegundos até o próximo ciclo diário. */
export function msUntilReset(now = new Date()) {
  return nextResetAt(now).getTime() - now.getTime();
}

/** Formata uma duração em 'HH:MM:SS'. */
export function formatDuration(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hh = String(Math.floor(total / 3600)).padStart(2, '0');
  const mm = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
  const ss = String(total % 60).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}
