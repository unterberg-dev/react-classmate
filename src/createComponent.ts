import clsx from 'clsx'
import { createElement, CSSProperties, forwardRef, useMemo } from 'react'

import { ComponentOptions, HTMLProps, RefComponent, ValidProps } from './types'

/**
 * Creates a custom component with dynamic class names and styles based on passed props.
 *
 * @param tag - The HTML tag or React element to render.
 * @param options - Configuration object for base classes, dynamic classes, and styles.
 * @param css - Static or dynamic CSS styles to apply to the component.
 * @returns A forwardRef React component that dynamically renders with calculated props, classes, and styles.
 */
export const createComponent = <
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
