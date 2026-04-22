<template>
  <label class="base-input">
    <span v-if="label" class="base-input__label">{{ label }}</span>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      class="base-input__field"
      @input="onInput"
    />
  </label>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    id?: string
    label?: string
    modelValue?: string
    placeholder?: string
    type?: string
  }>(),
  {
    modelValue: '',
    type: 'text',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  emit('update:modelValue', target?.value ?? '')
}
</script>
