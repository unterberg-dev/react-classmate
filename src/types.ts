import type {
  ForwardRefExoticComponent,
  JSX,
  JSXElementConstructor,
  PropsWithoutRef,
  RefAttributes,
} from "react"

/**
 * Interpolation type for "styled components".
 *
 * Interpolations can be:
 * - Static strings or booleans.
 * - Functions that take the component's props and return a class name string.
 * - Null or undefined values (ignored in class name computation).
 *
 * @typeParam T - The type of the props passed to the interpolation function.
 */
export type Interpolation<T> = string | boolean | ((props: T) => string) | null | undefined

export type InputComponent =
  | ForwardRefExoticComponent<any>
  | JSXElementConstructor<any>
  | RcBaseComponent<any>

/**
 * Base type for styled React components with forward refs.
 *
 * @typeParam P - Props of the component.
 */
export interface RcBaseComponent<P>
  extends ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<HTMLElement>> {
  __rcComputeClassName?: (props: P) => string
  __rcTag?: keyof React.JSX.IntrinsicElements | JSXElementConstructor<any>
}

/**
 * The `extend` method allows you to create a new styled component from an existing one.
 *
 * @typeParam E - The type of the original component, which can be a ForwardRefExoticComponent or a JSXElementConstructor.
 * @param component - The base component to extend.
 * @returns A function that accepts template strings and interpolations, and returns a new styled component.
 * @example
 * ```tsx
 * // Extending a custom component without intrinsic element type
 * const SomeBase = rc.div<{ $active?: boolean }>`color: red;`
 * const Extended = rc.extend(SomeBase)<{ $highlighted?: boolean }>`
 *   ${p => p.$highlighted ? 'bg-yellow' : ''}
 *   ${p => p.$active ? 'text-red' : ''}
 * `
 *
 * // Extending with specific props:
 * const ExtendedButton = rc.extend(StyledButton)<ButtonHTMLAttributes<HTMLButtonElement>>`
 *   ${p => p.type === 'submit' ? 'font-bold' : ''}
 * ```
 */
type ExtendFunction =
  // this must stay here to get "rsc.extend" tooltipped in the IDE
  /**
   * The `extend` method allows you to create a new styled component from an existing one.
   *
   * @typeParam E - The type of the original component, which can be a ForwardRefExoticComponent or a JSXElementConstructor.
   * @param component - The base component to extend.
   * @returns A function that accepts template strings and interpolations, and returns a new styled component.
   * @example
   * ```tsx
   * // Extending a custom component without intrinsic element type
   * const SomeBase = rc.div<{ $active?: boolean }>`color: red;`
   * const Extended = rc.extend(SomeBase)<{ $highlighted?: boolean }>`
   *   ${p => p.$highlighted ? 'bg-yellow' : ''}
   *   ${p => p.$active ? 'text-red' : ''}
   * `
   *
   * // Extending with specific props:
   * const ExtendedButton = rc.extend(StyledButton)<ButtonHTMLAttributes<HTMLButtonElement>>`
   *   ${p => p.type === 'submit' ? 'font-bold' : ''}
   * ```
   */
  <E extends InputComponent, I extends keyof JSX.IntrinsicElements>(
    component: E,
  ) => <T extends object>(
    strings: TemplateStringsArray,
    ...interpolations: Interpolation<MergeProps<E, T> & JSX.IntrinsicElements[I]>[]
  ) => RcBaseComponent<MergeProps<E, T>>

/**
 * Base type for the base classes in the variants configuration.
 *
 * This can be a static string or a function that returns a string based on the component's props.
 *
 * @typeParam VariantProps - The props for the variants.
 * @typeParam ExtraProps - Additional props for the component.
 */
type VariantsConfigBase<VariantProps, ExtraProps> = string | ((props: VariantProps & ExtraProps) => string)

/**
 * Type for the variants object in the variants configuration.
 *
 * The keys are the prop names, and the values are objects with class names or functions that return class names.
 *
 * @typeParam VariantProps - The props for the variants.
 * @typeParam ExtraProps - Additional props for the component.
 */
type VariantsConfigVariants<VariantProps, ExtraProps> = {
  [Key in keyof VariantProps]?: Record<string, string | ((props: VariantProps & ExtraProps) => string)>
}

/**
 * Configuration object for creating styled components with variants.
 *
 * @typeParam VariantProps - The props for the variants.
 * @typeParam ExtraProps - Additional props for the component.
 */
export type VariantsConfig<VariantProps extends object, ExtraProps extends object> = {
  /**
   * The base classes for the styled component.
   * This can be a static string or a function that returns a string based on the component's props.
   * If not provided, the base classes are empty.
   */
  base?: VariantsConfigBase<VariantProps, ExtraProps>
  /**
   * The variants object defines the classes for each prop value.
   * The keys are the prop names, and the values are objects with class names or functions that return class names.
   */
  variants: VariantsConfigVariants<VariantProps, ExtraProps>
  /**
   * Default variants to apply if a variant prop is not passed.
   * For example, if you have a variant `size` and a default variant value of `md`,
   * it will use `md` if no explicit `size` prop is provided.
   */
  defaultVariants?: Partial<Record<keyof VariantProps, string>>
}

type VariantsFunction<K> =
  // this must stay here to get "rsc.div.variants" tooltipped in the IDE
  /**
   * The variants function allows you to create a styled component with variants.
   *
   * @param config - The configuration object for creating variants.
   * @returns A styled component with variants based on the configuration object.
   * @example
   * ```tsx
   * interface AlertProps {
   *   $isActive?: boolean;
   * }
   * // You can additionally type the variant props for strict type checking
   * interface AlertVariants {
   *   $severity: "info" | "warning" | "error";
   * }
   *
   * const Alert = rc.div.variants<AlertProps, AlertVariants>({
   *   base: p => `${p.$isActive ? "pointer-cursor" : ""} p-4 rounded-md`,
   *   variants: {
   *     $severity: {
   *       info: (p) => `bg-blue-100 text-blue-800 ${p.$isActive ? "shadow-lg" : ""}`,
   *       warning: (p) => `bg-yellow-100 text-yellow-800 ${p.$isActive ? "font-bold" : ""}`,
   *       error: (p) => `bg-red-100 text-red-800 ${p.$isActive ? "ring ring-red-500" : ""}`,
   *     },
   *   },
   * });
   *
   * export default () => <Alert $severity="info" $isActive />
   * // Outputs: <div className="custom-active p-4 rounded-md bg-blue-100 text-blue-800 shadow-lg" />
   * ```
   */
  <ExtraProps extends object, VariantProps extends object = ExtraProps>(
    config: VariantsConfig<VariantProps, ExtraProps>,
  ) => RcBaseComponent<MergeProps<K, ExtraProps & Partial<VariantProps>>>

/**
 * Factory for creating styled components with intrinsic elements.
 */
export type RcComponentFactory = {
  [K in keyof JSX.IntrinsicElements]: {
    <T>(
      strings: TemplateStringsArray,
      ...interpolations: Interpolation<T>[]
    ): RcBaseComponent<MergeProps<K, T>>

    // add rc.*.variants
    variants: VariantsFunction<K>
  }
} & {
  extend: ExtendFunction
}

/**
 * Extracts the inner props of a component.
 *
 * If `P` is a component with `PropsWithoutRef` and `RefAttributes`, the props are extracted.
 * Otherwise, `P` is returned as is.
 *
 * @typeParam P - The type of the component to extract props from.
 */
type InnerProps<P> = P extends PropsWithoutRef<infer U> & RefAttributes<any> ? U : P

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
      : T
