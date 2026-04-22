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
import type { BlogPost } from '~/types/blog'

const route = useRoute()
const slug = computed(() => {
  const value = route.params.slug
  const raw = Array.isArray(value) ? value[0] : value
  return typeof raw === 'string' ? raw : ''
})

const post = await queryCollection('posts')
  .path(`/posts/${slug.value}`)
  .first<BlogPost>()

if (!post) {
  throw createError({
    statusCode: 404,
    statusMessage: '게시물을 찾을 수 없습니다.',
  })
}
</script>
