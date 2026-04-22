<template>
  <li class="notes-category-page__item">
    <div class="notes-category-page__item-head">
      <span class="notes-category-page__item-pill">{{ note.category }}</span>
      <NuxtLink :to="note.path" class="notes-category-page__item-link">
        {{ note.title }}
      </NuxtLink>
    </div>

    <p v-if="note.description" class="notes-category-page__item-lead">
      {{ note.description }}
    </p>

    <p class="notes-category-page__item-meta">{{ note.date }}</p>
  </li>
</template>

<script setup lang="ts">
import type { Note } from '~/types/note'

defineProps<{
  note: Note
}>()
</script>
