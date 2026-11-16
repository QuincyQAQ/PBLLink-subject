// Cache API rejects 206 responses; store each PMTiles byte range separately as 200.
export const pmtilesRangePlugin = {
  cacheKeyWillBeUsed: ({ request }) => {
    const url = new URL(request.url)
    url.searchParams.set('__pmtiles_range', request.headers.get('Range'))
    return new Request(url, request)
  },
  cacheWillUpdate: ({ request, response }) => {
    if (request.cache === 'no-store' || response.status !== 206) return null
    return new Response(response.body, { status: 200, headers: response.headers })
  },
  cachedResponseWillBeUsed: ({ request, cachedResponse }) => {
    if (!cachedResponse || ['reload', 'no-store', 'no-cache'].includes(request.cache)) return null
    return new Response(cachedResponse.body, { status: 206, headers: cachedResponse.headers })
  },
}

// Workbox serializes these callbacks into the worker; keep them self-contained.
// 港科广手册无实时巴士/地图 API，缓存策略只覆盖本站与通用静态资源。
export const runtimeCaching = [
  {
    urlPattern: ({ url, request }) =>
      ['image', 'font', 'style', 'script'].includes(request.destination),
    handler: 'CacheFirst',
    options: {
      cacheName: 'static-resources-v1',
      expiration: { maxEntries: 512, maxAgeSeconds: 86400, purgeOnQuotaError: true },
      cacheableResponse: { statuses: [0, 200] },
    },
  },
  {
    urlPattern: ({ url }) => url.origin === self.location.origin,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'web-cache',
      networkTimeoutSeconds: 5,
      expiration: { maxEntries: 50, maxAgeSeconds: 86400, purgeOnQuotaError: true },
      cacheableResponse: { statuses: [200] },
    },
  },
]
