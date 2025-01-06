import type { ReactNode } from "react"

import Excerpt from "#components/common/Excerpt"
import HeadlineGroup from "#components/common/HeadlineGroup"

interface DocsHeadProps {
  main: string
  pre: string
  excerpt: ReactNode
  centered?: boolean
}

export const DocsHead = ({ excerpt, main, pre, centered }: DocsHeadProps) => (
  <>
    <HeadlineGroup main={main} pre={pre} />
    <Excerpt $centered={centered}>{excerpt}</Excerpt>
  </>
)
