<template>
  <section class="home-testimonials">
    <BaseCard
      v-for="quote in quotes"
      :key="quote.author"
      class="home-testimonial-card"
    >
      <blockquote class="home-testimonial-card__quote">
        {{ quote.quote }}
      </blockquote>
      <p class="home-testimonial-card__author">{{ quote.author }}</p>
    </BaseCard>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  quotes: Array<{
    author: string
    quote: string
  }>
}>()
</script>
