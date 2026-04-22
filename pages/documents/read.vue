<template>
  <DocumentsTopicPage
    card-title="보관 기준"
    eyebrow="문서 · 읽은 문서"
    :items="items"
    lead="읽기 완료된 원문을 보관하고, 이후 노트로 파생될 수 있게 연결합니다."
    title="완료된 문서 아카이브"
  />
</template>

<script setup lang="ts">
import DocumentsTopicPage from '~/components/documents/DocumentsTopicPage.vue'

const items = ['완료된 원문 목록', '연결된 노트로 이어질 수 있는 저장소', '다시 참고할 수 있는 읽기 히스토리']
</script>
