<template>
  <PostQueuePage />
</template>

<script setup lang="ts">
import PostQueuePage from '~/components/posts/PostQueuePage.vue'
import { useBlogSeo } from '~/composables/useBlogSeo'

useBlogSeo({
  title: '읽기 목록',
  description: '카테고리별로 묶은 읽는 중인 글과 읽을 글의 아카이빙 페이지입니다.',
})
</script>
