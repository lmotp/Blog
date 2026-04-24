<template>
  <li class="post-link-item">
    <div class="post-link-item__head">
      <span v-if="status" :class="['post-link-item__badge', badgeClass]">
        {{ status }}
      </span>

      <NuxtLink v-if="!isExternal" :to="href" class="post-link-item__link">
        {{ title }}
      </NuxtLink>
      <a
        v-else
        class="post-link-item__link"
        :href="href"
        :rel="'noreferrer noopener'"
        target="_blank"
      >
        {{ title }}
      </a>
    </div>

    <p v-if="meta" class="post-link-item__meta">{{ meta }}</p>
  </li>
</template>

<script setup lang="ts">
import { isExternalHref } from '~/utils/archive'
import type { PostQueueStatus } from '~/data/post-queue'

const props = defineProps<{
  href: string
  meta?: string
  status?: PostQueueStatus
  title: string
}>()

const isExternal = computed(() => isExternalHref(props.href))

const badgeClass = computed(() => {
  if (props.status === '읽는 중') {
    return 'post-link-item__badge--reading'
  }

  if (props.status === '읽을 글') {
    return 'post-link-item__badge--to-read'
  }

  return ''
})
</script>
