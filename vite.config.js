import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      // strategies: 'networkFirst',
      // notificationOptions: {
      //   body: 'A new version of the app is available. Click OK to update.',
      // },
      // devOptions: {
      //   enabled: false
      // },
      mode: 'production',
      base: '/',
      includeAssets: [
        'app_icon.jpg',
        'app_icon.png',
        'app_icon-2.jpg',
        'app_icon-2.png',
        'badge.svg',
        'logo.png',
        'logo-dark.png',
        'done.png',
        'loader.gif',
        'mtn.png',
        'glo.png',
        'etisalat.png',
        'airtel.png',
        'icons/*'
      ],
      manifest: {
        name: 'DIGIXCEL',
        "theme_color": "#07163F",
        "background_color": "#07163F",
        "display": "standalone",
        "orientation":"portrait",
        "scope": "/",
        "start_url": "/",
        "app_name": "DIGIXCEL",
        "short_name": "DIGIXCEL",
        "description": "Everything Data, Airtime and Subscriptions",
        icons: [
          {
            src: '/app_icon-2.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/app_icon.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        "shortcuts": [
          {
            "name": "Buy Data",
            "url": "/buydata",
            "description": "Buy Data at cheap prices",
            "icons": [{ "src": "/airtime.png", "sizes": "96x96" }]
          },
          {
            "name": "Buy Airtime",
            "url": "/buyairtime",
            "description": "Buy Airtime at cheap prices",
            "icons": [{ "src": "/airtime.png", "sizes": "96x96" }]
          },
          {
            "name": "Pay Bills",
            "url": "/buycable",
            "description": "The easiest way to pay bills",
            "icons": [{ "src": "/ds.jpeg", "sizes": "96x96" }]
          }
        ],
        "categories": ["utilities", "productivity"],
        "screenshots": [
          {
            "src": "/screenshots/1.jpg",
            "sizes": "576x1280",
            "type": "image/jpeg",
            "form_factor": "narrow",
            "label": "The most user friendly VTU app"
          },
          {
            "src": "/screenshots/1.jpg",
            "sizes": "576x1280",
            "type": "image/jpeg",
            "form_factor": "wide",
            "label": "The most user friendly VTU app"
          },
          {
            "src": "/screenshots/2.jpg",
            "sizes": "576x1280",
            "type": "image/jpeg",
            "form_factor": "narrow",
            "label": "Buy cheap airtime at the snap of a finger"
          },
          {
            "src": "/screenshots/3.jpg",
            "sizes": "576x1280",
            "type": "image/jpeg",
            "form_factor": "narrow",
            "label": "Buy cheap data at the snap of a finger"
          },
          {
            "src": "/screenshots/4.jpg",
            "sizes": "576x1280",
            "type": "image/jpeg",
            "form_factor": "narrow",
            "label": "Subscribe to any service of your choice"
          },
          {
            "src": "/screenshots/5.jpg",
            "sizes": "576x1280",
            "type": "image/jpeg",
            "form_factor": "narrow",
            "label": "It is all in your power"
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
            }
          }
        ]
      }

    })
  ]
})
