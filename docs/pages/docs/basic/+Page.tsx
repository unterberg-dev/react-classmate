import rc from "react-classmate"
import HighlighterComponent from "#components/HighlighterComponent"
import H3Headline from "#components/common/H3Headline"
import Notebox from "#components/common/Notebox"
import content from "./example.rcx"

const SectionHeadline = rc.extend(H3Headline)`mb-4`
const Section = rc.extend(Notebox)`mb-8`

const BasicPage = () => {
  return (
    <>
      <SectionHeadline>Code Example</SectionHeadline>
      <Section>
        <p>
          This is a basic version of a Button Component, where user can decide if it should be a link or a
          button with the <code>type</code> attribute. It has some real world props to customize.
        </p>
        <HighlighterComponent input={content} />
      </Section>
    </>
  )
}

export default BasicPage
