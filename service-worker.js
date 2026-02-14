
const CACHE_NAME = 'cipherchat-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://esm.sh/react-dom@^19.2.4/',
  'https://esm.sh/lucide-react@^0.564.0',
  'https://esm.sh/react@^19.2.4/',
  'https://esm.sh/react@^19.2.4',
  'https://esm.sh/@google/genai@^1.41.0',
  'https://esm.sh/peerjs@1.5.4?bundle',
  'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/128/emoji_u1f512.png',
  'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u1f512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force activation
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Claim clients immediately
  );
});
