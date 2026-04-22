<template>
  <section class="home-page">
    <header class="home-page__hero">
      <p class="home-page__eyebrow">관찰을 바탕으로 문제를 해결하는 개발자</p>
      <h1 class="home-page__title">박철순</h1>

      <a class="home-page__contact-link" href="mailto:unoeye22@gmail.com">unoeye22@gmail.com</a>
      <a class="home-page__contact-link" href="tel:01054086369">010 5408 6369</a>

      <p class="home-page__lead">프론트엔드 개발자 | Vue3 / Nuxt3 | Design System</p>

      <p class="home-page__summary">
        문제를 발견하고 구조적으로 해결하는 프론트엔드 개발자입니다. 디자인 시스템과 공통 컴포넌트를 정리하고, 코드
        구조를 단순하게 만드는 작업에 집중해 왔습니다.
      </p>
    </header>

    <section class="home-page__section">
      <div class="home-page__section-head">
        <p class="home-page__section-eyebrow">Skills</p>
        <h2 class="home-page__section-title">주요 기술</h2>
      </div>

      <ul class="home-page__skills">
        <li v-for="skill in skills" :key="skill" class="home-page__skill-item">
          {{ skill }}
        </li>
      </ul>
    </section>

    <section class="home-page__section">
      <div class="home-page__section-head">
        <p class="home-page__section-eyebrow">Experiences</p>
        <h2 class="home-page__section-title">경력과 프로젝트</h2>
      </div>

      <div class="home-page__experience-list">
        <article v-for="experience in experiences" :key="experience.title" class="home-page__experience-item">
          <div class="home-page__experience-header">
            <div>
              <p class="home-page__experience-company">{{ experience.company }}</p>
              <h3 class="home-page__experience-title">{{ experience.title }}</h3>
            </div>
            <p class="home-page__experience-period">{{ experience.period }}</p>
          </div>
          <ul class="home-page__experience-items">
            <li v-for="item in experience.items" :key="item" class="home-page__experience-item">
              {{ item }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="home-page__section">
      <div class="home-page__section-head">
        <p class="home-page__section-eyebrow">Blog</p>
        <h2 class="home-page__section-title">최근 글</h2>
      </div>

      <ul class="home-page__post-list">
        <li v-for="post in recentPosts" :key="post.path" class="home-page__post-item">
          <div class="home-page__post-item-head">
            <p class="home-page__post-category">{{ post.category }}</p>
            <NuxtLink :to="post.path" class="home-page__post-link">{{ post.title }}</NuxtLink>
          </div>
          <p class="home-page__post-meta">{{ post.date }}</p>
          <p class="home-page__post-description">{{ post.description }}</p>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from "~/types/blog";

const skills = ["HTML", "CSS", "SCSS", "JavaScript", "Vue", "Nuxt"];

const experiences = [
  {
    company: "㈜리즌디자인",
    title: "Vue3, Nuxt3 기반 디자인 시스템 및 홈페이지 고도화",
    period: "2023.07 ~ 2025.06",
    items: [
      "공통 컴포넌트 구조를 재설계하고 디자인 시스템(MDS)을 구축했습니다.",
      "Nuxt2 → Nuxt3 마이그레이션과 Composition API 리팩토링을 진행했습니다.",
      "Lighthouse 성능을 60 → 90으로 개선하고 Storybook 문서를 통해 협업 효율을 높였습니다.",
    ],
  },
  {
    company: "㈜뉴이스트아트",
    title: "서비스 리뉴얼과 관리자 시스템 구축",
    period: "2022.04 ~ 2023.04",
    items: [
      "모달 중심 구조를 페이지 기반으로 재설계해 사용자 흐름을 단순화했습니다.",
      "자사 홈페이지와 Admin 시스템 프론트엔드를 단독으로 수행했습니다.",
      "반응형 UI와 QA를 통해 다양한 환경에서 일관된 경험을 제공했습니다.",
    ],
  },
];

const { data: posts } = await useAsyncData("home-posts", () => {
  return queryCollection("posts")
    .select("path", "title", "description", "category", "date")
    .order("date", "DESC")
    .limit(3)
    .all<BlogPost>();
});

const recentPosts = computed(() => posts.value ?? []);
</script>
