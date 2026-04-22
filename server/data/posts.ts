import type { BlogPost } from '~/types/blog'

export const posts: BlogPost[] = [
  {
    id: 1,
    title: 'Nuxt 기본 구조 정리',
    summary: 'Nuxt 앱에서 BFF, store, style 계층을 나누는 기본 예시입니다.',
    category: 'Architecture',
    publishedAt: '2026-04-22',
  },
  {
    id: 2,
    title: 'Server API를 BFF로 쓰는 방법',
    summary: '클라이언트는 /api만 호출하고 내부 로직은 서버 라우트에 숨깁니다.',
    category: 'BFF',
    publishedAt: '2026-04-21',
  },
  {
    id: 3,
    title: 'Pinia store로 상태 분리하기',
    summary: '페이지 상태와 서버 응답을 store로 모아 재사용성을 높입니다.',
    category: 'Store',
    publishedAt: '2026-04-20',
  },
]
