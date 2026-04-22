<template>
  <section class="documents-page">
    <header class="documents-page__header">
      <p class="documents-page__eyebrow">{{ eyebrow }}</p>
      <h1 class="documents-page__title">{{ title }}</h1>
      <p class="documents-page__lead">{{ lead }}</p>
    </header>

    <BaseCard :title="cardTitle">
      <ul class="documents-page__list">
        <li v-for="item in items" :key="item">{{ item }}</li>
      </ul>
    </BaseCard>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  cardTitle: string
  eyebrow: string
  items: string[]
  lead: string
  title: string
}>()
</script>
