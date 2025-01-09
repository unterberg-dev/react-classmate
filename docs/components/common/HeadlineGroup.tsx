import rc from "react-classmate"
import Headline from "#components/common/Headline"

export type HeadlineGroupHeadlineStyle = {
  headingStyle?: "h1" | "h2"
}

const PreHeadline = rc.p<{ $centered: boolean }>`
  text-lg 
  text-gray
  mb-1
  ${(p) => (p.$centered ? "text-center" : "")}
`

const MainHeadline = rc.extend(Headline)<{ $centered?: boolean }>`
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
    <MainHeadline as="h2" variant={headingStyle} $centered={centered}>
      {main}
    </MainHeadline>
  </>
)

export default HeadlineGroup
