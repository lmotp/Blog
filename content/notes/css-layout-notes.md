---
title: CSS 레이아웃 메모
description: flex와 grid를 볼 때 먼저 확인하는 기준을 정리한 메모입니다.
date: 2026-04-22
category: CSS
---

# CSS 레이아웃 메모

레이아웃 문제를 볼 때는 정렬 축과 컨테이너 크기부터 확인한다.

## 먼저 보는 것

- 부모가 `flex`인지 `grid`인지 확인한다.
- 주 축과 교차 축을 구분한다.
- `gap`, `justify-content`, `align-items`의 역할을 분리해서 본다.

## 자주 헷갈리는 부분

`align-items`는 세로 정렬처럼 보이지만, 실제로는 플렉스 방향에 따라 축이 달라진다.
그래서 항상 부모의 방향부터 읽는 습관이 필요하다.
