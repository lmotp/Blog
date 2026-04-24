<template>
  <li class="posts-page__item">
    <div class="posts-page__item-head">
      <NuxtLink :to="post.path" class="posts-page__item-link">
        {{ post.title }}
      </NuxtLink>
    </div>

    <p class="posts-page__item-meta">{{ post.category }} · {{ post.date }}</p>

    <p v-if="post.description" class="posts-page__item-lead">
      {{ post.description }}
    </p>
  </li>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'

defineProps<{
  post: BlogPost
}>()
</script>
