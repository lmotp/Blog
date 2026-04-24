<template>
  <PostArchivePage />
</template>

<script setup lang="ts">
import PostArchivePage from '~/components/posts/PostArchivePage.vue'
import { useBlogSeo } from '~/composables/useBlogSeo'

useBlogSeo({
  title: '아카이브',
  description: '기술글과 참고 링크를 카테고리별로 모아둔 아카이빙 페이지입니다.',
})
</script>
