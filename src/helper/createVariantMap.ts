import sc from "../sc"
import type { ScBaseComponent, VariantsConfig } from "../types"
import type { AllowedTags } from "../util/domElements"

interface CreateVariantMapOptions<T extends AllowedTags> {
  elements: readonly T[]
  variantsConfig: VariantsConfig<any, any>
}

/* example: 

const hVariantMap = createVariantMap({
  elements: ["h1", "h2", "h3", "h4", "h5"],
  variantsConfig: {
    variants: {
      $as: headlineClasses,
    },
  },
})

*/

/**
 * Generates a map of variant components based on the provided elements and variants configuration.
 * Mainly used for creating multiple variant components at once.
 *
 * @param options - An object containing the elements and variants configuration.
 * @returns A record mapping each element name to its corresponding variant component.
 * @example
 * ```tsx
 * const button = createVariantMap({
 *  elements: ["button", "a"],
 *  variantsConfig: buttonVariants,
 * })
 * ```
 * will result in:
 * ```tsx
 * const button = {
 *  button: ScBaseComponent<any>, // sc.button.variants(buttonVariants)
 *  a: ScBaseComponent<any>, // sc.a.variants(buttonVariants)
 * }
 */
const createVariantMap = <T extends AllowedTags>({
  elements,
  variantsConfig,
}: CreateVariantMapOptions<T>): Record<T, ScBaseComponent<any>> => {
  // Check for duplicates
  const uniqueElements = new Set(elements)
  if (uniqueElements.size !== elements.length) {
    // Find duplicates
    const duplicates = elements.filter((item, index) => elements.indexOf(item) !== index)
    // Remove duplicate entries for clarity
    const uniqueDuplicates = Array.from(new Set(duplicates))
    throw new Error(
      `solid-classmate: Duplicate elements detected in createVariantMap: ${uniqueDuplicates.join(
        ", ",
      )}. Each element must be unique.`,
    )
  }

  return elements.reduce(
    (acc, tag) => {
      if (sc[tag]) {
        acc[tag] = sc[tag].variants(variantsConfig)
      } else {
        console.warn(
          `solid-classmate: Element "${tag}" is not supported by solid-classmate. Falling back to 'div'.`,
        )
        acc[tag] = sc.div.variants(variantsConfig) // Fallback to div if element not found
      }
      return acc
    },
    {} as Record<T, ScBaseComponent<any>>,
  )
}

export default createVariantMap
