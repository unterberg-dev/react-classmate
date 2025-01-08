import rc from "react-classmate"
import { h2HeadlineClass } from "#components/common/H2Headline"

const SubHeadline = rc.p`text-lg text-gray`
const MainHeadline = rc.h2`mb-8 ${h2HeadlineClass}`

const HeadlineGroup = ({ main, pre }: { main: string; pre: string }) => (
  <>
    <SubHeadline>{pre}</SubHeadline>
    <MainHeadline>{main}</MainHeadline>
  </>
)

export default HeadlineGroup
