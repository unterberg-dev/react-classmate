// import clsx from 'clsx'
// import React, { CSSProperties, forwardRef } from 'react'

// const cleanCssString = (css: string): string => css.replace(/\s+/g, ' ').trim()

// type WithHTMLProps<T> = T & React.HTMLProps<HTMLElement>

// // Define a type alias for the repeated type
// type ForwardRefComponent<T> = React.ForwardRefExoticComponent<WithHTMLProps<T> & React.RefAttributes<HTMLElement>>

// interface DsComponentOptions {
//   base?: string
//   classes?: (props: WithHTMLProps<any>) => string[]
//   css?: CSSProperties | ((props: WithHTMLProps<any>) => CSSProperties)
// }

// const createComponent = <T>(
//   tag: keyof JSX.IntrinsicElements,
//   opts: DsComponentOptions | string,
// ): ForwardRefComponent<T> => {
//   const baseClass = typeof opts === 'string' ? opts : opts.base
//   const dynamicClasses = typeof opts === 'object' ? opts.classes : undefined
//   const css = typeof opts === 'object' ? opts.css : undefined

//   const RenderComponent = forwardRef<HTMLElement, WithHTMLProps<T>>((props, ref) => {
//     const { className, style, ...restProps } = props

//     const classes = cleanCssString(
//       clsx(
//         baseClass,
//         dynamicClasses ? dynamicClasses(restProps as WithHTMLProps<T>) : [],
//         className,
//       ),
//     )

//     const filteredProps = Object.fromEntries(
//       Object.entries(restProps).filter(([key]) => !key.startsWith('$')),
//     )

//     const resolvedCss = typeof css === 'function' ? css(restProps as WithHTMLProps<T>) : css
//     const mergedStyles = { ...resolvedCss, ...style }

//     return React.createElement(tag, {
//       className: classes,
//       style: mergedStyles,
//       ref,
//       ...filteredProps,
//     })
//   })
//   RenderComponent.displayName = `reactDynamicStyleComponent(${tag})`
//   return RenderComponent as ForwardRefComponent<T>
// }

// /**
//  * A higher-order function that creates a React component with dynamic class names or style.
//  *
//  * @param {keyof JSX.IntrinsicElements} tag - The HTML tag to be used for the component (e.g., 'div', 'span').
//  * @param {SCOptions | string} opts - The options for the component or a string representing the base class.
//  * @returns {ForwardRefComponent<T>} - A styled React component with dynamic class names.
//  */
// export const ds = new Proxy({}, {
//   get: (_, tag: keyof JSX.IntrinsicElements) => {
//     return <T>(opts: DsComponentOptions | string) => createComponent<T>(tag, opts)
//   }
// }) as {
//   [K in keyof JSX.IntrinsicElements]: <T>(opts: DsComponentOptions | string) => ForwardRefComponent<T>
// }

// import clsx from 'clsx'
// import React, { CSSProperties, forwardRef } from 'react'

// const cleanCssString = (css: string): string => css.replace(/\s+/g, ' ').trim()

// type WithHTMLProps<T> = T & React.HTMLProps<HTMLElement>

// // Define a type alias for the repeated type
// type ForwardRefComponent<T> = React.ForwardRefExoticComponent<WithHTMLProps<T> & React.RefAttributes<HTMLElement>>

// interface DsComponentOptions {
//   base?: string
//   classes?: (props: WithHTMLProps<any>) => string[]
//   css?: CSSProperties | ((props: WithHTMLProps<any>) => CSSProperties)
// }

// const createComponent = <T>(
//   tag: keyof JSX.IntrinsicElements,
//   opts: DsComponentOptions | string | ((props: WithHTMLProps<T>) => string),
//   css?: ((props: WithHTMLProps<T>) => CSSProperties) | CSSProperties,
// ): ForwardRefComponent<T> => {
//   const baseClass = typeof opts === 'string' ? opts : typeof opts === 'object' ? opts.base : undefined
//   const dynamicClasses = typeof opts === 'object' ? opts.classes : typeof opts === 'function' ? opts : undefined
//   const dynamicCss = typeof opts === 'object' ? opts.css : css

//   const RenderComponent = forwardRef<HTMLElement, WithHTMLProps<T>>((props, ref) => {
//     const { className, style, ...restProps } = props

//     const classes = cleanCssString(
//       clsx(
//         baseClass,
//         dynamicClasses ? dynamicClasses(restProps as WithHTMLProps<T>) : [],
//         className,
//       ),
//     )

//     const filteredProps = Object.fromEntries(
//       Object.entries(restProps).filter(([key]) => !key.startsWith('$')),
//     )

//     const resolvedCss = typeof dynamicCss === 'function' ? dynamicCss(restProps as WithHTMLProps<T>) : dynamicCss
//     const mergedStyles = { ...resolvedCss, ...style }

//     return React.createElement(tag, {
//       className: classes,
//       style: mergedStyles,
//       ref,
//       ...filteredProps,
//     })
//   })
//   RenderComponent.displayName = `reactDynamicStyleComponent(${tag})`
//   return RenderComponent as ForwardRefComponent<T>
// }

// /**
//  * A higher-order function that creates a React component with dynamic class names or style.
//  *
//  * @param {keyof JSX.IntrinsicElements} tag - The HTML tag to be used for the component (e.g., 'div', 'span').
//  * @param {SCOptions | string} opts - The options for the component or a string representing the base class.
//  * @returns {ForwardRefComponent<T>} - A styled React component with dynamic class names.
//  */
// export const ds = new Proxy({}, {
//   get: (_, tag: keyof JSX.IntrinsicElements) => {
//     return <T>(opts: DsComponentOptions | string | ((props: WithHTMLProps<T>) => string), css?: ((props: WithHTMLProps<T>) => CSSProperties) | CSSProperties) => createComponent<T>(tag, opts, css)
//   }
// }) as {
//   [K in keyof JSX.IntrinsicElements]: <T>(opts: DsComponentOptions | string | ((props: WithHTMLProps<T>) => string), css?: ((props: WithHTMLProps<T>) => CSSProperties) | CSSProperties) => ForwardRefComponent<T>
// }

import clsx from 'clsx'
import React, { CSSProperties, forwardRef } from 'react'

const cleanCssString = (css: string): string => css.replace(/\s+/g, ' ').trim()

type WithHTMLProps<T> = T & React.HTMLProps<HTMLElement>

// Define a type alias for the repeated type
type ForwardRefComponent<T> = React.ForwardRefExoticComponent<WithHTMLProps<T> & React.RefAttributes<HTMLElement>>

interface DsComponentOptions {
  base?: string
  classes?: (props: WithHTMLProps<any>) => string[]
  css?: CSSProperties | ((props: WithHTMLProps<any>) => CSSProperties)
}

const createComponent = <T>(
  tag: keyof JSX.IntrinsicElements,
  opts: DsComponentOptions | string | ((props: WithHTMLProps<T>) => string),
  css?: ((props: WithHTMLProps<T>) => CSSProperties) | CSSProperties,
): ForwardRefComponent<T> => {
  const baseClass = typeof opts === 'string' ? opts : typeof opts === 'object' ? opts.base : undefined
  const dynamicClasses = typeof opts === 'object' ? opts.classes : typeof opts === 'function' ? opts : undefined
  const dynamicCss = typeof opts === 'object' ? opts.css : css

  const RenderComponent = forwardRef<HTMLElement, WithHTMLProps<T>>((props, ref) => {
    const { className, style, ...restProps } = props

    const classes = cleanCssString(
      clsx(
        baseClass,
        dynamicClasses ? dynamicClasses(restProps as WithHTMLProps<T>) : [],
        className,
      ),
    )

    const filteredProps = Object.fromEntries(
      Object.entries(restProps).filter(([key]) => !key.startsWith('$')),
    )

    const resolvedCss = typeof dynamicCss === 'function' ? dynamicCss(restProps as WithHTMLProps<T>) : dynamicCss
    const mergedStyles = { ...resolvedCss, ...style }

    return React.createElement(tag, {
      className: classes,
      style: mergedStyles,
      ref,
      ...filteredProps,
    })
  })
  RenderComponent.displayName = `reactDynamicStyleComponent(${tag})`
  return RenderComponent as ForwardRefComponent<T>
}

/**
 * A higher-order function that creates a React component with dynamic class names or style.
 *
 * @param {keyof JSX.IntrinsicElements} tag - The HTML tag to be used for the component (e.g., 'div', 'span').
 * @param {SCOptions | string} opts - The options for the component or a string representing the base class.
 * @returns {ForwardRefComponent<T>} - A styled React component with dynamic class names.
 */
export const ds = new Proxy({}, {
  get: (_, tag: keyof JSX.IntrinsicElements) => {
    return <T>(opts: DsComponentOptions | string | ((props: WithHTMLProps<T>) => string), css?: ((props: WithHTMLProps<T>) => CSSProperties) | CSSProperties) => createComponent<T>(tag, opts, css)
  }
}) as {
  [K in keyof JSX.IntrinsicElements]: <T>(opts: DsComponentOptions | string | ((props: WithHTMLProps<T>) => string), css?: ((props: WithHTMLProps<T>) => CSSProperties) | CSSProperties) => ForwardRefComponent<T>
}

// // Usage example
interface StyledDivProps {
  $isActive?: boolean
}
