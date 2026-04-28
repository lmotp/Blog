<template>
  <PostIndexPage />
</template>

<script setup lang="ts">
import PostIndexPage from '~/components/posts/PostIndexPage.vue'
import { useBlogSeo } from '~/composables/useBlogSeo'

useBlogSeo({
  title: '작업일지',
  description: '프로젝트를 하면서 남긴 기록을 작업내용과 다른작업으로 나누어 모아둔 페이지입니다.',
})
</script>
