import type { JSX } from "react"

import type { InputComponent, MergeProps, RcBaseComponent, VariantsConfig } from "../types"
import createReactElement from "../util/createReactElement"

/**
 * Creates a React component with variant-based class names.
 *
 * @template E - The type of the element or component.
 * @template ExtraProps - Additional props for the component.
 * @template VariantProps - Props for the variants.
 *
 * @param {E} tag - The HTML tag or React component.
 * @param {VariantsConfig<VariantProps, ExtraProps>} config - Configuration for the variants.
 * @returns {RcBaseComponent<MergeProps<E, ExtraProps & Partial<VariantProps>>>} - The created React component.
 */
const createVariantsComponent = <
  E extends keyof JSX.IntrinsicElements | InputComponent,
  ExtraProps extends object,
  VariantProps extends object,
>(
  tag: E,
  config: VariantsConfig<VariantProps, ExtraProps>,
): RcBaseComponent<MergeProps<E, ExtraProps & Partial<VariantProps>>> => {
  const { base, variants, defaultVariants = {} } = config

  const computeClassName = (props: MergeProps<E, Partial<VariantProps>>) => {
    const baseClasses = typeof base === "function" ? base(props) : base || ""
    const variantClasses = Object.entries(variants).map(([key, variantOptions]) => {
      const propValue = props[key] ?? (defaultVariants as Record<string, string | undefined>)[key]

      const variantClass = propValue ? (variantOptions as Record<string, any>)?.[propValue] : undefined

      if (typeof variantClass === "function") {
        return variantClass(props)
      }

      return variantClass || ""
    })

    return [baseClasses, ...variantClasses].filter(Boolean).join(" ").trim()
  }

  const variantKeys = Object.keys(variants)

  // create
  const label = `Variants(${typeof tag === "string" ? tag : "Component"})`
  return createReactElement(tag, computeClassName, label, variantKeys) as RcBaseComponent<
    MergeProps<E, Partial<VariantProps> & ExtraProps>
  >
}

export default createVariantsComponent
