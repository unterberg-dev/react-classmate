import { RcBaseComponent, MergeProps, VariantsConfig, InputComponent } from "../types";
import createReactElement from "./createReactElement";
import { JSX } from "react";

const createRsVariantComponent = <
  T extends object,
  E extends keyof JSX.IntrinsicElements | InputComponent
>(
  tag: E,
  config: VariantsConfig<T>
): RcBaseComponent<MergeProps<E, Partial<T>>> => {
  const { base, variants, defaultVariants = {} } = config;

  const computeClassName = (props: MergeProps<E, Partial<T>>) => {
    // Compute base classes (can be static or dynamic)
    const baseClasses =
      typeof base === "function" ? base(props) : base || "";

    const variantClasses = Object.entries(variants).map(([key, variantOptions]) => {
      const propValue = props[key] ??
        (defaultVariants as Record<string, string | undefined>)[key];

      const variantClass = propValue ? (variantOptions as Record<string, any>)?.[propValue] : undefined;

      if (typeof variantClass === "function") {
        return variantClass(props);
      }

      return variantClass || "";
    });

    return [baseClasses, ...variantClasses]
      .filter(Boolean)
      .join(" ")
      .trim();
  };

  const variantKeys = Object.keys(variants) as (keyof T)[];

  // create
  const RenderComponent = createReactElement(tag, computeClassName, variantKeys);
  RenderComponent.displayName = `Variants(${typeof tag === 'string' ? tag : 'Component'})`;

  // extend
  RenderComponent.__rcComputeClassName = computeClassName;
  RenderComponent.__rcTag = tag;

  // make all properties of T optional for the output component

  return RenderComponent as RcBaseComponent<MergeProps<E, Partial<T>>>;
};

export default createRsVariantComponent;
