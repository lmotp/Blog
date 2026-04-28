<template>
  <section class="posts-archive-page">
    <header class="posts-archive-page__header">
      <p class="posts-archive-page__eyebrow">읽을 내용</p>
      <h1 class="posts-archive-page__title">보관함</h1>
      <p class="posts-archive-page__lead">다시 참고할 읽을 내용을 카테고리별로 모아둔 링크 목록입니다.</p>
    </header>

    <div class="posts-archive-page__divider" />

    <section
      v-for="section in archiveSections"
      :id="sectionId(section.title, 'section')"
      :aria-labelledby="sectionId(section.title, 'title')"
      :key="section.title"
      class="posts-archive-page__section"
    >
      <h2 :id="sectionId(section.title, 'title')" class="posts-archive-page__section-title">
        {{ section.title }}
      </h2>

      <ul class="posts-archive-page__list">
        <li v-for="item in section.items" :key="item.href" class="posts-archive-page__item">
          <a
            class="posts-archive-page__link"
            :href="item.href"
            :aria-label="archiveLinkLabel(item.title ?? item.href, item.href)"
            :rel="isExternalHref(item.href) ? 'noreferrer noopener' : undefined"
            :target="isExternalHref(item.href) ? '_blank' : undefined"
          >
            {{ item.title ?? item.href }}
          </a>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
import { archiveSections } from "~/data/archive-sections";
import { isExternalHref } from "~/utils/archive";

function archiveLinkLabel(title: string, href: string): string | undefined {
  return isExternalHref(href) ? `${title} (새 창에서 열림)` : undefined
}

function sectionId(value: string, suffix: 'section' | 'title'): string {
  const base = value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9가-힣-]/g, "");

  return `${base}-${suffix}`
}
</script>
