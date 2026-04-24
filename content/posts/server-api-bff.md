---
title: Server API를 BFF로 쓰는 방법
description: 클라이언트는 /api만 호출하고, 내부 로직은 서버 라우트로 숨기는 방식입니다.
date: 2026-04-21
category: BFF
---

# Server API를 BFF로 쓰는 방법

서버 API는 클라이언트와 실제 데이터 소스 사이를 분리하는 얇은 계층입니다.

```ts
export default defineEventHandler(async () => {
  return await queryCollection('posts').order('date', 'DESC').all()
})
```

## 장점

- 클라이언트에서 데이터 소스가 직접 보이지 않습니다.
- 나중에 Notion, CMS, DB로 바꿔도 API를 유지하기 쉽습니다.
