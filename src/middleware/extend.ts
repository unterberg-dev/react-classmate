import { createElement, forwardRef } from "react";
import { RscBaseComponent, ExtendFunction, Interpolation, Rsc, InputComponent } from "../types";

/**
 * Assign the extend function to the rscTarget object.
 *
 * @typeParam T - Additional props to be included in the extended component.
 * @param baseComponent - The base component to extend. It can be:
 * - A `BaseComponent` that was previously created by the library.
 * - A React `JSXElementConstructor`, such as a custom React functional or class component.
 *
 * ### Metadata:
 * The returned component includes metadata to facilitate further extensions and debugging:
 * - `__rscComputeClassName`: A function to compute the combined class name for the component.
 * - `__rscTag`: The base tag or component used for rendering.
 */
const attachExtend = (rscTarget: Rsc) => {
  rscTarget.extend = (<T extends object>(
    baseComponent: RscBaseComponent<any> | InputComponent
  ) => {
    return (
      strings: TemplateStringsArray,
      ...interpolations: Interpolation<T>[]
    ) => {
      const baseComputeClassName =
        (baseComponent as RscBaseComponent<T>).__rscComputeClassName || (() => "");
      const baseTag = (baseComponent as RscBaseComponent<T>).__rscTag || baseComponent;

      const extendedComputeClassName = (props: T) => {
        const baseClassName = baseComputeClassName(props);

        const extendedClassName = strings
          .map((str, i) => {
            const interp = interpolations[i];
            return typeof interp === "function"
              ? str + interp(props)
              : str + (interp ?? "");
          })
          .join("")
          .replace(/\s+/g, " ")
          .trim();

        return `${baseClassName} ${extendedClassName}`.trim();
      };

      const WrappedComponent: RscBaseComponent<T> = forwardRef<HTMLElement, T>((props, ref) => {
        const combinedClassName = extendedComputeClassName(props as T);

        const domProps: Record<string, any> = {};
        for (const key in props) {
          if (!key.startsWith("$")) {
            domProps[key] = props[key];
          }
        }

        return createElement(baseTag, {
          ...domProps,
          className: combinedClassName,
          ref,
        });
      });

      WrappedComponent.displayName = `Extended(${(baseComponent as RscBaseComponent<any>).displayName || "Component"})`;
      WrappedComponent.__rscComputeClassName = extendedComputeClassName;
      WrappedComponent.__rscTag = baseTag;

      return WrappedComponent;
    };
  }) as ExtendFunction;

  return rscTarget;
};

export default attachExtend;
