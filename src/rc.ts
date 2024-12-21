import createBaseComponent from "./builder/base";
import createExtendedComponent from "./builder/extend";
import createVariantsComponent from "./builder/variants";
import { InputComponent, Interpolation, RcBaseComponent, RcComponentFactory, VariantsConfig } from "./types";

// init
const rcTarget: Partial<RcComponentFactory> = {};

const rcProxy = new Proxy(rcTarget, {
  get(_, prop: string) {
    if (prop === "extend") {
      return function <BCProps extends object>(
        baseComponent: RcBaseComponent<BCProps> | InputComponent
      ) {
        return <T extends object>(
          strings: TemplateStringsArray,
          ...interpolations: Interpolation<T>[]
        ) => {
          return createExtendedComponent<T>(
            baseComponent,
            strings,
            interpolations
          );
        };
      };
    }

    const factoryFunction = <T extends object>(
      strings: TemplateStringsArray,
      ...interpolations: Interpolation<T>[]
    ) =>
      createBaseComponent<T, keyof JSX.IntrinsicElements>(
        prop as keyof JSX.IntrinsicElements,
        strings,
        interpolations
      );

    factoryFunction.variants = <
      ExtraProps extends object,
      VariantProps extends object = ExtraProps
    >(
      config: VariantsConfig<VariantProps, ExtraProps>
    ) => {
      return createVariantsComponent<
        keyof JSX.IntrinsicElements,
        ExtraProps,
        VariantProps
      >(prop as keyof JSX.IntrinsicElements, config);
    };

    return factoryFunction;
  },
  apply(
    _Factory,
    _thisArg,
    [tag, strings, ...interpolations]: [
      keyof JSX.IntrinsicElements | InputComponent,
      TemplateStringsArray,
      ...Interpolation<any>[]
    ]
  ) {
    return createBaseComponent(tag, strings, interpolations);
  },
})

export default rcProxy as RcComponentFactory;
