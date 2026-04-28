# Blog Content Skill

## Purpose
`content/posts`와 `content/notes`에 있는 Markdown 원본, 그리고 링크 데이터 파일을 추가/수정/정리할 때 사용하는 절차를 정의한다.

## When to use
- 작업일지를 추가할 때
- 메모를 Markdown으로 옮길 때
- frontmatter를 수정할 때
- 링크 목록이나 홈에 반영할 때
- 아카이브/읽을 내용 데이터 파일을 수정할 때

## Workflow
1. 수정할 콘텐츠의 위치를 확인한다.
   - 작업일지: `content/posts/*.md`
   - 메모: `content/notes/*.md`
   - 읽을 내용: `data/post-queue.ts`
   - 아카이브: `data/archive-sections.ts`
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
- 작업일지와 메모는 가능하면 Markdown 원본 기준으로 관리한다.
- 읽을 내용과 아카이브는 데이터 파일 기준으로 관리한다.
- 중복 데이터를 만들지 않는다.
- 상태값이나 분류가 필요하면 frontmatter를 우선 사용한다.
- 내용만 바뀌는 작업에서는 라우트 구조를 불필요하게 바꾸지 않는다.
