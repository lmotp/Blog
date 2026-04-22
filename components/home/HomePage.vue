<template>
  <section class="home-page">
    <HomeHero
      eyebrow="홈"
      title="Blog"
      lead="Markdown 글을 중심으로 정리와 발행이 이어지는 개인 블로그입니다."
    >
      <template #actions>
        <BaseButton to="/posts">글 보기</BaseButton>
      </template>
    </HomeHero>

    <HomeFeatures :features="features" />
    <HomeStats :stats="stats" />
    <HomeTestimonials :quotes="quotes" />

    <HomeCTA
      lead="Markdown 파일 하나를 추가하면 글 목록과 상세 페이지가 함께 생깁니다."
      title="이제 글은 content/posts에 작성하면 됩니다."
    >
      <BaseButton to="/posts">글 목록 보기</BaseButton>
    </HomeCTA>

    <section class="home-page__posts">
      <header class="home-page__posts-header">
        <p class="home-page__posts-eyebrow">최근 글</p>
        <h2 class="home-page__posts-title">Markdown으로 작성한 실제 게시물</h2>
        <p class="home-page__posts-lead">
          `content/posts`에 넣은 md 파일이 여기와 글 목록 페이지에 그대로 반영됩니다.
        </p>
      </header>

      <div class="home-page__posts-grid">
        <PostCard v-for="post in recentPosts" :key="post.path" :post="post" />
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'
import HomeCTA from './HomeCTA.vue'
import HomeFeatures from './HomeFeatures.vue'
import HomeHero from './HomeHero.vue'
import HomeStats from './HomeStats.vue'
import HomeTestimonials from './HomeTestimonials.vue'
import PostCard from '~/components/posts/PostCard.vue'

  const features = [
  {
    title: '글',
    description: 'Markdown 파일을 content/posts에 넣으면 바로 글로 노출됩니다.',
  },
  {
    title: '레이아웃',
    description: '공통 헤더와 본문 구조를 Nuxt 레이아웃으로 유지합니다.',
  },
]

const stats = [
  { label: '중심 흐름', value: '작성 → 정리 → 발행' },
  { label: '운영 방식', value: 'md + Nuxt Content' },
]

const quotes = [
  {
    author: '운영 원칙',
    quote: '글은 Markdown으로 쓰고 화면은 Nuxt가 책임진다',
  },
  {
    author: '파생 구조',
    quote: '하나의 md 파일이 목록과 상세를 함께 만든다',
  },
]

const { data: posts } = await useAsyncData('home-posts', () => {
  return queryCollection('posts')
    .select('path', 'title', 'description', 'category', 'date')
    .order('date', 'DESC')
    .limit(3)
    .all<BlogPost>()
})

const recentPosts = computed(() => posts.value ?? [])
</script>
