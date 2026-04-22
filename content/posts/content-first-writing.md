---
title: Markdown 우선 블로그 작성 흐름
description: 글은 md로 쓰고, 뷰와 상태 관리는 Nuxt로 유지하는 운영 방식입니다.
date: 2026-04-20
category: Writing
readingStatus: archive
readingCategory: 글감
---

# Markdown 우선 블로그 작성 흐름

글 하나를 추가할 때는 파일 하나를 만드는 것으로 끝나는 구성이 좋습니다.

## 예시

1. `content/posts`에 md 파일을 만든다.
2. frontmatter로 제목과 날짜를 넣는다.
3. 본문을 작성한다.
4. 배포하면 정적 HTML로 반영된다.

이 방식은 글 수가 늘어날수록 관리가 쉬워집니다.
