import type { JSX } from "react"
import type { InputComponent, Interpolation, MergeProps, RcBaseComponent, StyleDefinition } from "../types"
import createReactElement from "../util/createReactElement"

/**
 * Core function to create styled React components with dynamic class names and styles.
 *
 * @typeParam T - The type of the props passed to the interpolation function.
 * @typeParam E - The type of the component or intrinsic element.
 * @param tag - The base component or intrinsic element to style.
 * @param strings - Template strings array for the styles.
 * @param interpolations - Interpolations for the styles.
 * @returns A new styled component with computed class names and styles.
 */
const createBaseComponent = <T extends object, E extends keyof JSX.IntrinsicElements | InputComponent>(
  tag: E,
  strings: TemplateStringsArray,
  interpolations: Interpolation<MergeProps<E, T>>[],
): RcBaseComponent<MergeProps<E, T>> => {
  const computeClassName = (props: MergeProps<E, T>, collectedStyles: Record<string, string | number>) => {
    const styleUtility = (styleDef: StyleDefinition<MergeProps<E, T>>) => {
      Object.assign(collectedStyles, styleDef)
      return "" // Avoid interfering with string interpolation
    }

    return strings
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
  }

  // Collect styles dynamically
  const styles: Record<string, string | number> = {}

  const displayName = `Styled(${typeof tag === "string" ? tag : "Component"})`

  return createReactElement({
    tag,
    computeClassName: (props) => computeClassName(props, styles),
    displayName,
    styles, // Pass collected styles to createReactElement
  })
}

export default createBaseComponent
