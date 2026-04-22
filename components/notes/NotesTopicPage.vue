<template>
  <section class="notes-page">
    <header class="notes-page__header">
      <p class="notes-page__eyebrow">{{ eyebrow }}</p>
      <h1 class="notes-page__title">{{ title }}</h1>
      <p class="notes-page__lead">{{ lead }}</p>
    </header>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string
  lead: string
  title: string
}>()
</script>
