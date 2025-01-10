// // createVariantMap.ts
// import rc from "../rc"
// import type { RcBaseComponent, VariantsConfig } from "../types"

// type RcKeys = keyof typeof rc

// interface CreateVariantMapOptions<T extends string> {
//   elements: readonly T[]
//   variantsConfig: VariantsConfig<any, any>
// }

// /**
//  * Type guard to check if a tag is a key of rc.
//  *
//  * @param tag - The tag to check.
//  * @returns True if tag is a key of rc, false otherwise.
//  */
// function isRcKey(tag: string): tag is RcKeys {
//   return tag in rc
// }

// /**
//  * Generates a map of variant components based on the provided elements and variants configuration.
//  *
//  * @param options - An object containing the elements and variants configuration.
//  * @returns A record mapping each element name to its corresponding variant component.
//  */
// function createVariantMap<T extends string>({ elements, variantsConfig }: CreateVariantMapOptions<T>) {
//   return elements.reduce(
//     (acc, tag) => {
//       if (isRcKey(tag)) {
//         acc[tag] = rc[tag].variants(variantsConfig)
//       } else {
//         console.warn(`Element "${tag}" is not supported by react-classmate.`)
//         acc[tag] = rc.div.variants(variantsConfig) // Fallback to div if element not found
//       }
//       return acc
//     },
//     {} as Record<T, RcBaseComponent<any>>,
//   )
// }

// const e = createVariantMap({
//   elements: ["div", "button", "test"],
//   variantsConfig: {
//     variants: {
//       size: {
//         sm: "p-1",
//         lg: "p-3",
//       },
//     },
//     defaultVariants: {
//       size: "sm",
//     },
//   },
// })

// export default createVariantMap
