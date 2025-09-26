const CACHE_NAME = 'music-player-cache-v2';

// ✅ Core assets: only cache what's required to boot the app
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/vessel.jpg',
  '/blurryface.jpg',
  '/home.jpg',
  '/TwentyOne_Pilots.jpg"
  '/Downstairs.jpg"
  '/Upstairs.jpg"
];

// --- Install: cache core assets only ---
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CORE_ASSETS);
    })
  );
});

// --- Activate: clean up old caches ---
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// --- Fetch: stale-while-revalidate strategy ---
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request)
        .then(networkResponse => {
          // Cache the new file for future offline use
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => cachedResponse); // if offline, fallback to cache

      // Serve cached file instantly if available
      return cachedResponse || fetchPromise;
    })
  );
});



