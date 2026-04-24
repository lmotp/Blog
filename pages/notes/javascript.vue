<template>
  <NoteCategoryPage
    category="JavaScript"
    lead="상태, 참조, 복사처럼 JavaScript의 핵심 포인트를 모아둔 노트입니다."
    title="JavaScript 노트"
  />
</template>

<script setup lang="ts">
import NoteCategoryPage from '~/components/notes/NoteCategoryPage.vue'
import { useBlogSeo } from '~/composables/useBlogSeo'

useBlogSeo({
  title: 'JavaScript 노트',
  description: '상태, 참조, 복사, 비동기 흐름을 정리한 JavaScript 메모입니다.',
})
</script>
