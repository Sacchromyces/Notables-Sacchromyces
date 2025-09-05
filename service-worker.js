const CACHE_NAME = 'music-player-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/vessel.jpg',
  '/blurryface.jpg',
  '/home.jpg',
  '/Ode_to_Sleep.mp3',
  '/Migraine.mp3',
  '/House_of_Gold.mp3',
  '/Car_Radio.mp3',
  '/Semi_Automatic.mp3',
  '/Screen.mp3',
  '/The_Run_and_Go.mp3',
  '/Fake_You_Out.mp3',
  '/Guns_for_Hands.mp3',
  '/Truce.mp3',
  '/Addict_with_a_Pen.mp3',
  '/Lovely.mp3',
  '/Blasphemy.mp3',
  '/Holding_on_to_you.mp3',
  '/StressedOut.mp3',
  '/Ride.mp3',
  '/Fairly_Local.mp3',
  '/Tear_in_My_Heart.mp3',
  '/Lane_Boy.mp3',
  '/The_Judge.mp3',
  '/Doubt.mp3',
  '/Polarize.mp3',
  '/We_Dont_Believe_Whats_On_TV.mp3',
  '/Message_Man.mp3',
  '/Hometown.mp3',
  '/Not_Today.mp3',
  '/Goner.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

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

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
