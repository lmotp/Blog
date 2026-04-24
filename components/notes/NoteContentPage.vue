<template>
  <section v-if="note" class="note-content-page">
    <header class="note-content-page__hero">
      <p class="note-content-page__eyebrow">{{ note.category }}</p>
      <h1 class="note-content-page__title">{{ note.title }}</h1>
      <p class="note-content-page__meta">{{ note.date }}</p>
      <p class="note-content-page__lead">{{ note.description }}</p>
    </header>

    <article class="note-content-page__article">
      <ContentRenderer :value="note" />
    </article>
  </section>
</template>

<script setup lang="ts">
import { useBlogSeo } from '~/composables/useBlogSeo'

const props = defineProps<{
  contentPath: string
}>()

const route = useRoute()

const note = await queryCollection('notes').path(props.contentPath).first()

if (!note) {
  throw createError({
    statusCode: 404,
    statusMessage: '메모를 찾을 수 없습니다.',
  })
}

useBlogSeo({
  title: note.title,
  description: note.description,
  path: route.path,
  type: 'article',
})
</script>
