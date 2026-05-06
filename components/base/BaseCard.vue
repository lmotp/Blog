<template>
  <article :class="cardClass">
    <header v-if="title || $slots.header" class="base-card__header">
      <slot name="header">
        <h3 v-if="title" class="base-card__title">{{ title }}</h3>
      </slot>
    </header>

    <div class="base-card__body">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="base-card__footer">
      <slot name="footer" />
    </footer>
  </article>
</template>

<script setup lang="ts">
type CardVariant = 'base' | 'feature' | 'template' | 'testimonial' | 'pricing'
type CardTone =
  | 'canvas'
  | 'peach'
  | 'rose'
  | 'mint'
  | 'lavender'
  | 'sky'
  | 'yellow'
  | 'cream'

const props = withDefaults(
  defineProps<{
    elevated?: boolean
    title?: string
    tone?: CardTone
    variant?: CardVariant
  }>(),
  {
    elevated: false,
    tone: 'canvas',
    variant: 'base',
  },
)

const cardClass = computed(() => [
  'base-card',
  `base-card--${props.variant}`,
  `base-card--tone-${props.tone}`,
  props.elevated ? 'base-card--elevated' : null,
])
</script>
