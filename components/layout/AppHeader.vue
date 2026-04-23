<template>
  <aside class="app-header">
    <div class="app-brand">
      <NuxtLink to="/" class="app-brand-mark">HOME</NuxtLink>
      <span class="app-brand-subtitle">문서와 노트를 읽고 정리하는 블로그</span>
    </div>

    <nav class="app-nav" aria-label="Primary">
      <NuxtLink to="/posts/reading" class="app-nav-link">읽는 중</NuxtLink>
      <NuxtLink to="/posts/to-read" class="app-nav-link">읽을 글</NuxtLink>
      <details class="app-nav-accordion" :open="isNotesOpen">
        <summary class="app-nav-link app-nav-summary">노트</summary>
        <div class="app-nav-subnav" aria-label="노트 분류">
          <NuxtLink to="/notes/css" class="app-nav-sublink">CSS 노트</NuxtLink>
          <NuxtLink to="/notes/javascript" class="app-nav-sublink">JavaScript 노트</NuxtLink>
          <NuxtLink to="/notes/vue" class="app-nav-sublink">Vue 노트</NuxtLink>
        </div>
      </details>
      <NuxtLink to="/posts/archive" class="app-nav-link">아카이브</NuxtLink>
    </nav>

    <div class="app-sidebar-note">
      <NuxtLink to="/about" class="app-sidebar-note__title">About me</NuxtLink>
    </div>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute();

const isNotesOpen = computed(() => route.path.startsWith("/notes"));
</script>
