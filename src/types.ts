import {
  ForwardRefExoticComponent,
  JSXElementConstructor,
  PropsWithoutRef,
  RefAttributes,
  JSX,
} from "react";

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
export type Interpolation<T> = string | boolean | ((props: T) => string) | null | undefined;

/** InputComponent */
export type InputComponent =  ForwardRefExoticComponent<any> | JSXElementConstructor<any>

/**
 * Base type for styled React components with forward refs.
 *
 * @typeParam P - Props of the component.
 */
export interface RscBaseComponent<P>
  extends ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<HTMLElement>> {
  __rscComputeClassName?: (props: P) => string;
  __rscTag?: keyof React.JSX.IntrinsicElements | JSXElementConstructor<any>;
}

/**
 * Extends a styled component or intrinsic element with additional props and interpolations.
 *
 * This type defines the `extend` method used in the library.
 */
export type ExtendFunction = {
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
  <E extends InputComponent, I extends keyof JSX.IntrinsicElements>(
    component: E
  ): <T extends object>(
    strings: TemplateStringsArray,
    ...interpolations: Interpolation<MergeProps<E, T> & JSX.IntrinsicElements[I]>[]
  ) => RscBaseComponent<MergeProps<E, T>>;
};

/**
 * Configuration object for creating styled components with variants.
 *
 * @typeParam Props - The props of the component.
 */
export type VariantsConfig<Props extends object> = {
  base?: string;
  variants: {
    [Key in keyof Props]?: Record<
      string,
      string | ((props: Props) => string)
    >;
  } & {
    [key: string]: Record<string, string | ((props: Props) => string)>;
  };
};

/**
 * Function for creating styled components with variants.
 *
 * @typeParam Props - The props of the component.
 */
type VariantsFunction = {
  <Props extends object>(
    config: VariantsConfig<Props>
  ): RscBaseComponent<Props>;
};

export type RscComponentFactory = {
  [K in keyof JSX.IntrinsicElements]: {
    <T>(
      strings: TemplateStringsArray,
      ...interpolations: Interpolation<T>[]
    ): RscBaseComponent<MergeProps<K, T>>;
    variants: VariantsFunction;
  };
} & {
  extend: ExtendFunction;
};

/**
 * Extracts the inner props of a component.
 *
 * If `P` is a component with `PropsWithoutRef` and `RefAttributes`, the props are extracted.
 * Otherwise, `P` is returned as is.
 *
 * @typeParam P - The type of the component to extract props from.
 */
export type InnerProps<P> = P extends PropsWithoutRef<infer U> & RefAttributes<unknown> ? U : P;

/**
 * Merges additional props with the base props of a given component or intrinsic element.
 *
 * @typeParam E - The base component type or intrinsic element.
 * @typeParam T - Additional props to merge with the base props.
 */
export type MergeProps<E, T> = E extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[E] & T
  : E extends ForwardRefExoticComponent<infer P>
  ? InnerProps<P> & T
  : E extends JSXElementConstructor<infer P2>
  ? P2 & T
  : T;


export type Rsc = Partial<RscComponentFactory>
