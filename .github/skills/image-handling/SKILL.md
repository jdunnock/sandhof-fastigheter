# Skill: image-handling

Hur bilder fungerar och hur man kopplar dem från dellmander-inside till den publika sajten.

## Arkitektur

```
dellmander-inside (Railway)
  └── data/gallery-images/:filename    → /api/gallery-images/:filename (publik, ingen auth)
  └── data/property-images/:filename   → /api/property-images/:filename (publik, ingen auth)

sandhof-fastigheter (Vercel/Netlify)
  └── src/content/properties.ts
        heroImage: "filename.jpg"      → används för att bygga URL i runtime
        galleryImages: ["a.jpg", ...]
```

## Miljövariabel

```
PUBLIC_DELLMANDER_API_URL=https://din-app.railway.app
```

- I dev: `http://localhost:3001` (i `.env.local`)
- I produktion: Railway-appens publika URL (som env-var i Vercel/Netlify/Railway)

## Bildkomponent-mönster

```astro
const imgSrc = property.heroImage
  ? `${import.meta.env.PUBLIC_DELLMANDER_API_URL}/api/gallery-images/${property.heroImage}`
  : '/images/placeholder-property.jpg'
```

Alltid:
- `loading="lazy"` på bilder under fold
- `alt`-text som beskriver innehållet
- Fallback till `/images/placeholder-property.jpg` om inget bildnamn är satt

## Lägga till bilder

1. Ladda upp bilden i dellmander-inside (Properties → Gallery)
2. Kopiera filnamnet (t.ex. `abc123.jpg`)
3. Lägg till i `properties.ts`: `heroImage: 'abc123.jpg'`
4. Bygg och verifiera

## CORS
dellmander-inside tillåter CORS för bildroutes utan auth.
Om bilder inte laddas i dev, kontrollera att `PUBLIC_DELLMANDER_API_URL` är korrekt och att dellmander-inside körs.
