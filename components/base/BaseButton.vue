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
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link'

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    onDark?: boolean
    secondary?: boolean
    to?: string
    type?: 'button' | 'submit' | 'reset'
    variant?: ButtonVariant
  }>(),
  {
    disabled: false,
    onDark: false,
    secondary: false,
    type: 'button',
    variant: 'primary',
  },
)

const resolvedVariant = computed<ButtonVariant>(() =>
  props.secondary ? 'secondary' : props.variant,
)

const buttonClass = computed(() => [
  'base-button',
  `base-button--${resolvedVariant.value}`,
  props.onDark ? 'base-button--on-dark' : null,
])
</script>
