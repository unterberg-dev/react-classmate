import type { ReactNode } from "react"

import Excerpt from "#components/common/Excerpt"
import HeadlineGroup from "#components/common/HeadlineGroup"

interface DocsHeadProps {
  main: string
  pre: string
  excerpt: ReactNode
}

export const DocsHead = ({ excerpt, main, pre }: DocsHeadProps) => (
  <>
    <HeadlineGroup main={main} pre={pre} />
    <Excerpt>{excerpt}</Excerpt>
  </>
)
