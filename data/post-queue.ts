export type PostQueueLink = {
  href: string
  title: string
}

export type PostQueueCategory = {
  items: PostQueueLink[]
  title: string
}

export const postQueueCategories: PostQueueCategory[] = [
  {
    title: '블로그 구조',
    items: [
      {
        href: '/posts/nuxt-content-structure',
        title: 'Nuxt Content 구조 잡는 법',
      },
      {
        href: '/posts/server-api-bff',
        title: 'Server API를 BFF로 쓰는 방법',
      },
      {
        href: '/posts/component-foldering-guide',
        title: '컴포넌트 폴더를 나누는 기준',
      },
    ],
  },
  {
    title: '작성 방식',
    items: [
      {
        href: '/posts/content-first-writing',
        title: 'Markdown 우선 블로그 작성 흐름',
      },
    ],
  },
  {
    title: 'AI',
    items: [
      {
        href: 'https://toss.tech/article/will-ai-replace-developers',
        title: '개발자는 AI에게 대체될 것인가',
      },
      {
        href: 'https://velog.io/@teo/we-programmer',
        title: 'md로 코딩하는 시대',
      },
      { href: 'https://goddaehee.tistory.com/567', title: 'OpenAI Codex 서브에이전트' },
      {
        href: 'https://blog.nwlee.com/codex-work-context-maintainance',
        title: 'AI 에이전트에서 작업 맥락을 관리하기 위해 사용한 방법',
      },
    ],
  },
  {
    title: 'JavaScript',
    items: [
      { href: 'https://developer.mozilla.org/ko/docs/Web/JavaScript', title: 'JavaScript 문서' },
      {
        href: 'https://developer.mozilla.org/en-US/docs/Web/API/Array/fromAsync',
        title: 'Array.fromAsync',
      },
      {
        href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all',
        title: 'Promise.all',
      },
    ],
  },
  {
    title: 'CSS',
    items: [
      {
        href: 'https://developer.chrome.com/blog/entry-exit-animations?hl=ko',
        title: 'transition-behavior / @starting-style',
      },
      { href: 'https://developer.chrome.com/blog/anchor-positioning-api?hl=ko', title: 'Anchor positioning' },
      { href: 'https://developer.mozilla.org/ko/docs/Web/CSS/contain', title: 'contain' },
    ],
  },
]
