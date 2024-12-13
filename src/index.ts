import {
  createElement,
  forwardRef,
  ForwardRefExoticComponent,
  JSXElementConstructor,
} from "react";
import { RscBaseComponent, RscExtractProps, RscFactory, RscInterpolation } from "./types";

/**
 * Creates a styled React component with dynamic class names based on template literals and interpolations.
 *
 * This function takes a base element or component (`tag`), along with template strings and
 * interpolations, and returns a `forwardRef` component that computes a final `className` string.
 * It filters out `$`-prefixed props so they are not passed to the DOM, and merges any incoming
 * `className` prop with the computed classes.
 *
 * @typeParam T - Additional props that will be merged with the base component or intrinsic element's props.
 * @typeParam E - The type of the element or component to style. It can be:
 *   - A key of `JSX.IntrinsicElements` (e.g., 'div', 'span', 'button'),
 *   - A `ForwardRefExoticComponent`,
 *   - Or a `JSXElementConstructor` (a function or class component).
 *
 * @param tag - The base element or component to style.
 * @param strings - The template literal strings array.
 * @param interpolations - An array of interpolations (functions or values) that can dynamically compute class names based on props.
 *
 * @returns A `BaseComponent` that incorporates the computed classes and filtered props, suitable for rendering in React.
 */
const createComponent = <
  T extends object,
  E extends
  | keyof JSX.IntrinsicElements
  | ForwardRefExoticComponent<any>
  | JSXElementConstructor<any>,
>(
  tag: E,
  strings: TemplateStringsArray,
  interpolations: RscInterpolation<RscExtractProps<E, T>>[],
): RscBaseComponent<RscExtractProps<E, T>> => {
  // Define the function to compute class names
  const computeClassName = (props: any) => {
    return strings
      .map((str, i) => {
        const interp = interpolations[i];
        return typeof interp === 'function'
          ? str + interp(props)
          : str + (interp ?? '');
      })
      .join('')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const RenderComponent = forwardRef<HTMLElement, RscExtractProps<E, T>>(
    (props, ref) => {
      const computedClassName = computeClassName(props);

      // Filter out $-prefixed props
      const domProps: Record<string, any> = {};
      for (const key in props) {
        if (!key.startsWith('$')) {
          domProps[key] = props[key];
        }
      }

      const incomingClassName = domProps.className || '';
      const finalClassName = [computedClassName, incomingClassName]
        .filter(Boolean)
        .join(' ')
        .trim();

      return createElement(tag as any, { ...domProps, className: finalClassName, ref });
    }
  );

  RenderComponent.displayName = `Styled(${typeof tag === 'string' ? tag : 'Component'})`;

  // Attach the compute function and tag to the component for later use
  (RenderComponent as any).__rscComputeClassName = computeClassName;
  (RenderComponent as any).__rscTag = tag;

  return RenderComponent;
};

/**
 * a collection of functions that create styled components based on HTML tags.
 */
const rscTarget: Partial<RscFactory> = {};
rscTarget.extend = (
  baseComponent: RscBaseComponent<any>,
  elementType?: any
) => {
  return (
    strings: TemplateStringsArray,
    ...interpolations: RscInterpolation<any>[]
  ) => {
    // base component's compute function and tag
    const baseComputeClassName = (baseComponent as any).__rscComputeClassName;
    const baseTag = (baseComponent as any).__rscTag;

    // new compute function for the extended component
    const extendedComputeClassName = (props: any) => {
      return strings
        .map((str, i) => {
          const interp = interpolations[i];
          return typeof interp === 'function'
            ? str + interp(props)
            : str + (interp ?? '');
        })
        .join('')
        .replace(/\s+/g, ' ')
        .trim();
    };

    const WrappedComponent = forwardRef<HTMLElement, any>((props, ref) => {
      // compute class names separately, combine them
      const baseClassName = baseComputeClassName(props);
      const extendedClassName = extendedComputeClassName(props);
      const combinedClassName = `${baseClassName} ${extendedClassName}`.trim();

      // filter out $-prefixed props
      const domProps: Record<string, any> = {};
      for (const key in props) {
        if (!key.startsWith('$')) {
          domProps[key] = props[key];
        }
      }

      const incomingClassName = domProps.className || '';
      const finalClassName = [combinedClassName, incomingClassName]
        .filter(Boolean)
        .join(' ')
        .trim();

      return createElement(
        elementType || baseTag,
        { ...domProps, className: finalClassName, ref }
      );
    });

    WrappedComponent.displayName = `Extended(${baseComponent.displayName || 'Component'})`;

    // compute function and tag for potential further extensions
    (WrappedComponent as any).__rscComputeClassName = (props: any) => {
      const baseClassName = baseComputeClassName(props);
      const extendedClassName = extendedComputeClassName(props);
      return `${baseClassName} ${extendedClassName}`.trim();
    };
    (WrappedComponent as any).__rscTag = elementType || baseTag;

    return WrappedComponent;
  };
};

const rscProxy = new Proxy(rscTarget, {
  get(_, prop: string) {
    if (prop === "extend") {
      return rscTarget.extend;
    }

    return <T extends object>(
      strings: TemplateStringsArray,
      ...interpolations: RscInterpolation<T>[]
    ) =>
      createComponent<T, keyof JSX.IntrinsicElements>(
        prop as keyof JSX.IntrinsicElements,
        strings,
        interpolations,
      );
  },
});

const rscBaseRsc = new Proxy(rscProxy, {
  apply: (_, __, [tag, strings, ...interpolations]) =>
    createComponent(tag, strings, interpolations),
});

/**
 * The `rsc` object is the main entry point for creating styled components using intrinsic HTML elements or existing React components.
 *
 * It provides:
 * - A collection of functions for each intrinsic HTML element (e.g., `rsc.div`, `rsc.span`, `rsc.button`, etc.)
 *   to create styled components by using template literals and interpolations.
 * - A callable interface to create styled components directly from a given tag or component (e.g., `rsc('div', ...)`).
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
 * // Extending as a 'button', ensuring non-$ props match button attributes:
 * const ExtendedButton = rsc.extend(StyledDiv, 'button')`
 *   ${p => p.type === 'submit' ? 'font-bold' : ''}
 * `
 * ```
 */
const rsc = rscBaseRsc as RscFactory;

export { rsc };
export { dc, restyle } from "./v1-deprecated";
