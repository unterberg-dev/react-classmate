import { type DependencyList, useMemo } from "react"

import type { RcBaseComponent } from "./types"

/**
 * Memoizes a classmate component factory within a React component.
 *
 * Useful when you need to declare a classmate component inside another component
 * but want to avoid re-instantiating it on every render. Pass the values your factory
 * depends on via the `deps` array to recompute when needed.
 *
 * @example
 * ```tsx
 * const Component = ({ $status }: { $status: "info" | "warning" }) => {
 *   const StyledAlert = useClassmate(
 *     () =>
 *       rc.div.variants({
 *         base: "p-4 rounded",
 *         variants: {
 *           $status: {
 *             info: "bg-blue-100 text-blue-900",
 *             warning: "bg-yellow-100 text-yellow-900",
 *           },
 *         },
 *       }),
 *     [], // recompute only if the factory dependencies change
 *   )
 *
 *   return <StyledAlert $status={$status}>Content</StyledAlert>
 * }
 * ```
 */
const useClassmate = <Props extends object>(
  factory: () => RcBaseComponent<Props>,
  deps: DependencyList = [],
): RcBaseComponent<Props> => {
  return useMemo(factory, deps)
}

export default useClassmate
