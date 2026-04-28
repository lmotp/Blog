<template>
  <span class="base-icon" v-bind="iconProps" :style="style">
    {{ glyph }}
  </span>
</template>

<script setup lang="ts">
const iconNames = ['arrowRight', 'chevronDown', 'menu'] as const

const props = withDefaults(
  defineProps<{
    name: (typeof iconNames)[number]
    size?: number
    title?: string
  }>(),
  {
    size: 16,
    title: '',
  },
)

const glyphMap: Record<(typeof iconNames)[number], string> = {
  arrowRight: '→',
  chevronDown: '⌄',
  menu: '☰',
}

const glyph = computed(() => glyphMap[props.name])
const iconProps = computed(() => {
  if (!props.title) {
    return {
      'aria-hidden': true,
    }
  }

  return {
    'aria-label': props.title,
    role: 'img',
  }
})
const style = computed(() => ({
  fontSize: `${props.size}px`,
}))
</script>
