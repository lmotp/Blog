<template>
  <div class="app-shell">
    <a class="skip-link" href="#main-content">본문으로 건너뛰기</a>
    <LayoutAppHeader />

    <div class="app-content">
      <main id="main-content" class="app-main">
        <slot />
      </main>

      <!-- <LayoutAppFooter /> -->
    </div>
  </div>
</template>
