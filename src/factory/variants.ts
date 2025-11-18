import type { JSX } from "solid-js"
import type {
  InputComponent,
  LogicHandler,
  MergeProps,
  ScBaseComponent,
  StyleDefinition,
  VariantsConfig,
} from "../types"
import createSolidElement from "../util/createSolidElement"

interface CreateVariantsOptions<T extends object> {
  logic?: LogicHandler<T>[]
}

/**
 * Creates a Solid component with variant-based class names and styles.
 */
const createVariantsComponent = <
  E extends keyof JSX.IntrinsicElements | InputComponent,
  ExtraProps extends object,
  VariantProps extends object,
>(
  tag: E,
  config: VariantsConfig<VariantProps, ExtraProps>,
  options: CreateVariantsOptions<MergeProps<E, ExtraProps & Partial<VariantProps>>> = {},
): ScBaseComponent<MergeProps<E, ExtraProps & Partial<VariantProps>>> => {
  const { base, variants, defaultVariants = {} } = config
  const propsToFilter = Object.keys(variants)
  const styles: Record<string, string | number> = {}
  const displayName = `Variants(${typeof tag === "string" ? tag : "Component"})`
  const logicHandlers = options.logic ?? []

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

    return [baseClasses, ...variantClasses].filter(Boolean).join(" ").trim().replace(/\s+/g, " ").trim()
  }

  return createSolidElement({
    tag,
    computeClassName: (props) => computeClassName(props, styles),
    displayName,
    styles,
    propsToFilter,
    logicHandlers,
  }) as ScBaseComponent<MergeProps<E, Partial<VariantProps> & ExtraProps>>
}

export default createVariantsComponent
