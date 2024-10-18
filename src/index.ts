import clsx from 'clsx'
import React, { CSSProperties, forwardRef } from 'react'

const cleanCssString = (css: string): string => css.replace(/\s+/g, ' ').trim()

type WithHTMLProps<T> = T & React.HTMLProps<HTMLElement>

// Define a type alias for the repeated type
type ForwardRefComponent<T> = React.ForwardRefExoticComponent<WithHTMLProps<T> & React.RefAttributes<HTMLElement>>

interface DsComponentOptions {
  base?: string
  classes?: (props: WithHTMLProps<any>) => string[]
  css?: CSSProperties | ((props: WithHTMLProps<any>) => CSSProperties) // Updated to allow function
}

type DsComponentProps = <T>(
  tag: keyof JSX.IntrinsicElements,
  opts: DsComponentOptions | string, // Updated to allow string
) => ForwardRefComponent<T>

/**
 * A higher-order function that creates a React component with dynamic class names or style.
 *
 * @param {keyof JSX.IntrinsicElements} tag - The HTML tag to be used for the component (e.g., 'div', 'span').
 * @param {SCOptions | string} opts - The options for the component or a string representing the base class.
 * @returns {ForwardRefComponent<T>} - A styled React component with dynamic class names.
 */
export const ds: DsComponentProps = <T>(
  tag: keyof JSX.IntrinsicElements,
  opts: DsComponentOptions | string,
): ForwardRefComponent<T> => {
  // Determine if opts is a string or an object
  const baseClass = typeof opts === 'string' ? opts : opts.base
  const dynamicClasses = typeof opts === 'object' ? opts.classes : undefined
  const css = typeof opts === 'object' ? opts.css : undefined

  const RenderComponent = forwardRef<HTMLElement, WithHTMLProps<T>>((props, ref) => {
    const { className, style, ...restProps } = props

    // Handle dynamic class names
    const classes = cleanCssString(
      clsx(
        baseClass,
        dynamicClasses ? dynamicClasses(restProps as WithHTMLProps<T>) : [],
        className,
      ),
    )

    // Filter out invalid HTML attributes and properties prefixed with "$"
    const filteredProps = Object.fromEntries(
      Object.entries(restProps).filter(([key]) => !key.startsWith('$')),
    )

    // Handle dynamic CSS
    const resolvedCss = typeof css === 'function' ? css(restProps as WithHTMLProps<T>) : css

    // Merge styles
    const mergedStyles = { ...resolvedCss, ...style }

    // generate component
    return React.createElement(tag, {
      className: classes,
      style: mergedStyles,
      ref,
      ...filteredProps,
    })
  })

  // debug
  RenderComponent.displayName = `reactDynamicStyleComponent(${tag})`

  return RenderComponent as ForwardRefComponent<T>
}
