<template>
  <section class="posts-page">
    <header class="posts-page__header">
      <p class="posts-page__eyebrow">글</p>
      <h1 class="posts-page__title">Markdown으로 작성한 글 목록</h1>
      <p class="posts-page__lead">
        `content/posts`에 추가한 md 파일이 이 목록에 자동으로 반영됩니다.
      </p>
    </header>

    <div class="posts-page__grid">
      <PostCard v-for="post in visiblePosts" :key="post.path" :post="post" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'
import PostCard from '~/components/posts/PostCard.vue'

const { data: posts } = await useAsyncData('posts-page', () => {
  return queryCollection('posts')
    .select('path', 'title', 'description', 'category', 'date')
    .order('date', 'DESC')
    .all<BlogPost>()
})

const visiblePosts = computed(() => posts.value ?? [])
</script>
