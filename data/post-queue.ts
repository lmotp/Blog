export type PostQueueLink = {
  href: string;
  title: string;
};

export type PostQueueCategory = {
  items: PostQueueLink[];
  title: string;
};

export const postQueueCategories: PostQueueCategory[] = [
  {
    title: "JavaScript",
    items: [
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/API/Array/fromAsync",
        title: "Array.fromAsync",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all",
        title: "Promise.all",
      },
    ],
  },
  {
    title: "CSS",
    items: [
      {
        href: "https://developer.chrome.com/blog/entry-exit-animations?hl=ko",
        title: "transition-behavior / @starting-style",
      },
      { href: "https://developer.chrome.com/blog/anchor-positioning-api?hl=ko", title: "Anchor positioning" },
      { href: "https://developer.mozilla.org/ko/docs/Web/CSS/contain", title: "contain" },
    ],
  },
];
