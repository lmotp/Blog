import type { ArchiveSectionResolved } from '~/data/archive-sections';
import { archiveSections } from '~/data/archive-sections';
import { isExternalHref, toTitleFromPath } from '~/utils/archive';

const titleCache = new Map<string, string>();

export default defineEventHandler(async () => {
  return Promise.all(
    archiveSections.map(async (section): Promise<ArchiveSectionResolved> => {
      const items = await Promise.all(
        section.items.map(async (item) => ({
          href: item.href,
          title: await resolveArchiveTitle(item.href),
        })),
      );

      return {
        items,
        title: section.title,
      };
    }),
  );
});

async function resolveArchiveTitle(href: string) {
  const cached = titleCache.get(href);
  if (cached) {
    return cached;
  }

  const title = isExternalHref(href) ? await resolveExternalTitle(href) : await resolveInternalTitle(href);
  const resolvedTitle = title || href;

  titleCache.set(href, resolvedTitle);
  return resolvedTitle;
}

async function resolveInternalTitle(href: string) {
  if (href.startsWith('/posts/')) {
    const post = await queryCollection('posts').path(href).select('title').first();
    return post?.title ?? toTitleFromPath(href);
  }

  if (href.startsWith('/notes/')) {
    const note = await queryCollection('notes').path(href).select('title').first();
    return note?.title ?? toTitleFromPath(href);
  }

  return toTitleFromPath(href);
}

async function resolveExternalTitle(href: string) {
  try {
    const response = await fetch(href, {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      return '';
    }

    const html = await response.text();

    return extractMetaTitle(html, 'og:title') ?? extractMetaTitle(html, 'twitter:title') ?? extractDocumentTitle(html);
  } catch {
    return '';
  }
}

function extractMetaTitle(html: string, property: string) {
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const metaMatch = html.match(
    new RegExp(`<meta[^>]+(?:property|name)=[\"']${escaped}[\"'][^>]+content=[\"']([^\"']+)[\"']`, 'i'),
  );

  return metaMatch?.[1]?.trim() ?? '';
}

function extractDocumentTitle(html: string) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!titleMatch?.[1]) {
    return '';
  }

  return titleMatch[1]
    .replace(/\s+/g, ' ')
    .replace(/\s*[|–-]\s*[^|–-]+$/, '')
    .trim();
}
