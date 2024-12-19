import {
  createElement,
  forwardRef,
  JSXElementConstructor,
  RefAttributes,
} from "react";
import { RscBaseComponent } from "../types";

/**
 * Creates a forwardRef render component with computed class names.
 *
 * @typeParam T - Props of the component.
 * @typeParam E - Base element or component type.
 * @param tag - The base element or component to render.
 * @param computeClassName - A function to compute class names based on props.
 * @returns A forwardRef component with computed class names and filtered props.
 */
const createReactElement = <
  T extends object,
  E extends keyof React.JSX.IntrinsicElements | JSXElementConstructor<any>
>(
  tag: E,
  computeClassName: (props: T) => string
): RscBaseComponent<T> => {
  return forwardRef<HTMLElement, T & RefAttributes<HTMLElement>>((props, ref) => {
    const computedClassName = computeClassName(props as T);

    // Filter out $-prefixed props for the DOM
    const domProps: Record<string, unknown> = {};
    for (const key in props) {
      if (!key.startsWith("$")) {
        domProps[key] = props[key];
      }
    }

    // Merge computed class names with incoming className
    const incomingClassName = domProps.className || "";
    const finalClassName = [computedClassName, incomingClassName].filter(Boolean).join(" ").trim();

    return createElement(tag, {
      ...domProps,
      className: finalClassName,
      ref,
    });
  });
};

export default createReactElement;

