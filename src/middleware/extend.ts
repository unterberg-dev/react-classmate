import { createElement, forwardRef, JSXElementConstructor } from "react";
import { BaseComponent, ExtendFunction, Interpolation, Rsc } from "../types";

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
    baseComponent: BaseComponent<any> | JSXElementConstructor<any>
  ) => {
    return (
      strings: TemplateStringsArray,
      ...interpolations: Interpolation<any>[]
    ) => {
      const baseComputeClassName = (baseComponent as any).__rscComputeClassName || (() => "");
      const baseTag = (baseComponent as any).__rscTag || baseComponent;

      const extendedComputeClassName = (props: any) => {
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

      const WrappedComponent = forwardRef<HTMLElement, T & JSX.IntrinsicAttributes>(
        (props, ref) => {
          const combinedClassName = extendedComputeClassName(props);

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
        }
      );

      WrappedComponent.displayName = `Extended(${(baseComponent as BaseComponent<any>).displayName || 'Component'})`;
      (WrappedComponent as any).__rscComputeClassName = extendedComputeClassName;
      (WrappedComponent as any).__rscTag = baseTag;

      return WrappedComponent;
    };
  }) as ExtendFunction;

  return rscTarget;
}

export default attachExtend;
