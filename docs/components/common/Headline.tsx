import type { HTMLAttributes } from "react"
import { createVariantMap } from "react-classmate"

// 1. Consolidate Class Definitions
const headlineClasses: Record<string, string> = {
  h1: "text-3xl md:text-4xl font-bold",
  h2: "text-2xl md:text-3xl font-bold",
  h3: "text-xl md:text-2xl font-bold",
  h4: "text-lg md:text-xl font-bold",
  h5: "text-lg font-bold",
  blank: "",
}

const additionalElements = ["strong", "span", "p", "div"] as const
type AdditionalHeadlineTypes = (typeof additionalElements)[number]

const headlineLevels = ["h1", "h2", "h3", "h4", "h5"] as const
type HeadlineLevels = (typeof headlineLevels)[number]

type VariantType = HeadlineLevels | "blank"

const hVariantMap = createVariantMap({
  elements: [...additionalElements, ...headlineLevels],
  variantsConfig: {
    variants: {
      $as: headlineClasses,
    },
  },
})

interface HeadlineProps extends HTMLAttributes<HTMLElement> {
  variant?: VariantType
  as: Exclude<VariantType, "blank"> | AdditionalHeadlineTypes
}

const Headline = ({ as, variant, ...props }: HeadlineProps) => {
  const isHeadline = headlineLevels.includes(as as HeadlineLevels)
  const variantToUse = variant || (isHeadline ? (as as VariantType) : "blank")

  const Component = hVariantMap[as] || null

  return (
    <Component $as={variantToUse} {...props}>
      {props.children}
    </Component>
  )
}

interface HeadlineComponentProps extends HTMLAttributes<HTMLElement> {
  as?: HeadlineProps["as"]
}

const createHeadlineComponent = (level: HeadlineLevels) => {
  return ({ as = level, ...props }: HeadlineComponentProps) => (
    <Headline as={as} {...(as !== level ? { variant: level } : {})} {...props} />
  )
}

export const H1Headline = createHeadlineComponent("h1")
export const H2Headline = createHeadlineComponent("h2")
export const H3Headline = createHeadlineComponent("h3")
export const H4Headline = createHeadlineComponent("h4")
export const H5Headline = createHeadlineComponent("h5")

export default Headline
