<template>
  <NoteContentPage :content-path="contentPath" />
</template>

<script setup lang="ts">
import NoteContentPage from '~/components/notes/NoteContentPage.vue'
import { resolveRouteSlug } from '~/utils/route'

const route = useRoute()
const slug = resolveRouteSlug(route.params.slug)

if (!slug) {
  throw createError({
    statusCode: 404,
    statusMessage: '메모를 찾을 수 없습니다.',
  })
}

const contentPath = `/notes/${slug}`
</script>
