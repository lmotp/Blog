<template>
  <section class="debt-page">
    <div class="debt-page__layout">
      <div class="debt-page__content">
        <header class="debt-page__hero">
          <div class="debt-page__title-row">
            <span class="debt-page__mark" aria-hidden="true">
              <span class="debt-page__brick debt-page__brick--top" />
              <span class="debt-page__brick debt-page__brick--bottom" />
            </span>
            <div class="debt-page__title-group">
              <p class="debt-page__eyebrow">읽기 큐</p>
              <h1 class="debt-page__title">부채</h1>
            </div>
          </div>

          <p class="debt-page__lead">
            글의 상태는 Markdown frontmatter로 관리하고, 화면은 기술글/글감/책처럼 카테고리 중심으로
            보여주는 읽기 큐입니다.
          </p>
        </header>

        <div class="debt-page__divider" />

        <section
          v-for="category in categories"
          :id="category.id"
          :key="category.id"
          class="debt-page__section"
        >
          <header class="debt-page__section-header">
            <h2 class="debt-page__section-title">{{ category.label }}</h2>
          </header>

          <ul class="debt-page__items">
            <li v-for="post in category.items" :key="post.path" class="debt-page__item">
              <div class="debt-page__item-head">
                <span :class="['debt-page__status', `debt-page__status--${post.readingStatus}`]">
                  {{ readingStatusLabelMap[post.readingStatus] }}
                </span>
                <NuxtLink :to="post.path" class="debt-page__item-link">
                  {{ post.title }}
                </NuxtLink>
              </div>

              <p v-if="post.description" class="debt-page__item-lead">
                {{ post.description }}
              </p>
            </li>
          </ul>
        </section>
      </div>

      <aside class="debt-page__toc" aria-label="On this page">
        <div class="debt-page__toc-sticky">
          <p class="debt-page__toc-title">On this page</p>
          <nav class="debt-page__toc-nav">
            <a
              v-for="category in categories"
              :key="category.id"
              :href="`#${category.id}`"
              class="debt-page__toc-link"
            >
              {{ category.label }}
            </a>
          </nav>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'

type QueueStatus = BlogPost['readingStatus']

type QueueCategory = {
  items: BlogPost[]
  id: string
  label: string
}

const statusOrder: QueueStatus[] = ['reading', 'to-read', 'archive']

const readingStatusLabelMap: Record<QueueStatus, string> = {
  reading: '읽는 중',
  'to-read': '읽을 예정',
  archive: '보관함',
}

const categoryOrder = ['기술글', '글감', '책']

const { data: posts } = await useAsyncData('debt-posts', () => {
  return queryCollection('posts')
    .select('path', 'title', 'description', 'category', 'readingStatus', 'readingCategory', 'date')
    .order('date', 'DESC')
    .all<BlogPost>()
})

const categories = computed<QueueCategory[]>(() => {
  const items = posts.value ?? []
  const categoryMap = new Map<string, BlogPost[]>()

  const sortedItems = [...items].sort((left, right) => {
    const statusDiff = statusOrder.indexOf(left.readingStatus) - statusOrder.indexOf(right.readingStatus)

    if (statusDiff !== 0) {
      return statusDiff
    }

    return new Date(right.date).getTime() - new Date(left.date).getTime()
  })

  sortedItems.forEach((post) => {
    const key = post.readingCategory.trim()
    const groupItems = categoryMap.get(key) ?? []
    groupItems.push(post)
    categoryMap.set(key, groupItems)
  })

  const orderedLabels = [
    ...categoryOrder.filter((label) => categoryMap.has(label)),
    ...Array.from(categoryMap.keys()).filter((label) => !categoryOrder.includes(label)).sort(),
  ]

  return orderedLabels.map((label) => ({
    id: toKebabCase(label),
    label,
    items: categoryMap.get(label) ?? [],
  }))
})

function toKebabCase(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9가-힣-]/g, '')
}
</script>
