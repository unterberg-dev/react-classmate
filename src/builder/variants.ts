import type { JSX } from "react"
import type { InputComponent, MergeProps, RcBaseComponent, StyleDefinition, VariantsConfig } from "../types"
import createReactElement from "../util/createReactElement"

/**
 * Creates a React component with variant-based class names and styles.
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

  const computeClassName = (
    props: MergeProps<E, Partial<VariantProps> & ExtraProps>,
    collectedStyles: Record<string, string | number>,
  ) => {
    const styleUtility = (styleDef: StyleDefinition<MergeProps<E, Partial<VariantProps> & ExtraProps>>) => {
      Object.assign(collectedStyles, styleDef)
      return ""
    }

    // base classes and styles
    const baseClasses = typeof base === "function" ? base({ ...props, style: styleUtility }) : base || ""

    // variant classes and styles
    const variantClasses = Object.entries(variants).map(([key, variantOptions]) => {
      const propValue = props[key] ?? (defaultVariants as Record<string, string | undefined>)[key]
      const variantClass = propValue ? (variantOptions as Record<string, any>)?.[propValue] : undefined

      if (typeof variantClass === "function") {
        return variantClass({ ...props, style: styleUtility })
      }
      return variantClass || ""
    })

    return [baseClasses, ...variantClasses].filter(Boolean).join(" ").trim()
  }

  const propsToFilter = Object.keys(variants)

  // Collect styles dynamically
  const styles: Record<string, string | number> = {}

  const displayName = `Variants(${typeof tag === "string" ? tag : "Component"})`

  return createReactElement({
    tag,
    computeClassName: (props) => computeClassName(props, styles),
    displayName,
    styles,
    propsToFilter,
  }) as RcBaseComponent<MergeProps<E, Partial<VariantProps> & ExtraProps>>
}

export default createVariantsComponent
