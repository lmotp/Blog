<template>
  <section class="home-page">
    <header class="home-page__hero">
      <p class="home-page__eyebrow">개발 문서와 노트를 정리하는 블로그</p>
      <h1 class="home-page__title">읽을 글과 노트를 먼저 모읍니다.</h1>

      <p class="home-page__summary">
        글은 읽을 목록으로, 메모는 바로 찾을 수 있는 노트로 나눠서 관리합니다.
      </p>
    </header>

    <section class="home-page__section">
      <div class="home-page__section-head">
        <p class="home-page__section-eyebrow">읽을 글</p>
        <h2 class="home-page__section-title">카테고리별 읽을 글</h2>
      </div>

      <ul class="home-page__post-list">
        <PostLinkItem
          v-for="item in readingQueuePreview"
          :key="item.href"
          :href="item.href"
          :meta="item.meta"
          :title="item.title"
        />
      </ul>
    </section>

    <section class="home-page__section">
      <div class="home-page__section-head">
        <p class="home-page__section-eyebrow">Note</p>
        <h2 class="home-page__section-title">노트</h2>
      </div>

      <ul class="home-page__note-list">
        <li v-for="note in noteLinks" :key="note.path" class="home-page__note-item">
          <NuxtLink :to="note.path" class="home-page__note-link">
            {{ note.title }}
          </NuxtLink>
          <p class="home-page__note-lead">{{ note.description }}</p>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
import PostLinkItem from '~/components/posts/PostLinkItem.vue'
import { postQueueCategories } from '~/data/post-queue'

const readingQueuePreview = computed(() => {
  return postQueueCategories
    .flatMap((category) =>
      category.items.map((item) => ({
        href: item.href,
        meta: category.title,
        title: item.title,
      })),
    )
    .slice(0, 3)
})

const noteLinks = [
  {
    description: '레이아웃, 정렬, 반응형, 스타일링 기준을 정리합니다.',
    path: '/notes/css',
    title: 'CSS 노트',
  },
  {
    description: '상태, 참조, 복사, 데이터 흐름처럼 동작 원리를 정리합니다.',
    path: '/notes/javascript',
    title: 'JavaScript 노트',
  },
  {
    description: 'props, emit, slot, 컴포넌트 구조를 정리합니다.',
    path: '/notes/vue',
    title: 'Vue 노트',
  },
]
</script>
