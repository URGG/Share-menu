// service-worker.js
const CACHE_NAME = 'leslie-business-card-v1';
const urlsToCache = [
  'https://ads4u.store/leslie-business-card/',
  // Add other important resources Leslie's main page needs
  // 'https://ads4u.store/path-to-leslie-image.jpg',
  // 'https://ads4u.store/path-to-styles.css'
];

self.addEventListener("install", (e) => {
  console.log("Service Worker Installed");
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  console.log("Service Worker Activated");
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(e.request);
      })
  );
});