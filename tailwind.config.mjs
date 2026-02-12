/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F0F1A',
          light: '#161628',
          lighter: '#1E1E35',
        },
        pink: {
          DEFAULT: '#E84393',
          light: '#FF6FB7',
          dark: '#C9357D',
          glow: 'rgba(232, 67, 147, 0.15)',
        },
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"Outfit"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
