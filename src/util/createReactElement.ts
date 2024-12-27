import { type JSXElementConstructor, type RefAttributes, createElement, forwardRef } from "react"

import type { RcBaseComponent, StyleDefinition } from "../types"

interface CreateReactElementParams<T, E> {
  tag: E
  computeClassName: (props: T) => string
  displayName: string
  styles?: StyleDefinition<T>
  propsToFilter?: (keyof T)[]
}

/**
 * Creates a forwardRef render component with computed class names.
 *
 * @typeParam T - Props of the component.
 * @typeParam E - Base element or component type.
 * @param tag - The base element or component to render.
 * @param computeClassName - A function to compute class names based on props.
 * @param propsToFilter - List of props to exclude from the final DOM element.
 * @returns A forwardRef component with computed class names and filtered props.
 */
const createReactElement = <
  T extends object,
  E extends keyof React.JSX.IntrinsicElements | JSXElementConstructor<any>,
>({
  tag,
  computeClassName,
  displayName,
  styles = {},
  propsToFilter = [],
}: CreateReactElementParams<T, E>): RcBaseComponent<T> => {
  const element = forwardRef<HTMLElement, T & RefAttributes<HTMLElement>>((props, ref) => {
    const computedClassName = computeClassName(props as T)

    // Filter out $-prefixed props and any props in propsToFilter
    const domProps: Record<string, unknown> = {}
    for (const key in props) {
      if (!key.startsWith("$") && !propsToFilter.includes(key as unknown as keyof T)) {
        domProps[key] = props[key]
      }
    }

    // Merge computed styles with user-provided inline styles
    const computedStyles = Object.entries(styles).reduce(
      (acc, [key, value]) => {
        acc[key] = typeof value === "function" ? value(props as T) : value
        return acc
      },
      {} as Record<string, string | number>,
    )

    const localStyle = typeof domProps.style === "object" && domProps.style !== null ? domProps.style : {}
    const mergedStyles = {
      ...computedStyles,
      ...localStyle,
    }

    // Merge computed class names with incoming className
    const incomingClassName = domProps.className || ""
    const finalClassName = [computedClassName, incomingClassName].filter(Boolean).join(" ").trim()

    // Pass down computed styles alongside other DOM props
    return createElement(tag, {
      ...domProps,
      className: finalClassName,
      style: mergedStyles,
      ref,
    })
  }) as RcBaseComponent<T>

  element.displayName = displayName || "Rc Component"
  element.__rcComputeClassName = computeClassName
  element.__rcStyles = styles
  element.__rcTag = tag

  return element
}

export default createReactElement
