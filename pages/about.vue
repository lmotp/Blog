<template>
  <AboutPage />
</template>

<script setup lang="ts">
import AboutPage from '~/components/about/AboutPage.vue'
import { useBlogSeo } from '~/composables/useBlogSeo'

useBlogSeo({
  title: '소개',
  description: '박철순의 소개와 경력, 기술 스택을 정리한 페이지입니다.',
})
</script>
