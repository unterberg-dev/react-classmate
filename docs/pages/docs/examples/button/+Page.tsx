import rc from "react-classmate"

import { DocsHead } from "#components/DocsHead"
import DocsNotebox from "#components/DocsNotebox"
import HighlighterComponent from "#components/HighlighterComponent"
import Button from "#components/common/Button"
import CodeElement from "#components/common/CodeElement"
import { H4Headline, H5Headline } from "#components/common/Headline"
import LinkComponent from "#components/common/LinkComponent"
import { Section, SectionHeadline, SectionInnerParagraph } from "#docs/elements"
import { internalLink } from "#lib/links"

import { CircleAlert } from "lucide-react"
import advancedButtonCode from "#examples/button/code/advanced-button.rcx"
import sizingButtonCode from "#examples/button/code/sizes.rcx"

const ButtonRow = rc.div`
  flex
  flex-wrap
  items-center
  gap-4
  w-full
`

const ButtonPage = () => (
  <>
    <DocsHead
      main="Button Component (Tailwind / Uno)"
      pre="Designing with Variants"
      excerpt={
        <>
          An example of an advanced Tailwind / Uno (Windi) button component that fully utilizes the features
          of <CodeElement>variants</CodeElement> and Tailwind classes.
        </>
      }
    />

    <DocsNotebox type="warning" icon={CircleAlert} className="!mb-8">
      This article is currently under construction. If you need more explanation how parts of this component
      works, see the well documented{" "}
      <LinkComponent href={internalLink.example.headline}>Headline Component</LinkComponent>.
    </DocsNotebox>

    <SectionHeadline>Intro: It all started here</SectionHeadline>
    <Section>
      <SectionInnerParagraph>
        The task of blueprinting a redundantly placed button, fully utilizing its design through
        property-controlled utility classes. Writing this only as a React component is a nightmare. And even
        then, at the point when you think you finally have this one "perfect button," you are unable to
        properly maintain it through the variability of project requirements and the resulting "horizontal
        styling." My wish was to read those heavily styled components like a book, with all the information I
        need to know about its design and behavior. This is why I created{" "}
        <LinkComponent href={internalLink.start}>react-classmate</LinkComponent>.
      </SectionInnerParagraph>
      <SectionInnerParagraph>
        The main idea of this project is to engage myself in properly designing and managing class names and
        separating them from the application logic.
      </SectionInnerParagraph>
      <p>
        This example requires you to have a basic understanding of Tailwind and its utility classes. If you
        are not familiar with it, I recommend that you read the{" "}
        <LinkComponent href="https://tailwindcss.com/docs/utility-first">
          Tailwind "Utility-First Fundamentals"
        </LinkComponent>{" "}
        first.
      </p>
    </Section>

    <SectionHeadline>Full Code</SectionHeadline>
    <Section>
      <SectionInnerParagraph>
        The code below features dark (:dark) mode, hover (:hover), and active (:active) states as utility
        classes. You can also control the <CodeElement>noGutter</CodeElement>,{" "}
        <CodeElement>disabled</CodeElement>,<CodeElement>loading</CodeElement>,{" "}
        <CodeElement>noShadow</CodeElement>, and <CodeElement>type</CodeElement> properties.
      </SectionInnerParagraph>
      <SectionInnerParagraph>
        This introduces the usage of the utility type <CodeElement>VariantsConfig</CodeElement> and the
        utility function <CodeElement>convertRcProps</CodeElement>. More on both below.
      </SectionInnerParagraph>
      <HighlighterComponent input={advancedButtonCode} />
      <DocsNotebox className="!mb-0">
        <H5Headline as="h3">
          Usage of the Important <CodeElement>!</CodeElement> Prefix in Tailwind
        </H5Headline>
        <SectionInnerParagraph>
          In general, I would not recommend using the <CodeElement>!</CodeElement> override (which is similar
          to !important) too often in classmate components, since we should preserve its usage. In the case of
          this button, we only override the padding and the shadow, which can be set using explicit props.
        </SectionInnerParagraph>
      </DocsNotebox>
    </Section>
    <SectionHeadline>Button Sizing</SectionHeadline>
    <Section>
      <SectionInnerParagraph>
        This is a basic button with the <CodeElement>type="button"</CodeElement> attribute.
      </SectionInnerParagraph>
      <div>
        <HighlighterComponent input={sizingButtonCode} />
      </div>
      <ButtonRow>
        <Button type="button" size="lg">
          Button Big
        </Button>
        <Button type="button">Button Medium</Button>
        <Button type="button" size="sm">
          Button Small
        </Button>
        <Button type="button" size="xs">
          Button Extra Small
        </Button>
      </ButtonRow>
    </Section>
    <Section>
      <DocsNotebox icon={CircleAlert} className="!mb-0">
        More examples coming soon!
      </DocsNotebox>
    </Section>
  </>
)

export default ButtonPage
