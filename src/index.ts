import { Rsc, RscComponentFactory } from "./types";
import createRscComponent from "./create/createRscComponent";
import attachExtend from "./middleware/extend";
import { createProxy } from "./proxy";

/**
 * A collection of functions and utilities for creating styled components.
 *
 * Includes:
 * - Functions for intrinsic elements (e.g., `rsc.div`, `rsc.button`).
 * - The `extend` method for extending existing styled components.
 */
const rscTarget: Rsc = {};

// extend middleware
const rscWithExtend = attachExtend(rscTarget);

// wrap proxy
const rscProxy = createProxy(rscWithExtend);

/** set the trap */
const rscFactory = new Proxy(rscProxy, {
  apply: (_Factory, [tag, strings, ...interpolations]) =>
    createRscComponent(tag, strings, interpolations),
});

/**
 * The `rsc` object is the main entry point for creating styled components using intrinsic HTML elements or existing React components.
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
const rsc = rscFactory as RscComponentFactory;
export default rsc;
