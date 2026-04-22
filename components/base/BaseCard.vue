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
const props = withDefaults(
  defineProps<{
    title?: string
    elevated?: boolean
  }>(),
  {
    elevated: false,
  },
)

const cardClass = computed(() => [
  'base-card',
  props.elevated ? 'base-card--elevated' : null,
])
</script>
