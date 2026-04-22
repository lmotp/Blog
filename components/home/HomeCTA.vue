<template>
  <section class="home-cta">
    <BaseCard class="home-cta__card" elevated>
      <template #header>
        <p class="home-cta__eyebrow">다음 단계</p>
        <h2 class="home-cta__title">{{ title }}</h2>
      </template>

      <p class="home-cta__lead">{{ lead }}</p>

      <template #footer>
        <div class="home-cta__actions">
          <slot />
        </div>
      </template>
    </BaseCard>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  lead: string
  title: string
}>()
</script>
