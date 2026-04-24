<template>
  <PostStatusPage
    lead="지금 읽고 있는 글들을 모아둡니다."
    status="reading"
    title="읽는 중"
  />
</template>

<script setup lang="ts">
import PostStatusPage from '~/components/posts/PostStatusPage.vue'
import { useBlogSeo } from '~/composables/useBlogSeo'

useBlogSeo({
  title: '읽는 중',
  description: '현재 읽고 있는 글들을 모아둔 아카이빙 페이지입니다.',
})
</script>
