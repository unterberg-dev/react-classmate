import type { ReactNode } from "react"

import Excerpt from "#components/common/Excerpt"
import HeadlineGroup, { type HeadlineGroupHeadlineStyle } from "#components/common/HeadlineGroup"

interface DocsHeadProps extends HeadlineGroupHeadlineStyle {
  main: string
  pre: string
  excerpt?: ReactNode
  centered?: boolean
}

export const DocsHead = ({ excerpt, main, pre, centered, headingStyle = "h1" }: DocsHeadProps) => (
  <>
    <HeadlineGroup main={main} pre={pre} centered={centered} headingStyle={headingStyle} />
    {excerpt && <Excerpt $centered={centered}>{excerpt}</Excerpt>}
  </>
)
