export type ArchiveItemSource = {
  href: string;
};

export type ArchiveResolvedItem = {
  href: string;
  title: string;
};

export type ArchiveSectionSource = {
  items: ArchiveItemSource[];
  title: string;
};

export type ArchiveSectionResolved = {
  items: ArchiveResolvedItem[];
  title: string;
};

export const archiveSections: ArchiveSectionSource[] = [
  {
    title: "AI",
    items: [
      { href: "https://news.hada.io/topic?id=27566" },
      { href: "https://toss.tech/article/will-ai-replace-developers" },
      {
        href: "https://velog.io/@teo/we-programmer#2%EB%B6%80-md%EB%A1%9C-%EC%BD%94%EB%94%A9%ED%95%98%EB%8A%94-%EC%8B%9C%EB%8C%80",
      },
      { href: "https://goddaehee.tistory.com/567" },
    ],
  },
  {
    title: "JavaScript",
    items: [],
  },
];
