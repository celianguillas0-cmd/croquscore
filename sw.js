importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js');

const CACHE_NAME = 'crocscore-v15';
const DB_FILES = ['/localdb.js', '/opff_db.js', '/more_products.js'];

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(['/manifest.json', '/opff_db.js', '/localdb.js', '/more_products.js', '/icon-192.png', '/icon-512.png']))
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Network-first pour HTML — toujours la version fraîche
  if (event.request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // Stale-while-revalidate pour les fichiers DB (gros fichiers, mise à jour en arrière-plan)
  if (DB_FILES.includes(url.pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(cached => {
          const networkFetch = fetch(event.request).then(response => {
            if (response && response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          }).catch(() => cached);
          return cached || networkFetch;
        })
      )
    );
    return;
  }

  // Cache-first pour les autres assets statiques
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
