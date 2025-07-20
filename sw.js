const CACHE = "kga-v3";
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      c.addAll([
        "/",
        "/index.html",
        "/admin.html",
        "/css/style.css",
        "/css/dark.css",
        "/js/app.js",
        "/js/games.js",
        "/js/store.js",
        "/js/admin.js",
        "/js/utils.js",
        "/manifest.json"
      ])
    )
  );
});
self.addEventListener("fetch", e =>
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)))
);
