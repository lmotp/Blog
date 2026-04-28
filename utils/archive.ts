export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function toTitleFromPath(href: string): string {
  return (
    href
      .split("/")
      .filter(Boolean)
      .at(-1)
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (value) => value.toUpperCase()) ?? href
  );
}
