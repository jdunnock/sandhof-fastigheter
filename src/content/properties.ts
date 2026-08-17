// Fastigheternas statiska content. Bilder hämtas från dellmander-inside API vid byggtid via apiId.

export interface Property {
  slug: string
  /** ID i dellmander-inside — kopplar till API-bilderna */
  apiId: number | null
  name: string
  address: string
  city: string
  apartments: number
  description: string
  longDescription: string
  features: string[]
}

export const properties: Property[] = [
  {
    slug: 'tradgarden-12',
    apiId: null, // sätt till rätt ID från dellmander-inside
    name: 'Trädgården 12',
    address: 'Trädgårdsgatan 12',
    city: 'Skövde',
    apartments: 6,
    description: 'En gulmålad fastighet omgiven av lummiga träd och välskött grönska. Byggnaden har en varm och välkomnande karaktär.',
    longDescription: 'Trädgården 12 ligger centralt i Skövde och omges av välskött grönska. Fastigheten har genomgått löpande underhåll och erbjuder trivsamma lägenheter i ett lugnt läge.',
    features: ['Välskött gård', 'Cykelförråd', 'Tvättstuga'],
  },
  {
    slug: 'bjorken-4',
    apiId: null,
    name: 'Björken 4',
    address: 'Björkvägen 4',
    city: 'Skövde',
    apartments: 8,
    description: 'Karaktärsfull putsad fasad med röda takpannor. Välbevarat äldre hyreshus med personlighet.',
    longDescription: 'Björken 4 är ett äldre hyreshus med gedigen karaktär. Den putsade fasaden och de röda takpannorna ger fastigheten ett distinkt utseende som trivs väl i kvarteret.',
    features: ['Karaktärsfull arkitektur', 'Källarförråd', 'Tvättstuga'],
  },
  {
    slug: 'stenhuset',
    apiId: null,
    name: 'Stenhuset',
    address: 'Stenvägen 8',
    city: 'Skövde',
    apartments: 5,
    description: 'Hög gavel och gedigen byggnadsstil. En fastighet som berättar sin historia med arkitekturen.',
    longDescription: 'Stenhuset är en av våra mest karaktärsfulla fastigheter. Den höga gaveln och den gediga byggnationen speglar en tid då man byggde för att hålla länge.',
    features: ['Historisk karaktär', 'Källarförråd', 'Parkering'],
  },
  {
    slug: 'sjoblick',
    apiId: null,
    name: 'Sjöblick',
    address: '',
    city: 'Skövde',
    apartments: 0,
    description: 'Ljust hörnhus med öppen karaktär.',
    longDescription: '',
    features: [],
  },
]

export function getProperty(slug: string): Property | undefined {
  return properties.find(p => p.slug === slug)
}
