<template>
  <NoteCategoryPage
    category="CSS"
    lead="레이아웃과 스타일링에서 자주 확인하는 내용을 모아둔 노트입니다."
    title="CSS 노트"
  />
</template>

<script setup lang="ts">
import NoteCategoryPage from '~/components/notes/NoteCategoryPage.vue'
import { useBlogSeo } from '~/composables/useBlogSeo'

useBlogSeo({
  title: 'CSS 노트',
  description: '레이아웃, 반응형, 스타일링 패턴을 정리한 CSS 메모입니다.',
})
</script>
