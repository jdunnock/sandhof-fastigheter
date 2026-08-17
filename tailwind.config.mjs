/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F7F5F0',
          dark:    '#F5F1E8',
          border:  '#D4C9B0',
        },
        ink: {
          DEFAULT: '#1A1612',
          muted:   '#8C7D6B',
          faint:   '#5C5448',
        },
        forest: {
          DEFAULT: '#1F4D3A',
          light:   'rgba(31,77,58,0.08)',
          ring:    'rgba(31,77,58,0.20)',
        },
        gold: '#C8A96A',
      },
      fontFamily: {
        sans:  ['Manrope', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
