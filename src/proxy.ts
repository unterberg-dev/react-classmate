import createRscComponent from "./create/createRscComponent";
import createRscVariantComponent from "./create/createRscVariantComponent";
import { Interpolation, JsxElements, RscComponentFactory, VariantsConfig } from "./types";

/**
 * Returns a proxy object that dynamically handles intrinsic element methods (e.g., `rsc.div`, `rsc.button`)
 * and the `extend` function for creating styled components.
 *
 * This proxy intercepts access to:
 * - Keys corresponding to intrinsic elements (e.g., 'div', 'span', 'button') to create styled components dynamically.
 * - The `extend` method for extending existing styled components or custom components.
 */
export const createProxy = (rscTarget: Partial<RscComponentFactory> = {}) => new Proxy(rscTarget, {
  get(_, prop: string) {
    if (prop === "extend") {
      return rscTarget.extend;
    }

    const factoryFunction = <T extends object>(
      strings: TemplateStringsArray,
      ...interpolations: Interpolation<T>[]
    ) =>
      createRscComponent<T, keyof JsxElements>(
        prop as keyof JsxElements,
        strings,
        interpolations
      );

    factoryFunction.variants = <T extends object>(config: VariantsConfig<T>) =>
      createRscVariantComponent(prop as keyof JsxElements, config);

    return factoryFunction;
  },
})
