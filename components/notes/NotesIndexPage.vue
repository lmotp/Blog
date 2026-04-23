<template>
  <section class="notes-index-page">
    <header class="notes-index-page__header">
      <p class="notes-index-page__eyebrow">노트</p>
      <h1 class="notes-index-page__title">카테고리별 노트</h1>
      <p class="notes-index-page__lead">
        노트는 한 페이지에 합치지 않고 CSS, JavaScript, Vue로 나누어 정리합니다.
      </p>
    </header>

    <div class="notes-index-page__divider" />

    <section class="notes-index-page__grid" aria-label="노트 카테고리">
      <NuxtLink
        v-for="category in categories"
        :key="category.path"
        :to="category.path"
        class="notes-index-page__card"
      >
        <p class="notes-index-page__card-eyebrow">{{ category.label }}</p>
        <h2 class="notes-index-page__card-title">{{ category.title }}</h2>
        <p class="notes-index-page__card-lead">{{ category.description }}</p>
        <p class="notes-index-page__card-meta">{{ category.count }}개의 노트</p>
      </NuxtLink>
    </section>
  </section>
</template>

<script setup lang="ts">
import type { Note } from '~/types/note'

const { data: noteCollection } = await useAsyncData('notes-index-summary', () => {
  return queryCollection('notes')
    .select('path', 'title', 'description', 'category', 'date')
    .order('date', 'DESC')
    .all<Note>()
})

const notes = computed(() => noteCollection.value ?? [])

const categories = computed(() => {
  const categoryMap = new Map<string, Note[]>()

  notes.value.forEach((note) => {
    const key = note.category.trim()
    const items = categoryMap.get(key) ?? []
    items.push(note)
    categoryMap.set(key, items)
  })

  return [
    {
      label: 'CSS',
      title: 'CSS 노트',
      description: '레이아웃, 정렬, 반응형, 스타일링 기준을 정리합니다.',
      path: '/notes/css',
      count: categoryMap.get('CSS')?.length ?? 0,
    },
    {
      label: 'JavaScript',
      title: 'JavaScript 노트',
      description: '상태, 참조, 복사, 데이터 흐름처럼 동작 원리를 정리합니다.',
      path: '/notes/javascript',
      count: categoryMap.get('JavaScript')?.length ?? 0,
    },
    {
      label: 'Vue',
      title: 'Vue 노트',
      description: 'props, emit, slot, 컴포넌트 구조를 정리합니다.',
      path: '/notes/vue',
      count: categoryMap.get('Vue')?.length ?? 0,
    },
  ]
})
</script>
