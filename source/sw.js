importScripts('https://cdnjs.cloudflare.com/ajax/libs/workbox-sw/7.0.0/workbox-sw.js');

if (workbox) {

    workbox.precaching.precache(['/', '/index.html']);

    workbox.routing.registerRoute(new RegExp('^https?://mykonakona.github.io/?$'), new workbox.strategies.NetworkFirst());

    workbox.routing.registerRoute(new RegExp('.*.html'), new workbox.strategies.NetworkFirst());

    workbox.routing.registerRoute(new RegExp('.*.(?:js|css|jpg|png|gif)'), new workbox.strategies.StaleWhileRevalidate());

}