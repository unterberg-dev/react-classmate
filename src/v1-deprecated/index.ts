import clsx from 'clsx'
import {
  ComponentType,
  createElement,
  CSSProperties,
  FC,
  forwardRef,
  ForwardRefExoticComponent,
  JSX,
  RefAttributes,
  useMemo,
} from 'react'

type RefComponent<T> = ForwardRefExoticComponent<T & RefAttributes<HTMLElement>>
type ComponentOptions<T> = {
  /** Base CSS class for the component */
  base?: string
  /** Function to dynamically generate an array of classes based on props */
  classes?: (props: T) => string[]
  /** Static or dynamic CSS object applied to the component */
  css?: CSSProperties | ((props: T) => CSSProperties)
}

type HTMLProps<T, K extends keyof JSX.IntrinsicElements> = T & JSX.IntrinsicElements[K]
type ValidProps<T, K extends keyof JSX.IntrinsicElements> = T & JSX.IntrinsicElements[K]

// core type
type DcComponent = {
  [K in keyof JSX.IntrinsicElements]: <T, E extends keyof JSX.IntrinsicElements = K>(
    options?: ComponentOptions<T> | string | ((props: HTMLProps<T, E>) => string),
    css?: ((props: HTMLProps<T, E>) => CSSProperties) | CSSProperties,
  ) => RefComponent<ValidProps<T, E>>
}

/**
 * Cleans and trims any extra spaces in the className string.
 *
 * @param className - The className string to clean.
 * @returns A trimmed className string.
 */
const cleanClassName = (className: string) => className.replace(/\s+/g, ' ').trim()

/**
 * Omits custom props (those starting with '$') from the props passed to the DOM element.
 *
 * @param props - The full set of props passed to the component.
 * @param customProps - An array of custom prop keys to omit.
 * @returns The filtered props object to be passed to the DOM element.
 */
const omitCustomProps = <T extends object, K extends keyof JSX.IntrinsicElements>(
  props: T,
  customProps: (keyof T)[],
): JSX.IntrinsicElements[K] => {
  const domProps: Record<string, any> = {}
  for (const key in props) {
    if (!customProps.includes(key as keyof T)) {
      domProps[key] = props[key]
    }
  }
  return domProps as JSX.IntrinsicElements[K]
}

/**
 * Creates a custom component with dynamic class names and styles based on passed props.
 *
 * @param tag - The HTML tag or React element to render.
 * @param options - Configuration object for base classes, dynamic classes, and styles.
 * @param css - Static or dynamic CSS styles to apply to the component.
 * @returns A forwardRef React component that dynamically renders with calculated props, classes, and styles.
 */
const createComponent = <
  T extends object,
  K extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
>(
  tag: K,
  options?: ComponentOptions<T> | string | ((props: HTMLProps<T, K>) => string),
  css?: ((props: HTMLProps<T, K>) => CSSProperties) | CSSProperties,
): RefComponent<ValidProps<T, K>> => {
  const RenderComponent = forwardRef<HTMLElement, ValidProps<T, K>>((props, ref) => {
    const { className, style, ...restProps } = props

    // Resolve base class string
    const baseClass = useMemo(() => {
      if (typeof options === 'string') return options
      if (typeof options === 'object') return options.base
      return undefined
    }, [options])

    // Resolve dynamic classes based on props
    const dynamicClasses = useMemo(() => {
      if (typeof options === 'object') return options?.classes
      if (typeof options === 'function') return options
      return undefined
    }, [options])

    // Resolve dynamic CSS based on props
    const dynamicCss = useMemo(() => {
      if (typeof options === 'object') return options?.css
      return css
    }, [options, css])

    // generate className string
    const classes = useMemo(
      () =>
        cleanClassName(
          clsx(
            baseClass,
            dynamicClasses ? dynamicClasses(props as HTMLProps<T, K>) : [],
            className,
          ),
        ),
      [baseClass, dynamicClasses, className, props],
    )

    // resolve CSS object
    const resolvedCss = useMemo(
      () => (typeof dynamicCss === 'function' ? dynamicCss(props as HTMLProps<T, K>) : dynamicCss),
      [dynamicCss, props],
    )

    // merge custom and passed styles
    const mergedStyles = useMemo(() => ({ ...resolvedCss, ...style }), [resolvedCss, style])

    // collect custom props starting with '$'
    const customProps = useMemo(
      () =>
        (Object.keys(props) as (keyof T)[]).filter(
          key => typeof key === 'string' && key.startsWith('$'),
        ),
      [props],
    )

    // filter out custom props before passing to the DOM element
    const domProps = useMemo(
      () => omitCustomProps<T, K>(restProps as T, customProps),
      [restProps, customProps],
    )

    // Render the element with the calculated props, classes, and styles
    return createElement(tag, {
      ...domProps,
      className: classes,
      style: mergedStyles,
      ref,
    })
  })

  RenderComponent.displayName = `DynamicComponent(${tag})`

  return RenderComponent as RefComponent<ValidProps<T, K>>
}

// Create the proxy with correct typings for the intrinsic elements
const dcProxy = new Proxy(
  {},
  {
    get:
      (_, tag: keyof JSX.IntrinsicElements) =>
        <T extends object, K extends keyof JSX.IntrinsicElements = typeof tag>(
          options?: ComponentOptions<T> | string | ((props: HTMLProps<T, K>) => string),
          css?: ((props: HTMLProps<T, K>) => CSSProperties) | CSSProperties,
        ) =>
          createComponent<T, K>(tag as K, options, css),
  },
) as DcComponent

/**
 * A utility that creates classname strings and dynamic styles for React components.
 * @example
 * ```tsx
 * const SomeButton = dc.div<{ $isActive?: boolean; $isLoading?: boolean }>(
 *  ({ $isActive }) => `
 *    absolute
 *    z-10
 *    transition-all
 *    ${$isActive ? 'bg-blue-400 text-white' : 'bg-blue-400 text-blue-200'}
 *    `,
 * )
 * ```
 */
export const dc = dcProxy

/**
 * A utility type that extracts the props type from a React component type.
 *
 * @template T - A React component type.
 */
export type RestyleType<T extends React.ComponentType<any>> =
  T extends React.ComponentType<infer Props>
  ? Props
  : never

/**
 * A higher-order component (HOC) that allows you to restyle a given component by adding additional
 * classes and CSS styles based on the provided props.
 *
 * @template T - The original props type of the component.
 * @template CustomProps - Additional custom props that can be passed to the component.
 *
 * @param Component - The component to be restyled. It can be a functional component or a forward-ref exotic component.
 * @param newClasses - Optional. A string or a function that returns a string of additional classes to be added based on the props.
 * @param newCss - Optional. An object or a function that returns an object of additional CSS styles to be added based on the props.
 *
 * @returns A new component with the additional classes and styles applied.
 */
export const restyle = <T extends object, CustomProps extends object = {}>(
  Component: ComponentType<T> | ForwardRefExoticComponent<any>,
  newClasses?: string | ((props: T & CustomProps) => string),
  newCss?: CSSProperties | ((props: T & CustomProps) => CSSProperties),
): ForwardRefExoticComponent<T & CustomProps> => {
  const RestyledComponent = forwardRef<HTMLElement, T & CustomProps>((props, ref) => {
    // Separate out `className` and `style` for merging
    const { className, style, ...restProps } = props as T &
      CustomProps & { className?: string; style?: CSSProperties }

    // Resolve additional classes based on props
    const additionalClasses = useMemo(() => {
      return typeof newClasses === 'function'
        ? newClasses(props as T & CustomProps)
        : newClasses || ''
    }, [newClasses, props])

    // Resolve additional CSS styles based on props
    const additionalCss = useMemo(() => {
      return typeof newCss === 'function' ? newCss(props as T & CustomProps) : newCss
    }, [newCss, props])

    // Merge classes and styles
    const mergedClassName = clsx(className, additionalClasses)
    const mergedStyle = { ...style, ...additionalCss }

    // Pass ref to the underlying component
    return createElement(Component, {
      ...(restProps as T),
      className: mergedClassName,
      style: mergedStyle,
      ref,
    })
  })

  return RestyledComponent as ForwardRefExoticComponent<T & CustomProps>
}
