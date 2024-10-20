import clsx from 'clsx'
import React, { CSSProperties, forwardRef } from 'react'

type WithHTMLProps<T, K extends keyof JSX.IntrinsicElements> = T & JSX.IntrinsicElements[K]

interface DsComponentOptions {
  base?: string
  classes?: (props: any) => string[]
  css?: CSSProperties | ((props: any) => CSSProperties)
}

// Helper type to conditionally apply intrinsic element props (HTML vs SVG)
type FilterValidProps<T, K extends keyof JSX.IntrinsicElements> = K extends keyof JSX.IntrinsicElements
  ? T & JSX.IntrinsicElements[K]
  : never

type ForwardRefComponent<T> = React.ForwardRefExoticComponent<T & React.RefAttributes<HTMLElement>>

const createComponent = <T, K extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements>(
  tag: K,
  opts?: DsComponentOptions | string | ((props: WithHTMLProps<T, K>) => string),
  css?: ((props: WithHTMLProps<T, K>) => CSSProperties) | CSSProperties,
): ForwardRefComponent<FilterValidProps<T, K>> => {
  const baseClass = typeof opts === 'string' ? opts : typeof opts === 'object' ? opts?.base : undefined
  const dynamicClasses = typeof opts === 'object' ? opts?.classes : typeof opts === 'function' ? opts : undefined
  const dynamicCss = typeof opts === 'object' ? opts?.css : css

  const RenderComponent = forwardRef<HTMLElement, FilterValidProps<T, K>>((props, ref) => {
    const { className, style, ...restProps } = props

    // Generate the className string dynamically using clsx
    const classes = clsx(
      baseClass,
      dynamicClasses ? dynamicClasses(props as WithHTMLProps<T, K>) : [],
      className
    )

    // Resolve CSS based on props or static values
    const resolvedCss = typeof dynamicCss === 'function' ? dynamicCss(props as WithHTMLProps<T, K>) : dynamicCss
    const mergedStyles = { ...resolvedCss, ...style }

    return React.createElement(tag, {
      ...restProps,
      className: classes,
      style: mergedStyles,
      ref
    })
  })

  RenderComponent.displayName = `DynamicComponent(${tag})`
  return RenderComponent as ForwardRefComponent<FilterValidProps<T, K>>
}

export const ds = new Proxy({}, {
  get: (_, tag: keyof JSX.IntrinsicElements) => {
    return <T, K extends keyof JSX.IntrinsicElements = typeof tag>(
      opts?: DsComponentOptions | string | ((props: WithHTMLProps<T, K>) => string),
      css?: ((props: WithHTMLProps<T, K>) => CSSProperties) | CSSProperties
    ) => createComponent<T, K>(tag as K, opts, css)
  }
}) as {
  [K in keyof JSX.IntrinsicElements]: <T, E extends keyof JSX.IntrinsicElements = K>(
    opts?: DsComponentOptions | string | ((props: WithHTMLProps<T, E>) => string),
    css?: ((props: WithHTMLProps<T, E>) => CSSProperties) | CSSProperties
  ) => ForwardRefComponent<FilterValidProps<T, E>>
}
