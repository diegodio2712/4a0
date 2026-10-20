/**
 * Sessão do jogador.
 *
 * ETAPA 1: stub mantido em sessionStorage, apenas para permitir navegar pelas
 * telas protegidas. Não há senha nem conta real. Na Etapa 2 este módulo passa
 * a delegar para services/authService.js (contas com PBKDF2 e store.js).
 */

const KEY = 'pdc.session.stub';
const listeners = new Set();

function read() {
  try {
    return JSON.parse(sessionStorage.getItem(KEY)) || null;
  } catch {
    return null;
  }
}

export function currentUser() {
  return read();
}

export function isAuthenticated() {
  return read() !== null;
}

export function signInStub(username) {
  const user = { username: username.trim() };
  try {
    sessionStorage.setItem(KEY, JSON.stringify(user));
  } catch {
    /* armazenamento indisponível: sessão vale só nesta página */
  }
  listeners.forEach((fn) => fn(user));
  return user;
}

export function signOut() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignora */
  }
  listeners.forEach((fn) => fn(null));
}

export function onSessionChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
