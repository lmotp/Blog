<template>
  <section class="posts-queue-page">
    <header class="posts-queue-page__header">
      <p class="posts-queue-page__eyebrow">읽을 내용</p>
      <h1 class="posts-queue-page__title">읽을 내용</h1>
      <p class="posts-queue-page__lead">카테고리별로 정리한 읽을 내용 링크 목록입니다.</p>
    </header>

    <div class="posts-queue-page__divider" />

    <div class="posts-queue-page__categories">
      <section
        v-for="category in postQueueCategories"
        :id="sectionId(category.title, 'section')"
        :aria-labelledby="sectionId(category.title, 'title')"
        :key="category.title"
        class="posts-queue-page__category"
      >
        <h2 :id="sectionId(category.title, 'title')" class="posts-queue-page__category-title">
          {{ category.title }}
        </h2>

        <ul class="posts-queue-page__list">
          <PostLinkItem
            v-for="item in category.items"
            :key="item.href"
            :href="item.href"
            :title="item.title"
          />
        </ul>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import PostLinkItem from './PostLinkItem.vue'
import { postQueueCategories } from '~/data/post-queue'

function sectionId(value: string, suffix: 'section' | 'title'): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9가-힣-]/g, '')
    .concat(`-${suffix}`)
}
</script>
