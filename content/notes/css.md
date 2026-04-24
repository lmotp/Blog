---
title: CSS 메모
description: 새로 나오는 CSS 기능과 자주 헷갈리는 레이아웃, 선택자, 애니메이션 개념을 정리한 메모입니다.
date: 2026-04-24
category: CSS
---

## 먼저 기억할 것

- 실험 중인 기능은 브라우저 지원 범위를 먼저 확인하고 써야 합니다.
- 레이아웃은 `grid`, `subgrid`, `container query`를 함께 봐야 이해가 쉽습니다.
- `@layer`, `:where()`, `:is()`는 명시도 제어와 구조화에 유용합니다.
- 동작이 복잡한 UI는 성능과 접근성을 함께 고려해야 합니다.

## 아직은 확인이 필요한 기능

`calc-size()`는 CSS 값 계산을 더 유연하게 다루기 위한 제안입니다. 아직 스펙 단계라서 실제 프로젝트에서 쓰기 전에는 브라우저 지원과 동작 방식을 다시 확인해야 합니다.

`transition-behavior: allow-discrete`는 `display: none`처럼 기존에는 전환이 어려웠던 상황에서도 애니메이션 흐름을 이어주려는 기능입니다. 여기에 `@starting-style`를 함께 쓰면 요소가 등장하거나 사라질 때 시작 스타일을 분리해서 더 자연스럽게 연출할 수 있습니다.

앵커 기반 배치는 `anchor-name`, `position-anchor`, `anchor()`, `anchor-size()`, `@position-fallback`으로 요소 간 상대 위치를 잡는 방식입니다. 툴팁이나 팝오버처럼 기준 요소를 따라다녀야 하는 UI에 특히 잘 맞습니다.

그 밖에 `@scope`, `corner-shape`, `random()` 같은 기능도 앞으로 더 자주 확인할 후보입니다.

<BaseCard title="Cascade Layers">
<p>
`@layer`는 명시도보다 앞선 새로운 우선순위 층입니다. 레이어를 먼저 선언해 순서를 정하고, reset, base, theme, util 같은 단계로 스타일을 나누면 유지보수가 쉬워집니다.
</p>

<p>
다만 레이어 밖의 일반 CSS는 레이어보다 우선할 수 있으므로, 프로젝트에서 레이어를 도입했다면 핵심 스타일도 가능한 한 레이어 안으로 넣는 편이 안전합니다.
</p>
</BaseCard>

<BaseCard title="명시도와 선택자">
<p>
`:is()`는 코드를 줄이면서 원래 명시도를 유지할 때 좋고, `:where()`는 명시도를 0으로 만들어 덮어쓰기를 쉽게 만들 때 좋습니다.
</p>

<p>
`!important`는 마지막 수단으로만 쓰고, 애니메이션은 `@keyframes`와 `animation-fill-mode`의 조합까지 같이 봐야 합니다.
</p>
</BaseCard>

## 레이아웃을 다루는 기본 도구

- `max-width` 대신 `max-inline-size`, `max-height` 대신 `max-block-size`를 쓰면 writing mode 변화에 더 강합니다.
- `align-content`는 flex, grid 외에도 블록 축 정렬의 활용 범위가 넓어지고 있습니다.
- `align-items: baseline`과 `last baseline`은 텍스트 기준 정렬을 다룰 때 유용합니다.
- `grid`는 행과 열을 동시에 설계하는 2차원 레이아웃이고, `subgrid`는 자식이 부모 그리드의 라인을 그대로 이어받을 수 있게 해 줍니다.

<BaseCard title="Grid와 Masonry">
<p>
Grid는 큰 구조를 잡고, 그 내부의 컴포넌트 배치는 flex로 정리하는 조합이 가장 많이 쓰입니다. 이름 붙은 grid line을 쓰면 `sidebar-start`처럼 의도가 보이기 쉬워집니다.
</p>

<p>
Masonry는 아직 브라우저 구현과 제안이 섞여 있는 영역이라, 현 시점에서는 `grid-auto-rows`를 활용한 우회 구현이나 별도 레이아웃 전략을 함께 고려하는 편이 좋습니다.
</p>
</BaseCard>

<BaseCard title="색과 상태">
<p>
`color-mix()`는 두 색을 섞어 중간 색을 계산할 때 유용합니다. `color-scheme`와 `prefers-color-scheme`를 함께 쓰면 라이트/다크 테마를 사용자의 시스템 설정과 맞추기 좋습니다.
</p>

<p>
폼 상태는 `:user-valid` / `:user-invalid`를 같이 보면, 사용자와 상호작용한 뒤에만 유효성 상태를 보여 줄 수 있습니다.
</p>
</BaseCard>

<BaseCard title="성능과 분리">
<p>
`contain`은 레이아웃, 스타일, 페인트, 크기 계산을 분리해서 성능 비용을 줄이는 데 도움이 됩니다. 독립 위젯이 많은 페이지에서 특히 유용합니다.
</p>

<p>
CSS 커스텀 속성을 애니메이션 가능한 값으로 다루고 싶다면 `@property`를 써서 타입 정보를 선언할 수 있습니다.
</p>
</BaseCard>

## 모양과 움직임

`cubic-bezier()`는 곡선의 시작점과 끝점, 그리고 제어점을 통해 애니메이션 속도를 조절합니다. 숫자를 바꾸는 것만으로도 같은 모션이 훨씬 부드럽거나 탄력 있게 바뀝니다.

`shape()`는 `path()`보다 읽기 쉬운 문법으로 clip-path나 offset-path를 정의하는 흐름으로 볼 수 있습니다. 반응형 기준을 함께 넣기에도 좋습니다.

가상 클래스와 가상 요소는 상태와 부품을 구분해서 생각하면 쉽습니다. hover, valid 같은 상태는 pseudo-class이고, before, after, backdrop, part, slotted 같은 것은 pseudo-element에 가깝습니다.

## 스크롤과 세부 경험

문서 내부 앵커 이동에는 `scroll-margin-top`과 `scroll-behavior: smooth`를 함께 쓰면 좋습니다.

책처럼 보이게 만드는 3D 표현은 정면, 옆면, 뒷면 이미지를 나누고 `transform-style: preserve-3d`를 활용하면 구현할 수 있습니다.

## 나중에 다시 볼 것

- `@scope`의 브라우저 지원 범위
- `anchor positioning`의 실제 적용 가능성
- `calc-size()`, `corner-shape`, `random()`의 안정화 여부
- `masonry` 또는 `grid-lanes`의 표준화 진행 상황

## 참고 링크

- [calc-size()](https://drafts.csswg.org/css-values-5/#calc-size)
- [transition-behavior / @starting-style](https://developer.chrome.com/blog/entry-exit-animations?hl=ko)
- [Anchor positioning](https://developer.chrome.com/blog/anchor-positioning-api?hl=ko)
- [contain](https://developer.mozilla.org/ko/docs/Web/CSS/contain)
- [corner-shape](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/corner-shape)
