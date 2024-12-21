import { RcBaseComponent, MergeProps, VariantsConfig, InputComponent } from "../types";
import createReactElement from "./createReactElement";
import { JSX } from "react";

const createRsVariantComponent = <
  E extends keyof JSX.IntrinsicElements | InputComponent,
  ExtraProps extends object,
  VariantProps extends object
>(
  tag: E,
  config: VariantsConfig<VariantProps, ExtraProps>
): RcBaseComponent<MergeProps<E, ExtraProps & Partial<VariantProps>>> => {
  const { base, variants, defaultVariants = {} } = config;

  const computeClassName = (props: MergeProps<E, Partial<VariantProps>>) => {
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

  const variantKeys = Object.keys(variants) as (keyof VariantProps)[];

  // create
  const RenderComponent = createReactElement(tag, computeClassName, variantKeys);
  RenderComponent.displayName = `Variants(${typeof tag === 'string' ? tag : 'Component'})`;

  // extend
  RenderComponent.__rcComputeClassName = computeClassName;
  RenderComponent.__rcTag = tag;

  // make all properties of T optional for the output component

  return RenderComponent as RcBaseComponent<MergeProps<E, Partial<VariantProps> & ExtraProps>>;
};

export default createRsVariantComponent;
