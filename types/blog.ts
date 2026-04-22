export interface BlogPost {
  path: string
  title: string
  description: string
  category: string
  readingStatus: 'reading' | 'to-read' | 'archive'
  readingCategory: string
  date: string
  cover?: string
}

export type BlogPostPreview = Pick<
  BlogPost,
  'path' | 'title' | 'description' | 'category' | 'date'
>
