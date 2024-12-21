import { RcBaseComponent, Interpolation, MergeProps, InputComponent } from "../types";
import createReactElement from "./createReactElement";
import { JSX } from "react";

/**
 * Core function to create styled React components with dynamic class names.
 *
 * Computes class names from template strings and interpolations, filters `$`-prefixed props,
 * and merges any incoming `className` with the computed class names.
 *
 * @typeParam T - Additional props for the component.
 * @typeParam E - The base element or component type.
 * @param tag - The base element or component to style.
 * @param strings - Template literal strings for styling.
 * @param interpolations - Dynamic class name computations based on props.
 * @returns A styled component with dynamic class names.
 */
const createRcComponent = <
  T extends object,
  E extends keyof JSX.IntrinsicElements | InputComponent
>(
  tag: E,
  strings: TemplateStringsArray,
  interpolations: Interpolation<MergeProps<E, T>>[]
): RcBaseComponent<MergeProps<E, T>> => {
  // Define the function to compute class names
  const computeClassName = (props: MergeProps<E, T>) => {
    const result = strings
      .map((str, i) => {
        const interp = interpolations[i];
        return typeof interp === 'function'
          ? str + interp(props)
          : str + (interp ?? '');
      })
      .join('')
      .replace(/\s+/g, ' ')
      .trim();

    return result;
  };

  // create
  const RenderComponent = createReactElement(tag, computeClassName);
  RenderComponent.displayName = `Styled(${typeof tag === 'string' ? tag : 'Component'})`;

  // extend
  RenderComponent.__rcComputeClassName = computeClassName;
  RenderComponent.__rcTag = tag;

  return RenderComponent
};

export default createRcComponent;
