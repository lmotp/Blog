<template>
  <HomePage />
</template>

<script setup lang="ts">
import HomePage from '~/components/home/HomePage.vue'
import { useBlogSeo } from '~/composables/useBlogSeo'

useBlogSeo({
  title: '홈',
  description: '읽을 내용, 메모, 작업일지를 모으는 개발 블로그입니다.',
})
</script>
