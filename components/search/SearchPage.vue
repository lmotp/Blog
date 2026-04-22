<template>
  <section class="search-page">
    <header class="search-page__header">
      <p class="search-page__eyebrow">검색</p>
      <h1 class="search-page__title">문서와 노트를 함께 찾기</h1>
      <p class="search-page__lead">
        문서명, 글 제목, 키워드를 기준으로 전체 콘텐츠를 빠르게 찾는 영역입니다.
      </p>
    </header>

    <BaseCard title="검색 범위">
      <div class="search-page__filters">
        <BaseInput label="검색어" placeholder="문서명, 제목, 키워드 입력" />
        <BaseButton>검색</BaseButton>
      </div>
      <ul class="search-page__list">
        <li>문서명</li>
        <li>글 제목</li>
        <li>키워드</li>
      </ul>
    </BaseCard>
  </section>
</template>
