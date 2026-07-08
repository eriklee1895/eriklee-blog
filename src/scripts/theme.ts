/**
 * Theme toggle: light/dark with localStorage persistence and system preference.
 * Runs on every page (Astro swap-safe).
 */

const STORAGE_KEY = "theme";
const LIGHT = "light";
const DARK = "dark";

function getPreferredTheme(): "light" | "dark" {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === LIGHT || stored === DARK) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? DARK : LIGHT;
}

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.classList.toggle("dark", theme === DARK);
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) {
    meta.content = getComputedStyle(document.body).backgroundColor;
  }
}

function initTheme() {
  const theme = getPreferredTheme();
  applyTheme(theme);

  const btn = document.querySelector<HTMLButtonElement>("#theme-toggle");
  if (btn) {
    btn.setAttribute("aria-label", theme === DARK ? "切换到浅色模式" : "切换到深色模式");
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") as "light" | "dark";
      const next = current === DARK ? LIGHT : DARK;
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
      btn.setAttribute("aria-label", next === DARK ? "切换到浅色模式" : "切换到深色模式");
    });
  }
}

document.addEventListener("astro:page-load", initTheme);
initTheme();
