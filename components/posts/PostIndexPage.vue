<template>
  <section class="posts-page">
    <header class="posts-page__header">
      <p class="posts-page__eyebrow">작업일지</p>
      <h1 class="posts-page__title">작업일지</h1>
      <p class="posts-page__lead">
        프로젝트를 하면서 남긴 기록을 작업내용과 다른작업으로 나누고, 각각 01/02/03 순서로 모아둡니다.
      </p>
    </header>

    <div class="posts-page__divider" />

    <section
      v-for="group in sections"
      :key="group.title"
      :aria-labelledby="groupTitleId(group.title)"
      class="posts-page__group"
    >
      <h2 :id="groupTitleId(group.title)" class="posts-page__group-title">
        {{ group.title }}
      </h2>

      <div class="posts-page__group-outline">
        <ul class="posts-page__items">
          <li v-for="post in group.items" :key="post.path" class="posts-page__item">
            <NuxtLink :to="post.path" class="posts-page__outline-link">
              <span class="posts-page__outline-label">{{ post.label }}</span>
              <span class="posts-page__outline-separator" aria-hidden="true"> - </span>
              <span class="posts-page__outline-title">{{ post.title }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { worklogSections, type WorklogSectionItem } from '~/data/worklog-sections'

type WorklogPost = Readonly<{
  path: string
  title: string
}>

type WorklogItemView = Readonly<{
  label: string
  path: string
  title: string
}>

type WorklogGroupView = Readonly<{
  items: readonly WorklogItemView[]
  title: string
}>

const { data: postsData } = await useAsyncData<readonly WorklogPost[]>("worklog-index", () => {
  return queryCollection("posts")
    .select("path", "title")
    .all<WorklogPost>()
})

const postsByPath = computed<Map<string, WorklogPost>>(() => {
  const posts = postsData.value ?? []
  const postEntries = posts.map((post) => [post.path, post] as const)

  return new Map(postEntries)
})

const sections = computed<readonly WorklogGroupView[]>(() => {
  return worklogSections.map((section) => ({
    items: resolveSectionItems(section.items, postsByPath.value),
    title: section.title,
  }))
})

function resolveSectionItems(
  items: readonly WorklogSectionItem[],
  postsMap: Map<string, WorklogPost>,
): readonly WorklogItemView[] {
  const resolvedItems: WorklogItemView[] = []

  items.forEach((item) => {
    const post = postsMap.get(item.path)

    if (!post) {
      return
    }

    resolvedItems.push({
      label: item.label,
      path: post.path,
      title: post.title,
    })
  })

  return resolvedItems
}

function groupTitleId(title: string): string {
  return `${title.trim().toLowerCase().replace(/\s+/g, "-")}-title`
}
</script>
