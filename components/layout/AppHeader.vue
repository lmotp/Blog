<template>
  <aside class="app-header">
    <div class="app-brand">
      <span class="app-brand-mark">
        <BaseIcon class="app-brand__icon" name="menu" />
        <span>블로그</span>
      </span>
      <span class="app-brand-subtitle">개발 기록과 메모를 차곡차곡 쌓는 공간</span>
    </div>

    <nav class="app-nav" aria-label="Primary">
      <NuxtLink to="/" class="app-nav-link">홈</NuxtLink>
      <details class="app-nav-accordion" :open="isPostsOpen">
        <summary class="app-nav-link app-nav-summary">글 모음</summary>
        <div class="app-nav-subnav" aria-label="글 분류">
          <NuxtLink to="/posts/reading" class="app-nav-sublink">읽고 있는 글</NuxtLink>
          <NuxtLink to="/posts/to-read" class="app-nav-sublink">읽을 글</NuxtLink>
          <NuxtLink to="/posts/archive" class="app-nav-sublink">아카이브</NuxtLink>
        </div>
      </details>
      <details class="app-nav-accordion" :open="isNotesOpen">
        <summary class="app-nav-link app-nav-summary">메모</summary>
        <div class="app-nav-subnav" aria-label="노트 분류">
          <NuxtLink to="/notes/css" class="app-nav-sublink">CSS 메모</NuxtLink>
          <NuxtLink to="/notes/javascript" class="app-nav-sublink">JavaScript 메모</NuxtLink>
          <NuxtLink to="/notes/vue" class="app-nav-sublink">Vue 메모</NuxtLink>
        </div>
      </details>
      <NuxtLink to="/debt" class="app-nav-link">보관함</NuxtLink>
    </nav>

    <div class="app-sidebar-note">
      <p class="app-sidebar-note__title">현재 구성</p>
      <p class="app-sidebar-note__text">Markdown 글, 메모, 보관함을 함께 운영하는 Nuxt 3 블로그입니다.</p>
    </div>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()

const isPostsOpen = computed(() => route.path.startsWith('/posts'))
const isNotesOpen = computed(() => route.path.startsWith('/notes'))
</script>
