import { InputComponent, Interpolation, RcComponentFactory } from "./types";
import createRcComponent from "./create/createRcComponent";
import attachExtend from "./middleware/extend";
import { createProxy } from "./proxy";

// instantiate target
const rcTarget: Partial<RcComponentFactory> = {};

// .extend middleware
const rcWithExtend = attachExtend(rcTarget);

// wrap proxy
const rcProxy = createProxy(rcWithExtend);

// set trap
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
