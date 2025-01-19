import{j as e,C as n,f as r,H as d,g as p,h as c,e as h,k as H,l as m,b as x,d as u,i as f,o as g,a as v}from"../chunks/chunk-p6wuVmS0.js";import{S as s,a as l,b as a,c as i,d as o,i as y}from"../chunks/chunk-iWB2fWV1.js";import{D as j,H as t}from"../chunks/chunk-CYQGPKy7.js";/* empty css                      */import"../chunks/chunk-CYDrz2XN.js";/* empty css                      *//* empty css                      *//* empty css                      */import"../chunks/chunk-D7HrI6pR.js";const T=`type HeadlineComponentProps = { as?: HeadlineProps["as"] } & HTMLAttributes<HTMLElement>
const createHeadlineComponent = (level: HeadlineLevels) => {
  return ({ as = level, ...props }: HeadlineComponentProps) => (
    <Headline as={as} {...(as !== level ? { variant: level } : {})} {...props} />
  )
}`,C=`const headlineLevels = ["h1", "h2", "h3", "h4", "h5", "h6"] as const
type HeadlineLevels = (typeof headlineLevels)[number]

const additionalElements = ["strong", "span", "p", "div"] as const
type AdditionalHeadlineTypes = (typeof additionalElements)[number]

type RcVariantType = HeadlineLevels | "blank"`,b=`export const H1Headline = createHeadlineComponent("h1")
export const H2Headline = createHeadlineComponent("h2")
export const H3Headline = createHeadlineComponent("h3")
export const H4Headline = createHeadlineComponent("h4")
export const H5Headline = createHeadlineComponent("h5")
export const H6Headline = createHeadlineComponent("h6")
export default Headline`,w=`import type { HTMLAttributes } from "react"
import { type RcBaseComponent, type VariantsConfig, createVariantMap } from "react-classmate"

// 1. Setup Accepted Elements and Types

const headlineLevels = ["h1", "h2", "h3", "h4", "h5", "h6"] as const
type HeadlineLevels = (typeof headlineLevels)[number]

const additionalElements = ["strong", "span", "p", "div"] as const
type AdditionalHeadlineTypes = (typeof additionalElements)[number]

type RcVariantType = HeadlineLevels | "blank"

// 2. Setup Variants

interface HeadlineVariantProps extends HTMLAttributes<HTMLElement> {
  $as?: RcVariantType
}

const headlineVariants: VariantsConfig<HeadlineVariantProps, HeadlineVariantProps> = {
  base: "",
  variants: {
    $as: {
      h1: "text-3xl md:text-4xl font-bold",
      h2: "text-2xl md:text-3xl font-bold"
      h3: "text-xl md:text-2xl font-bold",
      h4: "text-lg md:text-xl font-bold",
      h5: "text-lg font-bold",
      h6: "text-base font-bold",
      blank: "",
    },
  },
}

// 3. Create Variant Map

const hVariantMap: Record<string, RcBaseComponent<HeadlineVariantProps>> = createVariantMap({
  elements: [...additionalElements, ...headlineLevels],
  variantsConfig: headlineVariants,
})

// 4. Define the React Component

interface HeadlineProps extends HTMLAttributes<HTMLElement> {
  variant?: RcVariantType
  as: Exclude<RcVariantType, "blank"> | AdditionalHeadlineTypes
}

const Headline = ({ as, variant, ...props }: HeadlineProps) => {
  const isHeadline = headlineLevels.includes(as as HeadlineLevels)
  const variantToUse = variant || (isHeadline ? (as as RcVariantType) : "blank")

  const Component = hVariantMap[as] || null

  return (
    <Component $as={variantToUse} {...props}>
      {props.children}
    </Component>
  )
}

// 5. Create Convenience Components

type HeadlineComponentProps = { as?: HeadlineProps["as"] } & HTMLAttributes<HTMLElement>
const createHeadlineComponent = (level: HeadlineLevels) => {
  return ({ as = level, ...props }: HeadlineComponentProps) => (
    <Headline as={as} {...(as !== level ? { variant: level } : {})} {...props} />
  )
}

// 6. Export(s)

export const H1Headline = createHeadlineComponent("h1")
export const H2Headline = createHeadlineComponent("h2")
export const H3Headline = createHeadlineComponent("h3")
export const H4Headline = createHeadlineComponent("h4")
export const H5Headline = createHeadlineComponent("h5")
export const H6Headline = createHeadlineComponent("h6")
export default Headline
`,S=`interface HeadlineProps extends HTMLAttributes<HTMLElement> {
  variant?: RcVariantType
  as: Exclude<RcVariantType, "blank"> | AdditionalHeadlineTypes
}

const Headline = ({ as, variant, ...props }: HeadlineProps) => {
  const isHeadline = headlineLevels.includes(as as HeadlineLevels)
  const variantToUse = variant || (isHeadline ? (as as RcVariantType) : "blank")

  const Component = hVariantMap[as] || null

  return (
    <Component $as={variantToUse} {...props}>
      {props.children}
    </Component>
  )
}`,V=`interface HeadlineVariantProps extends HTMLAttributes<HTMLElement> {
  $as?: RcVariantType
}

const headlineVariants: VariantsConfig<HeadlineVariantProps, HeadlineVariantProps> = {
  base: "",
  variants: {
    $as: {
      h1: "text-3xl md:text-4xl font-bold",
      h2: "text-2xl md:text-3xl font-bold"
      h3: "text-xl md:text-2xl font-bold",
      h4: "text-lg md:text-xl font-bold",
      h5: "text-lg font-bold",
      h6: "text-base font-bold",
      blank: "",
    },
  },
}`,L=`const hVariantMap: Record<string, RcBaseComponent<HeadlineVariantProps>> = createVariantMap({
  elements: [...additionalElements, ...headlineLevels],
  variantsConfig: headlineVariants,
})`,E=`<H1Headline>Heading 1</H1Headline>
<H2Headline>Heading 2</H2Headline>
<H3Headline>Heading 3</H3Headline>
<H4Headline>Heading 4</H4Headline>
<H5Headline>Heading 5</H5Headline>
<H6Headline>Heading 6</H6Headline>`,P=`<H1Headline as="div">Heading 1</H1Headline>
<H2Headline as="span">Heading 2</H2Headline>
<H3Headline as="p">Heading 3</H3Headline>
<H4Headline as="strong">Heading 4</H4Headline>
<H5Headline as="h3">Heading 5</H5Headline>
<H6Headline as="h5">Heading 6</H6Headline>`,M=`<Headline as="h4">Example Headline</Headline>
// <h4 class="text-lg md:text-xl font-bold">Example Headline</h4>`,R=`<Headline as="p" variant="h5">Example Headline</Headline>
// <p class="text-lg font-bold">Example Headline</p>`,A=()=>e.jsxs(e.Fragment,{children:[e.jsx(j,{main:"Headline Component (Tailwind / Uno)",pre:"Working with Variants",excerpt:e.jsxs(e.Fragment,{children:["An example of an headline component that fully utilizes the features of"," ",e.jsx(n,{children:"variants"})," and Tailwind / Uno classes."]})}),e.jsx(s,{children:"Intro"}),e.jsxs(l,{children:[e.jsx(a,{children:"Consistent typography is key to a cohesive user interface in web development. The Headline component streamlines the creation and management of headline elements in React projects by leveraging react-classmate. It supports rendering standard HTML heading tags (h1 to h6) as well as other elements like strong, span, p, and div."}),e.jsxs("p",{children:["With predefined styling variants and preset components (",e.jsx(n,{children:"H1Headline"}),","," ",e.jsx(n,{children:"H2Headline"}),", etc.), the Headline component ensures uniform styling and reduces repetitive code. This approach improves maintainability and simplifies the implementation of design changes across your application. Whether you're building a blog, an e-commerce site, or another type of web application, the Headline component offers a practical solution for managing typography efficiently."]})]}),e.jsx(s,{children:"Idea and Example"}),e.jsxs(l,{children:[e.jsx(a,{children:"With the Convenience Components, you can easily create headlines with different levels and elements."}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("aside",{children:[e.jsx(i,{children:"Regular Elements"}),e.jsx(t,{input:E}),e.jsxs(o,{children:[e.jsx(r,{children:"Heading 1"}),e.jsx(d,{children:"Heading 2"}),e.jsx(p,{children:"Heading 3"}),e.jsx(c,{children:"Heading 4"}),e.jsx(h,{children:"Heading 5"}),e.jsx(H,{children:"Heading 6"})]})]}),e.jsxs("aside",{children:[e.jsx(i,{children:"Same style, different element"}),e.jsx(t,{input:P}),e.jsxs(o,{children:[e.jsx(r,{as:"div",children:"Heading 1"}),e.jsx(d,{as:"span",children:"Heading 2"}),e.jsx(p,{as:"p",children:"Heading 3"}),e.jsx(c,{as:"strong",children:"Heading 4"}),e.jsx(h,{as:"h3",children:"Heading 5"}),e.jsx(H,{as:"h5",children:"Heading 6"})]})]})]}),e.jsxs("aside",{children:[e.jsxs(i,{children:["Generator Usage - variant used from ",e.jsx(n,{$size:"lg",children:"as"})," prop"]}),e.jsxs(a,{children:["Note: The ",e.jsx(n,{children:"as"})," property is required to tell which component should be created. It tries to match the variant with the component name."]}),e.jsx(t,{input:M}),e.jsx(o,{children:e.jsx(m,{as:"h4",children:"Example Headline"})}),e.jsx(i,{children:"Generator Usage - custom variant prop"}),e.jsx(t,{input:R}),e.jsx(o,{children:e.jsx(m,{as:"p",variant:"h5",children:"Example Headline"})})]})]}),e.jsx(s,{children:"Full Component"}),e.jsxs(l,{children:[e.jsx(a,{children:"In order to work with the visual classes, you will need to install tailwind or uno-css (windi/tw preset) alongside the react-classmate. We'll walk through all the important bits after this section"}),e.jsx(t,{input:w})]}),e.jsx(s,{children:"Step by Step"}),e.jsxs(l,{children:[e.jsx(i,{children:"1. Setup accepted elements and types"}),e.jsxs(a,{children:["We define the set of HTML elements that the Headline component can render. This includes standard heading levels (",e.jsx(n,{children:"h1"})," to ",e.jsx(n,{children:"h6"}),") and additional elements such as ",e.jsx(n,{children:"strong"}),", ",e.jsx(n,{children:"span"}),","," ",e.jsx(n,{children:"p"}),", and ",e.jsx(n,{children:"div"}),". By specifying these, we ensure that the Headline component is flexible and can accommodate various HTML tags based on the provided props."]}),e.jsx(t,{input:C}),e.jsxs(a,{children:["Additionally, we introduce a custom variant type ",e.jsx(n,{children:"RcVariantType"}),' that includes both the headline levels and a "blank" variant. The "blank" variant allows the component to render non-heading elements without applying any specific headline styles.']}),e.jsx(i,{children:"2. Setup Variants"}),e.jsxs(a,{children:["Here, we configure the styling variants for each headline level using the"," ",e.jsx(n,{children:"VariantsConfig"})," type from ",e.jsx(n,{children:"react-classmate"}),". This configuration maps each variant to specific CSS classes or dynamic styles."]}),e.jsx(t,{input:V}),e.jsxs(a,{children:["This allows you to use the usual"," ",e.jsx(x,{href:u.docs.variants,children:"Variants"})," and"," ",e.jsx(x,{href:u.util.style,children:"CSS-in-JS (style)"})," syntax to define the styles for each headline level."]}),e.jsx(i,{children:"3. Create Variant Map"}),e.jsxs(a,{children:["This section utilizes the ",e.jsx(n,{children:"createVariantMap"})," function to generate a mapping between the defined elements and their corresponding variant configurations. The"," ",e.jsx(n,{children:"hVariantMap"}),"object serves as a lookup table, allowing the Headline component to select the appropriate styles based on the element type (",e.jsx(n,{children:"as"})," prop) provided. By merging"," ",e.jsx(n,{children:"additionalElements"})," and",e.jsx(n,{children:"headlineLevels"}),", we ensure that all supported elements are accounted for in the variant map."]}),e.jsx(t,{input:L}),e.jsx(i,{children:"4. Define the React Component"}),e.jsxs(a,{children:["We define the main ",e.jsx(n,{children:"Headline"})," component here, which is responsible for rendering the appropriate HTML element with the correct styling based on the provided props. The component determines whether the ",e.jsx(n,{children:"as"})," prop corresponds to a headline level or an additional element."]}),e.jsxs(a,{children:["It then selects the appropriate variant to apply. If no variant is specified, it defaults to the variant matching the ",e.jsx(n,{children:"as"}),' prop for headline elements or uses the "blank" variant for additional elements. This design ensures flexibility and reusability across different parts of your application.']}),e.jsx(t,{input:S}),e.jsx(i,{children:"5. Create Convenience Components"}),e.jsxs(a,{children:["To simplify the usage of different headline levels, we create convenience components like"," ",e.jsx(n,{children:"H1Headline"}),", ",e.jsx(n,{children:"H2Headline"}),", etc. These components preset the ",e.jsx(n,{children:"as"})," prop to a specific headline level, reducing the need to specify it manually each time. Additionally, if a different ",e.jsx(n,{children:"as"})," prop is provided, the variant adjusts accordingly to maintain consistent styling."]}),e.jsxs(a,{children:["The refactored ",e.jsx(n,{children:"createHeadlineComponent"})," function now uses an inline type definition for props, combining ",e.jsx(n,{children:"as"})," with all HTML attributes. This approach reduces redundancy and makes the code more concise."]}),e.jsx(t,{input:T}),e.jsx(i,{children:"6. Export(s)"}),e.jsxs(a,{children:["Finally, we export the convenience headline components for external use. Each exported component corresponds to a specific headline level, allowing for straightforward integration into your application's UI. The default export is the main ",e.jsx(n,{children:"Headline"})," component, providing maximum flexibility for custom use cases."]}),e.jsx(t,{input:b})]})]}),k=Object.freeze(Object.defineProperty({__proto__:null,default:A},Symbol.toStringTag,{value:"Module"})),U=()=>"Building Headline Components with Tailwind CSS - React Classmate Documentation",z=Object.freeze(Object.defineProperty({__proto__:null,default:U},Symbol.toStringTag,{value:"Module"})),N={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},Loading:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/Loading",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:f}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:g}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},lang:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","lang"]},valueSerialized:{type:"js-serialized",value:"en"}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/pages/docs/+Layout.tsx",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/pages/+Layout.tsx",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"plus-file",exportValues:y},{type:"plus-file",exportValues:v}]},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/examples/headline/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:k}},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/examples/headline/+title.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:z}}};export{N as configValuesSerialized};
