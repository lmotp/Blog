<template>
  <section class="documents-page">
    <header class="documents-page__header">
      <p class="documents-page__eyebrow">문서</p>
      <h1 class="documents-page__title">읽기 큐와 상태를 관리하는 영역</h1>
      <p class="documents-page__lead">
        읽을 문서, 읽는 중, 읽은 문서를 분리해 문서 수집과 진행 상태를 함께
        관리합니다.
      </p>
    </header>

    <div class="documents-page__grid">
      <BaseCard v-for="item in items" :key="item.title" :title="item.title">
        <p class="documents-page__card-text">{{ item.description }}</p>
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
    to: '/documents/to-read',
    title: '읽을 문서',
    description: '나중에 읽을 문서를 모아두는 큐',
  },
  {
    to: '/documents/reading',
    title: '읽는 중',
    description: '현재 읽고 있는 문서와 진행 상태',
  },
  {
    to: '/documents/read',
    title: '읽은 문서',
    description: '완료된 문서 아카이브',
  },
]
</script>
