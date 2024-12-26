// createExtendedComponent.ts

import type { InputComponent, Interpolation, RcBaseComponent } from "../types"
import createReactElement from "../util/createReactElement"

/**
 * Create an extended component builder.
 * Merges the base component’s computed class names with the new interpolations.
 *
 * @typeParam T - The type of the props passed to the interpolation function.
 * @param baseComponent - The base component to extend.
 * @param strings - Template strings array for the new styles.
 * @param interpolations - Interpolations for the new styles.
 * @returns A new styled component with merged class names.
 */
function createExtendedComponent<T extends object>(
  baseComponent: InputComponent,
  strings: TemplateStringsArray,
  interpolations: Interpolation<T>[],
): RcBaseComponent<T> {
  // Retrieve
  const baseComputeClassName = (baseComponent as RcBaseComponent<any>).__rcComputeClassName || (() => "")
  const baseTag = (baseComponent as RcBaseComponent<any>).__rcTag || baseComponent

  const extendedComputeClassName = (props: T) => {
    const baseClassName = baseComputeClassName(props)
    const extendedClassName = strings
      .map((str, i) => {
        const interp = interpolations[i]
        return typeof interp === "function" ? str + interp(props) : str + (interp ?? "")
      })
      .join("")
      .replace(/\s+/g, " ")
      .trim()

    return [baseClassName, extendedClassName].filter(Boolean).join(" ")
  }

  const label = `Extended(${(baseComponent as RcBaseComponent<any>).displayName || "Component"})`
  return createReactElement(baseTag, extendedComputeClassName, label) as RcBaseComponent<T>
}

export default createExtendedComponent
