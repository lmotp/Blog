<template>
  <HomePage />
</template>

<script setup lang="ts">
import HomePage from '~/components/home/HomePage.vue'
import { useBlogSeo } from '~/composables/useBlogSeo'

useBlogSeo({
  title: '홈',
  description: '읽고, 정리하고, 실험한 내용을 모으는 개발 블로그입니다.',
})
</script>
