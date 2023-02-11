<template>
  <aside id="theme-switcher"
    class="absolute right-0.5 top-0.5 sm:right-1 sm:top-1 md:right-2 md:top-2 lg:right-3 lg:top-3 xl:right-6 xl:top-6">
    <button id="theme-toggle" aria-label="theme switcher" role="switch" type="button" class="theme-toggler"
      @click="toggleTheme">
      <svg id="theme-toggle-dark-icon" class="w-5 h-5" :class="darkMode ? '' : 'hidden'" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
      </svg>
      <svg id="theme-toggle-light-icon" class="w-5 h-5" :class="darkMode ? 'hidden' : ''" fill="currentColor"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          fill-rule="evenodd" clip-rule="evenodd"></path>
      </svg>
    </button>
  </aside>
</template>

<script setup lang="ts">
type Theme = 'light' | 'dark';
const LOCAL_STORAGE_THEME_KEY = 'theme';
const darkMode = useState('theme', () => false);

const setTheme = (newTheme: Theme) => {
  localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  darkMode.value = newTheme === 'dark';

  if (darkMode.value) document.documentElement.classList.remove('dark')
  else document.documentElement.classList.add('dark')
};

const toggleTheme = () => {
  if (darkMode.value === true) setTheme('light')
  else setTheme('dark')
}

onMounted(() => {
  const isDarkModePreferred = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  const themeFromLocalStorage = localStorage.getItem(
    LOCAL_STORAGE_THEME_KEY
  ) as Theme;

  if (themeFromLocalStorage) {
    setTheme(themeFromLocalStorage);
  } else {
    setTheme(isDarkModePreferred ? 'dark' : 'light');
  }
});
</script>

