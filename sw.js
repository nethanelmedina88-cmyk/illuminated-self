/* The Illuminated Self · offline support.
   The page and its files open from the cache at once and refresh in the background.
   Narration audio, Google sign-in and the cloud database always go to the network. */
const CACHE = 'illuminated-v4.1'
const SHELL = [
  './',
  './index.html',
  './cloud-sync.js',
  './manifest.webmanifest',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon-32.png',
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(SHELL.map((u) => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (e) => {
  const req = e.request
  const url = new URL(req.url)
  if (req.method !== 'GET' || url.origin !== self.location.origin) return
  if (url.pathname.includes('/audio/') || req.headers.has('range')) return
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req, { ignoreSearch: true })
      const network = fetch(req)
        .then((res) => {
          if (res && res.ok && res.type === 'basic') cache.put(req, res.clone())
          return res
        })
        .catch(() => null)
      if (cached) {
        e.waitUntil(network)
        return cached
      }
      const res = await network
      if (res) return res
      if (req.mode === 'navigate') return (await cache.match('./index.html')) || new Response('', { status: 504 })
      return new Response('', { status: 504 })
    }),
  )
})
