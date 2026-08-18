# Skill: deploy-workflow

Deploya sandhof-fastigheter till Railway.

## Arkitektur
Astro SSR med `@astrojs/node` (standalone). Railway kör Astros inbyggda server.

- **Build:** `npm run build` → `dist/server/entry.mjs`
- **Start:** `HOST=0.0.0.0 node ./dist/server/entry.mjs`
- **Basic Auth:** `src/middleware.ts` läser `SITE_PASSWORD` från env

## Viktiga filer
- `railway.toml` — build + startCommand + healthcheckPath
- `nixpacks.toml` — Node-provider, npm ci + npm run build
- `astro.config.mjs` — `output: 'server'`, adapter node standalone
- `src/middleware.ts` — Basic Auth (läser `SITE_PASSWORD`)

## Env-variabler att sätta i Railway-projektet
```
PUBLIC_DELLMANDER_API_URL = https://<dellmander-inside>.railway.app
SITE_PASSWORD = <lösenord>
```
⚠️ `PUBLIC_DELLMANDER_API_URL` bakas in vid **build-tid**. En ändring kräver ny deploy.
⚠️ `SITE_PASSWORD` läses vid runtime — räcker med omstart/redeploy.

## Deploy-flöde
1. Koppla GitHub-repot till ett nytt Railway-projekt
2. Sätt `PUBLIC_DELLMANDER_API_URL` under Variables
3. Railway kör automatiskt `npm run build` + `npm start` vid push till main

## Pre-deploy checklist
1. `npm run build` lokalt — ska inte ge TypeScript-fel
2. Kontrollera att `PUBLIC_DELLMANDER_API_URL` är satt i Railway Variables
3. Kontrollera att dellmander-inside är live och att bildroutes svarar

## Rollback
Railway dashboard → välj tidigare deployment → "Redeploy".

## Domän
Produktionsdomän: `sandhoffastigheter.se`
Uppdatera `site` i `astro.config.mjs` vid byte av domän.
