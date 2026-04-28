<template>
  <NuxtLink v-if="to && !disabled" :to="to" :class="buttonClass">
    <slot />
  </NuxtLink>
  <span v-else-if="to" :class="buttonClass" aria-disabled="true" tabindex="-1">
    <slot />
  </span>
  <button v-else :type="type" :class="buttonClass" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    disabled?: boolean
    secondary?: boolean
    to?: string
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    disabled: false,
    secondary: false,
    type: 'button',
  },
)

const buttonClass = computed(() => [
  'base-button',
  props.secondary ? 'base-button--secondary' : null,
])
</script>
