import { dsProxy } from "./proxy";

/**
 * A utility that creates classname strings and dynamic styles for React components.
 * @example
 * ```tsx
 * const SomeButton = ds.div<{ $isActive?: boolean; $isLoading?: boolean }>(
 *  ({ $isActive }) => `
 *    absolute
 *    z-10
 *    transition-all
 *    ${$isActive ? 'bg-blue-400 text-white' : 'bg-blue-400 text-blue-200'}
 *    `,
 * )
 * ```
 */
export const ds = dsProxy
