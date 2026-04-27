import { describe, expect, it } from 'vitest'

import { postQueueCategories } from '../data/post-queue'

describe('읽을 글 데이터', () => {
  it('카테고리와 링크가 읽기 목록에 사용할 수 있는 형태인지 확인한다', () => {
    expect(postQueueCategories.length).toBeGreaterThan(0)

    for (const category of postQueueCategories) {
      expect(category.title.trim()).toBeTruthy()
      expect(category.items.length).toBeGreaterThan(0)

      for (const item of category.items) {
        expect(item.title.trim()).toBeTruthy()
        expect(item.href.trim()).toBeTruthy()
      }
    }
  })
})
