<template>
  <section class="home-page">
    <header class="home-page__hero">
      <p class="home-page__eyebrow">개발 문서와 노트를 정리하는 블로그</p>
      <h1 class="home-page__title">읽고, 정리하고, 실험한 내용을 모읍니다.</h1>

      <p class="home-page__summary">
        공식 문서와 아티클을 읽고, 개념을 내 언어로 정리하고, 실제 코드로 확인한 내용을 기록합니다.
      </p>

      <div class="home-page__actions">
        <BaseButton to="/posts/reading">읽기 목록 보기</BaseButton>
        <BaseButton to="/notes" secondary>노트 카테고리</BaseButton>
        <BaseButton to="/about" secondary>About me</BaseButton>
      </div>
    </header>

    <section class="home-page__section">
      <div class="home-page__section-head">
        <p class="home-page__section-eyebrow">읽기</p>
        <h2 class="home-page__section-title">읽기 목록</h2>
      </div>

      <ul class="home-page__post-list">
        <PostLinkItem
          v-for="item in readingQueuePreview"
          :key="item.href"
          :href="item.href"
          :meta="item.meta"
          :status="item.status"
          :title="item.title"
        />
      </ul>
    </section>

    <section class="home-page__section">
      <div class="home-page__section-head">
        <p class="home-page__section-eyebrow">글</p>
        <h2 class="home-page__section-title">최근 글</h2>
      </div>

      <ul class="home-page__post-list">
        <PostListItem v-for="post in recentPosts" :key="post.path" :post="post" />
      </ul>
    </section>

    <section class="home-page__section">
      <div class="home-page__section-head">
        <p class="home-page__section-eyebrow">노트</p>
        <h2 class="home-page__section-title">최근 노트</h2>
      </div>

      <ul class="home-page__post-list">
        <NoteListItem v-for="note in recentNotes" :key="note.path" :note="note" />
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '~/components/base/BaseButton.vue'
import NoteListItem from '~/components/notes/NoteListItem.vue'
import PostLinkItem from '~/components/posts/PostLinkItem.vue'
import PostListItem from '~/components/posts/PostListItem.vue'
import { postQueueCategories } from '~/data/post-queue'

const { data: posts } = await useAsyncData('home-posts', () => {
  return queryCollection('posts').select('path', 'title', 'description', 'category', 'date').order('date', 'DESC').all()
})

const { data: notes } = await useAsyncData('home-notes', () => {
  return queryCollection('notes')
    .select('path', 'title', 'description', 'category', 'date')
    .order('date', 'DESC')
    .limit(3)
    .all()
})

const readingQueuePreview = computed(() => {
  return postQueueCategories
    .flatMap((category) =>
      category.items.map((item) => ({
        href: item.href,
        meta: category.title,
        status: item.status,
        title: item.title,
      })),
    )
    .slice(0, 3)
})

const recentPosts = computed(() => {
  return (posts.value ?? []).slice(0, 3)
})

const recentNotes = computed(() => {
  return notes.value ?? []
})
</script>
