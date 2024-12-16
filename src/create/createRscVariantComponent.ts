import { ForwardRefExoticComponent, JSXElementConstructor } from "react";
import { BaseComponent, JsxElements, MergeProps, VariantsConfig } from "../types";
import createForwardRef from "./createForwardRef";

const createRscVariantComponent = <
  T extends object,
  E extends keyof JsxElements | ForwardRefExoticComponent<any> | JSXElementConstructor<any>
>(
  tag: E,
  config: VariantsConfig<T>
): BaseComponent<MergeProps<E, T>> => {
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

  const RenderComponent = createForwardRef(tag, computeClassName);
  RenderComponent.displayName = `Variants(${typeof tag === 'string' ? tag : 'Component'})`;

  // extend metadata
  // todo: create interface for RenderComponent instead of using any
  (RenderComponent as any).__rscComputeClassName = computeClassName;
  (RenderComponent as any).__rscTag = tag;

  return RenderComponent as BaseComponent<MergeProps<E, T>>;
};

export default createRscVariantComponent;
