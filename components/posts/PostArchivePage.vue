<template>
  <section class="posts-archive-page">
    <header class="posts-archive-page__header">
      <p class="posts-archive-page__eyebrow">보관함</p>
      <h1 class="posts-archive-page__title">아카이브</h1>
      <p class="posts-archive-page__lead">다시 참고할 페이지를 카테고리별로 모아둔 링크 목록입니다.</p>
    </header>

    <div class="posts-archive-page__divider" />

    <section
      v-for="section in resolvedSections"
      :id="toKebabCase(section.title)"
      :key="section.title"
      class="posts-archive-page__section"
    >
      <h2 class="posts-archive-page__section-title">{{ section.title }}</h2>

      <ul class="posts-archive-page__list">
        <li v-for="item in section.items" :key="item.href" class="posts-archive-page__item">
          <a
            class="posts-archive-page__link"
            :href="item.href"
            :rel="isExternalHref(item.href) ? 'noreferrer noopener' : undefined"
            :target="isExternalHref(item.href) ? '_blank' : undefined"
          >
            {{ item.title }}
          </a>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
import { isExternalHref } from "~/utils/archive";
import { useArchiveLinksQuery } from "~/composables/useArchiveLinksQuery";

const { data: resolvedSections } = useArchiveLinksQuery();

function toKebabCase(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9가-힣-]/g, "");
}
</script>
