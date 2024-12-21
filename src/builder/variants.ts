import { RcBaseComponent, MergeProps, VariantsConfig, InputComponent } from "../types";
import createReactElement from "../util/createReactElement";
import { JSX } from "react";

// @todo: document
/** core variant builder */
const createVariantsComponent = <
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

  const variantKeys = Object.keys(variants);

  // create
  const label = `Variants(${typeof tag === 'string' ? tag : 'Component'})`;
  return createReactElement(tag, computeClassName, label, variantKeys) as RcBaseComponent<MergeProps<E, Partial<VariantProps> & ExtraProps>>;
};

export default createVariantsComponent;
