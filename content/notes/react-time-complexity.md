---
title: React에서 시간복잡도 이해하기
description: React 렌더링 경로에서 시간복잡도를 보는 기준과 Set, Map, 정렬, 중첩 순회 예시를 정리한 메모입니다.
date: 2026-04-28
category: React
---

프론트엔드에서는 기능이 잘 동작하는 것만큼, 데이터가 커졌을 때도 버티는 구조가 중요합니다.  
특히 React에서는 렌더링이 자주 일어나기 때문에, 작은 반복 작업도 금방 병목이 될 수 있습니다.

이 메모에서는 React 기준으로 자주 등장하는 시간복잡도 개념과 예시를 정리합니다.

## 먼저 기억할 핵심

- 시간복잡도는 입력 크기 `n`이 커질 때 비용이 어떻게 늘어나는지 보는 방식입니다.
- React에서는 렌더링 경로 안에서 같은 계산을 반복하지 않는 것이 중요합니다.
- 반복 조회는 배열보다 `Set`이나 `Map`이 유리한 경우가 많습니다.
- 큰 리스트는 시간복잡도만이 아니라 DOM 개수도 같이 봐야 합니다.

## 시간복잡도란

시간복잡도는 입력 크기 `n`이 커질 때 코드의 실행 비용이 얼마나 늘어나는지를 표현하는 방식입니다.

- `O(1)`: 데이터 크기와 상관없이 거의 같은 비용
- `O(n)`: 데이터가 2배면 작업도 대체로 2배
- `O(n log n)`: 정렬처럼 꽤 빠르지만, 순회보다 무거움
- `O(n^2)`: 중첩 반복처럼 데이터가 커질수록 급격히 느려짐

실무에서는 정확한 초 단위보다, 데이터가 커질 때 어떤 코드가 더 비싸지는가를 판단하는 데 더 자주 씁니다.

## `O(1)` 예시

`Map`이나 `Set`에서 키 존재 여부를 확인하는 작업은 평균적으로 매우 빠릅니다.

<BaseCard title="Set 조회">
<p>
배열 길이가 커져도 `has` 자체의 조회 비용은 거의 일정하게 유지됩니다.
</p>

```tsx
const selectedIds = new Set([1, 2, 3])

const isSelected = selectedIds.has(2)
```
</BaseCard>

### React에서의 의미

자주 확인해야 하는 값이 있다면 배열 전체를 매번 순회하는 대신 `Set`이나 `Map`으로 바꾸는 편이 낫습니다.

<BaseCard title="선택 상태를 Set으로 보기">
<p>
렌더링 때마다 `includes()`를 반복하는 대신 `Set`을 만들어 두면 조회 비용을 줄이기 쉽습니다.
</p>

```tsx
function List({ items, selectedIds }: { items: Array<{ id: number; name: string }>; selectedIds: number[] }) {
  const selectedSet = new Set(selectedIds)

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name} {selectedSet.has(item.id) ? '(선택됨)' : ''}
        </li>
      ))}
    </ul>
  )
}
```
</BaseCard>

## `O(n)` 예시

배열을 한 번만 훑는 작업은 대표적인 `O(n)`입니다.

<BaseCard title="한 번 순회하기">

```tsx
const numbers = [1, 2, 3, 4, 5]

const sum = numbers.reduce((acc, cur) => acc + cur, 0)
```

</BaseCard>

또는:

<BaseCard title="map도 O(n)">

```tsx
const names = ['A', 'B', 'C']

const upperNames = names.map((name) => name.toUpperCase())
```

</BaseCard>

### React에서의 의미

렌더링 과정에서 `map`, `filter`, `reduce`를 사용할 때 대부분 `O(n)` 성격을 가집니다. 데이터가 적을 때는 문제가 안 되지만, 렌더가 자주 발생하고 배열이 커지면 비용이 누적됩니다.

<BaseCard title="필터링과 렌더링">
<p>
이 코드는 단순하지만, 렌더가 자주 일어나면 같은 작업을 반복하게 됩니다.
</p>

```tsx
function SearchResult({
  items,
  query,
}: {
  items: Array<{ id: number; name: string }>
  query: string
}) {
  const filtered = items.filter((item) => item.name.includes(query))

  return (
    <ul>
      {filtered.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
```
</BaseCard>

## `O(n log n)` 예시

정렬은 보통 `O(n log n)`입니다.

<BaseCard title="정렬">

```tsx
const scores = [42, 12, 87, 33, 5]

const sortedScores = [...scores].sort((a, b) => a - b)
```

</BaseCard>

### React에서의 의미

렌더링 중에 매번 정렬하면 데이터가 커질수록 비용이 커집니다. 정렬 결과가 자주 바뀌지 않는다면 계산을 분리하는 것이 좋습니다.

<BaseCard title="정렬 결과를 매 렌더마다 만들기">

```tsx
function ScoreList({
  items,
}: {
  items: Array<{ id: number; name: string; score: number }>
}) {
  const sortedItems = [...items].sort((a, b) => b.score - a.score)

  return (
    <ul>
      {sortedItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
```

</BaseCard>

## `O(n^2)` 예시

중첩 반복문은 대표적인 `O(n^2)`입니다.

<BaseCard title="중첩 순회">

```tsx
const a = [1, 2, 3]
const b = [2, 3, 4]
const common: number[] = []

for (const x of a) {
  for (const y of b) {
    if (x === y) {
      common.push(x)
    }
  }
}
```

</BaseCard>

### React에서 자주 나오는 형태

배열 안에 포함 여부를 매번 확인하는 패턴은 쉽게 비효율적으로 변합니다.

<BaseCard title="includes 반복">

```tsx
function SelectedList({
  items,
  selectedIds,
}: {
  items: Array<{ id: number; name: string }>
  selectedIds: number[]
}) {
  const result = items.filter((item) => selectedIds.includes(item.id))

  return (
    <ul>
      {result.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
```

</BaseCard>

이 코드는 `filter` 안에서 `includes`를 매번 호출하므로, 데이터가 커지면 `O(n^2)`에 가까운 비용이 될 수 있습니다.

## `Set`으로 개선하는 방법

존재 여부만 확인하면 될 때는 `Set`이 좋습니다.

<BaseCard title="Set으로 바꾸기">

```tsx
function SelectedList({
  items,
  selectedIds,
}: {
  items: Array<{ id: number; name: string }>
  selectedIds: number[]
}) {
  const selectedSet = new Set(selectedIds)
  const result = items.filter((item) => selectedSet.has(item.id))

  return (
    <ul>
      {result.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
```

</BaseCard>

이 방식은 `selectedIds`를 `Set`으로 바꾸는 비용 `O(m)`, `items`를 한 번 훑는 비용 `O(n)`으로 볼 수 있어서 전체적으로 더 낫습니다.

## `Map`을 쓰는 경우

키로 값까지 꺼내야 하면 `Map`이 적합합니다.

<BaseCard title="Map 조회">

```tsx
const userMap = new Map([
  [1, { id: 1, name: 'A' }],
  [2, { id: 2, name: 'B' }],
])

const ids = [1, 2]
const users = ids.map((id) => userMap.get(id))
```

</BaseCard>

`Set`은 있냐 없냐를 볼 때, `Map`은 키에 매핑된 값을 꺼낼 때 사용합니다.

## React에서 시간복잡도를 볼 때 중요한 기준

### 1. 렌더링 경로 안에서 무거운 계산을 반복하지 않기

<BaseCard title="렌더마다 반복되는 계산">

```tsx
function Component({
  items,
  query,
}: {
  items: Array<{ id: number; name: string }>
  query: string
}) {
  const filtered = items
    .filter((item) => item.name.includes(query))
    .sort((a, b) => a.name.localeCompare(b.name))

  return <div>{filtered.length}</div>
}
```

</BaseCard>

### 2. 반복 조회는 배열보다 `Set` / `Map`으로 바꾸기

<BaseCard title="조회 구조 바꾸기">

```tsx
const idSet = new Set(selectedIds)
idSet.has(targetId)
```

</BaseCard>

### 3. 큰 리스트는 DOM까지 고려하기

시간복잡도만 좋아도, DOM이 너무 많으면 실제 UI는 느려질 수 있습니다. 이 경우는 가상화 같은 방법이 필요합니다.

### 4. 상태 구조를 조회하기 쉽게 만들기

중첩 배열을 계속 탐색하는 대신, `byId` 형태로 바꾸면 중복 순회를 줄일 수 있습니다.

<BaseCard title="정규화된 상태">

```tsx
const state = {
  usersById: {
    1: { id: 1, name: 'A' },
    2: { id: 2, name: 'B' },
  },
  postIds: [101, 102],
  postsById: {
    101: { id: 101, userId: 1, title: '글1' },
    102: { id: 102, userId: 2, title: '글2' },
  },
}
```

</BaseCard>

## 정리

- `O(1)`은 조회가 거의 일정한 경우입니다
- `O(n)`은 한 번 순회하는 작업입니다
- `O(n log n)`은 정렬처럼 꽤 흔한 중간 비용입니다
- `O(n^2)`는 중첩 순회로 쉽게 발생합니다
- React에서는 렌더링 경로에서 같은 계산을 반복하지 않는 것이 중요합니다
- 배열 탐색을 반복한다면 `Set`이나 `Map`으로 바꾸는 것을 먼저 검토합니다
- 상태를 `byId` 구조로 정규화하면 조회 비용과 중복 순회를 줄일 수 있습니다

시간복잡도는 복잡한 알고리즘 이야기만이 아니라, 프론트엔드에서도 어디서 반복이 생기고 있는가를 보는 실용적인 도구입니다.
