'use strict';

const root = document.documentElement;
const buttons = [...document.querySelectorAll('.header__theme-menu-button')];
const themes = ['light', 'auto', 'dark'];
const storageKey = 'focus-theme';

function applyTheme(theme) {
  if (!themes.includes(theme)) theme = 'auto';
  root.classList.remove('theme-light', 'theme-auto', 'theme-dark');
  root.classList.add(`theme-${theme}`);
  buttons.forEach((button) => {
    const active = button.dataset.theme === theme;
    button.classList.toggle('header__theme-menu-button_active', active);
    button.setAttribute('aria-pressed', String(active));
    button.disabled = active;
  });
  // Сохранение темы необязательно: в приватном режиме localStorage может быть недоступен.
  try { localStorage.setItem(storageKey, theme); } catch { /* Тема остаётся рабочей. */ }
}

let initialTheme = 'auto';
try { initialTheme = localStorage.getItem(storageKey) || 'auto'; } catch { /* Используем системную тему. */ }
applyTheme(initialTheme);
buttons.forEach((button) => button.addEventListener('click', () => applyTheme(button.dataset.theme)));
// Для «Авто» изменения настроек ОС обрабатываются CSS media query без перезагрузки.
