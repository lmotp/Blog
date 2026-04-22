import { posts } from '~/server/data/posts'

export default defineEventHandler(() => {
  return posts
})
