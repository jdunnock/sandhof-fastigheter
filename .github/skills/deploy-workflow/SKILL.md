# Skill: deploy-workflow

Deploya sandhof-fastigheter till produktion.

## Rekommenderad hosting: Vercel (eller Netlify)

Astro-sajten är statisk (SSG) — ingen server krävs. Vercel är enklast.

### Vercel
```bash
npx vercel --prod
```
Eller koppla GitHub-repot i Vercel-dashboarden för automatisk deploy på push till `main`.

**Viktiga env-variabler att sätta i Vercel:**
```
PUBLIC_DELLMANDER_API_URL = https://din-app.railway.app
```

### Netlify
```bash
npm run build
# Publicera dist/-mappen till Netlify
```

## Pre-deploy checklist
1. `npm run build` — ska inte ge TypeScript-fel
2. Kontrollera att `PUBLIC_DELLMANDER_API_URL` är satt i hosting-plattformens miljövariabler
3. Kontrollera att dellmander-inside är live och att bildroutes svarar

## Rollback
Vercel: välj tidigare deployment i dashboarden → "Promote to Production".
Netlify: samma via Deploys → välj tidigare deploy → "Publish deploy".

## Domän
Produktionsdomän: `sandhoffastigheter.se`
Uppdatera `site` i `astro.config.mjs` vid byte av domän (påverkar sitemap).
