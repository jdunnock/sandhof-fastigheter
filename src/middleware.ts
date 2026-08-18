import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware((context, next) => {
  // Healthcheck must always pass — no auth
  if (context.url.pathname === '/health') return next()

  const password = process.env.SITE_PASSWORD
  if (!password) return next()

  const authHeader = context.request.headers.get('authorization') ?? ''
  const b64 = authHeader.startsWith('Basic ') ? authHeader.slice(6) : ''
  let pass = ''
  try {
    const decoded = atob(b64)
    const colonIdx = decoded.indexOf(':')
    pass = colonIdx >= 0 ? decoded.slice(colonIdx + 1) : decoded
  } catch {
    // malformed base64 — treat as no credentials
  }

  if (pass === password) return next()

  return new Response('Åtkomst nekad', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Sandhof Fastigheter"' },
  })
})
