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

GitHub Actions 기준으로 배포할 수 있도록 구성했습니다.

- PR마다 `npm run build`를 실행합니다.
- `main` 브랜치에 푸시되면 SSH로 서버에 접속해서 `git pull`, `npm ci`, `npm run build`, `pm2 reload`를 실행합니다.

서버에 필요한 값:

- `SSH_HOST`
- `SSH_USER`
- `SSH_PRIVATE_KEY`
- `SSH_PORT` - 선택, 기본값 `22`
- `DEPLOY_PATH` - Git 저장소가 있는 서버 절대 경로

서버 전제 조건:

- Node.js와 npm 설치
- PM2 설치
- 배포 경로에 저장소를 미리 clone 해둠
