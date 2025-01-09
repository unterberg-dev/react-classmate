import type { HTMLAttributes } from "react"
import rc, { convertRcProps, type VariantsConfig } from "react-classmate"

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

// export single headline components if needed
export const H1Headline = rc.h1`${h1HeadlineClass}`
export const H2Headline = rc.h2`${h2HeadlineClass}`
export const H3Headline = rc.h3`${h3HeadlineClass}`
export const H4Headline = rc.h4`${h4HeadlineClass}`
export const H5Headline = rc.h5`${h5HeadlineClass}`

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

// todo for lib: would be nice to generate this map automatically by simply inputting the tag names
// (of course, typescript ide support)
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
  // Determine if 'as' is one of the headline variants
  const isHeadlineVariant = headlineVariantSet.has(as)

  // If variant is not provided and 'as' is a headline variant, default variant to 'as'
  const variantToUse = variant || (isHeadlineVariant ? (as as VariantHeadlineProps["$as"]) : "blank")

  const Component = hVariantMap[as] || hVariantMap.div // Fallback to 'div' if 'as' is unrecognized

  return (
    <Component $as={variantToUse} {...props}>
      {props.children}
    </Component>
  )
}

export default Headline
