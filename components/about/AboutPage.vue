<template>
  <section class="about-page">
    <header class="about-page__hero" aria-labelledby="about-page-title">
      <p class="about-page__eyebrow">소개</p>
      <h1 id="about-page-title" class="about-page__title">박철순</h1>
      <div class="about-page__contact">
        <a class="about-page__contact-link" href="mailto:unoeye22@gmail.com">unoeye22@gmail.com</a>
        <a class="about-page__contact-link" href="tel:01054086369">010 5408 6369</a>
      </div>
      <p class="about-page__lead">개발자 | Vue3 / Nuxt3 | Design System</p>
      <p class="about-page__summary">
        문제를 구조적으로 정리하고, 공통 컴포넌트와 디자인 시스템을 기반으로 협업 비용을 줄이는 데 관심이 있습니다.
      </p>

      <div class="about-page__actions">
        <BaseButton to="/posts/reading">읽을 내용 보기</BaseButton>
        <BaseButton to="/notes" secondary>메모 보기</BaseButton>
      </div>
    </header>

    <section class="about-page__section" aria-labelledby="about-page-summary-title">
      <div class="about-page__section-head">
        <p class="about-page__section-eyebrow">소개</p>
        <h2 id="about-page-summary-title" class="about-page__section-title">한 줄 소개</h2>
      </div>

      <ul class="about-page__list">
        <li class="about-page__item">문제를 발견하고 구조적으로 해결하는 프론트엔드 개발자입니다.</li>
        <li class="about-page__item">공통 컴포넌트와 문서화를 통해 협업 가능한 구조를 만드는 데 관심이 있습니다.</li>
        <li class="about-page__item">블로그에는 읽을 내용, 메모, 작업일지를 남깁니다.</li>
      </ul>
    </section>

    <section class="about-page__section" aria-labelledby="about-page-skills-title">
      <div class="about-page__section-head">
        <p class="about-page__section-eyebrow">기술</p>
        <h2 id="about-page-skills-title" class="about-page__section-title">주요 기술</h2>
      </div>

      <ul class="about-page__chips">
        <li v-for="skill in skills" :key="skill" class="about-page__chip">
          {{ skill }}
        </li>
      </ul>
    </section>

    <section class="about-page__section" aria-labelledby="about-page-experiences-title">
      <div class="about-page__section-head">
        <p class="about-page__section-eyebrow">경력</p>
        <h2 id="about-page-experiences-title" class="about-page__section-title">경력</h2>
      </div>

      <div class="about-page__experience-list">
        <article v-for="experience in experiences" :key="experience.title" class="about-page__experience-item">
          <div class="about-page__experience-header">
            <div>
              <p class="about-page__experience-company">{{ experience.company }}</p>
              <h3 class="about-page__experience-title">{{ experience.title }}</h3>
            </div>
            <p class="about-page__experience-period">{{ experience.period }}</p>
          </div>

          <ul class="about-page__experience-points">
            <li v-for="point in experience.items" :key="point" class="about-page__experience-point">
              {{ point }}
            </li>
          </ul>
        </article>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '~/components/base/BaseButton.vue'

interface Experience {
  company: string
  items: readonly string[]
  period: string
  title: string
}

const skills: readonly string[] = ['HTML', 'CSS', 'SCSS', 'JavaScript', 'Vue', 'Nuxt']

const experiences: readonly Experience[] = [
  {
    company: '㈜리즌디자인',
    title: 'Vue3, Nuxt3 기반 디자인 시스템 및 홈페이지 고도화',
    period: '2023.07 ~ 2025.06',
    items: [
      '공통 컴포넌트 구조를 재설계하고 디자인 시스템(MDS)을 구축했습니다.',
      'Nuxt2 → Nuxt3 마이그레이션과 Composition API 리팩토링을 진행했습니다.',
      'Lighthouse 성능을 60 → 90으로 개선하고 Storybook 문서를 통해 협업 효율을 높였습니다.',
    ],
  },
  {
    company: '㈜뉴이스트아트',
    title: '서비스 리뉴얼과 관리자 시스템 구축',
    period: '2022.04 ~ 2023.04',
    items: [
      '모달 중심 구조를 페이지 기반으로 재설계해 사용자 흐름을 단순화했습니다.',
      '자사 홈페이지와 Admin 시스템 프론트엔드를 단독으로 수행했습니다.',
      '반응형 UI와 QA를 통해 다양한 환경에서 일관된 경험을 제공했습니다.',
    ],
  },
]
</script>
