import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import node from '@astrojs/node'

export default defineConfig({
  site: 'https://sandhoffastigheter.se',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [tailwind()],
})
