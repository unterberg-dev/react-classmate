import { CircleHelp } from "lucide-react"

import HighlighterComponent from "#components/HighlighterComponent"
import LinkComponent from "#components/common/LinkComponent"
import { DocsHead } from "#docs/DocsHead"
import DocsNotebox from "#docs/DocsNotebox"
import { Section, SectionHeadline, SectionInnerHeadline } from "#docs/elements"

import basic from "#docs/extend/code/basic.rcx"
import basicImplementation from "#docs/extend/code/basicImplementation.rcx"
import extendBasic from "#docs/extend/code/extBasic.rcx"
import extendRc from "#docs/extend/code/extRc.rcx"
import extendRcImplementation from "#docs/extend/code/extRcImplementation.rcx"

const BasicPage = () => {
  return (
    <>
      <DocsHead
        pre="Reuse, Share & Extend"
        main="Extend Components"
        excerpt="The extend function allows extending upon almost any react-component with our classmate syntax."
      />
      <SectionHeadline>Basic Syntax</SectionHeadline>
      <Section>
        <p>
          We pass a input component and extend it with our classmate syntax. The extend function returns a new
          component.
        </p>
        <HighlighterComponent input={basic} />
        <p className="mt-4">Extend as often as you want:</p>
        <HighlighterComponent input={extendBasic} />
        <SectionInnerHeadline>Implementation</SectionInnerHeadline>
        <HighlighterComponent input={basicImplementation} />
        <DocsNotebox icon={CircleHelp}>
          Not sure what we do in the interpolation above? Head back to the{" "}
          <LinkComponent href="/docs/basic" className="!text-primaryDark">
            <code>Base</code> documentation page
          </LinkComponent>
        </DocsNotebox>
      </Section>
      <SectionHeadline>
        Extend <code className="text-xl">classmate</code> components
      </SectionHeadline>
      <Section>
        <p>
          A classic scenario could be that you wanna create a base component with a set of properties and
          extend it with custom classes.
        </p>
        <HighlighterComponent input={extendRc} />
        <SectionInnerHeadline>Implementation</SectionInnerHeadline>
        <HighlighterComponent input={extendRcImplementation} />
      </Section>
    </>
  )
}

export default BasicPage
