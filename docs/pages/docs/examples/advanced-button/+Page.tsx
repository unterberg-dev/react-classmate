import rc from "react-classmate"

import HighlighterComponent from "#components/HighlighterComponent"
import Button from "#components/common/Button"
import Excerpt from "#components/common/Excerpt"
import HeadlineGroup from "#components/common/HeadlineGroup"

import { Section, SectionHeadline } from "#pages/docs/elements"
import advancedButtonCode from "#pages/docs/examples/advanced-button/code/advanced-button.rcx"
import sizingButtonCode from "#pages/docs/examples/advanced-button/code/sizes.rcx"

const ButtonRow = rc.div`
  flex
  flex-wrap
  items-center
  gap-4
  w-full
`

const AdvancedButtonPage = () => (
  <>
    <HeadlineGroup main="Advanced Button Example" sub="Working with variants" />
    <Excerpt>
      An example of a advanced Button Component, where user can decide if it should be a link or a button with
      the <code>link</code> attribute. Already some real world props to customize.
    </Excerpt>
    <SectionHeadline>Button Component</SectionHeadline>
    <Section>
      <p>Ready to copy & paste</p>
      <HighlighterComponent input={advancedButtonCode} />
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
