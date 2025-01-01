import { CircleAlert } from "lucide-react"

import HighlighterComponent from "#components/HighlighterComponent"
import { DocsHead } from "#docs/DocsHead"
import DocsNotebox from "#docs/DocsNotebox"
import { Section, SectionHeadline, SectionInnerHeadline } from "#docs/elements"

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
        <p>
          Select the component tag you wish by using it's intrinsic tag name. For example <code>rc.div</code>{" "}
          or <code>rc.button</code>.
        </p>
        <HighlighterComponent input={baseComponent} />
        <SectionInnerHeadline>Implementation</SectionInnerHeadline>
        <HighlighterComponent input={baseImplementation} />
      </Section>
      <SectionHeadline>Custom Properties</SectionHeadline>
      <Section>
        <p>We can pass custom properties</p>
        <DocsNotebox icon={CircleAlert}>
          We prefix custom properties with <code>$</code> to avoid conflicts with intrinsic properties.
        </DocsNotebox>
        <HighlighterComponent input={customProps} />
        <SectionInnerHeadline>Implementation</SectionInnerHeadline>
        <HighlighterComponent input={customPropsImplementation} />
      </Section>
      <SectionHeadline>Intrinsic Properties</SectionHeadline>
      <Section>
        <p>
          rc is passing intrinsic properties and you can use them in the interpolation string. For typescript
          we provide the <code>JSX.IntrinsicElements</code> to get them properly validated.
        </p>
        <HighlighterComponent input={intrinsicProps} />
        <SectionInnerHeadline>Implementation</SectionInnerHeadline>
        <HighlighterComponent input={intrinsicPropsImplementation} />
      </Section>
    </>
  )
}

export default BasicPage
