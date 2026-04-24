---
title: VUE3 메모
description: Vue 3의 인스턴스, 컴포넌트 패턴, 디렉티브, slot, attrs를 정리한 메모입니다.
date: 2026-04-24
category: Vue
---

## 한눈에 보는 포인트

- 인스턴스 접근은 `setup` / lifecycle / composable 내부에서만 안전합니다.
- 컴포넌트는 props, emits, 상태, watch, lifecycle, methods 순서로 보면 이해가 쉽습니다.
- `KeepAlive`, `defineExpose`, `inheritAttrs`, `v-memo`는 의도를 알고 써야 합니다.
- slot과 template은 웹 컴포넌트 개념과 함께 보면 감이 빨리 옵니다.

## 컴포넌트 인스턴스와 `getCurrentInstance`

Vue 2의 `this`처럼 인스턴스 정보가 필요할 때는 `getCurrentInstance()`를 사용합니다. 다만 이 함수는 `setup` 함수 내부, 또는 lifecycle hook, composable처럼 인스턴스 컨텍스트가 살아 있는 곳에서만 안전합니다.

클릭 핸들러 내부처럼 이미 setup이 끝난 뒤에는 새로 호출하지 말고, setup 시점에 한 번 받아둔 인스턴스를 재사용하는 방식이 맞습니다.

## script setup에서 보는 순서

1. 구성: `provide` / `inject`
2. 인터페이스: `inheritAttrs`, `props`, `emits`
3. 로컬 상태: `data`, `computed`
4. 이벤트: `watch`
5. 라이프사이클: `mounted`, `updated`, `unmounted` 등
6. 비반응형 속성: `methods`

컴포넌트를 읽을 때 이 순서로 보면, 무엇이 외부 인터페이스고 무엇이 내부 상태인지 훨씬 빨리 파악할 수 있습니다.

<BaseCard title="동적 컴포넌트와 캐시">
<p>
`<component :is="...">`로 조건에 따라 컴포넌트를 바꿀 수 있습니다. 여기에 `KeepAlive`를 감싸면 전환 후에도 인스턴스가 살아 있어 상태를 유지합니다.
</p>

<p>
캐시된 컴포넌트는 `onActivated` / `onDeactivated`로 다시 들어오거나 빠질 때의 흐름을 다루면 됩니다.
</p>
</BaseCard>

<BaseCard title="부모가 자식에 접근할 때">
<p>
`<script setup>` 컴포넌트는 기본적으로 닫혀 있습니다. 부모가 자식 메서드나 상태를 꼭 써야 하는 경우에만 `defineExpose()`로 필요한 것만 공개하는 편이 안전합니다.
</p>
</BaseCard>

## 디렉티브와 스타일링

- `v-cloak`은 Vue가 준비되기 전 잠깐 보이는 보간 텍스트를 숨길 때 씁니다.
- `v-memo`는 큰 리스트 같은 곳에서 변경이 없는 하위 트리를 재사용하는 미세 최적화입니다.
- 커스텀 디렉티브는 DOM 조작, 이벤트 처리, 애니메이션처럼 “요소 레벨 동작”에 적합합니다.
- `scoped` 스타일에서도 셀렉터를 단순하게 유지하는 편이 성능상 유리합니다.

## 폴스루 속성과 다중 루트

props/emits로 선언하지 않은 속성은 폴스루 속성으로 넘어갑니다. 단일 루트 컴포넌트라면 자연스럽게 전달되지만, 루트가 둘 이상이면 어디로 보낼지 명시해야 해서 `v-bind="$attrs"`가 필요할 수 있습니다.

상속을 막고 싶다면 `inheritAttrs: false`를 사용하고, 필요한 위치에 `$attrs`를 직접 붙이면 됩니다.

## 이벤트, slot, template

- `@click.self`처럼 이벤트 수식어를 쓰면 자식에서 올라오는 이벤트를 분리할 수 있습니다.
- slot은 부모가 내용을 꽂아 넣는 구멍이고, template은 실제 렌더 전 설계도에 가깝습니다.
- `Shadow DOM`, `::slotted`, `::part`도 같이 보면 slot 개념이 선명해집니다.

## 같이 기억할 것

- Error Boundary 관련 패턴은 나중에 다시 정리할 가치가 있습니다.
- Nuxt 3 데이터 통신 패턴은 `useFetch`, `useAsyncData`, `$fetch`의 책임을 나눠서 생각하면 좋습니다.
- Repository 패턴이나 디자인 시스템 문서도 Vue 노트와 연결해서 보면 복습이 쉽습니다.

## 참고 링크

- [Vue 공식 문서](https://ko.vuejs.org/)
- [getCurrentInstance](https://vueframework.com/docs/v3/ko/ko-KR/api/composition-api.html#getcurrentinstance)
- [Built-in directives](https://ko.vuejs.org/api/built-in-directives)
- [Component instance options order](https://ko.vuejs.org/style-guide/rules-recommended.html#component-instance-options-order)
