# Skill: content-workflow

Uppdatera fastighetsinnehåll på ett säkert och konsekvent sätt.

## Fil att ändra
`src/content/properties.ts` — enda källan för all fastighetsdata.

## Lägga till en ny fastighet

1. Lägg till ett nytt `Property`-objekt i `properties`-arrayen.
2. Sätt `slug` som URL-safe sträng (a-z, siffror, bindestreck) — detta blir URL:en.
3. `heroImage` och `galleryImages` ska vara **filnamn** från dellmander-inside (inte fullständiga URLs).
4. Kör `npm run build` för att verifiera att `getStaticPaths` genererar sidan korrekt.

## Ändra befintlig fastighet

- Ändra aldrig `slug` utan att lägga till en redirect (kan bryta externa länkar).
- Uppdatera `heroImage`/`galleryImages` — kontrollera att filnamnet faktiskt finns i dellmander-inside.

## Hitta bildnamn i dellmander-inside

Bilderna i dellmander-inside ligger under:
- `data/gallery-images/` — galleribilder per fastighet
- `data/property-images/` — profilbilder

Bildnamnen syns i dellmander-inside's admin (Properties → Gallery).

## Validering
```bash
npm run build   # ska slutföra utan fel
npm run preview # kontrollera visuellt
```
