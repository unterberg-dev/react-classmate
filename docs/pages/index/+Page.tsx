import rc from "react-classmate"
import LayoutComponent from "#components/LayoutComponent"
import Card from "#components/common/Card"
import H2Headline from "#components/common/H2Headline"
import H3Headline from "#components/common/H3Headline"
import H4Headline from "#components/common/H4Headline"
import { APP_CONFIG } from "#lib/config"

const AnimatedCard = rc.extend(Card)`
  ${APP_CONFIG.uno.transitionWind}
   hover:-translate-y-2
`

const StartPage = () => (
  <LayoutComponent>
    <H2Headline className="text-center">Create components for the utility-first age</H2Headline>
    <H3Headline className="text-center mt-3">works like styled components for classnames</H3Headline>
    <LayoutComponent type="small" className="mt-10 px-0">
      <div className="grid-cols-3 grid gap-3">
        <AnimatedCard>
          <H4Headline>Base</H4Headline>
          <p>Card content</p>
        </AnimatedCard>
        <AnimatedCard>
          <H4Headline>Extend Component</H4Headline>
          <p>Card content</p>
        </AnimatedCard>
        <AnimatedCard>
          <H4Headline>Create Variants</H4Headline>
          <p>Card content</p>
        </AnimatedCard>
      </div>
    </LayoutComponent>
  </LayoutComponent>
)

export default StartPage
