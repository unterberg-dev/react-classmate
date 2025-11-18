import { twMerge } from "tailwind-merge"
import convertScProps from "./helper/convertScProps"
import createVariantMap from "./helper/createVariantMap"
import scInit from "./sc"
import type { ScComponentFactory } from "./types"

/**
 * The `sc` instance is the main entry point for creating our classmate-components.
 * It provides:
 * - Component builder to create classmate components by using template literals and interpolations. E.g: `sc.div` or `sc.button`
 * - A variants method to create classmate components  with variants. E.g: `sc.div.variants(...)`
 * - The `sc.extend` method that allows you to create new classmate components based on existing ones.
 *
 * Each styled component created via `sc` filters out `$`-prefixed props from the DOM and computes a final `class`
 * string by combining user-defined classes, dynamic interpolations based on props, and any incoming `className`.
 *
 * @example
 * ```tsx
 * // simple usage:
 * const StyledDiv = sc.div`p-2`
 *
 * // Creating a styled 'div' with conditional classes:
 * const StyledDiv = sc.div<{ $active?: boolean }>`
 *   p-2
 *   ${p => p.$active ? 'bg-blue' : 'bg-green'}
 * `
 *
 * // Using the styled component:
 * <StyledDiv $active>Active Content</StyledDiv>
 *
 * // Extending an existing styled component:
 * const ExtendedDiv = sc.extend(StyledDiv)<{ $highlighted?: boolean }>`
 *   ${p => p.$highlighted ? 'border-2 border-yellow' : ''}
 * `
 *
 * // Validating props against an intrinsic element:
 * const ExtendedButton = sc.extend(sc.button)`
 *   ${p => p.type === 'submit' ? 'font-bold' : ''}
 * `
 *
 * // Creating a styled component with variants:
 * const StyledButton = sc.button.variants({
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
const sc = scInit as ScComponentFactory

export type { ScBaseComponent } from "./types"
export type { VariantsConfig } from "./types"

export { convertScProps }
export { createVariantMap }
export { default as createClassmate } from "./createClassmate"

export default sc

/** the `twMerge` lib from solid-classmate */
const scMerge = twMerge
export { scMerge }
