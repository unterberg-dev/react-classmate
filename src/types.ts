import {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  JSXElementConstructor,
} from "react";

export type RscInterpolation<T> = string | boolean | ((props: T) => string) | null | undefined;

export type RscBaseComponent<P> = ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<HTMLElement>
>;

type RscInnerProps<P> = P extends PropsWithoutRef<infer U> & RefAttributes<any> ? U : P;

export type RscExtractProps<E, T> = E extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[E] & T
  : E extends ForwardRefExoticComponent<infer P>
    ? RscInnerProps<P> & T
    : E extends JSXElementConstructor<infer P2>
      ? P2 & T
      : T;

type RscValidateProps<E extends keyof JSX.IntrinsicElements, T extends object> = {
  [K in keyof T]: K extends `$${string}`
    ? T[K] // $-prefixed props are always allowed
    : K extends keyof JSX.IntrinsicElements[E]
      ? T[K] // allowed if it's a valid prop of the intrinsic element
      : never; // invalid prop causes a type error
};

/**
 * If `I` is provided, we use it as the intrinsic element type. Otherwise, use `E`.
 */
type RscExtendFunction = {
  /**
   * Create a new styled component from an existing component without specifying an intrinsic element.
   *
   * @typeParam E - The base component type (forwardRef or JSX component).
   * @param component - The base component to extend.
   * @returns A function that takes template strings and returns a styled component.
   */
  <E extends ForwardRefExoticComponent<any> | JSXElementConstructor<any>>(
    component: E,
  ): <T extends object>(
    strings: TemplateStringsArray,
    ...interpolations: RscInterpolation<RscExtractProps<E, T>>[]
  ) => RscBaseComponent<RscExtractProps<E, T>>;

  /**
   * The `extend` method allows you to create a new styled component from an existing one.
   * You can optionally specify an intrinsic element type to validate that the extended
   * component’s non-$ props are valid for that intrinsic element.
   *
   * @typeParam E - The type of the original component, which can be a ForwardRefExoticComponent or a JSXElementConstructor.
   * @typeParam I - (Optional) The intrinsic element type (e.g. 'div', 'span', etc.) against which to validate props.
   *
   * @param component - The base component to extend.
   * @param elementType - (Optional) The intrinsic element type to validate props against.
   *
   * @returns A function that accepts template strings and interpolations, and returns a new styled component.
   *
   * @example
   * ```tsx
   * // Extending a custom component without intrinsic element type
   * const SomeBase = rsc.div<{ $active?: boolean }>`color: red;`
   * const Extended = rsc.extend(SomeBase)<{ $highlighted?: boolean }>`
   *   ${p => p.$highlighted ? 'bg-yellow' : ''}
   * `
   *
   * // Extending a component and specifying an intrinsic element type (e.g. 'button')
   * const ExtendedButton = rsc.extend(SomeBase, 'button')<{ type?: "submit" | "reset" }>`
   *   ${p => p.type === 'submit' ? 'font-bold' : ''}
   * `
   * ```
   */
  <
    E extends ForwardRefExoticComponent<any> | JSXElementConstructor<any>,
    I extends keyof JSX.IntrinsicElements,
  >(
    component: E,
    elementType: I,
  ): <T extends object>(
    strings: TemplateStringsArray,
    ...interpolations: Array<RscInterpolation<RscValidateProps<I, T> & JSX.IntrinsicElements[I]>>
  ) => RscBaseComponent<RscValidateProps<I, T> & JSX.IntrinsicElements[I]>;
};

interface RscFunction {
  <T, E extends keyof JSX.IntrinsicElements>(
    tag: E,
    strings: TemplateStringsArray,
    ...interpolations: RscInterpolation<T>[]
  ): RscBaseComponent<RscExtractProps<E, T>>;

  <T, E extends ForwardRefExoticComponent<any> | JSXElementConstructor<any>>(
    component: E,
    strings: TemplateStringsArray,
    ...interpolations: RscInterpolation<T>[]
  ): RscBaseComponent<RscExtractProps<E, T>>;
}

export type RscFactory = {
  [K in keyof JSX.IntrinsicElements]: <T>(
    strings: TemplateStringsArray,
    ...interpolations: RscInterpolation<T>[]
  ) => RscBaseComponent<RscExtractProps<K, T>>;
} & RscFunction & {
    extend: RscExtendFunction;
  };
