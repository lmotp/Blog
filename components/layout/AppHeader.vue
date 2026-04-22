<template>
  <aside class="app-header">
    <div class="app-brand">
      <span class="app-brand-mark">
        <BaseIcon class="app-brand__icon" name="menu" />
        <span>Blog IA</span>
      </span>
      <span class="app-brand-subtitle">개발자 개인 블로그 구조</span>
    </div>

    <nav class="app-nav" aria-label="Primary">
      <NuxtLink to="/" class="app-nav-link">홈</NuxtLink>
      <details class="app-nav-accordion" :open="isPostsOpen">
        <summary class="app-nav-link app-nav-summary">글</summary>
        <div class="app-nav-subnav" aria-label="글 분류">
          <NuxtLink to="/posts" class="app-nav-sublink">전체 보기</NuxtLink>
          <NuxtLink to="/posts/reading" class="app-nav-sublink">읽는 중</NuxtLink>
          <NuxtLink to="/posts/to-read" class="app-nav-sublink">읽을 예정</NuxtLink>
          <NuxtLink to="/posts/archive" class="app-nav-sublink">보관함</NuxtLink>
        </div>
      </details>
      <details class="app-nav-accordion" :open="isNotesOpen">
        <summary class="app-nav-link app-nav-summary">노트</summary>
        <div class="app-nav-subnav" aria-label="노트 분류">
          <NuxtLink to="/notes" class="app-nav-sublink">전체 보기</NuxtLink>
          <NuxtLink to="/notes/css" class="app-nav-sublink">CSS</NuxtLink>
          <NuxtLink to="/notes/javascript" class="app-nav-sublink">JavaScript</NuxtLink>
          <NuxtLink to="/notes/vue" class="app-nav-sublink">Vue</NuxtLink>
        </div>
      </details>
      <NuxtLink to="/debt" class="app-nav-link">읽기 큐</NuxtLink>
    </nav>

    <div class="app-sidebar-note">
      <p class="app-sidebar-note__title">현재 구성</p>
      <p class="app-sidebar-note__text">Markdown 글, 메모, 읽기 큐를 함께 운영하는 Nuxt 3 블로그입니다.</p>
    </div>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()

const isPostsOpen = computed(() => route.path.startsWith('/posts'))
const isNotesOpen = computed(() => route.path.startsWith('/notes'))
</script>
