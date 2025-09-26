const CACHE_NAME = "notables-cache-v2"; // bumped version

// Only cache the app shell (HTML, manifest, covers, logo)
const FILES_TO_CACHE = [
  "index.html",
  "manifest.json",
  "Notables_Logo.jpg",
  "Vessel.jpg",
  "Blurryface.jpg",
  "2009_21_Cover.jpg",
  "Home.jpg"
];

// Install service worker → cache app shell
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// Activate → clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch → serve from cache, cache MP3s on-demand
self.addEventListener("fetch", event => {
  const req = event.request;

  // If it's an MP3 → fetch + cache it the first time
  if (req.url.endsWith(".mp3")) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        fetch(req).then(response => {
          cache.put(req, response.clone());
          return response;
        }).catch(() => caches.match(req))
      )
    );
  } 
  // Otherwise → app shell cache first
  else {
    event.respondWith(
      caches.match(req).then(response => response || fetch(req))
    );
  }
});





