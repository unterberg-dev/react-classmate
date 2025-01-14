import { Blocks, BrickWall, Sparkles, SwatchBook } from "lucide-react"
import rc from "react-classmate"

import { DocsHead } from "#components/DocsHead"
import HighlighterComponent from "#components/HighlighterComponent"
import LayoutComponent from "#components/LayoutComponent"
import Button from "#components/common/Button"
import Card from "#components/common/Card"
import Headline, {
  H1Headline,
  H2Headline,
  H3Headline,
  H4Headline,
  H5Headline,
} from "#components/common/Headline"
import { externalLink, internalLink } from "#lib/links"

import DocsNotebox from "#components/DocsNotebox"
import CodeElement from "#components/common/CodeElement"
import HeadlineGroup from "#components/common/HeadlineGroup"
import NpmLogo from "#components/common/NpmLogo"
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

const ExplanationHeadline = rc.extend(H3Headline)`
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

const IntroParagraph = rc.p`
  text-lg
`

const ThanksHeadline = rc.extend(Headline)`
  mb-4
`

const ThanksParagraph = rc.p`
  text-sm
`

const StartPage = () => (
  <>
    <LayoutComponent type="small" className="px-0 z-10">
      <div className="text-center sm:w-3/4 lg:w-3/5 mx-auto mb-20">
        <DocsHead
          headingStyle="h1"
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
          <Button
            aria-label="Visit NPM Package"
            link={externalLink.npm}
            color="secondary"
            className="animate-in fade-in"
          >
            <div className="h-4.5 w-4.5">
              <NpmLogo color="lightNeutral" />
            </div>
            Check on NPM
          </Button>
        </div>
      </div>
      <div className="text-center mb-12">
        <HeadlineGroup centered main="What's inside?" pre="Overview" />
      </div>
      <Section>
        <div>
          <ExplanationHeadline>
            <BrickWall className="h-5 w-5" />
            Compose simple components
          </ExplanationHeadline>
          <IntroParagraph>
            Create elements on the fly. No need to write repetitive classnames or style logic.
          </IntroParagraph>
          <ReferToDocButton link={internalLink.docs.basic}>Base Component</ReferToDocButton>
        </div>
        <Card>
          <HighlighterComponent noCopy input={basicCode} noGutter />
          <HighlighterComponent noCopy input={basicRenderCode} />
        </Card>
      </Section>
      <Section>
        <Card className="order-2 md:order-1">
          <HighlighterComponent noCopy input={variantsCode} noGutter />
          <HighlighterComponent noCopy input={variantsRenderCode} />
        </Card>
        <div className="order-1 md:order-2">
          <ExplanationHeadline>
            <SwatchBook className="h-5 w-5" />
            Variants
          </ExplanationHeadline>
          <IntroParagraph>
            Create styled components with different variants based on the props you pass to it.
          </IntroParagraph>
          <ReferToDocButton link={internalLink.docs.variants}>Variants</ReferToDocButton>
        </div>
      </Section>
    </LayoutComponent>
    {/* Secondary Section */}
    <LayoutComponent type="full" className="z-8 bg-primarySuperLight">
      <SectionGradient $type="variants" />
      <LayoutComponent type="small" className="z-4">
        <Section>
          <div>
            <ExplanationHeadline>
              <Blocks className="h-5 w-5" />
              Adapt components with <CodeElement $size="xl">rc.extend</CodeElement>
            </ExplanationHeadline>
            <IntroParagraph>
              Extend components with additional classes or styles with the common syntax. Properties from the
              base component stay accessible.
            </IntroParagraph>
            <ReferToDocButton link={internalLink.docs.extend}>Extend Components</ReferToDocButton>
          </div>
          <Card className="order-2 md:order-1">
            <HighlighterComponent noCopy input={extendCode} noGutter />
            <HighlighterComponent noCopy input={extendRenderCode} />
          </Card>
        </Section>
        <DocsNotebox type="warning" className="!my-10 md:w-3/4 mx-auto shadow-md" icon={Sparkles}>
          <p>
            Typescript Users: The examples above are simplified for demonstration purposes. For a more
            detailed explanation how to keep your types, please refer to the documentation.
          </p>
        </DocsNotebox>
      </LayoutComponent>
      {/* 
      <LayoutComponent type="tiny" className="z-4">
        <HeadlineGroup headingStyle="h2" centered main="Special Thanks" pre="Overview" />
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <ThanksHeadline as="h3" variant="h6">
              tailwind-styled-components
            </ThanksHeadline>
            <ThanksParagraph>
              This brought the idea of using tailwind classes with styled-components. It was the inspiration
              for the base component. I extended the idea to support variants and the updated interpolation
              syntax.
            </ThanksParagraph>
          </Card>
          <Card>
            <ThanksHeadline as="h3" variant="h6">
              cva - class variance authority
            </ThanksHeadline>
            <ThanksParagraph>
              cva's idea of thinking in variants is the foundation for <CodeElement>rc</CodeElement>`s variant
              system. It provides a simple and powerful way to manage classnames and styles based on props.
            </ThanksParagraph>
          </Card>
          <Card>
            <ThanksHeadline as="h3" variant="h6">
              cva - class variance authority
            </ThanksHeadline>
          </Card>
        </div>
      </LayoutComponent> */}
      <SectionGradient $type="footer" />
    </LayoutComponent>
  </>
)

export default StartPage
