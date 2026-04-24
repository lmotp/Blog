<template>
  <PostQueuePage />
</template>

<script setup lang="ts">
import PostQueuePage from '~/components/posts/PostQueuePage.vue'
import { useBlogSeo } from '~/composables/useBlogSeo'

useBlogSeo({
  title: '읽을 글',
  description: '카테고리별로 정리한 읽을 글 아카이빙 페이지입니다.',
})
</script>
