// Fetches property and image data from dellmander-inside at Astro build time.

const API_BASE = import.meta.env.PUBLIC_DELLMANDER_API_URL ?? ''

export interface RemoteImage {
  url: string
  category: string
  caption: string
  sort_order: number
}

export interface RemoteProperty {
  id: number
  name: string
  address: string
  city: string
  public_slug: string
  public_description: string
  public_long_description: string
  gallery: RemoteImage[]
}

const PROPERTY_ORDER = [
  'Sveagatan 7',
  'Tallbacken 7',
  'Carlsro',
  'Sveagatan 30',
  'Ännagatan 7',
  'Rådmansgatan 20',
]

function sortProperties(properties: RemoteProperty[]): RemoteProperty[] {
  return [...properties].sort((a, b) => {
    const ai = PROPERTY_ORDER.findIndex(key => a.name.includes(key))
    const bi = PROPERTY_ORDER.findIndex(key => b.name.includes(key))
    const an = ai === -1 ? PROPERTY_ORDER.length : ai
    const bn = bi === -1 ? PROPERTY_ORDER.length : bi
    return an - bn
  })
}

/** Fetches all public properties from dellmander-inside. Returns [] on failure. */
export async function fetchPublicProperties(): Promise<RemoteProperty[]> {
  if (!API_BASE) return []
  try {
    const res = await fetch(`${API_BASE}/api/public/properties`)
    if (!res.ok) return []
    const { properties } = await res.json() as { properties: RemoteProperty[] }
    return sortProperties(properties ?? [])
  } catch {
    return []
  }
}

/** Fetches public gallery images for one property by its dellmander ID. */
export async function fetchPropertyImages(apiId: number | null): Promise<RemoteImage[]> {
  if (!apiId || !API_BASE) return []
  try {
    const res = await fetch(`${API_BASE}/api/public/properties/${apiId}/images`)
    if (!res.ok) return []
    const { images } = await res.json() as { images: RemoteImage[] }
    return images ?? []
  } catch {
    return []
  }
}

/** Resolves a relative dellmander URL to an absolute URL. */
export function resolveImageUrl(relativeUrl: string): string {
  if (!relativeUrl) return ''
  if (relativeUrl.startsWith('http')) return relativeUrl
  return `${API_BASE}${relativeUrl}`
}
