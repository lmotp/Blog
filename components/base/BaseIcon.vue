<template>
  <span class="base-icon" :aria-label="title" :style="style" role="img">
    {{ glyph }}
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string
    size?: number
    title?: string
  }>(),
  {
    size: 16,
    title: '',
  },
)

const glyphMap: Record<string, string> = {
  arrowRight: '→',
  chevronDown: '⌄',
  menu: '☰',
}

const glyph = computed(() => glyphMap[props.name] ?? '•')
const style = computed(() => ({
  fontSize: `${props.size}px`,
}))
</script>
