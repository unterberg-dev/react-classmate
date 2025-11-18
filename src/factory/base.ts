import type { JSX } from "solid-js"
import type { Interpolation, LogicHandler, MergeProps, ScBaseComponent, StyleDefinition } from "../types"
import createSolidElement from "../util/createSolidElement"

interface CreateBaseComponentOptions<T extends object> {
  logic?: LogicHandler<T>[]
}
/**
 * Core function to create classmate components.
 *
 * @typeParam T - The type of the props passed to the interpolation function.
 * @typeParam E - The type of the component or intrinsic element.
 * @param tag - The base component
 * @param strings - Template strings array for the styles.
 * @param interpolations - Interpolations for the styles.
 * @returns A new styled component with computed class names and styles.
 */
const createBaseComponent = <T extends object, E extends keyof JSX.IntrinsicElements>(
  tag: E,
  strings: TemplateStringsArray,
  interpolations: Interpolation<T>[],
  options: CreateBaseComponentOptions<MergeProps<E, T>> = {},
): ScBaseComponent<MergeProps<E, T>> => {
  const styles: Record<string, string | number> = {}
  const displayName = `Styled(${typeof tag === "string" ? tag : "Component"})`
  const logicHandlers = options.logic ?? []

  const computeClassName = (props: MergeProps<E, T>, collectedStyles: Record<string, string | number>) => {
    const styleUtility = (styleDef: StyleDefinition<MergeProps<E, T>>) => {
      Object.assign(collectedStyles, styleDef)
      return ""
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

  return createSolidElement({
    tag,
    computeClassName: (props) => computeClassName(props, styles),
    displayName,
    styles,
    logicHandlers,
  })
}

export default createBaseComponent
