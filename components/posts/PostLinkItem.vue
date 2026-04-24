<template>
  <li class="post-link-item">
    <div class="post-link-item__head">
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

const props = defineProps<{
  href: string
  meta?: string
  title: string
}>()

const isExternal = computed(() => isExternalHref(props.href))
</script>
