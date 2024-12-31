import rc from "react-classmate"

import HighlighterComponent from "#components/HighlighterComponent"
import LayoutComponent from "#components/LayoutComponent"
import Button from "#components/common/Button"
import H3Headline from "#components/common/H3Headline"
import HeadlineGroup from "#components/common/HeadlineGroup"
import Notebox from "#components/common/Notebox"
import { serializeJsx } from "#lib/utils"
import { buttonCode, codeString1, codeString2 } from "#pages/docs/examples/advanced-button/code"

const ButtonRow = rc.div`
  flex
  flex-wrap
  items-center
  gap-4
  w-full
`

const SectionHeadline = rc.extend(H3Headline)`mb-4`
const Section = rc.extend(Notebox)`mb-8`

const AdvancedButtonPage = () => {
  const codeString = serializeJsx(<ButtonRow />)

  return (
    <LayoutComponent>
      <HeadlineGroup main="Advanced Button Example" sub="Working with variants" />
      <div className="flex flex-col">
        <SectionHeadline>Code Example</SectionHeadline>
        <Section>
          <p>
            This is a advanced version of a Button Component, where user can decide if it should be a link or
            a button with the <code>type</code> attribute. It has some real world props to customize.
          </p>
          <HighlighterComponent input={codeString} />
        </Section>

        <SectionHeadline>Default Button</SectionHeadline>
        <Section>
          <p>
            This is a basic button with the <code>type="button"</code> attribute.
          </p>
          <HighlighterComponent input={codeString1} />
          <ButtonRow>
            <Button size="lg" type="button">
              Button Big
            </Button>
            <Button type="button">Button Medium</Button>
            <Button size="sm" type="button">
              Button Small
            </Button>
            <Button type="button" disabled>
              Button Disabled
            </Button>
            <Button type="button" loading>
              Button Loading
            </Button>
          </ButtonRow>
        </Section>
        <SectionHeadline>Error Button</SectionHeadline>
        <ButtonRow>
          This is a default button with the <code>type="button"</code> attribute.
          <HighlighterComponent input={codeString2} />
          <Button size="lg" type="button" color="error">
            Button Big
          </Button>
          <Button type="button" color="error">
            Button Medium
          </Button>
          <Button size="sm" type="button" color="error">
            Button Small
          </Button>
          <Button type="button" disabled color="error">
            Button Disabled
          </Button>
          <Button type="button" color="error" loading>
            Button Loading
          </Button>
        </ButtonRow>
        <SectionHeadline>Warning Button</SectionHeadline>
        <ButtonRow>
          <Button size="lg" type="button" color="warning">
            Button Large
          </Button>
          <Button type="button" color="warning">
            Button Medium
          </Button>
          <Button size="sm" type="button" color="warning">
            Button Small
          </Button>
          <Button type="button" disabled color="warning">
            Button Disabled
          </Button>
          <Button type="button" size="lg" color="warning" loading>
            Button Loading
          </Button>
        </ButtonRow>
        <SectionHeadline>Success Button</SectionHeadline>
        <ButtonRow>
          <Button size="lg" type="button" color="success">
            Button Default Large
          </Button>
          <Button type="button" color="success">
            Button Default Medium (default)
          </Button>
          <Button size="sm" type="button" color="success">
            Button Default Small
          </Button>
          <Button type="button" disabled color="success">
            disabled Button Default Medium
          </Button>
        </ButtonRow>
        <SectionHeadline>{"noGutter"}</SectionHeadline>
        <ButtonRow>
          <Button size="lg" type="button" color="success" noGutter>
            Button Default Large
          </Button>
          <Button type="button" color="warning" noGutter>
            Button Default Medium (default)
          </Button>
          <Button size="sm" type="button" color="success" noGutter>
            Button Default Small
          </Button>
          <Button type="button" disabled color="success" noGutter>
            disabled Button Default Medium
          </Button>
        </ButtonRow>
        <SectionHeadline>Button as Anchor {`<a href="...">`}</SectionHeadline>
        <ButtonRow>
          <Button link="/" size="lg" type="button" color="success" noShadow>
            Button Default Large
          </Button>
          <Button link="/" type="button" color="warning" noShadow>
            Button Default Medium (default)
          </Button>
          <Button link="/" size="sm" type="button" color="success" noShadow>
            Button Default Small
          </Button>
          <Button link="/" type="button" disabled color="success" noShadow>
            disabled Button Default Medium
          </Button>
        </ButtonRow>
        <SectionHeadline>No $shadow</SectionHeadline>
        <ButtonRow>
          <Button size="lg" type="button" color="success" noShadow>
            Button Default Large
          </Button>
          <Button type="button" color="warning" noShadow>
            Button Default Medium (default)
          </Button>
          <Button size="sm" type="button" color="success" noShadow>
            Button Default Small
          </Button>
          <Button type="button" disabled color="success" noShadow>
            disabled Button Default Medium
          </Button>
        </ButtonRow>
      </div>
    </LayoutComponent>
  )
}

export default AdvancedButtonPage
