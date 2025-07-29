// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // css: ['~/../assets/css/main.css'],
  css: ['../assets/css/main.css'],
  modules: [
    '@pinia/nuxt'
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        }
      ],
      htmlAttrs: {
        'data-theme': 'light', // default theme
      },
    },
  },
  typescript: {
    strict: true
  },
  nitro: {
    experimental: {
      tasks: true
    }
  },
  components: [
    '~/components',
    '~/shared-components'
  ]
})
