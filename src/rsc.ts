import { InputComponent, Interpolation, RscComponentFactory } from "./types";
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
const rscTarget: Partial<RscComponentFactory> = {};

// extend middleware
const rscWithExtend = attachExtend(rscTarget);

// wrap proxy
const rscProxy = createProxy(rscWithExtend);

/** set the trap */
const rsc = new Proxy<Partial<RscComponentFactory>>(rscProxy, {
  apply(
    _Factory,
    _thisArg,
    [tag, strings, ...interpolations]: [
      keyof JSX.IntrinsicElements | InputComponent,
      TemplateStringsArray,
      ...Interpolation<any>[]
    ]
  ) {
    return createRscComponent(tag, strings, interpolations);
  },
}) as RscComponentFactory;

export default rsc as RscComponentFactory;
