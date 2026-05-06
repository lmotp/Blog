# DESIGN.md 기반 전체 UI 재정리 설계

## 목적

`DESIGN.md`를 저장소의 시각 기준으로 삼아 기존 Nuxt 블로그 UI 전체를 다시 정리한다. 라우트, 콘텐츠 구조, 문서형 IA는 유지하고, 색상, 타이포그래피, 간격, 버튼, 카드, 헤더, 푸터, 페이지별 SCSS를 디자인 시스템 기준으로 일관되게 맞춘다.

## 범위

적용 범위는 전체 UI다.

- 공통 토큰: `assets/scss/settings/_tokens.scss`, `assets/scss/settings/_mixins.scss`
- 공통 컴포넌트: `components/base/*`, `assets/scss/components/base/*`
- 레이아웃: `layouts/default.vue`, `assets/scss/layouts/_default.scss`
- 내비게이션과 푸터: `components/layout/*`, `assets/scss/components/layout/*`
- 페이지 컴포넌트와 SCSS: 홈, 읽을 내용, 보관함, 작업일지, 메모, 소개, 에러 화면

범위 밖 작업은 콘텐츠 재작성, 라우트 변경, Markdown 데이터 구조 변경, 배포 설정 변경이다. 필요한 경우 깨진 참조 정리만 한다.

## 설계 방향

기존 구조를 유지하면서 디자인 시스템을 치환한다. `DESIGN.md`의 Notion 계열 톤을 그대로 마케팅 페이지처럼 복제하지 않고, 이 블로그의 글 중심 구조에 맞춰 절제해서 적용한다.

핵심 원칙은 다음과 같다.

- 사이드바와 본문 중심의 문서형 레이아웃 유지
- `DESIGN.md`의 deep navy, primary purple, warm neutral surface, pastel tint를 제한적으로 사용
- 버튼은 8px rounded rectangle 기준으로 통일
- 카드는 반복 항목과 명확한 콘텐츠 묶음에만 사용
- 불필요한 shadow, border, radius를 줄이고 hairline divider 중심으로 정리
- 모든 페이지에서 heading, list, link, focus state 접근성 유지

## 토큰 구조

`_tokens.scss`는 `DESIGN.md`의 top-level 토큰을 SCSS 변수로 옮긴다.

- 색상: `primary`, `brand-navy`, `link-blue`, `card-tint-*`, `surface`, `hairline`, `ink`, `charcoal`, `slate`, `steel`, semantic color
- radius: `xs`, `sm`, `md`, `lg`, `xl`, `full`
- spacing: `xxs`부터 section spacing까지
- typography: SCSS mixin에서 사용할 font size, weight, line height 기준

기존 SCSS가 쓰는 `$brand`, `$surface`, `$text-*`, `$border-*` 같은 변수는 alias로 유지한다. 이렇게 하면 기존 파일을 한 번에 깨뜨리지 않고 점진적으로 `DESIGN.md` 명칭으로 수렴할 수 있다.

## 공통 컴포넌트

`BaseButton`은 variant 기반으로 확장한다.

- `primary`: `button-primary`
- `secondary`: `button-secondary`
- `onDark`: dark surface 위 primary/secondary 표현
- `ghost`: 낮은 강조도의 내비게이션 또는 보조 액션
- `link`: 텍스트 링크형 액션

기존 `secondary`, `onDark`, `disabled`, `to`, `type` 사용 방식은 유지한다. 새 API가 필요하면 기존 prop과 충돌하지 않게 `variant`를 추가한다.

`BaseCard`는 `variant`와 `tone`을 분리한다.

- `variant`: `base`, `feature`, `template`, `testimonial`, `pricing`
- `tone`: `canvas`, `peach`, `rose`, `mint`, `lavender`, `sky`, `yellow`, `cream`

반복적으로 필요한 작은 라벨은 `BaseBadge`를 추가할 수 있다. 섹션 제목 패턴이 여러 페이지에 중복되면 `BaseSectionHeader`를 추가할 수 있다. 새 컴포넌트는 실제 중복을 줄일 때만 만든다.

## 페이지 적용

홈은 `hero-band-dark`를 사용한다. 큰 마케팅 히어로가 아니라 블로그 진입점으로 유지하고, 읽을 내용과 메모 진입을 명확히 둔다. 작업일지와 읽을 내용 목록은 outline/list 중심을 유지한다.

헤더는 현재 `details/summary` 기반 접근성 구조를 유지한다. active state, hover, focus, subnav divider를 `DESIGN.md`의 warm neutral, hairline, primary purple 기준으로 통일한다.

푸터는 `footer-region`, `footer-link` 기준으로 정리한다. 링크 모음 이상의 역할을 늘리지 않는다.

메모, 작업일지, 읽을 내용, 보관함, 소개, 에러 페이지는 같은 section heading, list rhythm, card tone, link style을 공유한다. 페이지별 고유한 정보 구조는 유지한다.

## 접근성

- 현재 skip link 유지
- 내비게이션 `aria-current` 유지
- `details/summary`의 키보드 동작 유지
- 링크와 버튼 focus-visible 상태를 모든 variant에서 확인
- 색상 대비가 낮은 pastel tint 위에는 `charcoal` 또는 `ink` 계열 텍스트 사용
- 장식 요소는 CSS background 또는 `aria-hidden`으로 처리

## 테스트와 검증

저장소 규칙상 사용자가 명시하지 않았으므로 `npm run build`는 실행하지 않는다.

구현 후 가능한 검증은 다음 순서로 수행한다.

- TypeScript 또는 Vue 오류를 잡기 위한 정적 확인
- 기존 Vitest 테스트
- `npm run design:lint`는 네트워크 또는 패키지 사용 가능 여부에 따라 시도
- 주요 페이지의 구조와 접근성 상태를 수동 점검

## 완료 기준

- 전체 페이지가 `DESIGN.md`의 색상, 간격, radius, component tone을 공유한다.
- 기존 라우트와 콘텐츠 렌더링이 유지된다.
- 누락된 공통 컴포넌트가 있으면 추가되어 페이지별 중복이 줄어든다.
- 접근성 속성과 키보드 사용성이 기존보다 나빠지지 않는다.
- 사용하지 않는 새 파일이나 폴더가 남지 않는다.
