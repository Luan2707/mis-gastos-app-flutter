// Service Worker para FinanzaPRO - Carga instantánea offline en celulares
const CACHE_NAME = 'finanzapro-cache-v1';
const ASSETS_TO_CACHE = [
  'index.html',
  'styles.css',
  'app.js',
  'manifest.json',
  'assets/bancoestado.jpg',
  'assets/falabella.jpg',
  'assets/santander.jpg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request).catch(() => cachedResponse);
    })
  );
});
