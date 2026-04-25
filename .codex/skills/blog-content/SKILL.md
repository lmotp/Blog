# Blog Content Skill

## Purpose
`content/posts`와 `content/notes`에 있는 Markdown 원본을 추가, 수정, 정리할 때 사용하는 절차를 정의한다.

## When to use
- 새 글을 추가할 때
- 노트 내용을 Markdown으로 옮길 때
- frontmatter를 수정할 때
- 글/노트 링크를 목록이나 홈에 반영할 때

## Workflow
1. 수정할 콘텐츠의 위치를 확인한다.
   - 글: `content/posts/*.md`
   - 노트: `content/notes/*.md`
2. frontmatter를 정리한다.
   - `title`
   - `description`
   - `date`
   - `category`
3. 본문은 문서형 Markdown으로 유지한다.
4. 필요하면 연결된 페이지를 확인한다.
   - `pages/posts/[slug].vue`
   - `pages/notes/[slug].vue`
   - `pages/notes/css.vue`
   - `pages/notes/javascript.vue`
   - `pages/notes/vue.vue`
5. 목록 화면이나 홈에서 노출이 필요한 경우 연결부를 함께 정리한다.

## Rules
- 글과 노트는 가능하면 Markdown 원본 기준으로 관리한다.
- 중복 데이터를 만들지 않는다.
- 상태값이나 분류가 필요하면 frontmatter를 우선 사용한다.
- 내용만 바뀌는 작업에서는 라우트 구조를 불필요하게 바꾸지 않는다.
