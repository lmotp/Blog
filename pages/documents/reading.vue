<template>
  <DocumentsTopicPage
    card-title="체크 포인트"
    eyebrow="문서 · 읽는 중"
    :items="items"
    lead="지금 읽고 있는 문서를 추적하고, 읽기 중 상태를 관리합니다."
    title="현재 읽고 있는 문서"
  />
</template>

<script setup lang="ts">
import DocumentsTopicPage from '~/components/documents/DocumentsTopicPage.vue'

const items = ['현재 읽는 원문', '읽는 도중 메모와 핵심 포인트', '다음에 연결될 노트 초안']
</script>
