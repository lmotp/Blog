export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxt/content'],
  nitro: {
    prerender: {
      routes: ['/api/posts/archive-links'],
    },
  },
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
          href: 'https://cdn.jsdelivr.net',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css',
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
