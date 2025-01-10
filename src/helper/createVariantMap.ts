import type { JSX, JSXElementConstructor } from "react"

import rc from "../rc"
import type { VariantsConfig } from "../types"

/**
 * Helper function to create a variant map for given intrinsic HTML elements.
 *
 * @param elements - Array of intrinsic HTML element names (e.g., 'h1', 'p', 'div').
 * @param variants - VariantsConfig to apply to each element.
 * @returns A map where each key is an element name and the value is the variant-enhanced component.
 */
export function createVariantMap<T extends keyof JSX.IntrinsicElements>(
  elements: T[],
  variants: VariantsConfig<any, any>,
): {
  [K in T]: JSXElementConstructor<any>
} {
  return elements.reduce(
    (acc, tag) => {
      acc[tag] = rc[tag].variants(variants)
      return acc
    },
    {} as { [K in T]: JSXElementConstructor<any> },
  )
}
