<template>
  <section class="posts-page">
    <header class="posts-page__header">
      <p class="posts-page__eyebrow">글</p>
      <h1 class="posts-page__title">{{ title }}</h1>
      <p class="posts-page__lead">{{ lead }}</p>
    </header>

    <div class="posts-page__divider" />

    <section
      v-for="group in groups"
      :id="group.id"
      :key="group.id"
      class="posts-page__section"
    >
      <header class="posts-page__section-header">
        <div>
          <h2 class="posts-page__section-title">{{ group.label }}</h2>
          <p class="posts-page__section-meta">{{ group.items.length }}개의 글</p>
        </div>
      </header>

      <ul class="posts-page__items">
        <PostListItem v-for="post in group.items" :key="post.path" :post="post" />
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'
import PostListItem from '~/components/posts/PostListItem.vue'

const props = defineProps<{
  lead: string
  status: BlogPost['readingStatus']
  title: string
}>()

type PostGroup = {
  id: string
  items: BlogPost[]
  label: string
}

const categoryOrder = ['Components', 'Architecture', 'BFF', 'Writing']

const { data: posts } = await useAsyncData(`posts-${props.status}`, () => {
  return queryCollection('posts')
    .select('path', 'title', 'description', 'category', 'readingStatus', 'readingCategory', 'date')
    .order('date', 'DESC')
    .all<BlogPost>()
})

const groups = computed<PostGroup[]>(() => {
  const items = (posts.value ?? []).filter((post) => post.readingStatus === props.status)
  const categoryMap = new Map<string, BlogPost[]>()

  items.forEach((post) => {
    const key = post.category.trim()
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
    items: categoryMap.get(label) ?? [],
    label,
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
