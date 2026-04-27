import { describe, expect, it } from 'vitest'

import { isExternalHref, toTitleFromPath } from '../utils/archive'

describe('아카이브 유틸', () => {
  it('외부 주소를 판별한다', () => {
    expect(isExternalHref('https://example.com')).toBe(true)
    expect(isExternalHref('http://example.com')).toBe(true)
    expect(isExternalHref('/posts/archive')).toBe(false)
    expect(isExternalHref('posts/archive')).toBe(false)
  })

  it('경로를 읽기 쉬운 제목으로 변환한다', () => {
    expect(toTitleFromPath('/posts/nuxt-content-structure')).toBe('Nuxt Content Structure')
    expect(toTitleFromPath('/notes/javascript')).toBe('Javascript')
    expect(toTitleFromPath('/')).toBe('/')
  })
})
