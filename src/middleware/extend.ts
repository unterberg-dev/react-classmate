import { RcBaseComponent, ExtendFunction, Interpolation, InputComponent, RcComponentFactory } from "../types";
import createReactElement from "../create/createReactElement";

/**
 * Assign the extend function to the rcTarget object.
 *
 * @typeParam T - Additional props to be included in the extended component.
 * @param baseComponent - The base component to extend. It can be:
 * - A `BaseComponent` that was previously created by the library.
 * - A React `JSXElementConstructor`, such as a custom React functional or class component.
 *
 * ### Metadata:
 * The returned component includes metadata to facilitate further extensions and debugging:
 * - `__rcComputeClassName`: A function to compute the combined class name for the component.
 * - `__rcTag`: The base tag or component used for rendering.
 */
const attachExtend = (rcTarget: Partial<RcComponentFactory>) => {
  rcTarget.extend = (<T extends object>(
    baseComponent: RcBaseComponent<any> | InputComponent
  ) => {
    return (
      strings: TemplateStringsArray,
      ...interpolations: Interpolation<T>[]
    ) => {
      const baseComputeClassName =
        (baseComponent as RcBaseComponent<any>).__rcComputeClassName || (() => "");
      const baseTag = (baseComponent as RcBaseComponent<any>).__rcTag || baseComponent;

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

      const WrappedComponent = createReactElement(baseTag, extendedComputeClassName);

      WrappedComponent.displayName = `Extended(${(baseComponent as RcBaseComponent<any>).displayName || "Component"})`;
      WrappedComponent.__rcComputeClassName = extendedComputeClassName;
      WrappedComponent.__rcTag = baseTag;

      return WrappedComponent;
    };
  }) as ExtendFunction;

  return rcTarget;
};

export default attachExtend;
