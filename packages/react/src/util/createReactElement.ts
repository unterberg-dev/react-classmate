import { type JSX, type JSXElementConstructor, type RefAttributes, createElement, forwardRef } from "react"
import { twMerge } from "tailwind-merge"

import { applyLogicHandlers } from "@classmate/core"

import type { LogicHandler, RcBaseComponent, StyleDefinition } from "../types"

interface CreateReactElementParams<
  T extends object,
  E extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
> {
  tag: E
  computeClassName: (props: T) => string
  displayName: string
  styles?: StyleDefinition<T> | ((props: T) => StyleDefinition<T>)
  propsToFilter?: (keyof T)[]
  logicHandlers?: LogicHandler<T>[]
}

// @todo: we wanna check if the output had a classname, if not remove it from the final output
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
  E extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
>({
  tag,
  computeClassName,
  displayName,
  styles = {},
  propsToFilter = [],
  logicHandlers = [],
}: CreateReactElementParams<T, E>): RcBaseComponent<T> => {
  const element = forwardRef<HTMLElement, T & RefAttributes<any>>((props, ref) => {
    const baseProps = props as T
    const enhancedProps = logicHandlers.length > 0 ? applyLogicHandlers(baseProps, logicHandlers) : baseProps
    const normalizedProps = enhancedProps as T & Record<string, any>
    const computedClassName = computeClassName(normalizedProps)

    // Filter out $-prefixed props and any props in propsToFilter
    const domProps: Record<string, unknown> = {}
    for (const key in normalizedProps) {
      if (!key.startsWith("$") && !propsToFilter.includes(key as unknown as keyof T)) {
        domProps[key] = normalizedProps[key]
      }
    }

    const dynamicStyles = typeof styles === "function" ? styles(normalizedProps) : styles

    // component level styles
    const localStyle = typeof domProps.style === "object" && domProps.style !== null ? domProps.style : {}
    const mergedStyles = {
      ...dynamicStyles,
      ...localStyle,
    }

    const incomingClassName = typeof domProps.className === "string" ? domProps.className : ""

    // merge computed class names with incoming className - local classname always first prio
    const mergedClassName = twMerge(computedClassName, [incomingClassName].filter(Boolean).join(" ").trim())

    return createElement(tag, {
      ...domProps,
      className: mergedClassName,
      style: mergedStyles,
      ref,
    })
  }) as RcBaseComponent<T>

  element.displayName = displayName || "Rc Component"
  element.__rcComputeClassName = (props: T) =>
    computeClassName(logicHandlers.length > 0 ? applyLogicHandlers(props, logicHandlers) : props)
  element.__rcStyles = styles
  element.__rcTag = tag
  element.__rcLogic = logicHandlers

  return element
}

export default createReactElement
