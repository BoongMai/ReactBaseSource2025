import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['*.loca.lt', 'localhost', '127.0.0.1'],
    port: 5173,
    headers: {
      'Service-Worker-Allowed': '/',
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: id => {
          // React core
          if (id.includes('react') && !id.includes('react-router')) {
            return 'react';
          }

          // React Router
          if (id.includes('react-router')) {
            return 'router';
          }

          // Ant Design
          if (id.includes('antd') || id.includes('@ant-design')) {
            return 'antd';
          }

          // React Query
          if (id.includes('@tanstack/react-query')) {
            return 'query';
          }

          // State management
          if (id.includes('zustand')) {
            return 'state';
          }

          // HTTP client
          if (id.includes('axios')) {
            return 'http';
          }

          // i18n
          if (id.includes('i18next') || id.includes('react-i18next')) {
            return 'i18n';
          }

          // Utils and helpers
          if (
            id.includes('src/shared/utils') ||
            id.includes('src/shared/hooks')
          ) {
            return 'utils';
          }

          // Features
          if (id.includes('src/features/')) {
            const feature = id.split('src/features/')[1]?.split('/')[0];
            return `feature-${feature}`;
          }

          // Components
          if (
            id.includes('src/shared/components') ||
            id.includes('src/components/')
          ) {
            return 'components';
          }

          // Node modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Optimize chunk naming for better caching
        chunkFileNames: chunkInfo => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()
            : 'chunk';
          return `js/[name]-[hash].js`;
        },
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: assetInfo => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `css/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return `images/[name]-[hash].${ext}`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return `fonts/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_proto: true,
      },
      mangle: {
        safari10: true,
        properties: {
          regex: /^_/,
        },
      },
      format: {
        comments: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // Use modern Sass API
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      strategies: 'generateSW',
      registerType: 'autoUpdate',
      filename: 'sw.js',
      includeAssets: ['icons/icon-192x192.png', 'icons/icon-512x512.png'],
      manifest: {
        name: process.env.VITE_APP_NAME || 'Base Source',
        short_name: process.env.VITE_APP_SHORT_NAME || 'BaseApp',
        description:
          process.env.VITE_APP_DESCRIPTION || 'Base React Application Template',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1890ff',
        orientation: 'portrait',
        scope: '/',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/__/, /\/[^/?]+\.[^/]+$/],
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        additionalManifestEntries: [{ url: '/', revision: null }],
        runtimeCaching: [
          {
            urlPattern: /\.(?:js|css|ts|tsx)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'js-css-cache',
              cacheableResponse: {
                statuses: [0, 200],
              },
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: /^\/api\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 3,
              cacheableResponse: {
                statuses: [0, 200],
              },
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 1 day
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              cacheableResponse: {
                statuses: [0, 200],
              },
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: '/index.html',
        suppressWarnings: true,
      },
    }),
  ],
});
