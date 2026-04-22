<template>
  <section class="notes-page">
    <header class="notes-page__header">
      <p class="notes-page__eyebrow">노트</p>
      <h1 class="notes-page__title">읽은 내용을 정리하고 발행하는 영역</h1>
      <p class="notes-page__lead">
        문서에서 파생된 실제 글과 실험 기록을 모아두는 공간입니다.
      </p>
    </header>

    <div class="notes-page__grid">
      <BaseCard v-for="item in items" :key="item.title" :title="item.title">
        <p class="notes-page__card-text">{{ item.description }}</p>
        <template #footer>
          <BaseButton :to="item.to" secondary>열기</BaseButton>
        </template>
      </BaseCard>
    </div>
  </section>
</template>

<script setup lang="ts">
const items = [
  {
    to: '/notes/concept',
    title: '개념 정리',
    description: '개념을 내 언어로 다시 설명한 글',
  },
  {
    to: '/notes/translation',
    title: '번역',
    description: '원문 번역과 용어 정리를 모은 글',
  },
  {
    to: '/notes/experiment',
    title: '실험 기록',
    description: '코드와 환경에서 검증한 결과',
  },
]
</script>
