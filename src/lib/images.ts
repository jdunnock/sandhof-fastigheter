// Fetches property images from dellmander-inside at Astro build time.

const API_BASE = import.meta.env.PUBLIC_DELLMANDER_API_URL ?? ''

export interface RemoteImage {
  url: string       // e.g. /api/gallery-images/gallery-1-123.jpg
  category: string
  caption: string
  sort_order: number
}

/** Returns absolute image URLs for a property. Empty array if apiId is null or fetch fails. */
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
