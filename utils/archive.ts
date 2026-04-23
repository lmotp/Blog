export function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

export function toTitleFromPath(href: string) {
  return (
    href
      .split("/")
      .filter(Boolean)
      .at(-1)
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (value) => value.toUpperCase()) ?? href
  );
}
