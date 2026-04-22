# Blog

Nuxt 3 basic starter setup.

## Setup

```bash
npm install
npm run dev
```

## Folder Structure

- `assets/scss`: global styles and SCSS reset
- `assets/scss/layouts`: layout shell styles
- `assets/scss/components`: reusable base, layout, and page component styles
- `assets/scss/settings`: shared SCSS tokens
- `components/layout`: app shell components
- `components/base`: low-level building blocks
- `components/home`: home page sections
- `components/documents`: documents page sections
- `components/notes`: notes page sections
- `components/search`: search page sections
- `components/error`: error page sections
- `layouts`: Nuxt layout components
- `pages`: IA-based routes for home, documents, notes, and search
- `server/api`: BFF routes
- `server/data`: mock server data
- `plugins`: Nuxt plugins such as TanStack Query
- `composables`: reusable query helpers
- `stores`: Pinia stores
- `types`: shared TypeScript types

SCSS, TypeScript, Pinia, and TanStack Query are enabled through the installed dependencies.

## CI/CD

GitHub Pages 기준으로 배포할 수 있도록 구성했습니다.

- `dev` 브랜치에서 작업하고, `main`으로 PR을 올리는 흐름을 사용합니다.
- PR마다 GitHub Pages용 정적 빌드를 실행합니다.
- `main` 브랜치에 푸시되면 GitHub Actions가 정적 산출물을 만들어 GitHub Pages로 배포합니다.

GitHub Pages 설정:

- repository settings에서 Pages source를 GitHub Actions로 설정
- 필요하면 커스텀 도메인 추가

빌드 규칙:

- GitHub Pages용 빌드에서는 `NUXT_APP_BASE_URL=/<repository>/`가 적용됩니다
- 정적 배포를 위해 `public/.nojekyll`을 포함합니다
