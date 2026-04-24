---
title: JavaScript 메모
description: Promise, iterator, generator, API 패턴을 정리한 JavaScript 메모입니다.
date: 2026-04-24
category: JavaScript
---

## 먼저 기억할 핵심

- 선언적 코드는 “무엇을 할지”를, 명령형 코드는 “어떻게 할지”를 설명합니다.
- Promise는 기본적으로 즉시 실행되고, 함수로 감싸야 지연 실행됩니다.
- 이터러블과 이터레이터, 제너레이터는 `for...of`, spread, 구조분해와 함께 기억하면 좋습니다.
- 배열/수학/텍스트 API는 작은 차이로 동작이 달라지기 때문에 예시와 함께 봐야 합니다.

## 선언적 패턴과 Promise 실행 방식

선언적 패턴은 “무엇을 할지”를 표현하고, 명령형 패턴은 “어떻게 할지”를 직접 풀어 씁니다. 배열에서 짝수만 뽑는 예시는 `for` 루프로도 만들 수 있지만, `filter()`를 쓰면 의도가 훨씬 선명해집니다.

Promise는 `new Promise()`를 만드는 순간 executor가 바로 실행됩니다. 필요할 때만 실행하고 싶다면 `() => new Promise()`처럼 함수로 감싸 지연 실행 구조로 바꾸면 됩니다.

<BaseCard title="즉시 실행과 지연 실행">
<p>
`new Promise()`는 생성과 동시에 작업이 시작됩니다. 반면 함수로 감싼 형태는 호출 시점까지 기다립니다.
</p>

```javascript
const promise = new Promise((resolve) => {
  console.log('실행됨!');
  setTimeout(resolve, 1000);
});

const makePromise = () => new Promise((resolve) => {
  console.log('이제 실행됨!');
  setTimeout(resolve, 1000);
});
```
</BaseCard>

<BaseCard title="배열을 선언적으로 다루기">
<p>
`filter()`, `map()`, `reduce()`는 “어떤 결과가 필요한지”를 먼저 쓰게 만들어 줍니다. 반복문보다 읽기 쉬워지는 이유가 여기에 있습니다.
</p>

```javascript
const evenNumbers = numbers.filter((number) => number % 2 === 0);
```
</BaseCard>

## 이터러블, 이터레이터, 제너레이터

`for...of`는 `Symbol.iterator`를 가진 값에서만 동작합니다. Array, Set, Map은 이터러블이고, 객체는 기본적으로 이터러블이 아닙니다.

이터레이터는 `next()`를 가진 값이고, 제너레이터는 이터레이터를 만들어 주는 문법입니다. 반복 흐름을 직접 제어할 때 `yield`와 `yield*`를 함께 기억하면 좋습니다.

<BaseCard title="이터레이터 예시">
```javascript
const iterator = [1, 2, 3][Symbol.iterator]();

iterator.next(); // { value: 1, done: false }
iterator.next(); // { value: 2, done: false }
```
</BaseCard>

<BaseCard title="제너레이터 예시">
```javascript
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const iter = generator();
iter.next();
```
</BaseCard>

## 실무에서 자주 다시 보는 API

- `Promise.all()`은 여러 Promise를 한 번에 기다리고, `Array.fromAsync()`는 비동기 값들을 순차적으로 배열로 모으는 성격이 강합니다.
- `AbortController`와 `Speculation Rules API`는 나중에 따로 실험해볼 만한 주제입니다.
- `customElements.define()`로 커스텀 태그를 등록할 때는 하이픈이 포함된 이름을 써야 합니다.

<BaseCard title="숫자와 배열">
<p>
`Number.EPSILON`은 부동소수점 비교 오차를 다룰 때 자주 등장합니다. `Float32Array`는 32비트 실수 배열이라 메모리 사용량을 줄이는 데 도움이 됩니다.
</p>

<p>
Three.js의 `BufferGeometry`에서는 `position`, `uv`, `index`의 개념을 다시 확인할 필요가 있습니다.
</p>
</BaseCard>

<BaseCard title="이벤트와 상태">
<p>
`deviceorientation`은 모바일 디바이스의 기울기나 회전을 다룰 때 쓰입니다. `alpha`, `beta`, `gamma`의 의미를 구분해 두면 나중에 다시 보기가 쉽습니다.
</p>

<p>
`while`과 `do...while`의 차이처럼, “조건을 먼저 보는가” “일단 한 번은 실행하는가” 같은 흐름 차이도 자주 헷갈립니다.
</p>
</BaseCard>

## 콘솔과 디버깅 메모

콘솔을 꾸미는 스니펫처럼, 개발 중에는 작은 디버깅 도구를 만들어 두면 훨씬 편합니다. 로그를 단순히 찍는 것보다 실행 시점과 상태를 구분해서 확인하는 습관이 중요합니다.

Promise, iterator, custom element처럼 API가 많을수록 “언제 실행되는지”, “무엇을 반환하는지”를 함께 적어두면 복습이 쉬워집니다.

## 참고 링크

- [MDN JavaScript](https://developer.mozilla.org/ko/docs/Web/JavaScript)
- [deviceorientation](https://developer.mozilla.org/en-US/docs/Web/API/Window/deviceorientation_event)
- [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [Array.fromAsync](https://developer.mozilla.org/en-US/docs/Web/API/Array/fromAsync)
