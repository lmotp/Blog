<template>
  <PostIndexPage />
</template>

<script setup lang="ts">
import PostIndexPage from '~/components/posts/PostIndexPage.vue'
import { useBlogSeo } from '~/composables/useBlogSeo'

useBlogSeo({
  title: '작업일지',
  description: 'Figma에서 DESIGN.md를 추출하고 연동 흐름까지 정리한 작업일지 페이지입니다.',
})
</script>
