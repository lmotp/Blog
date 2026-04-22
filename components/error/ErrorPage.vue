<template>
  <BaseCard class="error-page" elevated>
    <template #header>
      <p class="error-page__eyebrow">{{ isNotFound ? '404' : 'Error' }}</p>
      <h1 class="error-page__title">{{ heading }}</h1>
    </template>

    <p class="error-page__lead">{{ description }}</p>

    <template #footer>
      <div class="error-page__actions">
        <BaseButton to="/">Home</BaseButton>
        <BaseButton v-if="!isNotFound" secondary type="button" @click="retryPage">
          Retry
        </BaseButton>
      </div>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
interface AppError {
  statusCode?: number
  statusMessage?: string
  message?: string
}

const props = defineProps<{
  error: AppError
}>()

const isNotFound = computed(() => props.error.statusCode === 404)

const heading = computed(() => {
  return isNotFound.value ? 'Page Not Found' : 'Something Went Wrong'
})

const description = computed(() => {
  if (isNotFound.value) {
    return '찾으시는 페이지를 찾을 수 없습니다. 주소를 다시 확인하거나 홈으로 돌아가세요.'
  }

  return props.error.statusMessage ?? props.error.message ?? 'Unknown error occurred.'
})

const retryPage = () => {
  if (import.meta.client) {
    window.location.reload()
  }
}
</script>
