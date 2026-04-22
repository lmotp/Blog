<template>
  <section class="home-features">
    <BaseCard
      v-for="feature in features"
      :key="feature.title"
      class="home-feature-card"
      :title="feature.title"
    >
      <p class="home-feature-card__description">{{ feature.description }}</p>
    </BaseCard>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  features: Array<{
    description: string
    title: string
  }>
}>()
</script>
