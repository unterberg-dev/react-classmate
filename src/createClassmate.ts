import type { ScBaseComponent } from "./types"

/**
 * Instantiates a classmate component factory inside a Solid component or scope.
 *
 * Solid components are only executed once, so `createClassmate` simply evaluates the
 * incoming factory and returns the generated component.
 */
const createClassmate = <Props extends object>(
  factory: () => ScBaseComponent<Props>,
): ScBaseComponent<Props> => {
  return factory()
}

export default createClassmate
