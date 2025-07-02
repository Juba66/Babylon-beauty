
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open("babylon-cache").then(function(cache) {
      return cache.addAll([
        "index.html",
        "style.css",
        "auth.html",
        "booking.html",
        "my-bookings.html",
        "review.html",
        "receipt.html",
        "filtered_salons.html",
        "admin.html"
      ]);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
