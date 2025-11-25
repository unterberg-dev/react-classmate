import type {
  AllowedTags,
  Interpolation,
  LogicHandler,
  RuntimeComponent,
  VariantsConfig,
} from "@classmate/core"
import type {
  ForwardRefExoticComponent,
  JSX,
  JSXElementConstructor,
  PropsWithoutRef,
  RefAttributes,
} from "react"

export type {
  AllowedTags,
  Interpolation,
  LogicHandler,
  VariantsConfig,
  StyleDefinition,
} from "@classmate/core"

export type RcIntrinsicElement = Extract<AllowedTags, keyof JSX.IntrinsicElements>

export type InputComponent =
  | ForwardRefExoticComponent<any>
  | JSXElementConstructor<any>
  | RcBaseComponent<any>

/**
 * Base type for styled React components with forward refs.
 *
 * @typeParam P - Props of the component.
 */
export interface RcBaseComponent<P extends object = object>
  extends RuntimeComponent<P>,
    ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<any>> {}

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
  <E extends InputComponent, I extends RcIntrinsicElement>(component: E) => ExtendTemplateBuilder<E, I>

export interface ExtendTemplateBuilder<
  E extends InputComponent,
  I extends RcIntrinsicElement,
  LogicProps extends object = object,
> {
  <T extends object>(
    strings: TemplateStringsArray,
    ...interpolations: Interpolation<MergeProps<E, T> & JSX.IntrinsicElements[I]>[]
  ): RcBaseComponent<MergeProps<E, T>>
  logic<NextLogic extends object = object>(
    handler: LogicHandler<MergeProps<E, LogicProps & NextLogic>>,
  ): ExtendTemplateBuilder<E, I, LogicProps & NextLogic>
}

/**
 * Base type for the base classes in the variants configuration.
 *
 * This can be a static string or a function that returns a string based on the component's props.
 *
 * @typeParam VariantProps - The props for the variants.
 * @typeParam ExtraProps - Additional props for the component.
 */
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
   *   base: ({ $isActive }) => `${$isActive ? "pointer-cursor" : ""} p-4 rounded-md`,
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
export interface RcFactoryFunction<K extends RcIntrinsicElement> {
  <T extends object>(
    strings: TemplateStringsArray,
    ...interpolations: Interpolation<T>[]
  ): RcBaseComponent<MergeProps<K, T>>
  logic<LogicProps extends object = object>(
    handler: LogicHandler<MergeProps<K, LogicProps>>,
  ): RcFactoryFunction<K>
  variants: VariantsFunction<K>
}

export type RcComponentFactory = {
  [K in RcIntrinsicElement]: RcFactoryFunction<K>
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
