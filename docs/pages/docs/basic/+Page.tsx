import HighlighterComponent from "#components/HighlighterComponent"
import Notebox from "#components/common/Notebox"
import { DocsHead } from "#docs/DocsHead"
import { ImplementationText } from "#docs/ImplementationText"
import { Section, SectionHeadline } from "#docs/elements"

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
        main="Base Component Creation"
        sub="Base Component"
        excerpt="The following examples show how to create a base component and how to extend it with custom
        properties."
      />
      <SectionHeadline>Base Component</SectionHeadline>
      <Section>
        <p>
          In you IDE type <code>rc.</code> and then select the component tag you wish. For example{" "}
          <code>rc.div</code> or <code>rc.button</code>.
        </p>
        <HighlighterComponent input={baseComponent} />
        <ImplementationText />
        <HighlighterComponent input={baseImplementation} />
      </Section>
      <SectionHeadline>With Custom Properties</SectionHeadline>
      <Section>
        <p>We can pass custom properties</p>
        <Notebox $type="warning" className="mt-4 mb-4">
          <p>
            ⚠️ We prefix custom properties with <code>$</code> to avoid conflicts with intrinsic properties.
          </p>
        </Notebox>
        <HighlighterComponent input={customProps} />
        <ImplementationText />
        <HighlighterComponent input={customPropsImplementation} />
      </Section>
      <SectionHeadline>Use intrinsic Properties</SectionHeadline>
      <Section>
        <p>
          rc is passing intrinsic properties and you can use them in the interpolation string. For typescript
          we provide the <code>JSX.IntrinsicElements</code> to get them properly validated.
        </p>
        <HighlighterComponent input={intrinsicProps} />
        <ImplementationText />
        <HighlighterComponent input={intrinsicPropsImplementation} />
      </Section>
    </>
  )
}

export default BasicPage
