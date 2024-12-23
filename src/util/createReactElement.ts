import {
  createElement,
  forwardRef,
  type JSXElementConstructor,
  type RefAttributes,
} from "react";

import type { RcBaseComponent } from "../types";

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
  E extends keyof React.JSX.IntrinsicElements | JSXElementConstructor<any>,
>(
  tag: E,
  computeClassName: (props: T) => string,
  displayName: string,
  propsToFilter: (keyof T)[] = [],
): RcBaseComponent<T> => {
  const element = forwardRef<HTMLElement, T & RefAttributes<HTMLElement>>(
    (props, ref) => {
      const computedClassName = computeClassName(props as T);

      // Filter out $-prefixed props and any props in propsToFilter
      const domProps: Record<string, unknown> = {};
      for (const key in props) {
        if (
          !key.startsWith("$") &&
          !propsToFilter.includes(key as unknown as keyof T)
        ) {
          domProps[key] = props[key];
        }
      }

      // Merge computed class names with incoming className
      const incomingClassName = domProps.className || "";
      const finalClassName = [computedClassName, incomingClassName]
        .filter(Boolean)
        .join(" ")
        .trim();

      return createElement(tag, {
        ...domProps,
        className: finalClassName,
        ref,
      });
    },
  ) as RcBaseComponent<T>;

  element.displayName = displayName || "Rc Component";
  element.__rcComputeClassName = computeClassName;
  element.__rcTag = tag;

  return element;
};

export default createReactElement;
