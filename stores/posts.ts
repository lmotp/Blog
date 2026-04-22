import { defineStore } from 'pinia'
import type { BlogPost } from '~/types/blog'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    items: [] as BlogPost[],
    pending: false,
    error: null as string | null,
  }),
  getters: {
    total: (state) => state.items.length,
    latestTitle: (state) => state.items[0]?.title ?? 'No posts loaded',
  },
  actions: {
    async fetchPosts() {
      this.pending = true
      this.error = null

      try {
        const data = await $fetch<BlogPost[]>('/api/posts')
        this.items = data
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : 'Failed to fetch posts'
      } finally {
        this.pending = false
      }
    },
  },
})
