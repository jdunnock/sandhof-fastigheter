// Static file server with optional Basic Auth (controlled by SITE_PASSWORD env var)
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.join(__dirname, 'dist')
const PORT = process.env.PORT || 3000
const PASSWORD = process.env.SITE_PASSWORD // if unset, no auth

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'text/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.txt':  'text/plain',
  '.xml':  'text/xml',
}

function checkAuth(req, res) {
  if (!PASSWORD) return true
  const header = req.headers['authorization'] ?? ''
  const b64 = header.startsWith('Basic ') ? header.slice(6) : ''
  const [, pass] = Buffer.from(b64, 'base64').toString().split(':')
  if (pass === PASSWORD) return true
  res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Sandhof Fastigheter"' })
  res.end('Åtkomst nekad')
  return false
}

http.createServer((req, res) => {
  if (!checkAuth(req, res)) return

  let urlPath = decodeURIComponent(req.url.split('?')[0])
  if (urlPath === '/') urlPath = '/index.html'

  // Try exact path, then with .html, then as directory index
  const candidates = [
    path.join(DIST, urlPath),
    path.join(DIST, urlPath + '.html'),
    path.join(DIST, urlPath, 'index.html'),
  ]

  for (const filePath of candidates) {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath)
      res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' })
      fs.createReadStream(filePath).pipe(res)
      return
    }
  }

  // 404 — serve 404.html if it exists
  const notFound = path.join(DIST, '404.html')
  if (fs.existsSync(notFound)) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
    fs.createReadStream(notFound).pipe(res)
  } else {
    res.writeHead(404)
    res.end('404 Not Found')
  }
}).listen(PORT, () => {
  const protected_ = PASSWORD ? ' (lösenordsskyddad)' : ''
  console.log(`[server] http://localhost:${PORT}${protected_}`)
})
