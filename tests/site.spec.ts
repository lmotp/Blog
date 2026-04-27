import { describe, expect, it } from 'vitest'

import { blogSite, blogSiteAssetUrl } from '../data/site'

describe('블로그 자산 주소', () => {
  it('상대 경로를 절대 주소로 만든다', () => {
    expect(blogSiteAssetUrl('favicon.svg')).toBe('https://lmotp.github.io/Blog/favicon.svg')
    expect(blogSiteAssetUrl('/og-image.png?v=2')).toBe('https://lmotp.github.io/Blog/og-image.png?v=2')
  })

  it('사이트 기본 주소를 유지한다', () => {
    expect(blogSite.url).toBe('https://lmotp.github.io/Blog/')
  })
})
