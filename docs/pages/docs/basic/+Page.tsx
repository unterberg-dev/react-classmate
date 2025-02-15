import { DocsHead } from "#components/DocsHead"
import DocsNotebox from "#components/DocsNotebox"
import HighlighterComponent from "#components/HighlighterComponent"
import CodeElement from "#components/common/CodeElement"
import { Section, SectionHeadline, SectionInnerHeadline, SectionInnerParagraph } from "#docs/elements"

import baseComponent from "#docs/basic/code/baseComponent.rcx"
import baseImplementation from "#docs/basic/code/baseImplementation.rcx"
import customProps from "#docs/basic/code/customProps.rcx"
import customPropsImplementation from "#docs/basic/code/customPropsImplementation.rcx"
import intrinsicProps from "#docs/basic/code/intrinsicProps.rcx"
import intrinsicPropsImplementation from "#docs/basic/code/intrinsicPropsImplementation.rcx"

const BasicPage = () => {
  return (
    <>
      <DocsHead
        main="Base Component"
        pre="Get started / Basics"
        excerpt="The following examples show how to create a base component and how to extend it with custom
        properties."
      />
      <SectionHeadline>Create a base component</SectionHeadline>
      <Section>
        <SectionInnerParagraph>
          Select the component tag you wish by using it's intrinsic tag name. For example{" "}
          <CodeElement>rc.div</CodeElement> or <CodeElement>rc.button</CodeElement>. Via the interpolation you
          are able to pass classnames.
        </SectionInnerParagraph>
        <HighlighterComponent input={baseComponent} />
        <SectionInnerHeadline>Implementation</SectionInnerHeadline>
        <HighlighterComponent input={baseImplementation} />
      </Section>
      <SectionHeadline>Custom Properties</SectionHeadline>
      <Section>
        <DocsNotebox>
          <strong>Important:</strong> Prefix <CodeElement $color="warning">rc</CodeElement>-specific
          properties with <CodeElement $color="warning">$</CodeElement> to not pass them to the
          created/extended component and to avoid conflicts with intrinsic properties (rc filters out props
          prefixed with <CodeElement $color="warning">$</CodeElement>)
        </DocsNotebox>
        <HighlighterComponent input={customProps} />
        <SectionInnerHeadline>Implementation</SectionInnerHeadline>
        <HighlighterComponent input={customPropsImplementation} />
      </Section>
      <SectionHeadline>Intrinsic Properties</SectionHeadline>
      <Section>
        <SectionInnerParagraph>
          <CodeElement>rc</CodeElement> is passing intrinsic properties and you can use them in the
          interpolation string. For typescript we provide the type of{" "}
          <CodeElement>IntrinsicElements</CodeElement> to get them properly validated.
        </SectionInnerParagraph>
        <HighlighterComponent input={intrinsicProps} />
        <SectionInnerHeadline>Implementation</SectionInnerHeadline>
        <HighlighterComponent input={intrinsicPropsImplementation} />
      </Section>
    </>
  )
}

export default BasicPage
