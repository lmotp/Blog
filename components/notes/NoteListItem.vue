<template>
  <li class="notes-category-page__item">
    <div class="notes-category-page__item-head">
      <NuxtLink :to="note.path" class="notes-category-page__item-link">
        {{ note.title }}
      </NuxtLink>
    </div>

    <p class="notes-category-page__item-meta">{{ note.category }} · {{ note.date }}</p>

    <p v-if="note.description" class="notes-category-page__item-lead">
      {{ note.description }}
    </p>
  </li>
</template>

<script setup lang="ts">
import type { Note } from '~/types/note'

defineProps<{
  note: Note
}>()
</script>
