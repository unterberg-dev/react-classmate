import HighlighterComponent from "#components/HighlighterComponent"
import LinkComponent from "#components/common/LinkComponent"
import { DocsHead } from "#docs/DocsHead"
import { Section, SectionHeadline, SectionInnerHeadline } from "#docs/elements"
import { APP_CONFIG } from "#lib/config"

const installString = `npm i react-classmate
# or
yarn add react-classmate
# or
pnpm add react-classmate
`

const DocsStartPage = () => {
  return (
    <>
      <DocsHead
        main="Getting Started"
        pre="Working with react-classmate"
        excerpt="Learn how to install and get started with react-classmate"
      />
      <SectionHeadline>Prerequisites</SectionHeadline>
      <Section>
        <p>
          To get started we wanna make sure{" "}
          <LinkComponent href="https://react.dev/">React {"(>16.8)"}</LinkComponent> is installed as it is the
          only peer dependency for <code>react-classmate</code>
        </p>
        <SectionInnerHeadline>Install</SectionInnerHeadline>
        <HighlighterComponent language="bash" input={installString} />
        <SectionInnerHeadline>Import with ES</SectionInnerHeadline>
        <HighlighterComponent language="bash" input='import rc from "react-classmate"' />
        <SectionInnerHeadline>Import with CommonJS</SectionInnerHeadline>
        <HighlighterComponent language="bash" input='const rc = require("react-classmate").default' />
      </Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <SectionHeadline>Next steps</SectionHeadline>
          <Section>
            <ul>
              <li>
                <LinkComponent href="/docs/basic">Learn the basics</LinkComponent>
              </li>
              <li>
                <LinkComponent href="/docs/extend">Extend components</LinkComponent>
              </li>
              <li>
                <LinkComponent href="/docs/variants">Learn about variants</LinkComponent>
              </li>
            </ul>
          </Section>
        </div>
        <div>
          <SectionHeadline>Related Links</SectionHeadline>
          <Section>
            <ul>
              <li>
                <LinkComponent href="https://www.npmjs.com/package/react-classmate">npm</LinkComponent>
              </li>
              <li>
                <LinkComponent href="https://github.com/richard-unterberg/react-classmate">
                  Github
                </LinkComponent>
              </li>
            </ul>
          </Section>
        </div>
      </div>
      <SectionHeadline>Having Problems, Issues, etc?</SectionHeadline>
      <Section>
        <p>
          If you are having problems or any other feedback, please{" "}
          <LinkComponent href={`${APP_CONFIG.repoUrl}/issues/new`}>file an issue on GitHub</LinkComponent>
        </p>
      </Section>
      <SectionHeadline>Everything is documented in Typescript?</SectionHeadline>
      <Section>
        <p>
          For now. It should be easy to remove the types and use the library in plain JavaScript. The types
          are there to help you and to give you a better understanding of what is possible. Later on, I might
          provide a JavaScript version of the documentation.
        </p>
      </Section>
    </>
  )
}

export default DocsStartPage
