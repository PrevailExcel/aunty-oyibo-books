import { ref, watch } from 'vue';

const THEMES = ['light', 'dark', 'paper'];
const stored = localStorage.getItem('theme') || 'light';
const current = ref(THEMES.includes(stored) ? stored : 'light');

const THEME_COLORS = {
  light: '#fdf6ec',
  dark: '#0e0a06',
  paper: '#f5e6c8',
};

function applyTheme(theme) {
  const root = document.documentElement;
  THEMES.forEach(t => root.classList.remove(t));
  if (theme !== 'light') root.classList.add(theme);
  // Update PWA theme-color meta
  let meta = document.querySelector("meta[name='theme-color']");
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.appendChild(meta);
  }
  meta.content = THEME_COLORS[theme];
}

// Apply on load
applyTheme(current.value);

watch(current, (theme) => {
  localStorage.setItem('theme', theme);
  applyTheme(theme);
});

export function useTheme() {
  const setTheme = (theme) => { current.value = theme; };
  const cycle = () => {
    const idx = THEMES.indexOf(current.value);
    current.value = THEMES[(idx + 1) % THEMES.length];
  };
  return { current, setTheme, cycle, THEMES };
}
