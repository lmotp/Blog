# Blog UI Skill

## Purpose
이 레포의 페이지, 컴포넌트, 레이아웃, SCSS를 수정할 때 따르는 UI 작업 절차를 정의한다.

## When to use
- `components/*`를 수정할 때
- `layouts/*`를 수정할 때
- `pages/*`의 UI를 바꿀 때
- SCSS 구조를 정리할 때

## Workflow
1. 먼저 현재 구조를 확인한다.
   - 홈
   - 읽을 내용
   - 보관함
   - 메모
   - 작업일지
   - 소개
2. 공통 UI와 페이지 전용 UI를 분리한다.
3. SCSS는 nesting 형태로 작성한다.
   - 컴포넌트 클래스는 가능한 `&__` / `&--` 기반의 BEM 스타일로 묶는다.
   - 같은 블록에서만 의미가 닫히는 구조를 우선하고, 불필요한 descendant selector는 피한다.
4. 반복되는 스타일은 mixin으로 분리한다.
5. 스타일 파일은 역할별로 유지한다.
   - `base`
   - `layouts`
   - `components`
   - `pages`
6. 작업 후 사용하지 않는 스타일 파일이나 컴포넌트는 정리한다.

## Rules
- 카드형보다 문서형, 리스트형 UI를 우선한다.
- 작업일지 목록은 제목 + 왼쪽 세로선 + 들여쓴 링크 목록 같은 outline 스타일을 우선한다.
- 불필요한 border, shadow, 라운드는 줄인다.
- 사이드바와 본문은 글 중심 구조를 유지한다.
- 홈은 정보량을 줄이고 진입점 역할만 하도록 한다.
- UI 로직과 비즈니스 로직은 분리해서 작업한다.
- 접근성은 항상 확인한다. 시맨틱 구조, 키보드 접근, 포커스 상태, 적절한 라벨과 대체 텍스트를 점검한다.
- TypeScript는 `strict` 기준으로 다루고, `any`와 불필요한 `as` 타입 단언은 지양한다.
- SCSS component selector는 BEM-style nesting(`&__`, `&--`)을 우선하고, block 밖의 무분별한 descendant selector는 피한다.
- Nuxt, Vue 관련 코드 수정이 필요하면 `vue-expert` 서브 에이전트를 우선 사용한다.
