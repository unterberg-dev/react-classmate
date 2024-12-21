import { InputComponent, Interpolation, RcComponentFactory } from "./types";
import createRcComponent from "./create/createRcComponent";
import attachExtend from "./middleware/extend";
import { createProxy } from "./proxy";

/**
 * A collection of functions and utilities for creating styled components.
 *
 * Includes:
 * - Functions for intrinsic elements (e.g., `rc.div`, `rc.button`).
 * - The `extend` method for extending existing styled components.
 */
const rcTarget: Partial<RcComponentFactory> = {};

// extend middleware
const rcWithExtend = attachExtend(rcTarget);

// wrap proxy
const rcProxy = createProxy(rcWithExtend);

/** set the trap */
const rc = new Proxy<Partial<RcComponentFactory>>(rcProxy, {
  apply(
    _Factory,
    _thisArg,
    [tag, strings, ...interpolations]: [
      keyof JSX.IntrinsicElements | InputComponent,
      TemplateStringsArray,
      ...Interpolation<any>[]
    ]
  ) {
    return createRcComponent(tag, strings, interpolations);
  },
}) as RcComponentFactory;

export default rc as RcComponentFactory;
