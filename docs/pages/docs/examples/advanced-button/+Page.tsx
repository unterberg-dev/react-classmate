import rc from "react-classmate"

import HighlighterComponent from "#components/HighlighterComponent"
import Button from "#components/common/Button"
import { DocsHead } from "#docs/DocsHead"
import { Section, SectionHeadline } from "#docs/elements"

import H5Headline from "#components/common/H5Headline"
import DocsNotebox from "#docs/DocsNotebox"
import advancedButtonCode from "#examples/advanced-button/code/advanced-button.rcx"
import sizingButtonCode from "#examples/advanced-button/code/sizes.rcx"

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
          An example of a advanced Tailwind / Uno (Windi) button component, where user (developer) can decide
          if it should be a link or a button element. It has already some real world props to customize.
        </>
      }
    />
    <SectionHeadline>Button Component</SectionHeadline>
    <Section>
      <p>Ready to copy & paste</p>
      <HighlighterComponent input={advancedButtonCode} />

      <DocsNotebox>
        <H5Headline>
          Usage of important <code>!</code> prefix from tailwind
        </H5Headline>
        <p className="mt-3">
          In general I would not recommend using <code>!</code>-override (which is similar to !important) too
          often in classmate components, since we should prereserve it's usage for the cases where it helps
          the most (mainly local testing). In case of this button, we assume that we will cover all possible
          styling scenarios on the spot and in an readable way.
        </p>
      </DocsNotebox>
    </Section>

    <SectionHeadline>Button Sizing</SectionHeadline>
    <Section>
      <p>
        This is a basic button with the <code>type="button"</code> attribute.
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
