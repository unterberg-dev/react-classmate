import rc from "react-classmate"

import HighlighterComponent from "#components/HighlighterComponent"
import LayoutComponent from "#components/LayoutComponent"
import Button from "#components/common/Button"
import Card from "#components/common/Card"
import H2Headline from "#components/common/H2Headline"
import { DocsHead } from "#docs/DocsHead"
import { internalLink } from "#lib/links"

import { Blocks, BrickWall } from "lucide-react"
import DocsNotebox from "#docs/DocsNotebox"
import basicCode from "#pages/index/code/basic.rcx"
import basicRenderCode from "#pages/index/code/basicRender.rcx"
import extendCode from "#pages/index/code/extend.rcx"
import extendRenderCode from "#pages/index/code/extendRender.rcx"

const Section = rc.div`
  grid-cols-1 md:grid-cols-2 
  grid gap-5
  items-center
  mb-10
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
      <div className="text-center w-3/4 mx-auto">
        <DocsHead
          excerpt="A tool for managing React component class names, variants and styles with the simplicity of styled-components and cva. Developed with Typescript in mind."
          main="React Classmate"
          pre="Welcome to"
          centered
        />
      </div>
      <Section className="mt-20">
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
            Extend Components
          </ExplanationHeadline>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hend rerit
            arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
          </p>
          <ReferToDocButton link={internalLink.docs.extend}>Extend</ReferToDocButton>
        </div>
      </Section>
    </LayoutComponent>
    <LayoutComponent type="full" className="px-0 bg-primarySuperLight">
      <SecondarySectionGradient />
      <LayoutComponent type="small" className="px-0">
        <Section>
          <div>
            <ExplanationHeadline>Variants</ExplanationHeadline>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hend
              rerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh
              porttitor.
            </p>
            <ReferToDocButton link={internalLink.docs.extend}>Extend</ReferToDocButton>
          </div>
          <Card>
            <HighlighterComponent noCopy input={extendCode} noGutter />
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
