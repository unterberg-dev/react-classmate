import { DocsHead } from "#components/DocsHead"
import DocsNotebox from "#components/DocsNotebox"
import HighlighterComponent from "#components/HighlighterComponent"
import CodeElement from "#components/common/CodeElement"
import { Section, SectionHeadline, SectionInnerHeadline, SectionInnerParagraph } from "#docs/elements"

import composeExample from "#docs/logic/code/compose.rcx"
import deriveStatusExample from "#docs/logic/code/deriveStatus.rcx"

const LogicPage = () => {
  return (
    <>
      <DocsHead
        pre="Builder helpers"
        main=".logic()"
        excerpt="Colocate pure setup logic with your classmate component and expose the result to the template, variants and DOM output."
      />

      <SectionHeadline>What is a logic header?</SectionHeadline>
      <Section>
        <SectionInnerParagraph>
          Call <CodeElement>.logic()</CodeElement> before the template literal to run arbitrary JavaScript on
          every render. The function receives the current props and can return additional props that should be
          merged back in. Anything prefixed with <CodeElement>$</CodeElement> is stripped from the DOM but
          stays available for interpolations and variants.
        </SectionInnerParagraph>
        <HighlighterComponent input={deriveStatusExample} />
        <DocsNotebox className="mt-6">
          <p>
            Logic handlers must stay pure. They cannot use hooks or render JSX. Think of them as a small
            “header” that derives data for the actual component.
          </p>
        </DocsNotebox>
      </Section>

      <SectionHeadline>Compose multiple logic blocks</SectionHeadline>
      <Section>
        <SectionInnerParagraph>
          You can chain as many logic handlers as you need. Later handlers receive the props returned by
          previous ones which makes it trivial to set derived variant props, <CodeElement>data-*</CodeElement>{" "}
          attributes or accessibility metadata in one place.
        </SectionInnerParagraph>
        <HighlighterComponent input={composeExample} />
        <SectionInnerHeadline>Why chain?</SectionInnerHeadline>
        <SectionInnerParagraph>
          Chaining keeps concerns focused: derive your computed values in the first handler, attach DOM
          attributes in the second, etc. The logic stack executes in order, so later handlers can override
          anything from earlier ones if necessary.
        </SectionInnerParagraph>
      </Section>

      <SectionHeadline>Guidelines</SectionHeadline>
      <Section>
        <ul className="list-disc ml-6 space-y-2 text-sm">
          <li>
            Always return plain objects. Anything else is ignored. Use <CodeElement>$</CodeElement> prefixes
            for props that should never reach the DOM.
          </li>
          <li>
            Combine logic headers with <CodeElement>cm.extend</CodeElement> or{" "}
            <CodeElement>useClassmate</CodeElement> to reuse the same derived data in different contexts.
          </li>
          <li>
            When you need heavy computations, memoize or pre-calculate the inputs before passing them into the
            logic handler to keep the render path fast.
          </li>
        </ul>
      </Section>
    </>
  )
}

export default LogicPage
