export type ArchiveItem = {
  href: string;
  title?: string;
};

export type ArchiveSection = {
  items: ArchiveItem[];
  title: string;
};

export const archiveSections: ArchiveSection[] = [
  {
    title: "AI",
    items: [
      { href: "https://toss.tech/article/will-ai-replace-developers", title: "개발자는 AI에게 대체될 것인가" },
      { href: "https://velog.io/@teo/we-programmer", title: "md로 코딩하는 시대" },
      { href: "https://goddaehee.tistory.com/567", title: "OpenAI Codex 서브에이전트" },
      {
        href: "https://blog.nwlee.com/codex-work-context-maintainance",
        title: "AI 에이전트에서 작업 맥락을 관리하기 위해 사용한 방법",
      },
    ],
  },
  {
    title: "JavaScript",
    items: [{ href: "https://developer.mozilla.org/ko/docs/Web/JavaScript", title: "JavaScript 문서" }],
  },
  {
    title: "개발자 커뮤니티",
    items: [
      {
        href: "https://luminousmen.substack.com/p/drunk-post-things-ive-learned-as",
        title: "시니어 엔지니어로서 배운 것들 (2021)",
      },
    ],
  },
];
