# Blog SEO & Deploy Skill

## Purpose
이 레포의 메타 태그, OG 이미지, 파비콘, 배포 관련 작업 절차를 정의한다.

## When to use
- `useBlogSeo`를 수정할 때
- `nuxt.config.ts`의 head 메타를 수정할 때
- OG 이미지나 파비콘을 바꿀 때
- GitHub Pages 배포 문제를 확인할 때

## Workflow
1. 전역 메타는 `nuxt.config.ts`를 먼저 확인한다.
2. 페이지별 메타는 `composables/useBlogSeo.ts`를 확인한다.
3. OG 이미지와 favicon 경로는 배포 URL 기준으로 맞춘다.
4. 공유 미리보기 문제가 있으면 캐시를 의심하고 실제 자산 URL을 먼저 확인한다.
5. 정적 경로가 필요한 경우에만 prerender 여부를 검토한다.
6. 배포 후에는 GitHub Pages 경로에서 직접 자산 접근이 되는지 확인한다.

## Rules
- `og:image`는 배포 환경에서 실제 접근 가능한 절대 URL이어야 한다.
- favicon도 동일하게 배포 경로 기준으로 맞춘다.
- 페이지별 메타와 전역 메타를 섞지 않는다.
- 공유 카드 관련 수정은 캐시 영향을 고려한다.
- 정적 배포에서 서버 API가 필요한 구조는 최대한 피한다.
