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
