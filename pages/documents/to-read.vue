<template>
  <DocumentsTopicPage
    card-title="운영 방식"
    eyebrow="문서 · 읽을 문서"
    :items="items"
    lead="아직 읽지 않았거나, 우선순위를 잡아두는 문서 목록입니다."
    title="읽기 대기 목록"
  />
</template>

<script setup lang="ts">
import DocumentsTopicPage from '~/components/documents/DocumentsTopicPage.vue'

const items = [
  '공식문서, RFC, 블로그, 책, 강의, 영상을 큐에 넣는 영역',
  '우선순위와 시작일을 기준으로 정렬',
  '읽기 시작 전 핵심 메모를 미리 적는 구조',
]
</script>
