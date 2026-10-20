/**
 * h(tag, props, ...children): cria elementos sem usar innerHTML com dados,
 * evitando injeção de HTML a partir de nomes de usuário etc.
 *
 * props especiais:
 *  - class: string | array (valores falsos são ignorados)
 *  - on:    { click: fn, ... }
 *  - dataset: { key: value }
 *  - demais chaves viram atributos (false/null/undefined são omitidos)
 */
export function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(props || {})) {
    if (value === false || value == null) continue;
    if (key === 'class') {
      el.className = Array.isArray(value) ? value.filter(Boolean).join(' ') : value;
    } else if (key === 'on') {
      for (const [evt, fn] of Object.entries(value)) el.addEventListener(evt, fn);
    } else if (key === 'dataset') {
      Object.assign(el.dataset, value);
    } else if (key === 'text') {
      el.textContent = value;
    } else if (value === true) {
      el.setAttribute(key, '');
    } else {
      el.setAttribute(key, String(value));
    }
  }
  appendChildren(el, children);
  return el;
}

function appendChildren(el, children) {
  for (const child of children.flat(Infinity)) {
    if (child == null || child === false) continue;
    el.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
}

/** Fragmento com vários filhos. */
export function frag(...children) {
  const f = document.createDocumentFragment();
  appendChildren(f, children);
  return f;
}
