import { CircleHelp } from "lucide-react"

import { DocsHead } from "#components/DocsHead"
import DocsNotebox from "#components/DocsNotebox"
import HighlighterComponent from "#components/HighlighterComponent"
import LinkComponent from "#components/common/LinkComponent"
import { Section, SectionHeadline, SectionInnerHeadline, SectionInnerParagraph } from "#docs/elements"

import CodeElement from "#components/common/CodeElement"
import basic from "#docs/extend/code/basic.rcx"
import basicImplementation from "#docs/extend/code/basicImplementation.rcx"
import extendBasic from "#docs/extend/code/extBasic.rcx"
import extendLib from "#docs/extend/code/extendLib.rcx"
import extendToReduce from "#docs/extend/code/extendToReduce.rcx"
import { internalLink } from "#lib/links"

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
          Unsure what we do in the interpolation above? Head back to the{" "}
          <LinkComponent href={internalLink.docs.basic} className="!text-warningDark">
            <CodeElement $color="warning">Base</CodeElement> documentation page
          </LinkComponent>
        </DocsNotebox>
      </Section>
      <SectionHeadline>
        Where to use <CodeElement $size="2xl">rc.extend</CodeElement>?
      </SectionHeadline>
      <Section>
        <p>There are two different scenarios where extending components is helpful:</p>
        <SectionInnerHeadline>1. Reduce redundancy</SectionInnerHeadline>
        <SectionInnerParagraph>
          When you wanna extend a "base"-component, in which you desired to set less specific styling
          classnames (e.g. outer margins, typography, etc.) <CodeElement>rc.extend</CodeElement> could be your
          pick. For example these are some elements which are re-used all over this documentation:
        </SectionInnerParagraph>
        <HighlighterComponent input={extendToReduce} />
        <DocsNotebox>
          <p>
            If you find yourself extending the same component multiple times to assign similar classnames, you
            might want to consider creating a{" "}
            <LinkComponent className="!text-warningDark" href={internalLink.docs.variants}>
              variant
            </LinkComponent>{" "}
            as your base component.
          </p>
        </DocsNotebox>
        <SectionInnerHeadline>2. Extend classnames of a third-party library component</SectionInnerHeadline>
        <HighlighterComponent input={extendLib} />
      </Section>
    </>
  )
}

export default BasicPage
