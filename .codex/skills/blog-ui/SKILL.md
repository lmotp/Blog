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
   - 읽을 글
   - 아카이브
   - 노트
   - About
2. 공통 UI와 페이지 전용 UI를 분리한다.
3. SCSS는 nesting 형태로 작성한다.
4. 반복되는 스타일은 mixin으로 분리한다.
5. 스타일 파일은 역할별로 유지한다.
   - `base`
   - `layouts`
   - `components`
   - `pages`
6. 작업 후 사용하지 않는 스타일 파일이나 컴포넌트는 정리한다.

## Rules
- 카드형보다 문서형, 리스트형 UI를 우선한다.
- 불필요한 border, shadow, 라운드는 줄인다.
- 사이드바와 본문은 글 중심 구조를 유지한다.
- 홈은 정보량을 줄이고 진입점 역할만 하도록 한다.
- UI 로직과 비즈니스 로직은 분리해서 작업한다.
