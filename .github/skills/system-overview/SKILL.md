# Skill: system-overview

Sandhof-ekosystemet består av två applikationer som samverkar. Alla agenter ska känna till denna arkitektur.

## De två applikationerna

### sandhof-fastigheter (detta repo)
- **Typ:** Publik marknadsföringssajt
- **Stack:** Astro SSR + Tailwind CSS + TypeScript
- **Hosting:** Railway
- **URL:** `sandhoffastigheter.se`
- **Syfte:** Presentera fastigheter och bolagsprofil för allmänheten

### sandhof-inside
- **Typ:** Intern administrationssajt för fastighetsförvaltning
- **Repo:** `dellmander-inside` (nuvarande namn i GitHub/Railway — internt kallas det sandhof-inside)
- **Stack:** React + Vite + Node.js + SQLite
- **Hosting:** Railway (separat projekt)
- **Syfte:** Förvalta fastigheter, hyresgäster, kontrakt, kostnader, nycklar — internt verktyg

---

## Beroenden: sandhof-inside → sandhof-fastigheter

Sandhof-inside är den **enda externa datakällan** för sandhof-fastigheter.

### 1. Bilder (aktiv)

sandhof-inside exponerar publika bild-API:er utan autentisering:

| Endpoint | Innehåll |
|---|---|
| `/api/gallery-images/:filename` | Galleribilder per fastighet |
| `/api/property-images/:filename` | Profilbilder för fastigheter |

Miljövariabel: `PUBLIC_DELLMANDER_API_URL`
- Dev: `http://localhost:3001`
- Produktion: sandhof-insides Railway-URL

> ⚠️ `PUBLIC_DELLMANDER_API_URL` bakas in vid **build-tid** — ändring kräver ny deploy.

### 2. Framtida beroenden

Lägg till nya beroenden här när de tillkommer:

```
(reserverat — inga ytterligare beroenden ännu)
```

---

## Konventioner för nya beroenden

När ett nytt beroende från sandhof-inside tillkommer:

1. Dokumentera det i tabellen ovan med endpoint + beskrivning
2. Lägg till ny miljövariabel i Railway om det krävs
3. Kontrollera om variabeln är **build-tid** (PUBLIC_) eller **runtime**
4. Uppdatera Deployment Engineers pre-launch checklist

---

## Lokal utveckling

Båda appar behöver köras parallellt:

```bash
# Terminal 1 — sandhof-inside
cd ~/dellmander-inside && npm run dev   # http://localhost:3001

# Terminal 2 — sandhof-fastigheter
cd ~/sandhof-fastigheter && npm run dev # http://localhost:4321
```

`.env.local` i sandhof-fastigheter:
```
PUBLIC_DELLMANDER_API_URL=http://localhost:3001
```

---

## CORS

sandhof-inside tillåter CORS för alla publika bild-routes.
Auth-skyddade routes kräver JWT — används inte från sandhof-fastigheter.
