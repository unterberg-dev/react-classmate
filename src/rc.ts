import createBaseComponent from "./builder/base";
import createExtendedComponent from "./builder/extend";
import createVariantsComponent from "./builder/variants";
import {
  InputComponent,
  Interpolation,
  RcBaseComponent,
  RcComponentFactory,
  VariantsConfig,
} from "./types";

// init
const rcTarget: Partial<RcComponentFactory> = {};

const rcProxy = new Proxy(rcTarget, {
  /**
   * Intercepts property lookups:
   * - `rc.extend`: returns a function to extend an existing component
   * - `rc.button`, `rc.div`, etc.: returns a factory for base components, with `.variants`
   */
  get(_, prop: string) {
    // calls `rc.extend`
    if (prop === "extend") {
      return function <BCProps extends object>(
        baseComponent: RcBaseComponent<BCProps> | InputComponent,
      ) {
        return <T extends object>(
          strings: TemplateStringsArray,
          ...interpolations: Interpolation<T>[]
        ) => {
          return createExtendedComponent<T>(baseComponent, strings, interpolations);
        };
      };
    }

    // calls `rc.button`, `rc.div`, etc.
    const factoryFunction = <T extends object>(
      strings: TemplateStringsArray,
      ...interpolations: Interpolation<T>[]
    ) =>
      createBaseComponent<T, keyof JSX.IntrinsicElements>(
        prop as keyof JSX.IntrinsicElements,
        strings,
        interpolations,
      );

    // attach `.variants` to factory
    factoryFunction.variants = <
      ExtraProps extends object,
      VariantProps extends object = ExtraProps,
    >(
      config: VariantsConfig<VariantProps, ExtraProps>,
    ) => {
      return createVariantsComponent<keyof JSX.IntrinsicElements, ExtraProps, VariantProps>(
        prop as keyof JSX.IntrinsicElements,
        config,
      );
    };

    return factoryFunction;
  },
});

export default rcProxy as RcComponentFactory;
