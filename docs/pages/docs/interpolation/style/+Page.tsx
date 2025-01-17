import { CircleAlert } from "lucide-react"

import { DocsHead } from "#components/DocsHead"
import HighlighterComponent from "#components/HighlighterComponent"
import CodeElement from "#components/common/CodeElement"
import { Section, SectionHeadline, SectionInnerHeadline, SectionInnerParagraph } from "#docs/elements"

import basic from "#docs/interpolation/style/code/basic.rcx"
import baseImplementation from "#docs/interpolation/style/code/basicImplementation.rcx"
import withProps from "#docs/interpolation/style/code/withProps.rcx"
import withPropsImplementation from "#docs/interpolation/style/code/withPropsImplementation.rcx"

const InterpolationStylePage = () => {
  return (
    <>
      <DocsHead
        main="CSS-in-JS"
        pre="Advanced Interpolation"
        excerpt={
          <>
            While the library is mainly class name based, we can use our old friend CSS-in-JS alongside the{" "}
            interpolation string. This allows us to add CSS to the components.
          </>
        }
      />
      <SectionHeadline>Basic Styling</SectionHeadline>
      <Section>
        <SectionInnerParagraph>
          The interpolation system supports CSS with the <CodeElement>style()</CodeElement> function to add
          CSS in JS to the components. We are able to append this on every of the classmate "builders":
        </SectionInnerParagraph>
        <ul className="mb-4">
          <li>
            <CodeElement>{"rc.{intrinsicElement}"}</CodeElement>
          </li>
          <li>
            <CodeElement>{"rc.{intrinsicElement}.variants()"}</CodeElement>
          </li>
          <li>
            <CodeElement>rc.extend()</CodeElement>
          </li>
        </ul>
        <HighlighterComponent input={basic} />
        <SectionInnerHeadline>Implementation</SectionInnerHeadline>
        <HighlighterComponent input={baseImplementation} />
      </Section>
      <SectionHeadline>Use Properties</SectionHeadline>
      <Section>
        <SectionInnerParagraph>
          Using properties as they can be extracted from the same entity (<CodeElement>p</CodeElement>)
        </SectionInnerParagraph>
        <HighlighterComponent input={withProps} />
        <SectionInnerHeadline>Implementation</SectionInnerHeadline>
        <HighlighterComponent input={withPropsImplementation} />
      </Section>
    </>
  )
}

export default InterpolationStylePage
