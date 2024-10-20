import React, {
  CSSProperties,
  ForwardRefExoticComponent,
  JSX,
  RefAttributes,
} from 'react'

export type RefComponent<T> = ForwardRefExoticComponent<T & RefAttributes<HTMLElement>>
export type ComponentOptions<T> = {
  /** Base CSS class for the component */
  base?: string
  /** Function to dynamically generate an array of classes based on props */
  classes?: (props: T) => string[]
  /** Static or dynamic CSS object applied to the component */
  css?: CSSProperties | ((props: T) => CSSProperties)
}

export type HTMLProps<T, K extends keyof JSX.IntrinsicElements> = T & JSX.IntrinsicElements[K]
export type ValidProps<T, K extends keyof JSX.IntrinsicElements> = T & JSX.IntrinsicElements[K]

// core type
export type DsComponent = {
  [K in keyof JSX.IntrinsicElements]: <T, E extends keyof JSX.IntrinsicElements = K>(
    options?: ComponentOptions<T> | string | ((props: HTMLProps<T, E>) => string),
    css?: ((props: HTMLProps<T, E>) => CSSProperties) | CSSProperties,
  ) => RefComponent<ValidProps<T, E>>
}
