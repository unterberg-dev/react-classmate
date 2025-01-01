import rc from "react-classmate"

import HighlighterComponent from "#components/HighlighterComponent"
import Button from "#components/common/Button"
import { DocsHead } from "#docs/DocsHead"
import { Section, SectionHeadline } from "#docs/elements"

import H5Headline from "#components/common/H5Headline"
import Notebox from "#components/common/Notebox"
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
      main="Advanced Button Example"
      pre="Working with variants"
      excerpt={
        <>
          An example of a advanced Button Component, where user can decide if it should be a link or a button
          with the <code>link</code> attribute. Already some real world props to customize.
        </>
      }
    />
    <SectionHeadline>Button Component</SectionHeadline>
    <Section>
      <p>Ready to copy & paste</p>
      <HighlighterComponent input={advancedButtonCode} />

      <Notebox $size="sm" $type="warning">
        <H5Headline>
          Usage of important <code>!</code>
        </H5Headline>
      </Notebox>
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
