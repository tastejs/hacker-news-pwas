var VERSION = '0.1';

this.addEventListener('install', function(e) {
  e.waitUntil(caches.open(VERSION).then(cache => {
    return cache.addAll([
      '/', '/top', '/newest', '/ask', '/jobs', '/sw.js', '/app.css', '/cc.js'
    ]);
  }))
});

this.addEventListener('fetch', function(e) {
  var tryInCachesFirst = caches.open(VERSION).then(cache => {
    return cache.match(e.request).then(response => {
      if (!response) {
        return handleNoCacheMatch(e);
      }

      // Update cache record in the background
      updateRequestCache(e);
      return response
    });
  });

  e.respondWith(tryInCachesFirst);
});

this.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(keys => {
    return Promise.all(keys.map(key => {
      if (key !== VERSION) return caches.delete(key);
    }));
  }));
});

function updateRequestCache(e) {
  return fetch(e.request).then(res => {
    return caches.open(VERSION).then(cache => {
      cache.put(e.request, res.clone());
      return res;
    });
  });
}

function handleNoCacheMatch(e) {
  return updateRequestCache(e);
}
