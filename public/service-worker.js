const cacheName = 'habitlite-v1';//STATIC_CACHE_NAME
const filesToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  '/style.css',
  '/images/calm.png',
  '/images/icons/music-player-48.png',
  '/images/icons/music-player-120.png',
  '/images/icons/music-player-128.png',
  '/images/icons/music-player-144.png',
  '/bundle.js'
];
// ['./style.css']

//Install stage sets up the index page (home page) in the cahche and opens a new cache
self.addEventListener('install', function(e) {
  // console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      // console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', function(e) {
  // console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          // console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});


//If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener('fetch', function(e) {
  // console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    // if we are online start with fetch and then cache this
    // if we aren't online then check cache and send that
    fetch(e.request).then(function(response) {
      // console.log('!!!! FETCH !!!!!', e.request.url, response)

      let responseClone = response.clone();
      caches.open(cacheName).then(function(cache) {
        cache.put(e.request, responseClone);
      });
      return response;
    })
    .catch(() => {
      return caches.match(e.request)
        .then(function(resp) {
          // console.log('!!!! CACHE !!!!!', e.request.url, resp)
          return resp || caches.match('/index.html');
        })
        .catch(function() {
          return caches.match('/index.html');
        })
    })

  );
});

