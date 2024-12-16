import { ForwardRefExoticComponent, JSXElementConstructor } from "react";
import { BaseComponent, Interpolation, JsxElements, MergeProps } from "../types";
import createForwardRef from "./createForwardRef";

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
const createRscComponent = <
  T extends object,
  E extends keyof JsxElements | ForwardRefExoticComponent<any> | JSXElementConstructor<any>
>(
  tag: E,
  strings: TemplateStringsArray,
  interpolations: Interpolation<MergeProps<E, T>>[]
): BaseComponent<MergeProps<E, T>> => {
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

  const RenderComponent = createForwardRef(tag, computeClassName);

  // debugging
  RenderComponent.displayName = `Styled(${typeof tag === 'string' ? tag : 'Component'})`;

  // attach metadata
  // todo: create interface for RenderComponent instead of using any
  (RenderComponent as any).__rscComputeClassName = computeClassName;
  (RenderComponent as any).__rscTag = tag;

  return RenderComponent as BaseComponent<MergeProps<E, T>>;
};


export default createRscComponent;
