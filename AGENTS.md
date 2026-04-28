# Agent Instructions

- 이 저장소의 세부 작업 규칙은 `.codex/skills`를 우선 참고한다.
- 작업 전에 해당 영역에 맞는 skill을 먼저 고른다.
  - IA/라우트/페이지 구조: `blog-architecture`
  - 콘텐츠/Markdown/링크 데이터: `blog-content`
  - UI/레이아웃/SCSS: `blog-ui`
  - 메타/OG/파비콘/배포: `blog-seo-deploy`
  - Vitest/비즈니스 로직 테스트: `blog-testing`
- 이 저장소에서는 모든 작업마다 `npm run build`를 반드시 실행하지 않는다.
- 빌드는 사용자가 명시적으로 요청했을 때만 수행한다.
- 작업을 마칠 때는 더 이상 쓰이지 않는 폴더와 파일이 남아 있지 않은지 확인하고, 있으면 정리한다.
- 커밋할 때는 메시지를 한글로 작성하고, `feat`, `fix`, `refactor`, `docs`, `chore` 같은 접두어를 상황에 맞게 적당히 사용한다.
- 접근성은 항상 지킨다. 시맨틱 마크업, 키보드 사용성, 적절한 대체 텍스트와 aria 속성을 우선 확인한다.
- TypeScript는 `strict` 모드 기준으로 작성한다. `any`는 사용하지 않고, `as` 타입 단언도 꼭 필요한 경우가 아니면 지양한다.
- SCSS는 nesting 기준으로 작성하되, 컴포넌트 클래스는 BEM 스타일의 `&__` / `&--` 형태를 우선 사용한다. 같은 블록 안에서 하위 요소는 일관된 네이밍으로 묶는다.
- Nuxt, Vue 관련 코드 수정이 필요하면 `vue-expert` 서브 에이전트를 우선 사용한다.
