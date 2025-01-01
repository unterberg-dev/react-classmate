import rc from "react-classmate"
import H1Headline from "#components/common/H1Headline"

const SubHeadline = rc.p`text-lg text-gray`
const MainHeadline = rc.extend(H1Headline)`mb-8`

const HeadlineGroup = ({ main, pre }: { main: string; pre: string }) => (
  <>
    <SubHeadline>{pre}</SubHeadline>
    <MainHeadline>{main}</MainHeadline>
  </>
)

export default HeadlineGroup
