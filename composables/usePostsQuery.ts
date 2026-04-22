import { useQuery } from '@tanstack/vue-query'
import type { BlogPost } from '~/types/blog'

export const usePostsQuery = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => $fetch<BlogPost[]>('/api/posts'),
  })
}
