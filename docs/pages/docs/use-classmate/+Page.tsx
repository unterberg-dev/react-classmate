import { DocsHead } from "#components/DocsHead"
import DocsNotebox from "#components/DocsNotebox"
import HighlighterComponent from "#components/HighlighterComponent"
import CodeElement from "#components/common/CodeElement"
import { Section, SectionHeadline, SectionInnerHeadline, SectionInnerParagraph } from "#docs/elements"

import dependencyExample from "#docs/use-classmate/code/dependency.rcx"
import inlineExample from "#docs/use-classmate/code/inline.rcx"

const UseClassmatePage = () => {
  return (
    <>
      <DocsHead
        main="useClassmate"
        pre="Hooks"
        excerpt="Memoize classmate components when you need to declare them inside another React component."
      />

      <SectionHeadline>When to use it</SectionHeadline>
      <Section>
        <SectionInnerParagraph>
          <CodeElement>useClassmate</CodeElement> keeps a stable component reference between renders. Reach
          for the hook whenever you have to create a classmate component inside another component (for example
          because the builder depends on React state, context or hooks). Without memoization every render
          would create a brand-new component tree which makes React re-mount your component and can lead to
          hydration mismatches.
        </SectionInnerParagraph>
      </Section>

      <SectionHeadline>Memoize inline builders</SectionHeadline>
      <Section>
        <SectionInnerParagraph>
          Wrap the factory with <CodeElement>useClassmate</CodeElement> and return the memoized component. All
          props still work the same way and you can forward <CodeElement>$</CodeElement>-prefixed values for
          dynamic interpolations.
        </SectionInnerParagraph>
        <HighlighterComponent input={inlineExample} />
      </Section>

      <SectionHeadline>Control re-computation with dependencies</SectionHeadline>
      <Section>
        <SectionInnerParagraph>
          Pass a dependency array as the second argument. It behaves the same as{" "}
          <CodeElement>React.useMemo</CodeElement>: the classmate component is only re-created when one of the
          dependencies changes. This enables things like theme-aware builders or locale-specific layout tweaks
          without re-instantiating on every render.
        </SectionInnerParagraph>
        <HighlighterComponent input={dependencyExample} />
        <DocsNotebox className="mt-6">
          <p>
            Keep the dependency array in sync with the values captured inside the factory. Forgetting a
            dependency will freeze the previous classes because the memoized component never re-computes.
          </p>
        </DocsNotebox>
      </Section>

      <SectionHeadline>Tips</SectionHeadline>
      <Section>
        <ul className="list-disc ml-6 space-y-2 text-sm">
          <li>
            Build the component outside of render whenever possible. Use the hook only when you truly rely on
            render-time data.
          </li>
          <li>
            You can still extend or wrap the memoized component with <CodeElement>cm.extend</CodeElement>; the
            hook just guarantees that React sees a stable component identity.
          </li>
          <li>
            Combine <CodeElement>useClassmate</CodeElement> with the new <CodeElement>.logic()</CodeElement>{" "}
            helper if you need derived props and memoization at the same time.
          </li>
        </ul>
      </Section>
    </>
  )
}

export default UseClassmatePage
