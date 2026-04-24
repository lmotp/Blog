<template>
  <PostStatusPage
    lead="곧 읽을 글들을 모아둡니다."
    status="to-read"
    title="읽을 글"
  />
</template>

<script setup lang="ts">
import PostStatusPage from '~/components/posts/PostStatusPage.vue'
import { useBlogSeo } from '~/composables/useBlogSeo'

useBlogSeo({
  title: '읽을 글',
  description: '곧 읽을 글들을 모아둔 아카이빙 페이지입니다.',
})
</script>
