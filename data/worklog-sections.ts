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
    title: '작업내용',
    items: [
      {
        label: '01-작업내용',
        path: '/posts/worklog-header-nesting-a11y',
      },
      {
        label: '02-작업내용',
        path: '/posts/worklog-content-structure',
      },
      {
        label: '03-작업내요',
        path: '/posts/worklog-structure-routing',
      },
    ],
  },
  {
    title: '다른작업',
    items: [
      {
        label: '01-다른작업',
        path: '/posts/worklog-a11y-typescript-rules',
      },
      {
        label: '02-다른작업',
        path: '/posts/worklog-v8-note-separation',
      },
      {
        label: '03-다른작업',
        path: '/posts/worklog-content-routing-structure',
      },
    ],
  },
] as const satisfies readonly WorklogSection[]
