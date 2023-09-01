// offline config passed to workbox-build.
module.exports = {
    globPatterns: ["**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}"],
    globDirectory: "/public",
    swDest: "/public/sw.js",
  },
// offline config passed to workbox-build.
module.exports = {
    runtimeCaching: [
      {
          urlPattern: /^https:\/\/cdnjs\.loli\.net\/.*/,
          handler: "CacheFirst"
        },
      {
        urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/,
        handler: "CacheFirst"
      },
      {
        urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/,
        handler: "CacheFirst"
      }
    ]
  },