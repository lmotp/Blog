---
title: 컴포넌트 폴더를 나누는 기준
description: base, layout, page 단위로 컴포넌트를 나눌 때 어떤 기준으로 구분할지 정리한 샘플 글입니다.
date: 2026-04-22
category: Components
---

# 컴포넌트 폴더를 나누는 기준

컴포넌트는 재사용 범위가 가장 먼저 보여야 한다.

## 추천 기준

- `base`: 버튼, 카드, 입력처럼 가장 작은 단위
- `layout`: 헤더, 푸터, 사이드바처럼 화면 골격
- `home`, `documents`, `notes`, `posts`: 각 페이지 전용 블록

## 이렇게 나누는 이유

재사용 범위가 섞이면 구조가 빨리 흐려진다.
작은 단위는 `base`에 두고, 화면 전용 조각은 페이지명 폴더에 두면 찾기 쉽다.

## 예시

```txt
components/
  base/
  layout/
  home/
  documents/
  notes/
  posts/
```

## 정리

컴포넌트 폴더는 기능 이름보다 역할 이름으로 나누는 편이 유지보수에 유리하다.
