<template>
  <section class="posts-page">
    <header class="posts-page__header">
      <p class="posts-page__eyebrow">글</p>
      <h1 class="posts-page__title">{{ title }}</h1>
      <p class="posts-page__lead">{{ lead }}</p>
      <p class="posts-page__section-meta">{{ filteredPosts.length }}개의 글</p>
    </header>

    <div class="posts-page__divider" />

    <ul class="posts-page__items">
      <PostListItem v-for="post in filteredPosts" :key="post.path" :post="post" />
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'
import PostListItem from '~/components/posts/PostListItem.vue'

const props = defineProps<{
  lead: string
  status: BlogPost['readingStatus']
  title: string
}>()

const { data: posts } = await useAsyncData(`posts-${props.status}`, () => {
  return queryCollection('posts')
    .select('path', 'title', 'description', 'category', 'readingStatus', 'readingCategory', 'date')
    .order('date', 'DESC')
    .all<BlogPost>()
})

const filteredPosts = computed(() => {
  return (posts.value ?? []).filter((post) => post.readingStatus === props.status)
})
</script>
