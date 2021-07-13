const CACHE_NAME = "cv-v22";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/info.html",
  "/pages/keahlian.html",
  "/pages/profil.html",  
  "/pages/pengalaman.html",
  "/css/style.css",
  "/css/materialize.min.css",
  "/image/bintang_dua.png",
  "/image/bintang_satu.png",
  "/image/mqn.png",
  "/image/peta.png",
  "/image/profil.png",
  "/js/materialize.min.js",
  "/js/nav.js",
  "https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400&display=swap",
  "/manifest.json",
  "/image/icons/icon-192x192.png",
  "/image/icons/icon-512x512.png",
  "/css/Ubuntu-Regular.ttf"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });
  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });