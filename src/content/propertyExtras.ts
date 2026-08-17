// Optional extras per property, keyed by public_slug from dellmander-inside.
// Only needed for features/apartment count — descriptions are managed in dellmander-inside.

interface PropertyExtras {
  apartments?: number
  features?: string[]
}

export const propertyExtras: Record<string, PropertyExtras> = {
  'tradgarden-12': {
    apartments: 6,
    features: ['Välskött gård', 'Cykelförråd', 'Tvättstuga'],
  },
  'bjorken-4': {
    apartments: 8,
    features: ['Karaktärsfull arkitektur', 'Källarförråd', 'Tvättstuga'],
  },
  'stenhuset': {
    apartments: 5,
    features: ['Historisk karaktär', 'Källarförråd', 'Parkering'],
  },
}
