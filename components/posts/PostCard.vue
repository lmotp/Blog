<template>
  <BaseCard>
    <template #header>
      <div class="post-card__header">
        <p class="post-card__category">{{ post.category }}</p>
        <h3 class="post-card__title">{{ post.title }}</h3>
      </div>
    </template>

    <p class="post-card__date">{{ post.date }}</p>
    <p class="post-card__description">{{ post.description }}</p>

    <template #footer>
      <BaseButton :to="post.path" secondary>읽기</BaseButton>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'

defineProps<{
  post: BlogPost
}>()
</script>
