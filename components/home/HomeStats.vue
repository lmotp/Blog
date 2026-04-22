<template>
  <section class="home-stats">
    <BaseCard v-for="stat in stats" :key="stat.label" class="home-stat-card">
      <p class="home-stat-card__label">{{ stat.label }}</p>
      <p class="home-stat-card__value">{{ stat.value }}</p>
    </BaseCard>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  stats: Array<{
    label: string
    value: string
  }>
}>()
</script>
