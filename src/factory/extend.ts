import type { Interpolation, RcBaseComponent, StyleDefinition } from "../types"
import createReactElement from "../util/createReactElement"

/**
 * Create an extended component builder.
 * Merges the base component’s computed class names and styles with the new interpolations.
 *
 * @typeParam T - The type of the props passed to the interpolation function.
 * @param baseComponent - The base component to extend.
 * @param strings - Template strings array for the new styles.
 * @param interpolations - Interpolations for the new styles.
 * @returns A new styled component with merged class names and styles.
 */
const createExtendedComponent = <T extends object>(
  baseComponent: RcBaseComponent<any>,
  strings: TemplateStringsArray,
  interpolations: Interpolation<T>[],
): RcBaseComponent<T> => {
  const displayName = `Extended(${baseComponent.displayName || "Component"})`
  const baseComputeClassName = baseComponent.__rcComputeClassName || (() => "")
  const baseStyles = baseComponent.__rcStyles || {}
  const tag = baseComponent.__rcTag || baseComponent

  const computeClassName = (props: T, collectedStyles: Record<string, string | number>) => {
    const styleUtility = (styleDef: StyleDefinition<T>) => {
      Object.assign(collectedStyles, styleDef)
      return ""
    }

    const baseClassName = baseComputeClassName({
      ...props,
      style: styleUtility,
    })

    const extendedClassName = strings
      .map((str, i) => {
        const interp = interpolations[i]
        if (typeof interp === "function") {
          return str + interp({ ...props, style: styleUtility })
        }
        return str + (interp ?? "")
      })
      .join("")
      .replace(/\s+/g, " ")
      .trim()

    return [baseClassName, extendedClassName].filter(Boolean).join(" ")
  }

  const computeMergedStyles = (props: T) => {
    const collectedStyles: Record<string, string | number> = {}
    computeClassName(props, collectedStyles)
    return { ...baseStyles, ...collectedStyles }
  }

  return createReactElement({
    tag,
    computeClassName: (props) => computeClassName(props, {}),
    displayName,
    styles: (props) => computeMergedStyles(props),
  })
}

export default createExtendedComponent
