import type { InputComponent, Interpolation, RcBaseComponent, StyleDefinition } from "../types"
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
function createExtendedComponent<T extends object>(
  baseComponent: RcBaseComponent<any>,
  strings: TemplateStringsArray,
  interpolations: Interpolation<T>[],
): RcBaseComponent<T> {
  const baseComputeClassName = baseComponent.__rcComputeClassName || (() => "")
  const baseStyles = baseComponent.__rcStyles || {}
  const tag = baseComponent.__rcTag || baseComponent

  const styles: Record<string, string | number> = {}

  // Define the function to compute class names and collect styles
  const computeClassName = (props: T) => {
    const baseClassName = baseComputeClassName(props)

    const extendedClassName = strings
      .map((str, i) => {
        const interp = interpolations[i]
        if (typeof interp === "function") {
          const contextProps = {
            ...props,
            style: (styleDef: StyleDefinition<T>) => {
              Object.assign(styles, styleDef)
              return "" // No class names for style interpolations
            },
          }
          return str + interp(contextProps)
        }
        return str + (interp ?? "")
      })
      .join("")
      .replace(/\s+/g, " ")
      .trim()

    return [baseClassName, extendedClassName].filter(Boolean).join(" ")
  }

  // Merge base styles with new styles
  const mergedStyles = { ...baseStyles, ...styles }

  // Create the extended component
  const displayName = `Extended(${baseComponent.displayName || "Component"})`
  return createReactElement({
    tag,
    computeClassName,
    displayName,
    styles: mergedStyles, // Pass merged styles to createReactElement
  })
}

export default createExtendedComponent
