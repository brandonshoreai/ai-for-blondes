/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        pink: {
          DEFAULT: '#E84393',
          light: '#FF6FB7',
          dark: '#C9357D',
          glow: 'rgba(232, 67, 147, 0.08)',
        },
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"Outfit"', 'sans-serif'],
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
    },
  },
  plugins: [],
};
