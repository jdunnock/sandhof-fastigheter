# Copilot Instructions — Sandhof Fastigheter (publika webbplatsen)

## Projektet
Statisk marknadsföringssajt byggd med **Astro + Tailwind CSS + TypeScript**.
Syftet är att presentera Sandhof Fastigheters fastigheter och bolagets profil för allmänheten.

## Teknikstack
- **Astro** — static-first, SSG (getStaticPaths), inga SPA-routes
- **Tailwind CSS** — utility-first, ingen custom CSS om inte Tailwind saknar stöd
- **TypeScript** — strict mode, inga `any`
- **Inga backend-routes** i detta projekt — kontaktformuläret kan använda Astro endpoints (`src/pages/api/`) eller en extern tjänst

## Delade resurser — dellmander-inside
Fastighetsbilder serveras från dellmander-inside:
- Galleri: `PUBLIC_DELLMANDER_API_URL/api/gallery-images/:filename`
- Fastighetsbild: `PUBLIC_DELLMANDER_API_URL/api/property-images/:filename`
- Ingen auth krävs — routerna är publika
- Bildnamnen hämtas från `src/content/properties.ts`
- `PUBLIC_DELLMANDER_API_URL` sätts i `.env.local` (dev) eller som Railway-env-var (produktion)

## Innehållshantering
Allt fastighetsinnehåll bor i `src/content/properties.ts`.
Inga headless CMS eller databaser används — ändringar görs direkt i TypeScript.

## Kodprinciper
- Komponenter i `src/components/` — Astro-komponenter i första hand, `.tsx` bara om interaktivitet krävs
- Layouts i `src/layouts/`
- Sidor i `src/pages/` — filbaserad routing
- Håll sidor tunna, flytta logik till `src/content/` eller komponenter
- SEO: varje sida ska ha `title` och `description` i Layout-propen
- Bilder: alltid `loading="lazy"` och `alt`-text, aldrig hårdkodade API-URLs (använd `PUBLIC_DELLMANDER_API_URL`)

## Absoluta begränsningar
1. **Exponera aldrig** interna URLs, Railway-tokens eller API-nycklar i klientkod
2. **Använd alltid** `PUBLIC_DELLMANDER_API_URL` för bildreferenser — aldrig hårdkodade hosts
3. **Ingen auth-logik** i detta projekt — det är en publik sajt
4. **Inga breaking changes** på befintliga URL-slug:ar utan redirect

## Agents

- **@ux-designer** — design och layout, mobil responsivitet, visuell hierarki, färgkontrast, typografi
- **@swedish-copywriter** — skriva och redigera svensk text: fastighetsbeskrivningar, Om oss, hero, meta-descriptions
- **@content-manager** — lägga till/uppdatera fastigheter i `properties.ts`, koppla bilder från dellmander-inside
- **@deployment-engineer** — Railway-deploys, env-variabler, healthcheck, Basic Auth-lösenord
- **@reviewer** — läser och granskar kod pre-deploy: säkerhet, slug-säkerhet, tillgänglighet, SEO (ändrar aldrig filer)

## Skills

- `content-workflow` — lägga till/ändra fastighetsinnehåll, bilder, texter
- `image-handling` — koppla bildnamn från dellmander-inside till properties.ts
- `deploy-workflow` — deploya till Railway (Astro SSR, node adapter)
- `swedish-copywriter` — tonalitet, riktlinjer och begränsningar för all text på sajten
