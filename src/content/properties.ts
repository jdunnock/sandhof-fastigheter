// Fastigheternas data — uppdatera slug, bildnamn och beskrivningar här.
// Bilder serveras från dellmander-inside API (se SHARED_RESOURCES i README).

export interface Property {
  slug: string
  name: string
  address: string
  city: string
  apartments: number
  description: string
  longDescription: string
  /** Filnamn i dellmander-inside /api/gallery-images/:filename */
  heroImage: string
  galleryImages: string[]
  features: string[]
}

export const properties: Property[] = [
  {
    slug: 'tradgarden-12',
    name: 'Trädgården 12',
    address: 'Trädgårdsgatan 12',
    city: 'Skövde',
    apartments: 6,
    description: 'En gulmålad fastighet omgiven av lummiga träd och välskött grönska. Byggnaden har en varm och välkomnande karaktär.',
    longDescription: 'Trädgården 12 ligger centralt i Skövde och omges av välskött grönska. Fastigheten har genomgått löpande underhåll och erbjuder trivsamma lägenheter i ett lugnt läge.',
    heroImage: '',
    galleryImages: [],
    features: ['Välskött gård', 'Cykelförråd', 'Tvättstuga'],
  },
  {
    slug: 'bjorken-4',
    name: 'Björken 4',
    address: 'Björkvägen 4',
    city: 'Skövde',
    apartments: 8,
    description: 'Karaktärsfull putsad fasad med röda takpannor. Välbevarat äldre hyreshus med personlighet.',
    longDescription: 'Björken 4 är ett äldre hyreshus med gedigen karaktär. Den putsade fasaden och de röda takpannorna ger fastigheten ett distinkt utseende som trivs väl i kvarteret.',
    heroImage: '',
    galleryImages: [],
    features: ['Karaktärsfull arkitektur', 'Källarförråd', 'Tvättstuga'],
  },
  {
    slug: 'stenhuset',
    name: 'Stenhuset',
    address: 'Stenvägen 8',
    city: 'Skövde',
    apartments: 5,
    description: 'Hög gavel och gedigen byggnadsstil. En fastighet som berättar sin historia med arkitekturen.',
    longDescription: 'Stenhuset är en av våra mest karaktärsfulla fastigheter. Den höga gaveln och den gediga byggnationen speglar en tid då man byggde för att hålla länge.',
    heroImage: '',
    galleryImages: [],
    features: ['Historisk karaktär', 'Källarförråd', 'Parkering'],
  },
  {
    slug: 'sjoblick',
    name: 'Sjöblick',
    address: '',
    city: 'Skövde',
    apartments: 0,
    description: 'Ljust hörnhus med öppen karaktär.',
    longDescription: '',
    heroImage: '',
    galleryImages: [],
    features: [],
  },
]

export function getProperty(slug: string): Property | undefined {
  return properties.find(p => p.slug === slug)
}
