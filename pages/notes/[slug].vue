<template>
  <section v-if="note" class="note-page">
    <header class="note-page__header">
      <p class="note-page__eyebrow">{{ note.category }}</p>
      <h1 class="note-page__title">{{ note.title }}</h1>
      <p class="note-page__meta">{{ note.date }}</p>
      <p class="note-page__lead">{{ note.description }}</p>
    </header>

    <article class="note-page__article">
      <ContentRenderer :value="note" />
    </article>
  </section>
</template>

<script setup lang="ts">
import type { Note } from '~/types/note'

const route = useRoute()
const slug = computed(() => {
  const value = route.params.slug
  const raw = Array.isArray(value) ? value[0] : value
  return typeof raw === 'string' ? raw : ''
})

const note = await queryCollection('notes')
  .path(`/notes/${slug.value}`)
  .first<Note>()

if (!note) {
  throw createError({
    statusCode: 404,
    statusMessage: '메모를 찾을 수 없습니다.',
  })
}
</script>
