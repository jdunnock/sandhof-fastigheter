# Skill: deploy-workflow

Deploya sandhof-fastigheter till Railway.

## Arkitektur
Astro bygger en statisk `dist/`-mapp. Railway kör `serve dist` som staticfile-server.

## Viktiga filer
- `railway.toml` — build + start-kommandon
- `nixpacks.toml` — Node-provider, npm ci + npm run build
- `package.json` `start`-script: `serve dist --listen 0.0.0.0:${PORT:-3000}`

## Env-variabler att sätta i Railway-projektet
```
PUBLIC_DELLMANDER_API_URL = https://<dellmander-inside>.railway.app
```
⚠️ Denna variabel bakas in vid **build-tid** (Astro SSG). En ändring kräver ny deploy.

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
