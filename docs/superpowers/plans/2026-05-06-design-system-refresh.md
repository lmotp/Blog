# DESIGN.md UI Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the existing Nuxt blog UI so every page follows `DESIGN.md` while preserving the current IA, routes, content rendering, and accessibility behavior.

**Architecture:** Keep the current component and route structure. Convert `DESIGN.md` into SCSS tokens and reusable component variants, then apply those tokens across the app shell, navigation, footer, home, posts, notes, about, and error surfaces.

**Tech Stack:** Nuxt 3, Vue SFCs with `<script setup lang="ts">`, SCSS modules imported from `assets/scss/main.scss`, Nuxt Content, Vitest.

---

## File Structure

- Modify: `assets/scss/settings/_tokens.scss`
  - Source of truth aliases for `DESIGN.md` colors, radius, spacing, shadows, and legacy variable compatibility.
- Modify: `assets/scss/settings/_mixins.scss`
  - Shared typography, list, page header, focus, nav, and prose patterns.
- Modify: `components/base/BaseButton.vue`
  - Add a typed `variant` prop while preserving existing `secondary` and `onDark` usage.
- Modify: `assets/scss/components/base/_button.scss`
  - Implement `button-primary`, `button-secondary`, `button-on-dark`, `button-secondary-on-dark`, `button-ghost`, and `button-link`.
- Modify: `components/base/BaseCard.vue`
  - Add typed `variant` and `tone` props.
- Modify: `assets/scss/components/base/_card.scss`
  - Implement card variants and pastel tones from `DESIGN.md`.
- Create: `components/base/BaseBadge.vue`
  - Small semantic label component for category/status chips.
- Modify: `assets/scss/main.scss`
  - Use the updated token palette globally and remove one-off decorative gradients if they compete with page surfaces.
- Modify: `layouts/default.vue`
  - Restore footer rendering if the refreshed shell needs `AppFooter`.
- Modify: `assets/scss/layouts/_default.scss`
  - Apply sidebar/content layout with neutral canvas, stable responsive spacing, and skip-link focus.
- Modify: `components/layout/AppHeader.vue`
  - Preserve `details/summary`, `aria-current`, and route expansion logic.
- Modify: `assets/scss/components/layout/_app-header.scss`
  - Align nav surface, active states, dividers, and subnav links with `DESIGN.md`.
- Modify: `components/layout/AppFooter.vue`
  - Keep lightweight footer text/link structure.
- Modify: `assets/scss/components/layout/_app-footer.scss`
  - Implement `footer-region` and `footer-link`.
- Modify: `components/home/HomePage.vue`
  - Keep content model and route links; use design-system button/card variants where useful.
- Modify: `assets/scss/components/home/_home-page.scss`
  - Apply `hero-band-dark`, restrained page sections, and pastel list surfaces.
- Modify: `components/posts/PostIndexPage.vue`, `components/posts/PostQueuePage.vue`, `components/posts/PostArchivePage.vue`, `components/posts/PostLinkItem.vue`
  - Keep data flow and link behavior; adjust markup only where shared components reduce duplication.
- Modify: `assets/scss/components/posts/*.scss`
  - Apply common page header, divider, list, outline, and external link styling.
- Modify: `components/notes/NotesIndexPage.vue`, `components/notes/NoteContentPage.vue`
  - Keep Nuxt Content rendering and category count data flow.
- Modify: `assets/scss/components/notes/*.scss`
  - Apply note card tones, prose rhythm, and content page typography.
- Modify: `components/about/AboutPage.vue`
  - Keep existing resume content and actions.
- Modify: `assets/scss/components/about/_about-page.scss`
  - Apply section, chip, and timeline styling from shared tokens.
- Modify: `components/error/ErrorPage.vue`
  - Keep role/live-region behavior and retry action.
- Modify: `assets/scss/components/error/_error-page.scss`, `assets/scss/layouts/_error.scss`
  - Align error state with card and button variants.

## Task 1: Token And Mixin Foundation

**Files:**
- Modify: `assets/scss/settings/_tokens.scss`
- Modify: `assets/scss/settings/_mixins.scss`
- Test: `npm run test`

- [ ] **Step 1: Expand SCSS tokens from `DESIGN.md`**

Replace the current token file with the `DESIGN.md` palette plus compatibility aliases:

```scss
$color-primary: #5645d4;
$color-primary-pressed: #4534b3;
$color-primary-deep: #3a2a99;
$color-on-primary: #ffffff;
$color-brand-navy: #0a1530;
$color-brand-navy-deep: #070f24;
$color-brand-navy-mid: #1a2a52;
$color-link-blue: #0075de;
$color-link-blue-pressed: #005bab;
$color-brand-orange: #dd5b00;
$color-brand-orange-deep: #793400;
$color-brand-pink: #ff64c8;
$color-brand-pink-deep: #a02e6d;
$color-brand-purple: #7b3ff2;
$color-brand-purple-300: #d6b6f6;
$color-brand-purple-800: #391c57;
$color-brand-teal: #2a9d99;
$color-brand-green: #1aae39;
$color-brand-yellow: #f5d75e;
$color-brand-brown: #523410;
$color-card-tint-peach: #ffe8d4;
$color-card-tint-rose: #fde0ec;
$color-card-tint-mint: #d9f3e1;
$color-card-tint-lavender: #e6e0f5;
$color-card-tint-sky: #dcecfa;
$color-card-tint-yellow: #fef7d6;
$color-card-tint-yellow-bold: #f9e79f;
$color-card-tint-cream: #f8f5e8;
$color-card-tint-gray: #f0eeec;
$color-canvas: #ffffff;
$color-surface: #f6f5f4;
$color-surface-soft: #fafaf9;
$color-hairline: #e5e3df;
$color-hairline-soft: #ede9e4;
$color-hairline-strong: #c8c4be;
$color-ink-deep: #000000;
$color-ink: #1a1a1a;
$color-charcoal: #37352f;
$color-slate: #5d5b54;
$color-steel: #787671;
$color-stone: #a4a097;
$color-muted: #bbb8b1;
$color-on-dark: #ffffff;
$color-on-dark-muted: #a4a097;
$color-success: #1aae39;
$color-warning: #dd5b00;
$color-error: #e03131;

$rounded-xs: 4px;
$rounded-sm: 6px;
$rounded-md: 8px;
$rounded-lg: 12px;
$rounded-xl: 16px;
$rounded-xxl: 20px;
$rounded-xxxl: 24px;
$rounded-full: 9999px;

$space-xxs: 4px;
$space-xs: 8px;
$space-sm: 12px;
$space-md: 16px;
$space-lg: 20px;
$space-xl: 24px;
$space-xxl: 32px;
$space-xxxl: 40px;
$space-section-sm: 48px;
$space-section: 64px;
$space-section-lg: 96px;
$space-hero: 120px;

$shadow-card: 0 12px 24px -20px rgba(15, 15, 15, 0.2);
$shadow-float: 0 24px 48px -28px rgba(15, 15, 15, 0.3);
$shadow-hero: 0 32px 72px -36px rgba(0, 0, 0, 0.48);
$focus-ring: rgba(86, 69, 212, 0.24);

$brand: $color-primary;
$brand-strong: $color-primary-pressed;
$brand-contrast: $color-on-primary;
$brand-soft: $color-card-tint-lavender;
$brand-navy: $color-brand-navy;
$brand-orange: $color-brand-orange;
$brand-orange-deep: $color-brand-orange-deep;
$brand-pink: $color-brand-pink;
$brand-pink-deep: $color-brand-pink-deep;
$brand-green: $color-brand-green;
$brand-lavender: $color-card-tint-lavender;
$brand-mint: $color-card-tint-mint;
$brand-peach: $color-card-tint-peach;
$surface: $color-surface;
$surface-elevated: $color-canvas;
$surface-card: $color-canvas;
$surface-soft: $color-surface-soft;
$surface-muted: $color-hairline-soft;
$foreground: $color-ink;
$text-primary: $color-charcoal;
$text-muted: $color-steel;
$text-subtle: $color-slate;
$border-soft: $color-hairline;
$border-strong: $color-hairline-strong;
$danger-bg: rgba(224, 49, 49, 0.08);
$danger-text: $color-error;
```

- [ ] **Step 2: Update mixins to remove negative letter spacing and share page patterns**

In `_mixins.scss`, keep existing mixin names but make typography match `DESIGN.md` and the frontend rule that letter spacing must not be negative:

```scss
@mixin page-title($size: 2.25rem, $line-height: 1.15) {
  margin: 0;
  color: $text-primary;
  font-size: $size;
  line-height: $line-height;
  font-weight: 600;
  letter-spacing: 0;
}

@mixin page-header {
  display: grid;
  gap: $space-sm;
}

@mixin section-panel($padding: $space-xl) {
  padding: $padding;
  border: 1px solid $border-soft;
  border-radius: $rounded-lg;
  background: rgba(255, 255, 255, 0.88);
}
```

- [ ] **Step 3: Run focused tests**

Run: `npm run test`

Expected: existing Vitest suite passes or reports failures unrelated to SCSS token changes.

- [ ] **Step 4: Commit token foundation**

```bash
git add assets/scss/settings/_tokens.scss assets/scss/settings/_mixins.scss
git commit -m "refactor: 디자인 시스템 토큰 정리"
```

## Task 2: Base Components

**Files:**
- Modify: `components/base/BaseButton.vue`
- Modify: `assets/scss/components/base/_button.scss`
- Modify: `components/base/BaseCard.vue`
- Modify: `assets/scss/components/base/_card.scss`
- Create: `components/base/BaseBadge.vue`
- Create: `assets/scss/components/base/_badge.scss`
- Modify: `assets/scss/main.scss`

- [ ] **Step 1: Add typed button variants**

Update `BaseButton.vue` so old usage remains valid:

```ts
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link'

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    onDark?: boolean
    secondary?: boolean
    to?: string
    type?: 'button' | 'submit' | 'reset'
    variant?: ButtonVariant
  }>(),
  {
    disabled: false,
    onDark: false,
    secondary: false,
    type: 'button',
    variant: 'primary',
  },
)

const resolvedVariant = computed<ButtonVariant>(() => {
  return props.secondary ? 'secondary' : props.variant
})

const buttonClass = computed(() => [
  'base-button',
  `base-button--${resolvedVariant.value}`,
  props.onDark ? 'base-button--on-dark' : null,
])
```

- [ ] **Step 2: Implement button styles from `DESIGN.md`**

Replace modifier logic in `_button.scss` with variant classes:

```scss
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $space-xs;
  min-height: 40px;
  padding: 10px 18px;
  border: 1px solid transparent;
  border-radius: $rounded-md;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.3;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.18s ease, background 0.18s ease, border-color 0.18s ease;

  &--primary {
    background: $color-primary;
    color: $color-on-primary;
  }

  &--secondary {
    background: transparent;
    color: $color-ink;
    border-color: $color-hairline-strong;
  }

  &--ghost {
    background: transparent;
    color: $color-ink;
    border-color: transparent;
    padding: 8px 12px;
  }

  &--link {
    min-height: auto;
    padding: 0;
    background: transparent;
    color: $color-link-blue;
    border-color: transparent;
  }

  &--on-dark.base-button--primary {
    background: $color-on-dark;
    color: $color-ink;
  }

  &--on-dark.base-button--secondary {
    color: $color-on-dark;
    border-color: rgba(255, 255, 255, 0.62);
  }
}
```

- [ ] **Step 3: Add card variants and tones**

Update `BaseCard.vue`:

```ts
type CardVariant = 'base' | 'feature' | 'template' | 'testimonial' | 'pricing'
type CardTone = 'canvas' | 'peach' | 'rose' | 'mint' | 'lavender' | 'sky' | 'yellow' | 'cream'

const props = withDefaults(
  defineProps<{
    elevated?: boolean
    title?: string
    tone?: CardTone
    variant?: CardVariant
  }>(),
  {
    elevated: false,
    tone: 'canvas',
    variant: 'base',
  },
)

const cardClass = computed(() => [
  'base-card',
  `base-card--${props.variant}`,
  `base-card--tone-${props.tone}`,
  props.elevated ? 'base-card--elevated' : null,
])
```

- [ ] **Step 4: Implement card tone styles**

Update `_card.scss` with tone modifiers:

```scss
.base-card {
  display: grid;
  gap: $space-md;
  padding: $space-xl;
  border: 1px solid $color-hairline;
  border-radius: $rounded-lg;
  background: $color-canvas;

  &--feature,
  &--testimonial,
  &--pricing {
    padding: $space-xxl;
  }

  &--template {
    padding: $space-lg;
  }

  &--tone-peach { background: $color-card-tint-peach; }
  &--tone-rose { background: $color-card-tint-rose; }
  &--tone-mint { background: $color-card-tint-mint; }
  &--tone-lavender { background: $color-card-tint-lavender; }
  &--tone-sky { background: $color-card-tint-sky; }
  &--tone-yellow { background: $color-card-tint-yellow; }
  &--tone-cream { background: $color-card-tint-cream; }
}
```

- [ ] **Step 5: Add `BaseBadge` for repeated labels and chips**

Create `components/base/BaseBadge.vue`:

```vue
<template>
  <span :class="badgeClass">
    <slot />
  </span>
</template>

<script setup lang="ts">
type BadgeTone = 'purple' | 'pink' | 'orange' | 'green' | 'lavender'

const props = withDefaults(
  defineProps<{
    tone?: BadgeTone
  }>(),
  {
    tone: 'lavender',
  },
)

const badgeClass = computed(() => ['base-badge', `base-badge--${props.tone}`])
</script>
```

- [ ] **Step 6: Run tests and commit**

Run: `npm run test`

Expected: existing tests pass.

```bash
git add components/base assets/scss/components/base assets/scss/main.scss
git commit -m "refactor: 공통 컴포넌트 디자인 시스템 반영"
```

## Task 3: App Shell, Header, Footer

**Files:**
- Modify: `layouts/default.vue`
- Modify: `assets/scss/layouts/_default.scss`
- Modify: `components/layout/AppHeader.vue`
- Modify: `assets/scss/components/layout/_app-header.scss`
- Modify: `components/layout/AppFooter.vue`
- Modify: `assets/scss/components/layout/_app-footer.scss`

- [ ] **Step 1: Restore footer in default layout**

Change `layouts/default.vue` so the footer renders:

```vue
<div class="app-content">
  <main id="main-content" class="app-main">
    <slot />
  </main>

  <LayoutAppFooter />
</div>
```

- [ ] **Step 2: Align shell surface and spacing**

Update `_default.scss` so content uses `canvas` and responsive spacing:

```scss
.app-shell {
  min-height: 100svh;
  display: grid;
  grid-template-columns: 304px minmax(0, 1fr);
  background: $color-surface;

  .app-content {
    min-width: 0;
    display: grid;
    align-content: start;
    background: $color-canvas;
  }

  .app-main {
    width: min(100%, 1080px);
    margin: 0 auto;
    padding: $space-section-sm $space-xxl $space-section;
  }
}
```

- [ ] **Step 3: Keep header behavior, refresh header styling**

Do not remove the route watcher or `details/summary` logic in `AppHeader.vue`. Update only markup if classes need clearer BEM names. In `_app-header.scss`, use:

```scss
.app-header {
  position: sticky;
  top: 0;
  min-height: 100svh;
  padding: $space-xl;
  border-right: 1px solid $color-hairline;
  background: $color-surface-soft;
  color: $color-charcoal;
}
```

- [ ] **Step 4: Refresh nav entry states**

Use `@include nav-entry()` and active styles:

```scss
.app-header__link,
.app-header__summary,
.app-header__sublink {
  @include nav-entry();
  text-decoration: none;

  &[aria-current='page'],
  &.router-link-active {
    border-left-color: $color-primary;
    background: $color-card-tint-lavender;
    color: $color-primary-deep;
  }
}
```

- [ ] **Step 5: Update footer to `footer-region`**

Keep `AppFooter.vue` simple:

```vue
<template>
  <footer class="app-footer">
    <p class="app-footer__text">Blog · Nuxt 3 · DESIGN.md</p>
    <NuxtLink to="/about" class="app-footer__link">소개</NuxtLink>
  </footer>
</template>
```

- [ ] **Step 6: Run tests and commit**

Run: `npm run test`

Expected: existing tests pass.

```bash
git add layouts/default.vue assets/scss/layouts/_default.scss components/layout assets/scss/components/layout
git commit -m "refactor: 앱 셸과 내비게이션 디자인 시스템 반영"
```

## Task 4: Home And Page Groups

**Files:**
- Modify: `components/home/HomePage.vue`
- Modify: `assets/scss/components/home/_home-page.scss`
- Modify: `components/posts/PostIndexPage.vue`
- Modify: `components/posts/PostQueuePage.vue`
- Modify: `components/posts/PostArchivePage.vue`
- Modify: `components/posts/PostLinkItem.vue`
- Modify: `assets/scss/components/posts/_posts-page.scss`
- Modify: `assets/scss/components/posts/_posts-queue-page.scss`
- Modify: `assets/scss/components/posts/_posts-archive-page.scss`
- Modify: `assets/scss/components/posts/_posts-link-item.scss`

- [ ] **Step 1: Apply `hero-band-dark` to home without changing data flow**

Keep `readingQueuePreview` and `noteLinks`. Update button variants:

```vue
<BaseButton to="/posts/reading">읽을 내용 보기</BaseButton>
<BaseButton to="/posts" variant="secondary" on-dark>작업일지 보기</BaseButton>
```

- [ ] **Step 2: Style home hero and sections from `DESIGN.md`**

Use deep navy and pastel tones:

```scss
.home-page__hero {
  display: grid;
  gap: $space-md;
  padding: clamp($space-xxl, 7vw, $space-hero);
  background: $color-brand-navy;
  color: $color-on-dark;
}

.home-page__section {
  @include section-panel($space-xl);
}
```

- [ ] **Step 3: Normalize posts page headers and dividers**

Keep current `PostIndexPage.vue` data resolution. Use shared page header SCSS:

```scss
.posts-page__header,
.posts-queue-page__header,
.posts-archive-page__header {
  @include page-header;
}

.posts-page__divider,
.posts-queue-page__divider,
.posts-archive-page__divider {
  height: 1px;
  background: $color-hairline;
}
```

- [ ] **Step 4: Keep outline list behavior for worklog**

Preserve `작업내용` and `다른작업` groups. Style outline links:

```scss
.posts-page__group-outline {
  border-left: 1px solid $color-hairline;
  padding-left: $space-lg;
}

.posts-page__outline-link {
  display: inline-flex;
  flex-wrap: wrap;
  gap: $space-xs;
  color: $color-charcoal;
  text-decoration: none;
}
```

- [ ] **Step 5: Keep external link accessibility**

Do not remove `aria-label`, `rel`, or `target` from `PostLinkItem.vue` and `PostArchivePage.vue`.

- [ ] **Step 6: Run tests and commit**

Run: `npm run test`

Expected: existing tests pass.

```bash
git add components/home components/posts assets/scss/components/home assets/scss/components/posts
git commit -m "refactor: 홈과 작업일지 화면 디자인 시스템 반영"
```

## Task 5: Notes, About, Error

**Files:**
- Modify: `components/notes/NotesIndexPage.vue`
- Modify: `components/notes/NoteContentPage.vue`
- Modify: `assets/scss/components/notes/_notes-index-page.scss`
- Modify: `assets/scss/components/notes/_notes-content-page.scss`
- Modify: `components/about/AboutPage.vue`
- Modify: `assets/scss/components/about/_about-page.scss`
- Modify: `components/error/ErrorPage.vue`
- Modify: `assets/scss/components/error/_error-page.scss`
- Modify: `assets/scss/layouts/_error.scss`

- [ ] **Step 1: Keep note data flow and apply card tones**

Preserve `queryCollection('notes')` and category counts. Style cards:

```scss
.notes-index-page__card {
  display: grid;
  gap: $space-sm;
  padding: $space-xl;
  border: 1px solid $color-hairline;
  border-radius: $rounded-lg;
  background: $color-card-tint-cream;
  color: $color-charcoal;
  text-decoration: none;
}
```

- [ ] **Step 2: Apply prose rhythm to note content**

Use existing `ContentRenderer` and update article style:

```scss
.note-content-page__article {
  @include prose-stack;
  max-width: 74ch;

  :where(p, li) {
    @include prose-text;
  }

  :where(a) {
    color: $color-link-blue;
  }
}
```

- [ ] **Step 3: Refresh about page without changing content**

Keep existing `skills` and `experiences`. Style chips as tag badges:

```scss
.about-page__chip {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 2px $space-sm;
  border-radius: $rounded-sm;
  background: $color-card-tint-lavender;
  color: $color-brand-purple-800;
  font-size: 0.8125rem;
  font-weight: 600;
}
```

- [ ] **Step 4: Align error page with base card/button variants**

Keep `role="alert"` and `aria-live`. Update retry button:

```vue
<BaseButton v-if="!isNotFound" variant="secondary" type="button" @click="retryPage">
  다시 시도
</BaseButton>
```

- [ ] **Step 5: Run tests and commit**

Run: `npm run test`

Expected: existing tests pass.

```bash
git add components/notes components/about components/error assets/scss/components/notes assets/scss/components/about assets/scss/components/error assets/scss/layouts/_error.scss
git commit -m "refactor: 메모 소개 오류 화면 디자인 시스템 반영"
```

## Task 6: Verification And Cleanup

**Files:**
- Inspect: all modified files from Tasks 1-5
- Optional Modify: `assets/scss/main.scss`
- Optional Modify: `README.md`

- [ ] **Step 1: Search for obsolete style names**

Run: `rg -n "base-button--secondary-on-dark|base-button--secondary|shadow-inset|letter-spacing: -" assets components layouts pages`

Expected: no stale button modifier dependency that conflicts with new variant classes, and no negative letter spacing.

- [ ] **Step 2: Verify new component usage**

Run: `rg -n "BaseBadge|BaseSectionHeader" components pages`

Expected: `BaseBadge` has at least one usage. `BaseSectionHeader` should not appear because this plan keeps section headings in page components.

- [ ] **Step 3: Run Vitest**

Run: `npm run test`

Expected: all existing tests pass.

- [ ] **Step 4: Try design lint without treating network failure as implementation failure**

Run: `npm run design:lint`

Expected: pass if `@google/design.md` is available. If it fails with `ENOTFOUND registry.npmjs.org`, record that network prevented verification.

- [ ] **Step 5: Do not run build unless explicitly requested**

Do not run `npm run build` because `AGENTS.md` says builds are only run when the user asks.

- [ ] **Step 6: Commit cleanup**

```bash
git add assets components layouts pages README.md
git commit -m "chore: 디자인 시스템 적용 후 정리"
```

If there are no cleanup changes, skip this commit.

## Self-Review

- Spec coverage: Tasks 1-6 cover tokens, mixins, base components, app shell, layout navigation, footer, all page groups, accessibility, verification, and cleanup.
- Red-flag scan: No unresolved implementation markers are used.
- Type consistency: `ButtonVariant`, `CardVariant`, and `CardTone` names are introduced before later tasks reference them.
- Scope check: The plan does not rewrite routes, Markdown content, data sources, or deployment configuration.
