import { queryCollection } from '@nuxt/content/nitro'
import type { BlogPost } from '~/types/blog'

export default defineEventHandler(async (event) => {
  return await queryCollection(event, 'posts')
    .select('path', 'title', 'description', 'category', 'date', 'cover')
    .order('date', 'DESC')
    .all<BlogPost>()
})
