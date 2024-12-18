import { RscBaseComponent, JsxElements, MergeProps, VariantsConfig, InputComponent } from "../types";
import createReactElement from "./createReactElement";

const createRscVariantComponent = <
  T extends object,
  E extends keyof JsxElements | InputComponent
>(
  tag: E,
  config: VariantsConfig<T>
): RscBaseComponent<MergeProps<E, T>> => {
  const { base, variants } = config;

  const computeClassName = (props: MergeProps<E, T>) => {
    const baseClasses = base;

    const variantClasses = Object.entries(variants).map(([key, variantOptions]) => {
      const propValue = props[key as keyof T];
      const variantClass = variantOptions?.[propValue as string];

      if (typeof variantClass === 'function') {
        return variantClass(props);
      }

      return variantClass || '';
    });

    return [baseClasses, ...variantClasses]
      .filter(Boolean)
      .join(' ')
      .trim();
  };

  // create
  const RenderComponent = createReactElement(tag, computeClassName);
  RenderComponent.displayName = `Variants(${typeof tag === 'string' ? tag : 'Component'})`;

  // extend
  RenderComponent.__rscComputeClassName = computeClassName;
  RenderComponent.__rscTag = tag;

  return RenderComponent
};

export default createRscVariantComponent;
