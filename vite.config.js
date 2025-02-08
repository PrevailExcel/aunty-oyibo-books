import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'networkFirst',
      notificationOptions: {
        body: 'A new version of the app is available. Click OK to update.',
      },
      devOptions: {
        enabled: false
      },
      mode: 'production',
      base: '/',
      includeAssets: [
        'app_icon.jpg',
        'app_icon-2.jpg',
        'images/*',
        'icons/*'
      ],
      manifest: {
        name: 'Aunty Oyibo Books',
        "theme_color": "#ffffff",
        "background_color": "#ffffff",
        "display": "standalone",
        "orientation":"portrait",
        "scope": "/",
        "start_url": "/",
        "app_name": "Aunty Oyibo Books",
        "short_name": "Aunty Oyibo Books",
        "description": "Read captivating stories with ease. Online, Offline, and More.",
        icons: [
          {
            src: '/app_icon-2.jpg',
            sizes: '192x192',
            type: 'image/jpeg',
          },
          {
            src: '/app_icon.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
          },
        ],
        "categories": ["utilities", "productivity"],
        "screenshots": [
          {
            "src": "/screenshots/1.jpg",
            "sizes": "576x1280",
            "type": "image/jpeg",
            "form_factor": "narrow",
            "label": "Read the best books from the best authors"
          },
          {
            "src": "/screenshots/2.jpg",
            "sizes": "576x1280",
            "type": "image/jpeg",
            "form_factor": "narrow",
            "label": "Read the best books from the best authors"
          },
          {
            "src": "/screenshots/2.jpg",
            "sizes": "576x1280",
            "type": "image/jpeg",
            "form_factor": "wide",
            "label": "All for free. We do what we do for your comfort."
          },
          {
            "src": "/screenshots/3.jpg",
            "sizes": "576x1280",
            "type": "image/jpeg",
            "form_factor": "narrow",
            "label": "Beautiful stories at the snap of a finger"
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
