import LayoutComponent from "#components/LayoutComponent"
import Card from "#components/common/Card"

import LinkComponent from "#components/common/LinkComponent"

const StartPage = () => (
  <LayoutComponent>
    <h2>Hey!!!</h2>

    <Card className="h-400">Some Card example</Card>
    <LinkComponent href="/examples/advanced-button">Go to advanced button</LinkComponent>
  </LayoutComponent>
)

export default StartPage
