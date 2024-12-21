import createRcComponent from "./create/createRcComponent";
import createRsVariantComponent from "./create/createRcVariantComponent";
import { Interpolation, RcComponentFactory, VariantsConfig } from "./types";
import { JSX } from "react";

/**
 * Returns a proxy object that dynamically handles intrinsic element methods (e.g., `rc.div`, `rc.button`)
 * and the `extend` function for creating styled components.
 *
 * This proxy intercepts access to:
 * - Keys corresponding to intrinsic elements (e.g., 'div', 'span', 'button') to create styled components dynamically.
 * - The `extend` method for extending existing styled components or custom components.
 */
export const createProxy = (rcTarget: Partial<RcComponentFactory> = {}) => new Proxy(rcTarget, {
  get(_, prop: string) {
    if (prop === "extend") {
      return rcTarget.extend;
    }

    const factoryFunction = <T extends object>(
      strings: TemplateStringsArray,
      ...interpolations: Interpolation<T>[]
    ) =>
      createRcComponent<T, keyof JSX.IntrinsicElements>(
        prop as keyof JSX.IntrinsicElements,
        strings,
        interpolations
      );

    factoryFunction.variants = <
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      ExtraProps extends object,
      VariantProps extends object = ExtraProps
    >(
      config: VariantsConfig<VariantProps, ExtraProps>
    ) => {
      return createRsVariantComponent<
        keyof JSX.IntrinsicElements,
        ExtraProps,
        VariantProps
      >(prop as keyof JSX.IntrinsicElements, config);
    };
    // factoryFunction.variants = <T extends object>(config: VariantsConfig<T>) =>
    //   createRsVariantComponent(prop as keyof JSX.IntrinsicElements, config);

    return factoryFunction;
  },
})
