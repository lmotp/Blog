<template>
  <header class="app-header">
    <div class="app-brand">
      <span class="app-brand-mark">
        <BaseIcon class="app-brand__icon" name="search" />
        <span>Blog IA</span>
      </span>
      <span class="app-brand-subtitle">개발자 개인 블로그 구조</span>
    </div>

    <nav class="app-nav" aria-label="Primary">
      <NuxtLink to="/" class="app-nav-link">홈</NuxtLink>
      <NuxtLink to="/documents" class="app-nav-link">문서</NuxtLink>
      <NuxtLink to="/notes" class="app-nav-link">노트</NuxtLink>
      <NuxtLink to="/search" class="app-nav-link">검색</NuxtLink>
    </nav>
  </header>
</template>
