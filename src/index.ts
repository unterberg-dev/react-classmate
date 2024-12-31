import rcInit from "./rc"
import type { RcComponentFactory } from "./types"
import convertRcProps from "./util/convertRcProps"

/* the classmates BaseComponent type */
export type { RcBaseComponent } from "./types"
export type { VariantsConfig } from "./types"

export { convertRcProps }

/**
 * The `rc` instance is the main entry point for creating our classmate-components.
 * It provides:
 * - Component builder to create classmate components by using template literals and interpolations. E.g: `rc.div` or `rc.button`
 * - A variants method to create classmate components  with variants. E.g: `rc.div.variants(...)`
 * - The `rc.extend` method that allows you to create new classmate components based on existing ones.
 *
 * Each styled component created via `rc` filters out `$`-prefixed props from the DOM and computes a final `className`
 * string by combining user-defined classes, dynamic interpolations based on props, and any incoming `className`.
 *
 * @example
 * ```tsx
 * // simple usage:
 * const StyledDiv = rc.div`p-2`
 *
 * // Creating a styled 'div' with conditional classes:
 * const StyledDiv = rc.div<{ $active?: boolean }>`
 *   p-2
 *   ${p => p.$active ? 'bg-blue' : 'bg-green'}
 * `
 *
 * // Using the styled component:
 * <StyledDiv $active>Active Content</StyledDiv>
 *
 * // Extending an existing styled component:
 * const ExtendedDiv = rc.extend(StyledDiv)<{ $highlighted?: boolean }>`
 *   ${p => p.$highlighted ? 'border-2 border-yellow' : ''}
 * `
 *
 * // Validating props against an intrinsic element:
 * const ExtendedButton = rc.extend(rc.button)`
 *   ${p => p.type === 'submit' ? 'font-bold' : ''}
 * `
 *
 * // Creating a styled component with variants:
 * const StyledButton = rc.button.variants({
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
const rc = rcInit as RcComponentFactory
export default rc
