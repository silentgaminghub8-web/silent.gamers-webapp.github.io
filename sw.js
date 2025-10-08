const CACHE_NAME = 'silent-gamers-hub-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js'
];

// Install event: App shell ko cache karta hai
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: Request ko cache se serve karta hai agar available ho
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Agar cache mein response hai to use return karo
        if (response) {
          return response;
        }
        // Warna network se fetch karo
        return fetch(event.request);
      }
    )
  );
});
