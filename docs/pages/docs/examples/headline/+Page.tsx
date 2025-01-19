import { DocsHead } from "#components/DocsHead"
import HighlighterComponent from "#components/HighlighterComponent"
import CodeElement from "#components/common/CodeElement"
import Headline, {
  H1Headline,
  H2Headline,
  H3Headline,
  H4Headline,
  H5Headline,
  H6Headline,
} from "#components/common/Headline"
import LinkComponent from "#components/common/LinkComponent"
import {
  Section,
  SectionHeadline,
  SectionInnerExampleCode,
  SectionInnerHeadline,
  SectionInnerParagraph,
} from "#docs/elements"
import { internalLink } from "#lib/links"

import convencienceComponent from "#examples/headline/code/convencienceComponent.rcx"
import defineTypes from "#examples/headline/code/defineTypes.rcx"
import exports from "#examples/headline/code/exports.rcx"
import fullCode from "#examples/headline/code/full.rcx"
import reactComponent from "#examples/headline/code/reactComponent.rcx"
import setupVariants from "#examples/headline/code/setupVariants.rcx"
import variantMap from "#examples/headline/code/variantMap.rcx"

const headlineHelperCodeRegular = `<H1Headline>Heading 1</H1Headline>
<H2Headline>Heading 2</H2Headline>
<H3Headline>Heading 3</H3Headline>
<H4Headline>Heading 4</H4Headline>
<H5Headline>Heading 5</H5Headline>
<H6Headline>Heading 6</H6Headline>`

const headlineHelperCodeCustom = `<H1Headline as="div">Heading 1</H1Headline>
<H2Headline as="span">Heading 2</H2Headline>
<H3Headline as="p">Heading 3</H3Headline>
<H4Headline as="strong">Heading 4</H4Headline>
<H5Headline as="h3">Heading 5</H5Headline>
<H6Headline as="h5">Heading 6</H6Headline>`

const headlineCodeRegular = `<Headline as="h4">Example Headline</Headline>
// <h4 class="text-lg md:text-xl font-bold">Example Headline</h4>`

const headlineCodeCustom = `<Headline as="p" variant="h5">Example Headline</Headline>
// <p class="text-lg font-bold">Example Headline</p>`

const HeadlineExamplePage = () => {
  return (
    <>
      <DocsHead
        main="Headline Component (Tailwind / Uno)"
        pre="Working with Variants"
        excerpt={
          <>
            An example of an headline component that fully utilizes the features of{" "}
            <CodeElement>variants</CodeElement> and Tailwind / Uno classes.
          </>
        }
      />

      <SectionHeadline>Intro</SectionHeadline>
      <Section>
        <SectionInnerParagraph>
          Consistent typography is key to a cohesive user interface in web development. The Headline component
          streamlines the creation and management of headline elements in React projects by leveraging
          react-classmate. It supports rendering standard HTML heading tags (h1 to h6) as well as other
          elements like strong, span, p, and div.
        </SectionInnerParagraph>
        <p>
          With predefined styling variants and preset components (<CodeElement>H1Headline</CodeElement>,{" "}
          <CodeElement>H2Headline</CodeElement>, etc.), the Headline component ensures uniform styling and
          reduces repetitive code. This approach improves maintainability and simplifies the implementation of
          design changes across your application. Whether you're building a blog, an e-commerce site, or
          another type of web application, the Headline component offers a practical solution for managing
          typography efficiently.
        </p>
      </Section>

      <SectionHeadline>Idea and Example</SectionHeadline>
      <Section>
        <SectionInnerParagraph>
          With the Convenience Components, you can easily create headlines with different levels and elements.
        </SectionInnerParagraph>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <aside>
            <SectionInnerHeadline>Regular Elements</SectionInnerHeadline>
            <HighlighterComponent input={headlineHelperCodeRegular} />
            <SectionInnerExampleCode>
              <H1Headline>Heading 1</H1Headline>
              <H2Headline>Heading 2</H2Headline>
              <H3Headline>Heading 3</H3Headline>
              <H4Headline>Heading 4</H4Headline>
              <H5Headline>Heading 5</H5Headline>
              <H6Headline>Heading 6</H6Headline>
            </SectionInnerExampleCode>
          </aside>
          <aside>
            <SectionInnerHeadline>Same style, different element</SectionInnerHeadline>
            <HighlighterComponent input={headlineHelperCodeCustom} />
            <SectionInnerExampleCode>
              <H1Headline as="div">Heading 1</H1Headline>
              <H2Headline as="span">Heading 2</H2Headline>
              <H3Headline as="p">Heading 3</H3Headline>
              <H4Headline as="strong">Heading 4</H4Headline>
              <H5Headline as="h3">Heading 5</H5Headline>
              <H6Headline as="h5">Heading 6</H6Headline>
            </SectionInnerExampleCode>
          </aside>
        </div>
        <aside>
          <SectionInnerHeadline>
            Generator Usage - variant used from <CodeElement $size="lg">as</CodeElement> prop
          </SectionInnerHeadline>
          <SectionInnerParagraph>
            Note: The <CodeElement>as</CodeElement> property is required to tell which component should be
            created. It tries to match the variant with the component name.
          </SectionInnerParagraph>
          <HighlighterComponent input={headlineCodeRegular} />
          <SectionInnerExampleCode>
            <Headline as="h4">Example Headline</Headline>
          </SectionInnerExampleCode>

          <SectionInnerHeadline>Generator Usage - custom variant prop</SectionInnerHeadline>
          <HighlighterComponent input={headlineCodeCustom} />
          <SectionInnerExampleCode>
            <Headline as="p" variant="h5">
              Example Headline
            </Headline>
          </SectionInnerExampleCode>
        </aside>
      </Section>

      <SectionHeadline>Full Component</SectionHeadline>
      <Section>
        <SectionInnerParagraph>
          In order to work with the visual classes, you will need to install tailwind or uno-css (windi/tw
          preset) alongside the react-classmate. We'll walk through all the important bits after this section
        </SectionInnerParagraph>
        <HighlighterComponent input={fullCode} />
      </Section>

      <SectionHeadline>Step by Step</SectionHeadline>
      <Section>
        <SectionInnerHeadline>1. Setup accepted elements and types</SectionInnerHeadline>
        <SectionInnerParagraph>
          We define the set of HTML elements that the Headline component can render. This includes standard
          heading levels (<CodeElement>h1</CodeElement> to <CodeElement>h6</CodeElement>) and additional
          elements such as <CodeElement>strong</CodeElement>, <CodeElement>span</CodeElement>,{" "}
          <CodeElement>p</CodeElement>, and <CodeElement>div</CodeElement>. By specifying these, we ensure
          that the Headline component is flexible and can accommodate various HTML tags based on the provided
          props.
        </SectionInnerParagraph>
        <HighlighterComponent input={defineTypes} />
        <SectionInnerParagraph>
          Additionally, we introduce a custom variant type <CodeElement>RcVariantType</CodeElement> that
          includes both the headline levels and a "blank" variant. The "blank" variant allows the component to
          render non-heading elements without applying any specific headline styles.
        </SectionInnerParagraph>

        <SectionInnerHeadline>2. Setup Variants</SectionInnerHeadline>
        <SectionInnerParagraph>
          Here, we configure the styling variants for each headline level using the{" "}
          <CodeElement>VariantsConfig</CodeElement> type from <CodeElement>react-classmate</CodeElement>. This
          configuration maps each variant to specific CSS classes or dynamic styles.
        </SectionInnerParagraph>
        <HighlighterComponent input={setupVariants} />
        <SectionInnerParagraph>
          This allows you to use the usual{" "}
          <LinkComponent href={internalLink.docs.variants}>Variants</LinkComponent> and{" "}
          <LinkComponent href={internalLink.util.style}>CSS-in-JS (style)</LinkComponent> syntax to define the
          styles for each headline level.
        </SectionInnerParagraph>

        <SectionInnerHeadline>3. Create Variant Map</SectionInnerHeadline>
        <SectionInnerParagraph>
          This section utilizes the <CodeElement>createVariantMap</CodeElement> function to generate a mapping
          between the defined elements and their corresponding variant configurations. The{" "}
          <CodeElement>hVariantMap</CodeElement>
          object serves as a lookup table, allowing the Headline component to select the appropriate styles
          based on the element type (<CodeElement>as</CodeElement> prop) provided. By merging{" "}
          <CodeElement>additionalElements</CodeElement> and
          <CodeElement>headlineLevels</CodeElement>, we ensure that all supported elements are accounted for
          in the variant map.
        </SectionInnerParagraph>
        <HighlighterComponent input={variantMap} />

        <SectionInnerHeadline>4. Define the React Component</SectionInnerHeadline>
        <SectionInnerParagraph>
          We define the main <CodeElement>Headline</CodeElement> component here, which is responsible for
          rendering the appropriate HTML element with the correct styling based on the provided props. The
          component determines whether the <CodeElement>as</CodeElement> prop corresponds to a headline level
          or an additional element.
        </SectionInnerParagraph>
        <SectionInnerParagraph>
          It then selects the appropriate variant to apply. If no variant is specified, it defaults to the
          variant matching the <CodeElement>as</CodeElement> prop for headline elements or uses the "blank"
          variant for additional elements. This design ensures flexibility and reusability across different
          parts of your application.
        </SectionInnerParagraph>
        <HighlighterComponent input={reactComponent} />

        <SectionInnerHeadline>5. Create Convenience Components</SectionInnerHeadline>
        <SectionInnerParagraph>
          To simplify the usage of different headline levels, we create convenience components like{" "}
          <CodeElement>H1Headline</CodeElement>, <CodeElement>H2Headline</CodeElement>, etc. These components
          preset the <CodeElement>as</CodeElement> prop to a specific headline level, reducing the need to
          specify it manually each time. Additionally, if a different <CodeElement>as</CodeElement> prop is
          provided, the variant adjusts accordingly to maintain consistent styling.
        </SectionInnerParagraph>
        <SectionInnerParagraph>
          The refactored <CodeElement>createHeadlineComponent</CodeElement> function now uses an inline type
          definition for props, combining <CodeElement>as</CodeElement> with all HTML attributes. This
          approach reduces redundancy and makes the code more concise.
        </SectionInnerParagraph>
        <HighlighterComponent input={convencienceComponent} />

        <SectionInnerHeadline>6. Export(s)</SectionInnerHeadline>
        <SectionInnerParagraph>
          Finally, we export the convenience headline components for external use. Each exported component
          corresponds to a specific headline level, allowing for straightforward integration into your
          application's UI. The default export is the main <CodeElement>Headline</CodeElement> component,
          providing maximum flexibility for custom use cases.
        </SectionInnerParagraph>
        <HighlighterComponent input={exports} />
      </Section>
    </>
  )
}

export default HeadlineExamplePage
