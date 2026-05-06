<template>
  <section class="home-page">
    <header class="home-page__hero" aria-labelledby="home-page-title">
      <p class="home-page__eyebrow">읽을 내용, 메모, 작업일지를 모으는 블로그</p>
      <h1 id="home-page-title" class="home-page__title">먼저 읽을 내용과 쌓아둘 것을 나눕니다.</h1>

      <p class="home-page__summary">
        읽을 내용은 링크로, 정리는 메모로, 기록은 작업일지로 나눠서 관리합니다.
      </p>

      <div class="home-page__actions">
        <BaseButton to="/posts/reading">읽을 내용 보기</BaseButton>
        <BaseButton to="/posts" secondary on-dark>작업일지 보기</BaseButton>
      </div>
    </header>

    <section class="home-page__section" aria-labelledby="home-page-reading-title">
      <div class="home-page__section-head">
        <p class="home-page__section-eyebrow">읽을 내용</p>
        <h2 id="home-page-reading-title" class="home-page__section-title">카테고리별 읽을 내용</h2>
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

    <section class="home-page__section" aria-labelledby="home-page-memo-title">
      <div class="home-page__section-head">
        <p class="home-page__section-eyebrow">메모</p>
        <h2 id="home-page-memo-title" class="home-page__section-title">주제별 메모</h2>
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
import BaseButton from '~/components/base/BaseButton.vue'
import PostLinkItem from '~/components/posts/PostLinkItem.vue'
import { postQueueCategories } from '~/data/post-queue'

type ReadingQueuePreviewItem = {
  href: string
  meta: string
  title: string
}

type NoteLink = {
  description: string
  path: '/notes/css' | '/notes/javascript' | '/notes/react-component-patterns' | '/notes/react-time-complexity' | '/notes/vue'
  title: string
}

const readingQueuePreview = computed<readonly ReadingQueuePreviewItem[]>(() => {
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

const noteLinks: readonly NoteLink[] = [
  {
    description: '레이아웃, 정렬, 반응형, 스타일링 기준을 정리합니다.',
    path: '/notes/css',
    title: 'CSS 메모',
  },
  {
    description: '상태, 참조, 복사, 데이터 흐름처럼 동작 원리를 정리합니다.',
    path: '/notes/javascript',
    title: 'JavaScript 메모',
  },
  {
    description: 'Compound, headless, controlled, uncontrolled 패턴을 정리합니다.',
    path: '/notes/react-component-patterns',
    title: 'React 컴포넌트 패턴 메모',
  },
  {
    description: '렌더링 경로에서 시간복잡도를 보는 기준을 정리합니다.',
    path: '/notes/react-time-complexity',
    title: 'React에서 시간복잡도 이해하기',
  },
  {
    description: 'props, emit, slot, 컴포넌트 구조를 정리합니다.',
    path: '/notes/vue',
    title: 'Vue 메모',
  },
]
</script>
