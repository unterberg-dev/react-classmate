import { DocsHead } from "#components/DocsHead"
import HighlighterComponent from "#components/HighlighterComponent"
import CodeElement from "#components/common/CodeElement"
import { Section, SectionHeadline, SectionInnerHeadline } from "#docs/elements"

import basic from "#docs/variants/code/basic.rcx"
import basicImplementation from "#docs/variants/code/basicImplementation.rcx"

const DocsStartPage = () => {
  return (
    <>
      <DocsHead
        main="Variants"
        pre="Keep it together"
        excerpt={
          <>
            This function allows you to create a styled component with different variants based on the props
            you pass to it.
          </>
        }
      />
      <SectionHeadline>Basic syntax</SectionHeadline>
      <Section>
        <HighlighterComponent input={basic} />
        <SectionInnerHeadline>The function receives the following properties:</SectionInnerHeadline>
        <ul className="mt-3">
          <li>
            <CodeElement>base</CodeElement> - optional - The base classname of the component
          </li>
          <li>
            <CodeElement>variants</CodeElement> - required - An object with the different variants
          </li>
          <li>
            <CodeElement>defaultVariants</CodeElement> - optional - a fallback for when no variant is passed
          </li>
        </ul>
        <SectionInnerHeadline>Implementation</SectionInnerHeadline>
        <HighlighterComponent input={basicImplementation} />
      </Section>
    </>
  )
}

export default DocsStartPage
