import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import node from '@astrojs/node'

export default defineConfig({
  site: 'https://sandhof.se',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [tailwind()],
})
