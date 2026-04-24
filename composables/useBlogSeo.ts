import { blogSite } from '~/data/site'

type BlogSeoOptions = {
  description?: string
  noindex?: boolean
  path?: string
  title: string
  type?: 'article' | 'website'
}

const createCanonicalUrl = (path: string) => {
  const normalizedPath = path.replace(/^\/+/, '')

  return new URL(normalizedPath, blogSite.url).toString()
}

export function useBlogSeo(options: BlogSeoOptions) {
  const route = useRoute()
  const canonicalPath = computed(() => options.path ?? route.path)
  const canonicalUrl = computed(() => createCanonicalUrl(canonicalPath.value))
  const description = computed(() => options.description ?? blogSite.description)

  useSeoMeta({
    title: options.title,
    description: description.value,
    ogTitle: options.title,
    ogDescription: description.value,
    ogType: options.type ?? 'website',
    ogSiteName: blogSite.name,
    ogLocale: blogSite.locale,
    ogUrl: canonicalUrl.value,
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: description.value,
    author: blogSite.author,
    applicationName: blogSite.name,
    themeColor: blogSite.themeColor,
    robots: options.noindex ? 'noindex, nofollow' : 'index, follow',
    colorScheme: 'light',
  })

  useHead({
    link: [
      {
        rel: 'canonical',
        href: canonicalUrl.value,
      },
    ],
    meta: [
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: blogSite.name,
      },
    ],
  })
}
