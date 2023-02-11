import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
};
