---
title: V8 최적화는 코드 모양을 본다
description: V8이 좋아하는 객체 모양, 타입 안정성, hot path를 코드로 다루는 방법을 정리한 메모입니다.
date: 2026-04-27
category: JavaScript
---

이걸 “어떻게 써야 하는가”로 바꾸면, V8이 좋아하는 코드의 특징을 잡아두는 쪽이 더 중요합니다.  
즉, **모든 코드를 똑같이 무겁게 최적화하는 게 아니라, 자주 실행되는 부분에만 최적화 비용을 쓰는 엔진**이라고 보면 됩니다.

## V8이 대충 이런 식으로 움직인다

- `Ignition`이 JavaScript를 먼저 `bytecode`로 실행합니다.
- 실행하면서 객체 모양(shape)과 타입에 대한 `type feedback`을 모읍니다.
- 자주 실행되는 함수, 즉 `hot function`은 더 강한 `JIT tier`로 올라갑니다.
- 이 최적화는 `speculative` 하므로, 가정이 틀리면 `deopt`로 다시 안전한 경로로 돌아갈 수 있습니다.

관련해서는 [Sparkplug](https://v8.dev/blog/sparkplug), [Maglev](https://v8.dev/blog/maglev), [Speculative optimizations](https://v8.dev/blog/wasm-speculative-optimizations)를 같이 보면 흐름이 잘 잡힙니다.

## 핵심 용어만 보면

- `Ignition`: 처음 코드를 빠르게 실행하는 단계
- `bytecode`: JS와 기계어 사이의 중간 명령어
- `객체 모양(shape)`: 같은 객체라도 속성 순서와 구조가 같으면 더 빨리 접근할 수 있는 내부 형태
- `type feedback`: 실행 중에 “여기엔 숫자가 오네”, “이 객체 구조는 이렇네” 같은 힌트를 모으는 것
- `hot function`: 자주 호출되는 함수
- `JIT tier`: 더 빠른 실행을 위해 단계적으로 올라가는 최적화 수준
- `speculative`: 지금까지의 패턴을 바탕으로 앞으로도 비슷할 거라고 가정하는 방식
- `deopt`: 그 가정이 깨졌을 때 최적화된 코드에서 안전한 코드로 되돌아가는 것

## 왜 hot code에만 더 투자하나

최적화는 공짜가 아닙니다. 관찰하고, 컴파일하고, 가정을 세우는 데 비용이 듭니다.  
그래서 한 번만 실행되고 끝나는 함수는 빠르게 시작하는 게 더 중요하고, 수백 번 반복되는 함수는 더 강하게 최적화할 가치가 있습니다.

```js
function printWelcome() {
  console.log("Welcome");
}

printWelcome();
```

이런 코드는 금방 끝나기 때문에, 무거운 최적화를 붙여도 이득이 적습니다.

```js
function sum(items) {
  let total = 0;

  for (let i = 0; i < items.length; i++) {
    total += items[i];
  }

  return total;
}

for (let i = 0; i < 100000; i++) {
  sum([1, 2, 3, 4, 5]);
}
```

이런 함수는 반복 실행되니까, V8이 더 적극적으로 최적화할 가능성이 큽니다.

## 그래서 실무에서는 이렇게 보면 된다

- 객체의 속성과 순서는 가능하면 일관되게 유지합니다.
- 타입이 자주 바뀌는 코드는 hot path에서 특히 조심합니다.
- `delete`나 실행 중 구조 변경은 가능한 피합니다.
- 진짜 성능 문제는 보통 hot path에 있으니, 먼저 그 구간부터 봅니다.

## 한 문장 요약

**V8은 처음엔 빠르게 실행하고, 실행하면서 배운 뒤, 자주 쓰이는 코드만 더 강하게 최적화한다. 그래서 성능은 hot path부터 보는 게 맞다.**
