export const blogSite = {
  name: "Blog",
  description: "박철순의 개발 블로그. 읽을 내용, 메모, 작업일지를 정리합니다.",
  url: "https://lmotp.github.io/Blog/",
  author: "박철순",
  locale: "ko_KR",
  themeColor: "#35C5F0",
  ogImage: "og-image.png",
  favicon: "favicon.svg",
} as const;

export const blogSiteAssetUrl = (path: string) => {
  const normalizedPath = path.replace(/^\/+/, "")

  return new URL(normalizedPath, blogSite.url).toString()
}
