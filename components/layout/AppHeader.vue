<template>
  <aside class="app-header">
    <div class="app-header__brand">
      <NuxtLink to="/" class="app-header__brand-mark" :aria-current="isCurrentPath('/') ? 'page' : undefined">
        홈
      </NuxtLink>
      <span class="app-header__brand-subtitle">읽을 내용, 메모, 작업일지를 정리하는 블로그</span>
    </div>

    <nav class="app-header__nav" aria-label="주요 내비게이션">
      <details class="app-header__accordion" :open="isMemoExpanded" @toggle="syncMemoExpanded">
        <summary
          :id="memoSummaryId"
          class="app-header__link app-header__summary"
          :aria-controls="memoSubnavId"
          :aria-expanded="isMemoExpanded"
        >
          메모
        </summary>
        <div :id="memoSubnavId" class="app-header__subnav" :aria-labelledby="memoSummaryId">
          <NuxtLink
            to="/notes/css"
            class="app-header__sublink"
            :aria-current="isCurrentPath('/notes/css') ? 'page' : undefined"
          >
            CSS 메모
          </NuxtLink>
          <NuxtLink
            to="/notes/javascript"
            class="app-header__sublink"
            :aria-current="isCurrentPath('/notes/javascript') ? 'page' : undefined"
          >
            JavaScript 메모
          </NuxtLink>
          <NuxtLink
            to="/notes/react-component-patterns"
            class="app-header__sublink"
            :aria-current="isCurrentPath('/notes/react-component-patterns') ? 'page' : undefined"
          >
            React 메모
          </NuxtLink>
          <NuxtLink
            to="/notes/react-time-complexity"
            class="app-header__sublink"
            :aria-current="isCurrentPath('/notes/react-time-complexity') ? 'page' : undefined"
          >
            React 시간복잡도
          </NuxtLink>
          <NuxtLink
            to="/notes/v8-optimization"
            class="app-header__sublink"
            :aria-current="isCurrentPath('/notes/v8-optimization') ? 'page' : undefined"
          >
            V8 메모
          </NuxtLink>
          <NuxtLink
            to="/notes/vue"
            class="app-header__sublink"
            :aria-current="isCurrentPath('/notes/vue') ? 'page' : undefined"
          >
            Vue 메모
          </NuxtLink>
        </div>
      </details>
      <details class="app-header__accordion" :open="isWorklogExpanded" @toggle="syncWorklogExpanded">
        <summary
          :id="worklogSummaryId"
          class="app-header__link app-header__summary"
          :aria-controls="worklogSubnavId"
          :aria-expanded="isWorklogExpanded"
        >
          작업일지
        </summary>
        <div :id="worklogSubnavId" class="app-header__subnav" :aria-labelledby="worklogSummaryId">
          <div
            v-for="(section, sectionIndex) in worklogSections"
            :key="section.title"
            class="app-header__subnav-section"
          >
            <p class="app-header__subnav-title">
              {{ section.title }}
            </p>

            <NuxtLink
              v-for="item in section.items"
              :key="item.path"
              :to="item.path"
              class="app-header__sublink"
              :aria-current="isCurrentPath(item.path) ? 'page' : undefined"
            >
              {{ item.label }}
            </NuxtLink>

            <div
              v-if="sectionIndex < worklogSections.length - 1"
              class="app-header__subnav-divider"
              aria-hidden="true"
            />
          </div>
        </div>
      </details>
      <NuxtLink
        to="/posts/reading"
        class="app-header__link"
        :aria-current="isCurrentPath('/posts/reading') ? 'page' : undefined"
      >
        읽을 내용
      </NuxtLink>
      <NuxtLink
        to="/posts/archive"
        class="app-header__link"
        :aria-current="isCurrentPath('/posts/archive') ? 'page' : undefined"
      >
        보관함
      </NuxtLink>
    </nav>

    <div class="app-header__sidebar-note">
      <NuxtLink
        to="/about"
        class="app-header__sidebar-note-title"
        :aria-current="isCurrentPath('/about') ? 'page' : undefined"
      >
        소개
      </NuxtLink>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { worklogSections } from "~/data/worklog-sections";

const route = useRoute();

const memoSummaryId = "memo-summary";
const memoSubnavId = "memo-subnav";
const worklogSummaryId = "worklog-summary";
const worklogSubnavId = "worklog-subnav";
const worklogPaths = worklogSections.flatMap((section) => section.items.map((item) => item.path));

const isMemoExpanded = ref(false);
const isWorklogExpanded = ref(false);

watch(
  () => route.path,
  (path) => {
    isMemoExpanded.value = path.startsWith("/notes");
    isWorklogExpanded.value = path === "/posts" || worklogPaths.includes(path);
  },
  { immediate: true },
);

function isCurrentPath(path: string): boolean {
  return route.path === path;
}

function syncMemoExpanded(event: Event): void {
  const target = event.currentTarget;

  if (target instanceof HTMLDetailsElement) {
    isMemoExpanded.value = target.open;
  }
}

function syncWorklogExpanded(event: Event): void {
  const target = event.currentTarget;

  if (target instanceof HTMLDetailsElement) {
    isWorklogExpanded.value = target.open;
  }
}
</script>
