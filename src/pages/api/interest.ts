import type { APIRoute } from 'astro'

const RESEND_API_URL = 'https://api.resend.com/emails'
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const MAX_TRACKED_IPS = 10_000
const MAX_REQUEST_BYTES = 16 * 1024
const requestsByIp = new Map<string, number[]>()

interface InterestRequest {
  name?: unknown
  email?: unknown
  phone?: unknown
  message?: unknown
  company?: unknown
}

function jsonResponse(body: Record<string, string>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function isRateLimited(request: Request): boolean {
  const now = Date.now()
  for (const [trackedIp, timestamps] of requestsByIp) {
    const recentTimestamps = timestamps.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS)
    if (recentTimestamps.length > 0) requestsByIp.set(trackedIp, recentTimestamps)
    else requestsByIp.delete(trackedIp)
  }

  const ip = request.headers.get('cf-connecting-ip')
    || request.headers.get('x-real-ip')
    || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || 'unknown'
  if (!requestsByIp.has(ip) && requestsByIp.size >= MAX_TRACKED_IPS) return true

  const recentRequests = (requestsByIp.get(ip) ?? []).filter(
    timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS,
  )

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) return true

  recentRequests.push(now)
  requestsByIp.set(ip, recentRequests)
  return false
}

async function readRequestBody(request: Request): Promise<InterestRequest> {
  const declaredLength = Number(request.headers.get('content-length') ?? 0)
  if (declaredLength > MAX_REQUEST_BYTES || !request.body) throw new Error('Invalid body')

  const reader = request.body.getReader()
  const decoder = new TextDecoder()
  let totalBytes = 0
  let json = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    totalBytes += value.byteLength
    if (totalBytes > MAX_REQUEST_BYTES) {
      await reader.cancel()
      throw new Error('Body too large')
    }
    json += decoder.decode(value, { stream: true })
  }
  json += decoder.decode()

  const parsed: unknown = JSON.parse(json)
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Invalid body')
  return parsed as InterestRequest
}

export const POST: APIRoute = async ({ request }) => {
  if (isRateLimited(request)) {
    return jsonResponse({ error: 'För många försök. Vänta en stund och försök igen.' }, 429)
  }

  let body: InterestRequest
  try {
    body = await readRequestBody(request)
  } catch {
    return jsonResponse({ error: 'Ogiltig förfrågan.' }, 400)
  }

  if (typeof body.company === 'string' && body.company.trim()) {
    return jsonResponse({ message: 'Intresseanmälan mottagen.' }, 200)
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (
    name.length < 2 || name.length > 100 ||
    /[\r\n]/.test(name) ||
    !emailPattern.test(email) || email.length > 254 ||
    phone.length > 50 ||
    message.length < 2 || message.length > 3000
  ) {
    return jsonResponse({ error: 'Kontrollera att alla uppgifter är korrekt ifyllda.' }, 400)
  }

  const apiKey = process.env.RESEND_API_KEY
  const recipient = process.env.INTEREST_RECIPIENT
  const from = process.env.INTEREST_FROM

  if (!apiKey || !recipient || !from) {
    console.error('Interest form email configuration is incomplete')
    return jsonResponse({ error: 'Tjänsten är tillfälligt otillgänglig.' }, 503)
  }

  const emailText = [
    'Ny intresseanmälan via sandhoffastigheter.se',
    '',
    `Namn: ${name}`,
    `E-post: ${email}`,
    `Telefon: ${phone || 'Ej angivet'}`,
    '',
    'Meddelande:',
    message,
  ].join('\n')

  try {
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email,
        subject: `Ny intresseanmälan från ${name}`,
        text: emailText,
      }),
    })

    if (!response.ok) {
      console.error(`Resend rejected interest form email with status ${response.status}`)
      return jsonResponse({ error: 'Det gick inte att skicka intresseanmälan.' }, 502)
    }

    return jsonResponse({ message: 'Intresseanmälan skickad.' }, 200)
  } catch {
    console.error('Resend request failed')
    return jsonResponse({ error: 'Det gick inte att skicka intresseanmälan.' }, 502)
  }
}
