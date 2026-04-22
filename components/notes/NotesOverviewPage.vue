<template>
  <section class="notes-overview">
    <header class="notes-overview__header">
      <p class="notes-overview__eyebrow">메모장</p>
      <h1 class="notes-overview__title">주제별 노트 모음</h1>
      <p class="notes-overview__lead">
        CSS, JavaScript, Vue 노트를 각각 따로 모아두고 Markdown 파일로 관리합니다.
      </p>
    </header>

    <div class="notes-overview__divider" />

    <ul class="notes-overview__items">
      <li v-for="item in items" :key="item.to" class="notes-overview__item">
        <div class="notes-overview__item-head">
          <span class="notes-overview__item-pill">{{ item.label }}</span>
          <NuxtLink :to="item.to" class="notes-overview__item-link">
            {{ item.title }}
          </NuxtLink>
        </div>

        <p class="notes-overview__item-lead">{{ item.description }}</p>
        <p class="notes-overview__item-meta">{{ item.meta }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { Note } from '~/types/note'

const { data: notes } = await useAsyncData('notes-overview', () => {
  return queryCollection('notes')
    .select('path', 'title', 'description', 'category', 'date')
    .order('date', 'DESC')
    .all<Note>()
})

const items = computed(() => {
  const list = notes.value ?? []

  const css = list.filter((note) => note.category === 'CSS')
  const javascript = list.filter((note) => note.category === 'JavaScript')
  const vue = list.filter((note) => note.category === 'Vue')

  return [
    {
      description: '레이아웃, 정렬, 간격처럼 CSS에서 자주 보는 포인트를 모읍니다.',
      label: 'CSS',
      meta: `${css.length}개의 메모`,
      title: 'CSS 노트',
      to: '/notes/css',
    },
    {
      description: '상태, 참조, 복사처럼 JavaScript에서 자주 헷갈리는 내용을 모읍니다.',
      label: 'JavaScript',
      meta: `${javascript.length}개의 메모`,
      title: 'JavaScript 노트',
      to: '/notes/javascript',
    },
    {
      description: 'props, emit, slot처럼 Vue 컴포넌트 중심 메모를 모읍니다.',
      label: 'Vue',
      meta: `${vue.length}개의 메모`,
      title: 'Vue 노트',
      to: '/notes/vue',
    },
  ]
})
</script>
