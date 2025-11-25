import { DocsHead } from "#components/DocsHead"
import DocsNotebox from "#components/DocsNotebox"
import HighlighterComponent from "#components/HighlighterComponent"
import CodeElement from "#components/common/CodeElement"
import LinkComponent from "#components/common/LinkComponent"
import { Section, SectionHeadline, SectionInnerHeadline, SectionInnerParagraph } from "#docs/elements"
import { APP_CONFIG } from "#lib/config"
import { externalLink, internalLink } from "#lib/links"

const installString = `npm i @classmate/react
# or
yarn add @classmate/react
# or
pnpm add @classmate/react
`

const DocsStartPage = () => {
  return (
    <>
      <DocsHead
        main="Getting Started"
        pre="Working with @classmate/react"
        excerpt="Learn how to install and get started with @classmate/react"
      />
      <SectionHeadline>Prerequisites</SectionHeadline>
      <Section>
        <SectionInnerParagraph>
          Make sure <LinkComponent href="https://react.dev/">React {"(>16.8)"}</LinkComponent> is installed
        </SectionInnerParagraph>
        <SectionInnerHeadline>Install</SectionInnerHeadline>
        <HighlighterComponent language="bash" input={installString} />
        <SectionInnerHeadline>Import with ES</SectionInnerHeadline>
        <HighlighterComponent language="bash" input='import cm from "@classmate/react"' />
        <SectionInnerHeadline>Import with CommonJS</SectionInnerHeadline>
        <HighlighterComponent language="bash" input='const cm = require("@classmate/react").default' />
        <DocsNotebox className="!mb-0">
          <p>
            The <CodeElement $color="warning">default</CodeElement> for CJS is currently needed because the
            package is designed as ES module. Named CJS export version is coming soon.
          </p>
        </DocsNotebox>
      </Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <SectionHeadline>Next steps</SectionHeadline>
          <Section>
            <ul>
              <li>
                <LinkComponent href={internalLink.docs.basic}>Create a component</LinkComponent>
              </li>
              <li>
                <LinkComponent href={internalLink.docs.extend}>Extend elements</LinkComponent>
              </li>
              <li>
                <LinkComponent href={internalLink.docs.variants}>Learn about variants</LinkComponent>
              </li>
            </ul>
          </Section>
        </div>
        <div>
          <SectionHeadline>Related Links</SectionHeadline>
          <Section>
            <ul>
              <li>
                <LinkComponent href="https://www.npmjs.com/package/@classmate/react">npm</LinkComponent>
              </li>
              <li>
                <LinkComponent href={externalLink.github}>Github</LinkComponent>
              </li>
            </ul>
          </Section>
        </div>
      </div>
      <SectionHeadline>Having Problems, Issues, etc?</SectionHeadline>
      <Section>
        <p>
          If you are having problems or any other feedback, please{" "}
          <LinkComponent href={`${externalLink.github}/issues/new`}>file an issue on GitHub</LinkComponent>
        </p>
      </Section>
      <SectionHeadline>Everything is documented in Typescript?</SectionHeadline>
      <Section>
        <p>
          For now. It should be easy to remove the types and use the library in plain JavaScript. Later on, I
          might provide a JavaScript version of the documentation.
        </p>
      </Section>
    </>
  )
}

export default DocsStartPage
