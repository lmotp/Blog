<template>
  <header class="home-hero">
    <p class="home-hero__eyebrow">{{ eyebrow }}</p>
    <h1 class="home-hero__title">{{ title }}</h1>
    <p class="home-hero__lead">{{ lead }}</p>

    <div class="home-hero__actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string
  lead: string
  title: string
}>()
</script>
