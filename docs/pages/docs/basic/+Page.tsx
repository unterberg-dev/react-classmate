import HighlighterComponent from "#components/HighlighterComponent"
import Notebox from "#components/common/Notebox"
import { ImplementationText, Section, SectionHeadline } from "#pages/docs/elements"

import baseComponent from "#pages/docs/basic/baseComponent.rcx"
import baseImplementation from "#pages/docs/basic/baseImplementation.rcx"
import customProps from "#pages/docs/basic/customProps.rcx"
import customPropsImplementation from "#pages/docs/basic/customPropsImplementation.rcx"
import intrinsicProps from "#pages/docs/basic/intrinsicProps.rcx"
import intrinsicPropsImplementation from "#pages/docs/basic/intrinsicPropsImplementation.rcx"

const BasicPage = () => {
  return (
    <>
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
      <SectionHeadline>Pass Intrinsic Properties</SectionHeadline>
      <Section>
        <p>
          By design the lib is passing intrinsic properties and you can use them in the interpolation string.
          For typescript we provide the <code>JSX.IntrinsicElements</code> to get them properly validated.
        </p>
        <HighlighterComponent input={intrinsicProps} />
        <ImplementationText />
        <HighlighterComponent input={intrinsicPropsImplementation} />
      </Section>
    </>
  )
}

export default BasicPage
