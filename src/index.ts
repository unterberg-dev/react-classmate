import clsx from 'clsx'
import React, {
  CSSProperties,
  forwardRef,
  ForwardRefExoticComponent,
  JSX,
  RefAttributes,
} from 'react'

type RefComponent<T> = ForwardRefExoticComponent<T & RefAttributes<HTMLElement>>
type ComponentOptions<T> = {
  base?: string
  classes?: (props: T) => string[]
  css?: CSSProperties | ((props: T) => CSSProperties)
}

type HTMLProps<T, K extends keyof JSX.IntrinsicElements> = T & JSX.IntrinsicElements[K]
type ValidProps<T, K extends keyof JSX.IntrinsicElements> = K extends keyof JSX.IntrinsicElements
  ? T & JSX.IntrinsicElements[K]
  : never

const cleanClassName = (className: string) => className.replace(/\s+/g, ' ').trim()

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

const createComponent = <
  T extends object,
  K extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
>(
  tag: K,
  options?: ComponentOptions<T> | string | ((props: HTMLProps<T, K>) => string),
  css?: ((props: HTMLProps<T, K>) => CSSProperties) | CSSProperties,
): RefComponent<ValidProps<T, K>> => {
  let baseClass: string | undefined
  if (typeof options === 'string') {
    baseClass = options
  } else if (typeof options === 'object') {
    baseClass = options?.base
  } else {
    baseClass = undefined
  }

  let dynamicClasses: string | Function | undefined
  if (typeof options === 'object') {
    dynamicClasses = options?.classes
  } else if (typeof options === 'function') {
    dynamicClasses = options
  } else {
    dynamicClasses = undefined
  }

  const dynamicCss = typeof options === 'object' ? options?.css : css

  const RenderComponent = forwardRef<HTMLElement, ValidProps<T, K>>((props, ref) => {
    const { className, style, ...restProps } = props

    const classes = cleanClassName(
      clsx(baseClass, dynamicClasses ? dynamicClasses(props as HTMLProps<T, K>) : [], className),
    )

    const resolvedCss =
      typeof dynamicCss === 'function' ? dynamicCss(props as HTMLProps<T, K>) : dynamicCss
    const mergedStyles = { ...resolvedCss, ...style }

    const customProps = Object.keys(props).filter(key => key.startsWith('$')) as (keyof T)[]
    const domProps = omitCustomProps<T, K>(restProps as T, customProps)

    return React.createElement(tag, {
      ...domProps,
      className: classes,
      style: mergedStyles,
      ref,
    })
  })

  RenderComponent.displayName = `DynamicComponent(${tag})`

  return RenderComponent as RefComponent<ValidProps<T, K>>
}

export const ds = new Proxy(
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
) as {
  [K in keyof JSX.IntrinsicElements]: <T, E extends keyof JSX.IntrinsicElements = K>(
    options?: ComponentOptions<T> | string | ((props: HTMLProps<T, E>) => string),
    css?: ((props: HTMLProps<T, E>) => CSSProperties) | CSSProperties,
  ) => RefComponent<ValidProps<T, E>>
}
