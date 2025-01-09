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
import HeadlineGroup from "#components/common/HeadlineGroup"
import { SectionInnerParagraph } from "#docs/elements"
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

type GradientType = "variants" | "footer"

const SectionGradient = rc.div.variants<{ $type: GradientType }>({
  base: `
    absolute -mt-100 left-0 w-full
    h-100 
    bg-gradient-to-t
    pointer-events-none
  `,
  variants: {
    $type: {
      variants: "from-primarySuperLight top-0",
      footer: "from-light",
    },
  },
})

const StartPage = () => (
  <>
    <LayoutComponent type="small" className="px-0 z-10">
      <div className="text-center sm:w-3/4 lg:w-3/5 mx-auto mb-20">
        <DocsHead
          headingStyle="h1"
          excerpt="A tiny package for managing React component class names, variants and styles with the simplicity of styled-components and cva."
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
      <div className="text-center mb-12">
        <HeadlineGroup centered main="What's inside?" pre="Overview" />
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
          <SectionInnerParagraph>
            <strong>React Classmate</strong> allows you to separate your classname and style logic from your
            components. This way you can keep your components clean and modular.
          </SectionInnerParagraph>
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
    <LayoutComponent type="full" className="px-0 z-8 bg-primarySuperLight">
      <SectionGradient $type="variants" />
      <LayoutComponent type="small" className="px-0 z-4">
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
        <DocsNotebox type="aside" className="!my-10 md:w-3/4 mx-auto" icon={Sparkles}>
          <p>
            Typescript Users: The following examples are simplified for demonstration purposes. For a more
            detailed explanation how to keep your types, please refer to the documentation.
          </p>
        </DocsNotebox>
      </LayoutComponent>
    </LayoutComponent>
    <LayoutComponent type="full" className="px-0 z-6 bg-primarySuperLight">
      <LayoutComponent type="small" className="px-0 z-4">
        <DocsHead headingStyle="h2" excerpt="" main="React Classmate" pre="Welcome to" centered />
      </LayoutComponent>
      {/* <SectionGradient $type="footer" /> */}
    </LayoutComponent>
  </>
)

export default StartPage
