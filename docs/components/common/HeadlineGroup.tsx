import cm from "@classmate/react"
import Headline from "#components/common/Headline"

export type HeadlineGroupHeadlineStyle = {
  headingStyle?: "h1" | "h2"
}

const PreHeadline = cm.p<{ $centered: boolean }>`
  text-lg 
  text-gray
  mb-1
  ${(p) => (p.$centered ? "text-center" : "")}
`

const MainHeadline = cm.extend(Headline)<{ $centered?: boolean }>`
  mb-8 
  ${(p) => (p.$centered ? "text-center" : "")}
`

interface HeadlineGroupProps extends HeadlineGroupHeadlineStyle {
  main: string
  pre: string
  centered?: boolean
}

const HeadlineGroup = ({ main, pre, centered = false, headingStyle = "h2" }: HeadlineGroupProps) => (
  <>
    <PreHeadline $centered={centered}>{pre}</PreHeadline>
    <MainHeadline as={headingStyle} variant={headingStyle} $centered={centered}>
      {main}
    </MainHeadline>
  </>
)

export default HeadlineGroup
