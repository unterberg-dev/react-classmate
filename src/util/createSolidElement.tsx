import type { Component, JSX } from "solid-js"
import { children as resolveChildren } from "solid-js"
import { Dynamic } from "solid-js/web"
import { twMerge } from "tailwind-merge"

import type { LogicHandler, ScBaseComponent, StyleDefinition } from "../types"
import applyLogicHandlers from "./applyLogicHandlers"

const toKebabCase = (key: string) => {
  if (key.startsWith("--")) {
    return key
  }
  return key
    .replace(/([A-Z])/g, (_, char: string) => `-${char.toLowerCase()}`)
    .replace(/^-/, "")
    .toLowerCase()
}

const resolveStyleDefinition = <P extends object>(
  styles: StyleDefinition<P> | undefined,
  props: P,
): Record<string, string | number> => {
  if (!styles) {
    return {}
  }

  const normalized: Record<string, string | number> = {}
  const record = styles as Record<string, any>
  for (const rawKey in record) {
    const rawValue = record[rawKey]
    if (rawValue === undefined || rawValue === null) {
      continue
    }
    const resolvedValue = typeof rawValue === "function" ? rawValue(props) : rawValue
    if (resolvedValue === undefined || resolvedValue === null) {
      continue
    }
    normalized[toKebabCase(rawKey)] = resolvedValue
  }

  return normalized
}

const normalizeInlineStyle = (style: Record<string, any> | undefined | null) => {
  if (!style) {
    return {}
  }

  const normalized: Record<string, string | number> = {}
  for (const key in style) {
    const value = style[key]
    if (value === undefined || value === null) {
      continue
    }
    normalized[toKebabCase(key)] = value
  }
  return normalized
}

interface CreateSolidElementParams<T extends object, E extends keyof JSX.IntrinsicElements | Component<any>> {
  tag: E
  computeClassName: (props: T) => string
  displayName: string
  styles?: StyleDefinition<T> | ((props: T) => StyleDefinition<T>)
  propsToFilter?: (keyof T)[]
  logicHandlers?: LogicHandler<T>[]
}

const createSolidElement = <T extends object, E extends keyof JSX.IntrinsicElements | Component<any>>({
  tag,
  computeClassName,
  displayName,
  styles = {},
  propsToFilter = [],
  logicHandlers = [],
}: CreateSolidElementParams<T, E>): ScBaseComponent<T> => {
  const element = ((incomingProps: T) => {
    const enhancedProps =
      logicHandlers.length > 0 ? applyLogicHandlers(incomingProps, logicHandlers) : incomingProps
    const normalizedProps = enhancedProps as T & Record<string, any>
    const computedClassName = computeClassName(normalizedProps)

    const filteredProps: Record<string, any> = {}
    for (const key in normalizedProps) {
      if (!key.startsWith("$") && !propsToFilter.includes(key as unknown as keyof T)) {
        filteredProps[key] = normalizedProps[key]
      }
    }
    const childAccessor = normalizedProps.children
    if ("children" in filteredProps) {
      // biome-ignore lint/performance/noDelete: <explanation>
      delete filteredProps.children
    }

    const initialClass = typeof filteredProps.class === "string" ? filteredProps.class : ""
    if ("class" in filteredProps) {
      // biome-ignore lint/performance/noDelete: <explanation>
      delete filteredProps.class
    }
    const incomingClasses = [
      initialClass,
      typeof filteredProps.className === "string" ? filteredProps.className : "",
    ]
      .filter(Boolean)
      .join(" ")
      .trim()

    const dynamicStylesSource = typeof styles === "function" ? styles(normalizedProps) : styles
    const dynamicStyles = resolveStyleDefinition(dynamicStylesSource, normalizedProps)
    const localStyleSource =
      typeof filteredProps.style === "object" && filteredProps.style !== null
        ? filteredProps.style
        : undefined
    if ("style" in filteredProps) {
      // biome-ignore lint/performance/noDelete: <explanation>
      delete filteredProps.style
    }
    const localStyles = normalizeInlineStyle(localStyleSource)
    const mergedStyles = { ...dynamicStyles, ...localStyles }

    const mergedClassName = twMerge(computedClassName, incomingClasses)

    // biome-ignore lint/performance/noDelete: <explanation>
    delete filteredProps.className

    const resolvedChildren = resolveChildren(() => childAccessor)

    return (
      <Dynamic component={tag as any} {...filteredProps} class={mergedClassName} style={mergedStyles}>
        {resolvedChildren()}
      </Dynamic>
    )
  }) as ScBaseComponent<T>

  element.displayName = displayName || "Sc Component"
  element.__scComputeClassName = (props: T) =>
    computeClassName(logicHandlers.length > 0 ? applyLogicHandlers(props, logicHandlers) : props)
  element.__scStyles = styles
  element.__scTag = tag
  element.__scLogic = logicHandlers

  return element
}

export default createSolidElement
