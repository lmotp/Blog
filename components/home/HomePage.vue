<template>
  <section class="home-page">
    <HomeHero
      eyebrow="홈"
      title="Blog"
      lead="문서 수집, 읽기 상태 관리, 정리와 발행이 이어지는 개인 블로그 IA입니다."
    >
      <template #actions>
        <BaseButton to="/documents">문서 보기</BaseButton>
        <BaseButton to="/notes" secondary>노트 보기</BaseButton>
      </template>
    </HomeHero>

    <HomeFeatures :features="features" />
    <HomeStats :stats="stats" />
    <HomeTestimonials :quotes="quotes" />

    <HomeCTA
      lead="지금 구조를 기준으로 읽기와 발행의 흐름을 이어가세요."
      title="문서 큐를 정리하고 노트로 연결하기"
    >
      <BaseButton to="/documents">문서로 이동</BaseButton>
      <BaseButton to="/search" secondary>검색하기</BaseButton>
    </HomeCTA>
  </section>
</template>

<script setup lang="ts">
import HomeCTA from './HomeCTA.vue'
import HomeFeatures from './HomeFeatures.vue'
import HomeHero from './HomeHero.vue'
import HomeStats from './HomeStats.vue'
import HomeTestimonials from './HomeTestimonials.vue'

const features = [
  {
    title: '문서',
    description: '읽을 문서, 읽는 중, 읽은 문서를 분리해서 관리합니다.',
  },
  {
    title: '노트',
    description: '개념 정리, 번역, 실험 기록을 발행물로 묶습니다.',
  },
  {
    title: '검색',
    description: '문서와 노트를 함께 빠르게 찾습니다.',
  },
]

const stats = [
  { label: '중심 흐름', value: '수집 → 읽기 → 정리 → 실험' },
  { label: '제외 메뉴', value: '소개, 태그, 요약 노트, 프로젝트' },
]

const quotes = [
  {
    author: '운영 원칙',
    quote: '문서는 수집과 상태 관리 중심, 글은 정리와 발행 중심',
  },
  {
    author: '파생 구조',
    quote: '하나의 원문에서 여러 노트가 파생될 수 있어야 함',
  },
]
</script>
