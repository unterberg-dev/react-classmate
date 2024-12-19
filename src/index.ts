import rsc from './rsc';
import { RscComponentFactory } from './types';

export type { RscBaseComponent } from "./types";

/**
 * The `rsc` instance is the main entry point for creating our "styled components" using intrinsic HTML elements or existing React components.
 *
 * It provides:
 * - A collection of functions for each intrinsic HTML element (e.g., `rsc.div`, `rsc.span`, `rsc.button`, etc.)
 *   to create styled components by using template literals and interpolations.
 * - A callable interface to create styled components directly from a given tag or component (e.g., `rsc.div``, ...)`).
 * - An `extend` method that allows you to create new styled components based on existing ones,
 *   optionally validating non-$ props against a specified intrinsic element.
 *
 * Each styled component created via `rsc` filters out `$`-prefixed props from the DOM and computes a final `className`
 * string by combining user-defined classes, dynamic interpolations based on props, and any incoming `className`.
 *
 * @example
 * ```tsx
 * // simplest usage:
 * const StyledDiv = rsc.div`
 *   p-2
 * `
 *
 * // Creating a styled 'div' with conditional classes:
 * const StyledDiv = rsc.div<{ $active?: boolean }>`
 *   p-2
 *   ${p => p.$active ? 'bg-blue' : 'bg-green'}
 * `
 *
 * // Using the styled component:
 * <StyledDiv $active>Active Content</StyledDiv>
 *
 * // Extending an existing styled component:
 * const ExtendedDiv = rsc.extend(StyledDiv)<{ $highlighted?: boolean }>`
 *   ${p => p.$highlighted ? 'border-2 border-yellow' : ''}
 * `
 *
 * // Validating props against an intrinsic element:
 * const ExtendedButton = rsc.extend(rsc.button)`
 *   ${p => p.type === 'submit' ? 'font-bold' : ''}
 * `
 * ```
 */
export default rsc as RscComponentFactory;
