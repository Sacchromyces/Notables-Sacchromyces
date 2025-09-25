const CACHE_NAME = "notables-cache-v1";

const FILES_TO_CACHE = [
  "/",                     // root
  "/index.html",
  "/manifest.json",
  "/Notables_Logo.jpg",
  "/Vessel.jpg",
  "/Blurryface.jpg",
  "/2009_21_Cover.jpg",
  "/Home.jpg",

  // Vessel album
  "/Ode_to_Sleep.mp3",
  "/Migraine.mp3",
  "/House_of_Gold.mp3",
  "/Car_Radio.mp3",
  "/Semi_Automatic.mp3",
  "/Screen.mp3",
  "/The_Run_and_Go.mp3",
  "/Fake_You_Out.mp3",
  "/Guns_for_Hands.mp3",
  "/Truce.mp3",
  "/Addict_with_a_Pen.mp3",
  "/Lovely.mp3",
  "/Blasphemy.mp3",
  "/Holding_on_to_you.mp3",

  // Blurryface album
  "/Stressed_Out.mp3",
  "/Ride.mp3",
  "/Fairly_Local.mp3",
  "/Tear_in_My_Heart.mp3",
  "/Lane_Boy.mp3",
  "/The_Judge.mp3",
  "/Doubt.mp3",
  "/Polarize.mp3",
  "/We_Dont_Believe_Whats_On_TV.mp3",
  "/Message_Man.mp3",
  "/Hometown.mp3",
  "/Not_Today.mp3",
  "/Goner.mp3",

  // 2009 21 Pilots album
  "/Implicit_Demand_For_Proof.mp3",
  "/Fall_Away.mp3",
  "/The_Pantaloon.mp3",
  "/Friend,_Please.mp3",
  "/March_To_The_Sea.mp3",
  "/Johnny_Boy.mp3",
  "/Oh_Ms._Believer.mp3",
  "/Air_Catcher.mp3",
  "/Trapdoor.mp3",
  "/A_Car,_a_Torch,_a_Death.mp3",
  "/Taxi_Cab.mp3",
  "/Before_You_Start_Your_Day.mp3",
  "/Isle_of_Flightless_Birds.mp3"
];

// Install service worker → cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// Fetch → serve from cache first
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
