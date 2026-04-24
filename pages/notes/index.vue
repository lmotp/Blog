<template>
  <NotesIndexPage />
</template>

<script setup lang="ts">
import NotesIndexPage from '~/components/notes/NotesIndexPage.vue'
import { useBlogSeo } from '~/composables/useBlogSeo'

useBlogSeo({
  title: '메모',
  description: 'CSS, JavaScript, Vue 같은 주제별 메모를 정리한 페이지입니다.',
})
</script>
