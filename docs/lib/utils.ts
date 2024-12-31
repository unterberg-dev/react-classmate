import React, { isValidElement, type ReactElement, type JSX, type ReactNode } from "react"

export const getSystemTheme = (): "dark" | "light" => {
  if (typeof window === "undefined") return "light"

  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
  return prefersDarkScheme.matches ? "dark" : "light"
}

const escapeBackticks = (str: string): string => str.replace(/`/g, "\\`")

export const serializeJsx = (element: ReactNode | JSX.Element): string => {
  if (!isValidElement(element)) {
    throw new Error("Input must be a valid React element.")
  }

  const serializeProps = (props: Record<string, any>): string =>
    Object.entries(props)
      .filter(([key]) => key !== "children") // Exclude children
      .map(([key, value]) => {
        if (typeof value === "string") return `${key}="${escapeBackticks(value)}"`
        if (typeof value === "boolean") return value ? key : ""
        if (typeof value === "number") return `${key}={${value}}`
        if (typeof value === "object" && isValidElement(value)) return `${key}={${serializeJsx(value)}}`
        if (typeof value === "function") return `${key}={() => { /* function */ }}`
        return `${key}={${JSON.stringify(value)}}`
      })
      .join(" ")

  const { type, props } = element as ReactElement<any>
  const typeAsString =
    typeof type === "string"
      ? type // For native HTML tags like `div`, `span`
      : (type as any).displayName || (type as any).name || "Component"

  const serializedChildren = props.children
    ? Array.isArray(props.children)
      ? props.children
          .map((child: ReactNode) =>
            typeof child === "string" ? escapeBackticks(child) : serializeJsx(child),
          )
          .join("")
      : typeof props.children === "string"
        ? escapeBackticks(props.children)
        : serializeJsx(props.children)
    : ""

  const serializedProps = serializeProps(props || {})

  return `<${typeAsString}${serializedProps ? ` ${serializedProps}` : ""}>${serializedChildren}</${typeAsString}>`
}
