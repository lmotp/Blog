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
      <NuxtLink to="/posts" class="app-nav-link">글</NuxtLink>
    </nav>

    <div class="app-sidebar-note">
      <p class="app-sidebar-note__title">현재 구성</p>
      <p class="app-sidebar-note__text">Markdown 글을 중심으로 정리한 Nuxt 3 블로그입니다.</p>
    </div>
  </aside>
</template>
