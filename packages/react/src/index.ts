import { domElements } from "@classmate/core"
import { twMerge } from "tailwind-merge"

import cmInit from "./cm"
import convertCmProps from "./helper/convertCmProps"
import createVariantMap from "./helper/createVariantMap"
import type { CmComponentFactory } from "./types"

/**
 * The `cm` instance is the main entry point for creating our classmate-components.
 * It provides:
 * - Component builder to create classmate components by using template literals and interpolations. E.g: `cm.div` or `cm.button`
 * - A variants method to create classmate components  with variants. E.g: `cm.div.variants(...)`
 * - The `cm.extend` method that allows you to create new classmate components based on existing ones.
 *
 * Each styled component created via `cm` filters out `$`-prefixed props from the DOM and computes a final `className`
 * string by combining user-defined classes, dynamic interpolations based on props, and any incoming `className`.
 *
 * @example
 * ```tsx
 * // simple usage:
 * const StyledDiv = cm.div`p-2`
 *
 * // Creating a styled 'div' with conditional classes:
 * const StyledDiv = cm.div<{ $active?: boolean }>`
 *   p-2
 *   ${p => p.$active ? 'bg-blue' : 'bg-green'}
 * `
 *
 * // Using the styled component:
 * <StyledDiv $active>Active Content</StyledDiv>
 *
 * // Extending an existing styled component:
 * const ExtendedDiv = cm.extend(StyledDiv)<{ $highlighted?: boolean }>`
 *   ${p => p.$highlighted ? 'border-2 border-yellow' : ''}
 * `
 *
 * // Validating props against an intrinsic element:
 * const ExtendedButton = cm.extend(cm.button)`
 *   ${p => p.type === 'submit' ? 'font-bold' : ''}
 * `
 *
 * // Creating a styled component with variants:
 * const StyledButton = cm.button.variants({
 *   base: 'p-2',
 *   variants: {
 *    size: {
 *     sm: 'p-1',
 *     lg: 'p-3',
 *   },
 *   defaultVariants: {
 *    size: 'sm',
 *   },
 * })
 * ```
 */
const cm = cmInit as CmComponentFactory

export { cm }

export type { CmBaseComponent } from "./types"
export type { VariantsConfig } from "./types"

export { convertCmProps }
export { createVariantMap }
export { default as useClassmate } from "./useClassmate"
export { domElements }

export default cm

/** the `twMerge` lib from @classmate/react */
const cmMerge = twMerge
export { cmMerge }
