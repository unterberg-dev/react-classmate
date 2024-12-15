import {
  createElement,
  forwardRef,
  ForwardRefExoticComponent,
  JSXElementConstructor,
  PropsWithoutRef,
  RefAttributes,
} from "react";

/** Alias => Intrinsic react elements */
type JsxElements = React.JSX.IntrinsicElements

/**
 * interpolation type for "styled components".
 *
 * Interpolations can be:
 * - Static strings or booleans.
 * - Functions that take the component's props and return a class name string.
 * - Null or undefined values (ignored in class name computation).
 *
 * @typeParam T - The type of the props passed to the interpolation function.
 */
type Interpolation<T> = string | boolean | ((props: T) => string) | null | undefined;

/**
 * Base type for styled React components with forward refs.
 *
 * @typeParam P - Props of the component.
 */
type BaseComponent<P> = ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<HTMLElement>
>;

/**
 * Extracts the inner props of a component.
 *
 * If `P` is a component with `PropsWithoutRef` and `RefAttributes`, the props are extracted.
 * Otherwise, `P` is returned as is.
 *
 * @typeParam P - The type of the component to extract props from.
 */
type InnerProps<P> = P extends PropsWithoutRef<infer U> & RefAttributes<any> ? U : P;

/**
 * Merges additional props with the base props of a given component or intrinsic element.
 *
 * @typeParam E - The base component type or intrinsic element.
 * @typeParam T - Additional props to merge with the base props.
 */
type MergeProps<E, T> = E extends keyof JsxElements
  ? JsxElements[E] & T
  : E extends ForwardRefExoticComponent<infer P>
  ? InnerProps<P> & T
  : E extends JSXElementConstructor<infer P2>
  ? P2 & T
  : T;

/**
 * Validates the additional props `T` against the intrinsic element type `E`.
 *
 * @typeParam E - The intrinsic element type (e.g., 'div', 'button').
 * @typeParam T - The additional props to validate.
 */
type Validator<E extends keyof JsxElements, T extends object> = T &
  JsxElements[E];

/**
 * Extends a styled component or intrinsic element with additional props and interpolations.
 *
 * This type defines the `extend` method used in the library.
 */
type ExtendFunction = {
  /**
   * The `extend` method allows you to create a new styled component from an existing one.
   *
   * @typeParam E - The type of the original component, which can be a ForwardRefExoticComponent or a JSXElementConstructor.
   * @param component - The base component to extend.
   * @returns A function that accepts template strings and interpolations, and returns a new styled component.
   * @example
   * ```tsx
   * // Extending a custom component without intrinsic element type
   * const SomeBase = rsc.div<{ $active?: boolean }>`color: red;`
   * const Extended = rsc.extend(SomeBase)<{ $highlighted?: boolean }>`
   *   ${p => p.$highlighted ? 'bg-yellow' : ''}
   *   ${p => p.$active ? 'text-red' : ''}
   * `
   *
   * // extending with specific props:
   * const ExtendedButton = rsc.extend(StyledButton)<ButtonHTMLAttributes<HTMLButtonElement>>`
   *   ${p => p.type === 'submit' ? 'font-bold' : ''}
   * `
   * ```
   */
  <E extends ForwardRefExoticComponent<any> | JSXElementConstructor<any>>(
    component: E
  ): <T extends object>(
    strings: TemplateStringsArray,
    ...interpolations: Interpolation<MergeProps<E, T>>[]
  ) => BaseComponent<MergeProps<E, T>>;
  <E extends ForwardRefExoticComponent<any> | JSXElementConstructor<any>, I extends keyof JsxElements>(
    component: E,
  ): <T extends object>(
    strings: TemplateStringsArray,
    ...interpolations: Array<Interpolation<Validator<I, T> & JsxElements[I]>>
  ) => BaseComponent<Validator<I, T> & JsxElements[I]>;
};

/**
 * The main factory object for creating styled components.
 *
 * Includes:
 * - Functions for each intrinsic HTML element (e.g., `rsc.div`, `rsc.span`, etc.).
 * - An `extend` method for extending components.
 */
type RscComponentFactory = {
  [K in keyof JsxElements]: <T>(
    strings: TemplateStringsArray,
    ...interpolations: Interpolation<T>[]
  ) => BaseComponent<MergeProps<K, T>>;
} & {
  extend: ExtendFunction;
};

/**
 * Creates a forwardRef render component with computed class names.
 *
 * @typeParam T - Props of the component.
 * @typeParam E - Base element or component type.
 * @param tag - The base element or component to render.
 * @param computeClassName - A function to compute class names based on props.
 * @returns A forwardRef component with computed class names and filtered props.
 */
const createRenderComponent = <
  T extends object,
  E extends keyof JsxElements | ForwardRefExoticComponent<any> | JSXElementConstructor<any>
>(
  tag: E,
  computeClassName: (props: T) => string
): ForwardRefExoticComponent<PropsWithoutRef<T> & RefAttributes<HTMLElement>> => {
  return forwardRef<HTMLElement, T & RefAttributes<HTMLElement>>(
    (props, ref) => {
      const computedClassName = computeClassName(props as T);

      // Filter out $-prefixed props for the DOM
      const domProps: Record<string, any> = {};
      for (const key in props) {
        if (!key.startsWith('$')) {
          domProps[key] = props[key];
        }
      }

      // Merge computed class names with incoming className
      const incomingClassName = domProps.className || '';
      const finalClassName = [computedClassName, incomingClassName]
        .filter(Boolean)
        .join(' ')
        .trim();

      return createElement(tag as any, {
        ...domProps,
        className: finalClassName,
        ref,
      });
    }
  );
};

/**
 * Cache for computed class names based on props.
 */
const classNameCache = new Map();

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

const createComponent = <
  T extends object,
  E extends keyof JsxElements | ForwardRefExoticComponent<any> | JSXElementConstructor<any>
>(
  tag: E,
  strings: TemplateStringsArray,
  interpolations: Interpolation<MergeProps<E, T>>[]
): BaseComponent<MergeProps<E, T>> => {
  // Define the function to compute class names
  const computeClassName = (props: MergeProps<E, T>) => {
    const cacheKey = JSON.stringify(props);
    if (classNameCache.has(cacheKey)) {
      return classNameCache.get(cacheKey);
    }

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

    // classNameCache.set(cacheKey, result);
    return result;
  };

  // Use the outsourced RenderComponent logic
  const RenderComponent = createRenderComponent(tag, computeClassName);

  // debugging
  RenderComponent.displayName = `Styled(${typeof tag === 'string' ? tag : 'Component'})`;

  // attach metadata for future extensions
  (RenderComponent as any).__rscComputeClassName = computeClassName;
  (RenderComponent as any).__rscTag = tag;

  return RenderComponent as BaseComponent<MergeProps<E, T>>;
};

/**
 * A collection of functions and utilities for creating styled components.
 *
 * Includes:
 * - Functions for intrinsic elements (e.g., `rsc.div`, `rsc.button`).
 * - The `extend` method for extending existing styled components.
 */
const rscTarget: Partial<RscComponentFactory> = {};

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
rscTarget.extend = <T extends object>(
  baseComponent: BaseComponent<any> | JSXElementConstructor<any>,
) => {
  return (
    strings: TemplateStringsArray,
    ...interpolations: Interpolation<any>[]
  ) => {
    const baseComputeClassName = (baseComponent as any).__rscComputeClassName || (() => "");
    const baseTag = (baseComponent as any).__rscTag || baseComponent;

    const extendedComputeClassName = (props: any) =>
      strings
        .map((str, i) => {
          const interp = interpolations[i];
          return typeof interp === "function"
            ? str + interp(props)
            : str + (interp ?? "");
        })
        .join("")
        .replace(/\s+/g, " ")
        .trim();

    const WrappedComponent = forwardRef<HTMLElement, T & JSX.IntrinsicAttributes>(
      (props, ref) => {
        const combinedClassName = [
          baseComputeClassName(props),
          extendedComputeClassName(props),
          (props as any).className,
        ]
          .filter(Boolean)
          .join(" ")
          .trim();

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
};

/**
 * A proxy object that dynamically handles intrinsic element methods (e.g., `rsc.div`, `rsc.button`)
 * and the `extend` function for creating styled components.
 *
 * This proxy intercepts access to:
 * - Keys corresponding to intrinsic elements (e.g., 'div', 'span', 'button') to create styled components dynamically.
 * - The `extend` method for extending existing styled components or custom components.
 */
const rscProxy = new Proxy(rscTarget, {
  get(_, prop: string) {
    if (prop === "extend") {
      return rscTarget.extend;
    }

    return <T extends object>(
      strings: TemplateStringsArray,
      ...interpolations: Interpolation<T>[]
    ) =>
      createComponent<T, keyof JsxElements>(
        prop as keyof JsxElements,
        strings,
        interpolations
      );
  },
});

/**
 * rsc trap
 */
const rscFactory = new Proxy(rscProxy, {
  apply: (_Factory, [tag, strings, ...interpolations]) =>
    createComponent(tag, strings, interpolations),
});

/**
 * The `rsc` object is the main entry point for creating styled components using intrinsic HTML elements or existing React components.
 *
 * It provides:
 * - A collection of functions for each intrinsic HTML element (e.g., `rsc.div`, `rsc.span`, `rsc.button`, etc.)
 *   to create styled components by using template literals and interpolations.
 * - A callable interface to create styled components directly from a given tag or component (e.g., `rsc.div``, ...)`).
 * - An `extend` method that allows you to create new styled components based on existing ones,
 *   optionally validating non-$ props against a specified intrinsic element.
 *
 * Each styled component created via `rsc` filters out `$`-prefixed props from the DOM and computes a final `className`
 * string by combining user-defined classes, dynamic interpolations based on props, and any incoming `className`.
 *
 * @example
 * ```tsx
 * // simplest usage:
 * const StyledDiv = rsc.div`
 *   p-2
 * `
 *
 * // Creating a styled 'div' with conditional classes:
 * const StyledDiv = rsc.div<{ $active?: boolean }>`
 *   p-2
 *   ${p => p.$active ? 'bg-blue' : 'bg-green'}
 * `
 *
 * // Using the styled component:
 * <StyledDiv $active>Active Content</StyledDiv>
 *
 * // Extending an existing styled component:
 * const ExtendedDiv = rsc.extend(StyledDiv)<{ $highlighted?: boolean }>`
 *   ${p => p.$highlighted ? 'border-2 border-yellow' : ''}
 * `
 *
 * // Validating props against an intrinsic element:
 * const ExtendedButton = rsc.extend(StyledButton)<ButtonHTMLAttributes<HTMLButtonElement>>`
 *   ${p => p.type === 'submit' ? 'font-bold' : ''}
 * `
 * ```
 */
export const rsc = rscFactory as RscComponentFactory;