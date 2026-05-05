importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js');

const CACHE_NAME = 'crocscore-v5';

// Vider les anciens caches au démarrage
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
    caches.open(CACHE_NAME).then(cache => cache.addAll(['/manifest.json']))
  );
});

// Network-first pour HTML — toujours la version fraîche
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if(event.request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }
  // Cache-first pour les autres assets statiques
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
