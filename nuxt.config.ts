export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  devtools: {
    enabled: true,
  },
  css: ['~/assets/scss/main.scss'],
  app: {
    head: {
      title: 'Blog',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'description',
          content: 'Nuxt starter for the Blog repository',
        },
      ],
      htmlAttrs: {
        lang: 'ko',
      },
    },
  },
})
