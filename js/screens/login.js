/** 2. Login e cadastro. */
import { h } from '../ui/dom.js';
import { button, panel, stageNotice } from '../ui/components.js';
import { signInStub } from '../core/session.js';
import { go, hashQuery } from '../core/router.js';

const USERNAME_RE = /^[a-zA-Z0-9_]{3,20}$/;

export function render() {
  const query = hashQuery();
  let mode = query.modo === 'cadastro' ? 'cadastro' : 'login';

  const errorBox = h('p', { class: 'form-error', role: 'alert' });
  const username = h('input', { id: 'f-user', name: 'username', autocomplete: 'username', required: true, maxlength: 20 });
  const password = h('input', { id: 'f-pass', name: 'password', type: 'password', required: true, minlength: 8 });
  const confirm = h('input', { id: 'f-confirm', name: 'confirm', type: 'password', minlength: 8 });
  const confirmField = h('div', { class: 'field' }, h('label', { for: 'f-confirm' }, 'Confirmar senha'), confirm);
  const submit = button('', { type: 'submit' });
  const tabs = h('div', { class: 'tabs', role: 'tablist' });

  function sync() {
    const isSignup = mode === 'cadastro';
    confirmField.hidden = !isSignup;
    confirm.required = isSignup;
    password.autocomplete = isSignup ? 'new-password' : 'current-password';
    submit.querySelector('span').textContent = isSignup ? 'Criar conta' : 'Entrar';
    tabs.replaceChildren(
      ...[['login', 'Entrar'], ['cadastro', 'Criar conta']].map(([key, label]) => h('button', {
        type: 'button',
        role: 'tab',
        class: ['tab', mode === key && 'is-active'],
        'aria-selected': String(mode === key),
        on: { click: () => { mode = key; errorBox.textContent = ''; sync(); } },
      }, label)));
  }

  const form = h('form', {
    class: 'auth-form',
    novalidate: true,
    on: {
      submit: (e) => {
        e.preventDefault();
        const name = username.value.trim();
        if (!USERNAME_RE.test(name)) {
          errorBox.textContent = 'Nome de usuário: 3 a 20 letras, números ou _.';
          return;
        }
        if (password.value.length < 8) {
          errorBox.textContent = 'A senha precisa ter pelo menos 8 caracteres.';
          return;
        }
        if (mode === 'cadastro' && password.value !== confirm.value) {
          errorBox.textContent = 'As senhas não coincidem.';
          return;
        }
        signInStub(name);
        const next = query.next && query.next.startsWith('/') ? query.next : '/painel';
        go(next);
      },
    },
  },
  h('div', { class: 'field' }, h('label', { for: 'f-user' }, 'Usuário'), username),
  h('div', { class: 'field' }, h('label', { for: 'f-pass' }, 'Senha'), password),
  confirmField,
  errorBox,
  submit);

  sync();
  return h('div', { class: 'screen screen-auth' },
    panel(null, tabs, form,
      stageNotice(2, 'contas reais com senha protegida (PBKDF2) e progresso salvo. Por enquanto qualquer usuário/senha válidos entram em modo demonstração.')));
}
