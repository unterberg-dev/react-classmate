import { CircleHelp } from "lucide-react"

import { DocsHead } from "#components/DocsHead"
import DocsNotebox from "#components/DocsNotebox"
import HighlighterComponent from "#components/HighlighterComponent"
import LinkComponent from "#components/common/LinkComponent"
import { Section, SectionHeadline, SectionInnerHeadline, SectionInnerParagraph } from "#docs/elements"
import { internalLink } from "#lib/links"

import CodeElement from "#components/common/CodeElement"
import basic from "#docs/extend/code/basic.rcx"
import basicImplementation from "#docs/extend/code/basicImplementation.rcx"
import correctUse from "#docs/extend/code/correctUse.rcx"
import extendBasic from "#docs/extend/code/extBasic.rcx"
import extendLib from "#docs/extend/code/extendLib.rcx"
import extendToReduce from "#docs/extend/code/extendToReduce.rcx"
import notUse from "#docs/extend/code/notUse.rcx"

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
        <SectionInnerParagraph>
          We pass a input component and extend it with our classmate syntax. The extend function returns a new
          component.
        </SectionInnerParagraph>
        <HighlighterComponent input={basic} />
        <SectionInnerParagraph>Extend as often as you wish:</SectionInnerParagraph>
        <HighlighterComponent input={extendBasic} />
        <DocsNotebox icon={CircleHelp}>
          Unsure what we do in the interpolation above? Head back to the{" "}
          <LinkComponent href={internalLink.docs.basic} className="!text-warningDark">
            <CodeElement $color="warning">Base</CodeElement> documentation page
          </LinkComponent>
        </DocsNotebox>
        <SectionInnerHeadline>Implementation</SectionInnerHeadline>
        <HighlighterComponent input={basicImplementation} />
      </Section>

      <SectionHeadline>
        When to use <CodeElement $size="2xl">cm.extend</CodeElement>?
      </SectionHeadline>
      <Section>
        <SectionInnerParagraph>
          There are two different scenarios where extending components is helpful:
        </SectionInnerParagraph>
        <SectionInnerHeadline>1. Reduce redundancy</SectionInnerHeadline>
        <SectionInnerParagraph>
          When you wanna extend a "base"-component, in which you desired to set less specific styling
          classnames (e.g. outer margins, typography, etc.) <CodeElement>cm.extend</CodeElement> could be your
          pick. For example these are some elements which are re-used all over this documentation:
        </SectionInnerParagraph>
        <HighlighterComponent input={extendToReduce} />
        <SectionInnerHeadline>2. Extend classnames of a third-party library component</SectionInnerHeadline>
        <HighlighterComponent input={extendLib} />
      </Section>

      <SectionHeadline>
        When to <strong>not</strong> use{" "}
      </SectionHeadline>
      <Section>
        <SectionInnerParagraph>
          A classic example where you find yourself extending the same component multiple times to assign
          almost similar classnames:
        </SectionInnerParagraph>
        <HighlighterComponent input={notUse} />
        <SectionInnerHeadline>Why is this bad practice?</SectionInnerHeadline>
        <ul className="list-disc list-inside mb-4 ml-4">
          <li>Cluttered, redundant code</li>
          <li>Base component is likely going to be unused</li>
        </ul>
        <SectionInnerHeadline>How to fix?</SectionInnerHeadline>
        <SectionInnerParagraph>
          In the example above it's very likely that we will not implement the{" "}
          <CodeElement>GradientBase</CodeElement> in the jsx later and might want to consider creating a{" "}
          <LinkComponent href={internalLink.docs.variants}>variant</LinkComponent> out of our blueprint from
          above. Here is an example how we could do it:
        </SectionInnerParagraph>
        <HighlighterComponent input={correctUse} />
      </Section>
    </>
  )
}

export default BasicPage
