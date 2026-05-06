<template>
  <span :class="badgeClass">
    <slot />
  </span>
</template>

<script setup lang="ts">
type BadgeTone = 'purple' | 'pink' | 'orange' | 'green' | 'lavender'

const props = withDefaults(
  defineProps<{
    tone?: BadgeTone
  }>(),
  {
    tone: 'lavender',
  },
)

const badgeClass = computed(() => ['base-badge', `base-badge--${props.tone}`])
</script>
