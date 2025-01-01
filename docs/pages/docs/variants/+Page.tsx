import HighlighterComponent from "#components/HighlighterComponent"
import LinkComponent from "#components/common/LinkComponent"
import { DocsHead } from "#docs/DocsHead"
import { Section, SectionHeadline, SectionInnerHeadline } from "#docs/elements"

import basic from "#docs/variants/code/basic.rcx"
import basicImplementation from "#docs/variants/code/basicImplementation.rcx"

const DocsStartPage = () => {
  return (
    <>
      <DocsHead
        main="Variants"
        pre="Keep it modular"
        excerpt={
          <>
            This function allows you to create a styled component with different variants based on the props
            you pass to it.
          </>
        }
      />
      <SectionHeadline>Basic syntax</SectionHeadline>
      <Section>
        <p>
          The <code>variants</code> function allows you to create a styled component with variants.
        </p>
        <HighlighterComponent input={basic} />
        <SectionInnerHeadline>The function receives the following properties:</SectionInnerHeadline>
        <ul className="mt-3">
          <li>
            <code>base</code> - optional - The base classname of the component
          </li>
          <li>
            <code>variants</code> - required - An object with the different variants
          </li>
          <li>
            <code>defaultVariants</code> - optional - a fallback for when no variant is passed
          </li>
        </ul>
        <SectionInnerHeadline>Implementation</SectionInnerHeadline>
        <HighlighterComponent input={basicImplementation} />
      </Section>
    </>
  )
}

export default DocsStartPage
