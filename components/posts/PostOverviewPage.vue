<template>
  <section class="posts-overview">
    <header class="posts-overview__header">
      <p class="posts-overview__eyebrow">글</p>
      <h1 class="posts-overview__title">읽기 상태별 글 모음</h1>
      <p class="posts-overview__lead">
        Markdown으로 작성한 글을 읽는 중, 읽을 예정, 보관함으로 나눠서 봅니다.
      </p>
    </header>

    <div class="posts-overview__divider" />

    <ul class="posts-overview__items">
      <li v-for="item in items" :key="item.to" class="posts-overview__item">
        <div class="posts-overview__item-head">
          <span class="posts-overview__item-pill">{{ item.label }}</span>
          <NuxtLink :to="item.to" class="posts-overview__item-link">
            {{ item.title }}
          </NuxtLink>
        </div>

        <p class="posts-overview__item-lead">{{ item.description }}</p>
        <p class="posts-overview__item-meta">{{ item.meta }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'

const { data: posts } = await useAsyncData('posts-overview', () => {
  return queryCollection('posts')
    .select('path', 'title', 'description', 'category', 'readingStatus', 'date')
    .order('date', 'DESC')
    .all<BlogPost>()
})

const items = computed(() => {
  const list = posts.value ?? []

  const reading = list.filter((post) => post.readingStatus === 'reading')
  const toRead = list.filter((post) => post.readingStatus === 'to-read')
  const archive = list.filter((post) => post.readingStatus === 'archive')

  return [
    {
      description: '지금 읽고 있는 글들을 카테고리별로 모아 봅니다.',
      label: '읽는 중',
      meta: `${reading.length}개의 글`,
      title: '현재 진행 중인 글',
      to: '/posts/reading',
    },
    {
      description: '지금은 아니지만 곧 읽을 글들을 모아 둡니다.',
      label: '읽을 예정',
      meta: `${toRead.length}개의 글`,
      title: '다음에 읽을 글',
      to: '/posts/to-read',
    },
    {
      description: '이미 읽었거나 보관해 둔 글들을 다시 찾습니다.',
      label: '보관함',
      meta: `${archive.length}개의 글`,
      title: '보관 중인 글',
      to: '/posts/archive',
    },
  ]
})
</script>
