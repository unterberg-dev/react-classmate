import type { ReactNode } from "react"

import Excerpt from "#components/common/Excerpt"
import HeadlineGroup from "#components/common/HeadlineGroup"

interface DocsHeadProps {
  main: string
  sub: string
  excerpt: ReactNode
}

export const DocsHead = ({ excerpt, main, sub }: DocsHeadProps) => (
  <>
    <HeadlineGroup main="Base Component Creation" sub="Base Component" />
    <Excerpt>
      The following examples show how to create a base component and how to extend it with custom properties.
    </Excerpt>
  </>
)
