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
        <p>The function is parsed differently expects you to pass the following properties</p>
        <ul>
          <li>
            <code>base</code> - The base styles of the component
          </li>
          <li>
            <code>variants</code> - An object with the different variants
          </li>
          <li>
            <code>defaultVariants</code> - The different styles for the variant
          </li>
        </ul>
        <SectionInnerHeadline>Implementation</SectionInnerHeadline>
        <HighlighterComponent input={basicImplementation} />
      </Section>
    </>
  )
}

export default DocsStartPage
