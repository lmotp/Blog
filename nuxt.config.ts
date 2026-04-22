export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  devtools: {
    enabled: true,
  },
  css: ['~/assets/scss/main.scss'],
  app: {
    head: {
      title: 'Blog',
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap',
        },
      ],
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
