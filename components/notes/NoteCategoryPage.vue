<template>
  <section class="notes-category-page">
    <header class="notes-category-page__header">
      <p class="notes-category-page__eyebrow">노트</p>
      <h1 class="notes-category-page__title">{{ title }}</h1>
      <p class="notes-category-page__lead">{{ lead }}</p>
      <p class="notes-category-page__meta">{{ notes.length }}개의 노트</p>
    </header>

    <div class="notes-category-page__divider" />

    <ul class="notes-category-page__items">
      <NoteListItem v-for="note in notes" :key="note.path" :note="note" />
    </ul>
  </section>
</template>

<script setup lang="ts">
import NoteListItem from './NoteListItem.vue'

const props = defineProps<{
  category: 'CSS' | 'JavaScript' | 'Vue'
  lead: string
  title: string
}>()

const { data: noteCollection } = await useAsyncData(`notes-${props.category.toLowerCase()}`, () => {
  return queryCollection('notes')
    .select('path', 'title', 'description', 'category', 'date')
    .order('date', 'DESC')
    .all()
})

const notes = computed(() => {
  const list = noteCollection.value ?? []
  return list.filter((note) => note.category === props.category)
})
</script>
