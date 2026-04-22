<template>
  <NuxtLayout name="error">
    <ErrorPage :error="error" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import ErrorPage from '~/components/error/ErrorPage.vue'

interface AppError {
  statusCode?: number
  statusMessage?: string
  message?: string
}

defineProps<{
  error: AppError
}>()
</script>
