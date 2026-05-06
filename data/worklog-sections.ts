export type WorklogSectionItem = Readonly<{
  label: string
  path: string
}>

export type WorklogSection = Readonly<{
  title: string
  items: readonly WorklogSectionItem[]
}>

export const worklogSections = [
  {
    title: '추출흐름',
    items: [
      {
        label: '문서추출',
        path: '/posts/worklog-figma-designmd-export',
      },
    ],
  },
  {
    title: '연동흐름',
    items: [
      {
        label: '슬랙연동',
        path: '/posts/worklog-figma-designmd-slack-sync',
      },
    ],
  },
] as const satisfies readonly WorklogSection[]
