const assetHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
}

const LIVE_HOST = 'servercardtrust.space'
const LIVE_ORIGIN = 'https://servercardtrust.space'
const LEGACY_ORIGIN = 'https://my-servercardtrust.pages.dev'
const ALT_HOSTS = new Set(['www.servercardtrust.space'])
const publicPages = new Set([
  '/',
  '/mcp-server-card',
  '/server-card-validation',
  '/mcp-trust-center',
  '/pricing',
  '/privacy',
  '/terms',
])
const noindexPages = new Set(['/checkout', '/success'])
const publicFiles = new Set(['/robots.txt', '/sitemap.xml', '/llms.txt', '/server-card.json', '/server.json', '/.well-known/mcp/server-card.json'])

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: responseHeaders(request) })

    const redirect = canonicalRedirect(url)
    if (redirect) return redirect

    const normalizedPath = url.pathname.replace(/\/+$/, '') || '/'
    if (normalizedPath === '/mcp' || normalizedPath.startsWith('/mcp/') || normalizedPath.startsWith('/api/')) {
      return proxyLegacyWorker(request)
    }

    if (!publicPages.has(normalizedPath) && !noindexPages.has(normalizedPath) && !publicFiles.has(normalizedPath)) {
      return noindexNotFound(request)
    }

    const response = await env.ASSETS.fetch(request)
    if (response.status === 404 && !publicFiles.has(normalizedPath)) return noindexNotFound(request)
    return withHeaders(response, request, noindexPages.has(normalizedPath))
  },
}

function canonicalRedirect(url) {
  if (url.hostname === LIVE_HOST && url.protocol === 'https:') return null
  if (!ALT_HOSTS.has(url.hostname) && url.hostname !== LIVE_HOST) return null
  const redirectUrl = new URL(url)
  redirectUrl.protocol = 'https:'
  redirectUrl.hostname = LIVE_HOST
  return Response.redirect(redirectUrl.toString(), 301)
}

function responseHeaders(request) {
  const headers = new Headers(assetHeaders)
  const origin = request?.headers?.get?.('Origin')
  if (origin) {
    try {
      const originUrl = new URL(origin)
      if (originUrl.hostname === LIVE_HOST || ALT_HOSTS.has(originUrl.hostname) || originUrl.hostname.endsWith('.workers.dev')) {
        headers.set('Access-Control-Allow-Origin', origin)
        headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        headers.set('Vary', 'Origin')
      }
    } catch {
      // Ignore malformed origins.
    }
  }
  return headers
}

function json(value, status = 200, request = null) {
  const headers = responseHeaders(request)
  headers.set('Content-Type', 'application/json; charset=utf-8')
  headers.set('Cache-Control', 'no-store')
  return new Response(JSON.stringify(value), {
    status,
    headers,
  })
}

async function proxyLegacyWorker(request) {
  const originalUrl = new URL(request.url)
  const targetUrl = new URL(originalUrl.pathname + originalUrl.search, LEGACY_ORIGIN)
  const headers = new Headers(request.headers)
  headers.set('X-Forwarded-Host', originalUrl.hostname)
  headers.set('X-Forwarded-Proto', originalUrl.protocol.replace(':', ''))

  const response = await fetch(
    new Request(targetUrl.toString(), {
      method: request.method,
      headers,
      body: request.body,
      redirect: 'manual',
    }),
  )
  const proxied = new Response(response.body, response)
  proxied.headers.set('X-ServerCardTrust-Edge', 'dedicated-hotword-worker')
  return proxied
}

function withHeaders(response, request, noindex = false) {
  const headers = new Headers(response.headers)
  for (const [key, value] of responseHeaders(request)) headers.set(key, value)
  if (noindex) headers.set('X-Robots-Tag', 'noindex, follow')
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

function noindexNotFound(request) {
  const headers = responseHeaders(request)
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.set('Cache-Control', 'no-store')
  headers.set('X-Robots-Tag', 'noindex, nofollow')
  return new Response(
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>Page not found</title></head><body><main><h1>Page not found</h1><p>This URL is not a public page for ServerCard Trust MCP.</p><p><a href="' + LIVE_ORIGIN + '/">Return home</a></p></main></body></html>',
    { status: 404, headers },
  )
}
