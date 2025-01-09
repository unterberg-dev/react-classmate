import rc from "react-classmate"

import { h1HeadlineClass } from "#components/common/H1Headline"
import { h2HeadlineClass } from "#components/common/H2Headline"

export type HeadlineGroupHeadlineStyle = {
  headingStyle?: "h1" | "h2"
}

const PreHeadline = rc.p<{ $centered: boolean }>`
  text-lg 
  text-gray
  mb-1
  ${(p) => (p.$centered ? "text-center" : "")}
`

const MainHeadline = rc.h2.variants<{
  $centered: boolean
  $headingStyle: HeadlineGroupHeadlineStyle["headingStyle"]
}>({
  base: (p) => `mb-8 ${p.$centered ? "text-center" : ""}`,
  variants: {
    $headingStyle: {
      h1: h1HeadlineClass,
      h2: h2HeadlineClass,
    },
  },
})

interface HeadlineGroupProps extends HeadlineGroupHeadlineStyle {
  main: string
  pre: string
  centered?: boolean
}

const HeadlineGroup = ({ main, pre, centered = false, headingStyle = "h2" }: HeadlineGroupProps) => (
  <>
    <PreHeadline $centered={centered}>{pre}</PreHeadline>
    <MainHeadline $headingStyle={headingStyle} $centered={centered}>
      {main}
    </MainHeadline>
  </>
)

export default HeadlineGroup
