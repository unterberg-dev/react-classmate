// import type { HTMLAttributes } from "react"
// import rc, { type VariantsConfig } from "react-classmate"

// // 1. Consolidate Class Definitions
// const headlineClasses: Record<string, string> = {
//   h1: `
//     text-3xl
//     md:text-4xl
//     font-bold
//   `,
//   h2: `
//     text-2xl
//     md:text-3xl
//     font-bold
//   `,
//   h3: `
//     text-xl
//     md:text-2xl
//     font-bold
//     text-dark
//   `,
//   h4: `
//     text-lg
//     md:text-xl
//     font-bold
//   `,
//   h5: `
//     text-lg
//     font-bold
//   `,
//   blank: "",
// }

// // 2. Define Allowed Elements and Headline Levels
// const additionalElements = ["strong", "span", "p", "div"] as const
// const headlineLevels = ["h1", "h2", "h3", "h4", "h5"] as const
// type AdditionalHeadlineTypes = (typeof additionalElements)[number]
// type HeadlineLevels = (typeof headlineLevels)[number]
// type VariantType = HeadlineLevels | "blank"

// // 3. Create Variants Config
// interface VariantHeadlineProps {
//   $as: VariantType
// }

// const headlineVariants: VariantsConfig<VariantHeadlineProps, VariantHeadlineProps> = {
//   variants: {
//     $as: headlineClasses,
//   },
// }

// // 4. Dynamically Generate hVariantMap
// const allElements = [...additionalElements, ...headlineLevels] as const
// const hVariantMap: Record<(typeof allElements)[number], any> = allElements.reduce(
//   (acc, tag) => {
//     acc[tag] = rc[tag].variants(headlineVariants)
//     return acc
//   },
//   {} as Record<(typeof allElements)[number], any>,
// )

// // 5. Simplify Props Interfaces
// interface HeadlineProps extends HTMLAttributes<HTMLElement> {
//   variant?: VariantType
//   as: Exclude<VariantType, "blank"> | AdditionalHeadlineTypes
// }

// interface HeadlineComponentProps extends HTMLAttributes<HTMLElement> {
//   as?: HeadlineProps["as"]
// }

// // 6. Refactor Headline Component
// const Headline = ({ as, variant, ...props }: HeadlineProps) => {
//   const isHeadline = headlineLevels.includes(as as HeadlineLevels)
//   const variantToUse = variant || (isHeadline ? (as as VariantType) : "blank")
//   const Component = hVariantMap[as] || rc.div.variants(headlineVariants) // Fallback to div

//   return (
//     <Component $as={variantToUse} {...props}>
//       {props.children}
//     </Component>
//   )
// }

// // 7. Create Headline Components Programmatically
// const createHeadlineComponent = (level: HeadlineLevels) => {
//   return ({ as = level, ...props }: HeadlineComponentProps) => (
//     <Headline as={as} {...(as !== level ? { variant: level } : {})} {...props} />
//   )
// }

// export const H1Headline = createHeadlineComponent("h1")
// export const H2Headline = createHeadlineComponent("h2")
// export const H3Headline = createHeadlineComponent("h3")
// export const H4Headline = createHeadlineComponent("h4")
// export const H5Headline = createHeadlineComponent("h5")

// export default Headline

import type { HTMLAttributes } from "react"
import rc, { type VariantsConfig } from "react-classmate"

export const h1HeadlineClass = `
  text-3xl
  md:text-4xl
  font-bold
`

export const h2HeadlineClass = `
  text-2xl
  md:text-3xl
  font-bold
`

export const h3HeadlineClass = `
  text-xl
  md:text-2xl
  font-bold
  text-dark
`

export const h4HeadlineClass = `
  text-lg
  md:text-xl
  font-bold
`

const h5HeadlineClass = `
  text-lg
  font-bold
`

interface VariantHeadlineProps {
  $as: "h1" | "h2" | "h3" | "h4" | "h5" | "blank"
}

// Create a set for quick variant lookup
const headlineVariantSet: Set<string> = new Set(["h1", "h2", "h3", "h4", "h5"])

const headlineVariants: VariantsConfig<VariantHeadlineProps, VariantHeadlineProps> = {
  variants: {
    $as: {
      blank: "",
      h1: h1HeadlineClass,
      h2: h2HeadlineClass,
      h3: h3HeadlineClass,
      h4: h4HeadlineClass,
      h5: h5HeadlineClass,
    },
  },
}
type AdditionalHeadlineTypes = "strong" | "span" | "p" | "div"

// internal variant container
const hVariantMap = {
  strong: rc.strong.variants(headlineVariants),
  span: rc.span.variants(headlineVariants),
  p: rc.p.variants(headlineVariants),
  div: rc.div.variants(headlineVariants),
  h1: rc.h1.variants(headlineVariants),
  h2: rc.h2.variants(headlineVariants),
  h3: rc.h3.variants(headlineVariants),
  h4: rc.h4.variants(headlineVariants),
  h5: rc.h5.variants(headlineVariants),
}

interface HeadlineProps extends HTMLAttributes<HTMLElement> {
  variant?: VariantHeadlineProps["$as"]
  as: Exclude<VariantHeadlineProps["$as"], "blank"> | AdditionalHeadlineTypes
}

const Headline = ({ as, variant, ...props }: HeadlineProps) => {
  const headlineVariant = headlineVariantSet.has(as) ? (as as VariantHeadlineProps["$as"]) : undefined
  const variantToUse = variant || headlineVariant || "blank"
  const Component = hVariantMap[as]

  return (
    <Component $as={variantToUse} {...props}>
      {props.children}
    </Component>
  )
}

// omit variant and make "as" optional
interface HeadlineComponentProps extends HTMLAttributes<HTMLElement> {
  as?: HeadlineProps["as"]
}

export const H1Headline = ({ as = "h1", ...props }: HeadlineComponentProps) => (
  <Headline as={as} {...(as !== "h1" && { variant: "h1" })} {...props} />
)
export const H2Headline = ({ as = "h2", ...props }: HeadlineComponentProps) => (
  <Headline as={as} {...(as !== "h2" && { variant: "h2" })} {...props} />
)
export const H3Headline = ({ as = "h3", ...props }: HeadlineComponentProps) => (
  <Headline as={as} {...(as !== "h3" && { variant: "h3" })} {...props} />
)
export const H4Headline = ({ as = "h4", ...props }: HeadlineComponentProps) => (
  <Headline as={as} {...(as !== "h4" && { variant: "h4" })} {...props} />
)
export const H5Headline = ({ as = "h5", ...props }: HeadlineComponentProps) => (
  <Headline as={as} {...(as !== "h5" && { variant: "h5" })} {...props} />
)

export default Headline
