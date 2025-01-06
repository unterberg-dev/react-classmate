import rc from "react-classmate"

import HighlighterComponent from "#components/HighlighterComponent"
import LayoutComponent from "#components/LayoutComponent"
import Button from "#components/common/Button"
import Card from "#components/common/Card"
import H2Headline from "#components/common/H2Headline"
import { DocsHead } from "#docs/DocsHead"
import { internalLink } from "#lib/links"

import basicCode from "#pages/index/code/basic.rcx"
import basicRenderCode from "#pages/index/code/basicRender.rcx"
import extendCode from "#pages/index/code/extend.rcx"

const Section = rc.div`
  grid-cols-1 md:grid-cols-2 
  grid gap-5
  items-center
  mb-10
`

const ExplanationHeadline = rc.extend(H2Headline)`
  mb-3
  !text-lg
`

const StartPage = () => (
  <LayoutComponent>
    {/* <H2Headline className="text-center">Components for the utility-first-css age</H2Headline>
    <H3Headline className="text-center mt-3">styled components for classnames</H3Headline> */}

    <LayoutComponent type="small" className="px-0">
      <div className="text-center w-3/4 mx-auto">
        <DocsHead
          excerpt="A tool for managing React component class names, variants and styles with the simplicity of styled-components and cva. Typescript Support."
          main="React Classmate"
          pre="Welcome to"
          centered
        />
      </div>
      <Section>
        <div>
          <ExplanationHeadline>Separate classname / style logic</ExplanationHeadline>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hend rerit
            arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
          </p>
          <Button className="mt-3" link={internalLink.docs.basic}>
            Base Component
          </Button>
        </div>
        <Card>
          <HighlighterComponent noCopy input={basicCode} noGutter />
          <HighlighterComponent noCopy input={basicRenderCode} />
        </Card>
      </Section>

      <Section>
        <Card className="order-2 md:order-1">
          <HighlighterComponent noCopy input={extendCode} noGutter />
        </Card>
        <div className="order-1 md:order-2">
          <ExplanationHeadline>Extend Components</ExplanationHeadline>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hend rerit
            arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
          </p>
          <Button className="mt-3" link={internalLink.docs.extend}>
            Extend
          </Button>
        </div>
      </Section>
    </LayoutComponent>
  </LayoutComponent>
)

export default StartPage
