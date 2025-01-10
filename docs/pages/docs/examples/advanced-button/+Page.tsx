import rc from "react-classmate"

import { DocsHead } from "#components/DocsHead"
import HighlighterComponent from "#components/HighlighterComponent"
import Button from "#components/common/Button"
import { Section, SectionHeadline, SectionInnerParagraph } from "#docs/elements"

import DocsNotebox from "#components/DocsNotebox"
import CodeElement from "#components/common/CodeElement"
import { H5Headline } from "#components/common/Headline"
import LinkComponent from "#components/common/LinkComponent"
import advancedButtonCode from "#examples/advanced-button/code/advanced-button.rcx"
import sizingButtonCode from "#examples/advanced-button/code/sizes.rcx"
import { internalLink } from "#lib/links"

const ButtonRow = rc.div`
  flex
  flex-wrap
  items-center
  gap-4
  w-full
`

const AdvancedButtonPage = () => (
  <>
    <DocsHead
      main="Advanced Tailwind Button"
      pre="Working with variants"
      excerpt={
        <>
          An example of a advanced Tailwind / Uno (Windi) button component, which fully utilizes the features
          of
          <CodeElement>variants</CodeElement> and tailwind classes.
        </>
      }
    />

    <SectionHeadline>Developers Note</SectionHeadline>
    <Section>
      <p>
        It all started here: The task of blueprinting a redundantly placed button, fully utilizing it's design
        thru property-controlled utility classes. Writing this only as react component is a nightmare. And
        even then, at this point when you think you finally have this one "perfect button", you are unable to
        properly maintain it through the variability of project requirements and the resulting "horizontal
        styling". My wish was to read those heavily styled components like a book, with all the information I
        need to know about it's design and behavior. This is why I created{" "}
        <LinkComponent href={internalLink.start}>react-classmate</LinkComponent>.
      </p>
      <SectionInnerParagraph>
        The main idea of this project is to engage myself to properly design and manage classnames and
        separate them from the application logic.
      </SectionInnerParagraph>
      <SectionInnerParagraph>
        This example requires you to have a basic understanding of tailwind and the utility classes. If you
        are not familiar with it, I would recommend you to read the{" "}
        <LinkComponent href="https://tailwindcss.com/docs/utility-first">
          tailwind "Utility-First Fundamentals"
        </LinkComponent>{" "}
        first
      </SectionInnerParagraph>
    </Section>

    <SectionHeadline>Button Component</SectionHeadline>
    <Section>
      <p>
        The below code features dark (:dark) mode, hover (:hover) and active (:active) state as utility
        classes. You can also control <CodeElement>noGutter</CodeElement>, <CodeElement>disabled</CodeElement>
        , <CodeElement>loading</CodeElement>, <CodeElement>noShadow</CodeElement> and{" "}
        <CodeElement>type</CodeElement> properties.
      </p>
      <SectionInnerParagraph>
        It will introduce the usage of the utility type <CodeElement>VariantsConfig</CodeElement> and the
        utility function <CodeElement>convertRcProps</CodeElement>. More on that both below
      </SectionInnerParagraph>
      <HighlighterComponent input={advancedButtonCode} />
      <DocsNotebox>
        <H5Headline>
          Usage of important <CodeElement>!</CodeElement> prefix from tailwind
        </H5Headline>
        <SectionInnerParagraph>
          In general I would not recommend using <CodeElement>!</CodeElement>-override (which is similar to
          !important) too often in classmate components, since we should prereserve it's usage. In case of
          this button, we only override the padding and the shadow which can be set as explicit props.
        </SectionInnerParagraph>
      </DocsNotebox>
    </Section>

    <SectionHeadline>Button Sizing</SectionHeadline>
    <Section>
      <p>
        This is a basic button with the <CodeElement>type="button"</CodeElement> attribute.
      </p>
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
  </>
)

export default AdvancedButtonPage
