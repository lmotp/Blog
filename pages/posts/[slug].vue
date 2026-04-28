<template>
  <section v-if="post" class="post-page">
    <header class="post-page__header">
      <p class="post-page__eyebrow">{{ post.category }}</p>
      <h1 class="post-page__title">{{ post.title }}</h1>
      <p class="post-page__meta">{{ post.date }}</p>
      <p class="post-page__lead">{{ post.description }}</p>
    </header>

    <article class="post-page__article">
      <ContentRenderer :value="post" />
    </article>
  </section>
</template>

<script setup lang="ts">
import { useBlogSeo } from '~/composables/useBlogSeo'
import { resolveRouteSlug } from '~/utils/route'

const route = useRoute()
const slug = resolveRouteSlug(route.params.slug)

if (!slug) {
  throw createError({
    statusCode: 404,
    statusMessage: '작업일지를 찾을 수 없습니다.',
  })
}

const post = await queryCollection('posts')
  .path(`/posts/${slug}`)
  .first()

if (!post) {
  throw createError({
    statusCode: 404,
    statusMessage: '작업일지를 찾을 수 없습니다.',
  })
}

useBlogSeo({
  title: post.title,
  description: post.description,
  path: route.path,
  type: 'article',
})
</script>
