---
title: Nuxt Content 구조 잡는 법
description: Markdown 파일을 content/posts에 두고 Nuxt 페이지에서 렌더링하는 기본 구조입니다.
date: 2026-04-22
category: Architecture
readingStatus: reading
readingCategory: 기술글
---

# Nuxt Content 구조 잡는 법

이 글은 이 레포에서 Markdown 글을 어떻게 관리할지 정리한 예시입니다.

## 핵심 원칙

- 본문은 `content/posts`에 둡니다.
- 화면 프레임은 `pages/posts/[slug].vue`가 담당합니다.
- 공통 스타일은 `layouts/default.vue`와 `assets/scss`가 담당합니다.

## 왜 이렇게 나누나

Markdown은 글 작성에만 집중하고, 레이아웃과 인터랙션은 Nuxt가 맡게 하면 구조가 단순해집니다.
