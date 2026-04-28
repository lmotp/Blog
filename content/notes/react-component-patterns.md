---
title: React 컴포넌트 패턴 메모
description: Compound, headless, controlled, uncontrolled 패턴과 Presentational / Container를 정리한 React 메모입니다.
date: 2026-04-28
category: React
---

리액트에서 컴포넌트 패턴은 단순히 코드를 나누는 기술이 아닙니다.  
**어디까지를 UI로 볼지**, **어디까지를 로직으로 분리할지**, **상태를 누가 소유할지**를 정하는 방식에 가깝습니다.

이 메모에서는 실무에서 자주 같이 언급되는 네 가지 축을 먼저 정리합니다.

- Compound Components
- Headless Components
- Controlled Components
- Uncontrolled Components

## 먼저 기억할 핵심

- `Compound`는 여러 조각을 한 세트처럼 조합하는 구조입니다.
- `Headless`는 동작과 상태를 제공하고, 모양은 바깥에서 정하는 방식입니다.
- `Controlled`는 부모가 상태를 소유합니다.
- `Uncontrolled`는 컴포넌트 내부가 상태를 소유합니다.

## Compound Components

Compound는 말 그대로 여러 조각이 하나의 API로 묶인 컴포넌트입니다. `Tabs`, `Dropdown`, `Accordion` 같은 UI는 한 덩어리로 쓰기보다, 역할별 조각으로 나누면 더 유연하게 조합할 수 있습니다.

### 비유

- Compound = 레고 세트
- 부품은 여러 개지만 서로 맞물려 하나의 완성품을 만듭니다

### 특징

- 관련 컴포넌트를 한 API로 묶습니다
- 사용자가 마크업 구조를 유연하게 조합할 수 있습니다
- 복잡한 UI에 잘 맞습니다

<BaseCard title="Compound 예시">
<p>
탭을 `Root`, `List`, `Trigger`, `Content`처럼 나누면, 사용하는 쪽에서 구조를 더 명확하게 잡을 수 있습니다.
</p>

```tsx
<Tabs>
  <Tabs.List>
    <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
    <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
  </Tabs.List>

  <Tabs.Content value="profile">Profile content</Tabs.Content>
  <Tabs.Content value="billing">Billing content</Tabs.Content>
</Tabs>
```
</BaseCard>

## Headless Components

Headless는 UI를 거의 정하지 않고, 동작과 상태만 제공하는 컴포넌트입니다. 열림/닫힘, 선택 상태, 클릭 처리, 접근성 로직은 제공하지만 겉모습은 사용자가 직접 만듭니다.

### 비유

- Headless = 조리법만 있는 주방
- 재료와 방법은 주지만 접시에 어떻게 담을지는 정해주지 않습니다

### 특징

- 스타일에 구애받지 않습니다
- 디자인 시스템에 맞춰 자유롭게 꾸밀 수 있습니다
- 로직 재사용성이 높습니다

<BaseCard title="Headless 예시">
<p>
`useDropdown`처럼 상태와 행동만 제공하고, 실제 UI는 바깥에서 결정하는 방식은 headless 성격이 강합니다.
</p>

```tsx
import { useState } from 'react'

function useDropdown() {
  const [open, setOpen] = useState(false)

  return {
    open,
    toggle: () => setOpen((value) => !value),
    close: () => setOpen(false),
  }
}

export default function Example() {
  const dropdown = useDropdown()

  return (
    <div>
      <button onClick={dropdown.toggle}>메뉴 열기</button>

      {dropdown.open && (
        <div style={{ border: '1px solid #ccc', padding: 12, marginTop: 8 }}>
          <div>프로필 보기</div>
          <div>설정</div>
          <button onClick={dropdown.close}>닫기</button>
        </div>
      )}
    </div>
  )
}
```
</BaseCard>

## Compound 와 Headless 의 관계

이 둘은 서로 반대가 아닙니다. 실무에서는 자주 같이 씁니다.

- `Compound`는 구조를 어떻게 나눌지의 문제입니다
- `Headless`는 UI를 얼마나 비워둘지의 문제입니다

예를 들어 `Dropdown.Trigger`, `Dropdown.Content`처럼 조각을 나눠 제공하면 compound입니다. 내부 구현이 상태 관리와 접근성 로직 중심이고 시각적 스타일은 거의 없다면 headless 성격도 함께 가집니다.

### 한 줄 요약

- Compound: 여러 조각으로 나눠 쓰기 좋게 제공하는 패턴
- Headless: 보여주는 모양은 비워두고 기능만 제공하는 패턴

## Controlled Components

Controlled는 상태를 부모가 관리하는 방식입니다. 컴포넌트가 자기 마음대로 상태를 바꾸지 않고, 부모가 내려준 값과 콜백에 맞춰 움직입니다.

### 비유

- Controlled = 꼭두각시
- 줄을 당기는 쪽이 상태를 직접 쥐고 있습니다

<BaseCard title="Controlled 예시">
<p>
모달의 열림/닫힘 상태를 부모가 쥐고 있으면 외부 상태와 동기화하기 쉽고 흐름도 예측하기 좋습니다.
</p>

```tsx
import { useState } from 'react'

function Modal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!open) return null

  return (
    <div style={{ border: '1px solid black', padding: 16 }}>
      <p>Modal content</p>
      <button onClick={() => onOpenChange(false)}>Close</button>
    </div>
  )
}

export default function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open modal</button>
      <Modal open={open} onOpenChange={setOpen} />
    </>
  )
}
```
</BaseCard>

## Uncontrolled Components

Uncontrolled는 상태를 컴포넌트 내부가 직접 관리하는 방식입니다. 부모는 초기값만 주거나, 필요할 때 결과만 확인합니다.

### 비유

- Uncontrolled = 혼자 움직이는 배우
- 내부에서 알아서 동작하고, 밖에서는 필요할 때만 확인합니다

<BaseCard title="Uncontrolled 예시">
<p>
초기값만 받고 내부에서 상태를 관리하는 모달은 uncontrolled 패턴에 가깝습니다.
</p>

```tsx
import { useState } from 'react'

function Modal({
  defaultOpen = false,
}: {
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  if (!open) return <button onClick={() => setOpen(true)}>Open modal</button>

  return (
    <div style={{ border: '1px solid black', padding: 16 }}>
      <p>Modal content</p>
      <button onClick={() => setOpen(false)}>Close</button>
    </div>
  )
}

export default function Example() {
  return <Modal defaultOpen={false} />
}
```
</BaseCard>

## 둘 다 지원하는 이유

실무에서는 controlled와 uncontrolled 중 하나만 강제하기보다 둘 다 지원하는 컴포넌트를 자주 만듭니다.

- 단순할 때는 내부 상태로 씁니다
- 복잡해지면 외부에서 상태를 제어할 수 있게 만듭니다

<BaseCard title="둘 다 지원하기">
<p>
`useControllableState`처럼 내부 상태와 외부 상태를 하나의 인터페이스로 묶으면, 컴포넌트가 훨씬 유연해집니다.
</p>

```tsx
import { useState } from 'react'

function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T
  defaultValue: T
  onChange?: (value: T) => void
}) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const isControlled = value !== undefined

  const currentValue = isControlled ? value : internalValue

  const setValue = (next: T) => {
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }

  return [currentValue, setValue] as const
}

function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
}: {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
}) {
  const [value, setValue] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  })

  return <button onClick={() => setValue(!value)}>{value ? 'ON' : 'OFF'}</button>
}
```
</BaseCard>

## Presentational / Container

이 패턴도 같이 알아두면 앞의 개념들이 더 잘 정리됩니다.

- `Presentational` 컴포넌트는 화면을 그리는 역할입니다
- `Container` 컴포넌트는 데이터와 로직을 다루는 역할입니다

### 비유

- Presentational = 무대 위 배우
- Container = 무대 뒤 스태프

배우는 관객 앞에서 보이는 역할만 하고, 스태프는 조명, 소품, 준비 작업을 맡습니다.

### 왜 쓰는가

- UI와 로직을 분리해서 유지보수가 쉬워집니다
- 같은 UI를 다른 데이터 소스에 붙이기 쉽습니다
- UI만 따로 테스트하기 좋습니다

### 요즘 관점

예전 React에서는 이 패턴을 꽤 엄격하게 나눴지만, 요즘은 많이 풀려서 로직은 custom hook으로 빼고, UI는 composition으로 조립하고, 상태 소유권은 controlled / uncontrolled로 정하는 경우가 많습니다.

## 전체 정리

- Compound는 컴포넌트를 여러 조각으로 나눠 조합하기 쉽게 만드는 패턴입니다
- Headless는 UI는 비워두고 상태와 동작만 제공하는 패턴입니다
- Controlled는 부모가 상태를 관리하는 패턴입니다
- Uncontrolled는 컴포넌트가 내부 상태를 관리하는 패턴입니다
- Compound와 Headless는 서로 다른 축이라 같이 쓸 수 있습니다
- Controlled와 Uncontrolled는 상태 소유권을 정하는 방식입니다

## 한 줄 결론

React 패턴은 결국 재사용성, 유연성, 상태 소유권을 어떻게 나눌지에 대한 설계입니다. Compound는 구조를, Headless는 동작을, Controlled / Uncontrolled는 상태를 다룹니다.

## 참고 링크

- [React 공식 문서](https://react.dev/)
- [Compound Components](https://kentcdodds.com/blog/compound-components-with-react-hooks)
- [Headless UI](https://headlessui.com/)
