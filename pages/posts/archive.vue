<template>
  <PostArchivePage />
</template>

<script setup lang="ts">
import PostArchivePage from '~/components/posts/PostArchivePage.vue'
import { useBlogSeo } from '~/composables/useBlogSeo'

useBlogSeo({
  title: '보관함',
  description: '기술글과 참고 링크를 카테고리별로 모아둔 보관 페이지입니다.',
})
</script>
