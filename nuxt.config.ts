import { blogSite, blogSiteAssetUrl } from './data/site'

export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxt/content'],
  devtools: {
    enabled: true,
  },
  css: ['~/assets/scss/main.scss'],
  app: {
    head: {
      title: blogSite.name,
      titleTemplate: `%s · ${blogSite.name}`,
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: blogSiteAssetUrl(blogSite.favicon),
        },
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
          content: blogSite.description,
        },
        {
          name: 'keywords',
          content: 'Nuxt, Vue, 개발 블로그, CSS, JavaScript, 메모, 아카이브',
        },
        {
          property: 'og:site_name',
          content: blogSite.name,
        },
        {
          property: 'og:locale',
          content: blogSite.locale,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:title',
          content: blogSite.name,
        },
        {
          property: 'og:description',
          content: blogSite.description,
        },
        {
          property: 'og:image',
          content: blogSiteAssetUrl(blogSite.ogImage),
        },
        {
          property: 'og:image:type',
          content: 'image/png',
        },
        {
          property: 'og:image:width',
          content: '1200',
        },
        {
          property: 'og:image:height',
          content: '630',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: blogSite.name,
        },
        {
          name: 'twitter:description',
          content: blogSite.description,
        },
        {
          name: 'twitter:image',
          content: blogSiteAssetUrl(blogSite.ogImage),
        },
        {
          name: 'twitter:image:width',
          content: '1200',
        },
        {
          name: 'twitter:image:height',
          content: '630',
        },
        {
          name: 'theme-color',
          content: blogSite.themeColor,
        },
        {
          name: 'author',
          content: blogSite.author,
        },
        {
          name: 'application-name',
          content: blogSite.name,
        },
        {
          name: 'apple-mobile-web-app-title',
          content: blogSite.name,
        },
        {
          name: 'format-detection',
          content: 'telephone=no',
        },
      ],
      htmlAttrs: {
        lang: 'ko',
      },
    },
  },
})
