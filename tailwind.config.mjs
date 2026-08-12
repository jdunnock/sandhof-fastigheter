/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50:  '#faf7f2',
          100: '#f3ece0',
          200: '#e5d5bc',
          300: '#d4b991',
          400: '#c09a67',
          500: '#b08348',
          600: '#96693c',
          700: '#7b5132',
          800: '#65422d',
          900: '#553929',
        },
        stone: {
          950: '#1a1714',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
      },
    },
  },
  plugins: [],
}
