export const $ = (sel) => document.querySelector(sel);
export const $$ = (sel) => [...document.querySelectorAll(sel)];
export const LS = {
  get: (key, def = null) => JSON.parse(localStorage.getItem(key)) ?? def,
  set: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
};

export const toast = (msg) => {
  const t = document.createElement("div");
  t.id = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
};
