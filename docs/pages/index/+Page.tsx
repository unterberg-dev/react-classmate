import { Blocks, BrickWall, Sparkles, SwatchBook } from "lucide-react"
import rc from "react-classmate"

import { DocsHead } from "#components/DocsHead"
import HighlighterComponent from "#components/HighlighterComponent"
import LayoutComponent from "#components/LayoutComponent"
import Button from "#components/common/Button"
import Card from "#components/common/Card"
import H2Headline from "#components/common/H2Headline"
import { internalLink } from "#lib/links"

import DocsNotebox from "#components/DocsNotebox"
import basicCode from "#pages/index/code/basic.rcx"
import basicRenderCode from "#pages/index/code/basicRender.rcx"
import extendCode from "#pages/index/code/extend.rcx"
import extendRenderCode from "#pages/index/code/extendRender.rcx"
import variantsCode from "#pages/index/code/variants.rcx"
import variantsRenderCode from "#pages/index/code/variantsRender.rcx"

const Section = rc.div`
  grid-cols-1 md:grid-cols-2 
  grid gap-10
  items-center
  mb-20
`

const ExplanationHeadline = rc.extend(H2Headline)`
  flex md:items-center items-start
  gap-2
  mb-8
  !text-xl
`

const ReferToDocButton = rc.extend(Button)`
  mt-8
`

const SecondarySectionGradient = rc.div`
  absolute top-0 -mt-100 left-0 w-full
  h-100 
  bg-gradient-to-t from-primarySuperLight 
  pointer-events-none
`

const StartPage = () => (
  <>
    <LayoutComponent type="small" className="px-0 z-3">
      <div className="text-center w-3/4 mx-auto mb-20">
        <DocsHead
          excerpt="A tool for managing React component class names, variants and styles with the simplicity of styled-components and cva."
          main="React Classmate"
          pre="Welcome to"
          centered
        />
        <div className="flex justify-center gap-4">
          <Button
            id="get-started-button"
            color="primary"
            link={internalLink.docs.getStarted}
            className="animate-in fade-in"
          >
            <Sparkles className="h-4 w-4" />
            Get Started
          </Button>
        </div>
      </div>
      <Section>
        <div>
          <ExplanationHeadline>
            <BrickWall />
            Separate classname / style logic
          </ExplanationHeadline>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hend rerit
            arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
          </p>
          <ReferToDocButton link={internalLink.docs.basic}>Base Component</ReferToDocButton>
        </div>
        <Card>
          <HighlighterComponent noCopy input={basicCode} noGutter />
          <HighlighterComponent noCopy input={basicRenderCode} />
        </Card>
      </Section>
      <Section>
        <Card className="order-2 md:order-1">
          <HighlighterComponent noCopy input={extendCode} noGutter />
          <HighlighterComponent noCopy input={extendRenderCode} />
        </Card>
        <div className="order-1 md:order-2">
          <ExplanationHeadline>
            <Blocks />
            Keep it modular
          </ExplanationHeadline>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hend rerit
            arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
          </p>
          <ReferToDocButton link={internalLink.docs.extend}>Extend Components</ReferToDocButton>
        </div>
      </Section>
    </LayoutComponent>
    {/* Secondary Section */}
    <LayoutComponent type="full" className="px-0 bg-primarySuperLight">
      <SecondarySectionGradient />
      <LayoutComponent type="small" className="px-0">
        <Section>
          <div>
            <ExplanationHeadline>
              <SwatchBook />
              Variants
            </ExplanationHeadline>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hend
              rerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh
              porttitor.
            </p>
            <ReferToDocButton link={internalLink.docs.variants}>Variants</ReferToDocButton>
          </div>
          <Card>
            <HighlighterComponent noCopy input={variantsCode} noGutter />
            <HighlighterComponent noCopy input={variantsRenderCode} />
          </Card>
        </Section>
        <DocsNotebox className="mt-5">
          <p>
            Typescript Users: The following examples are simplified for demonstration purposes. For a more
            detailed explanation how to keep your types, please refer to the documentation.
          </p>
        </DocsNotebox>
      </LayoutComponent>
    </LayoutComponent>
  </>
)

export default StartPage
