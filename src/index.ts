import clsx from 'clsx'
import React, { forwardRef } from 'react'

import { isValidHtmlAttribute } from './isValidAttribute'

/**
 * A higher-order function that creates a styled React component with dynamic class names.
 *
 * @template T - The type of the props object.
 * @param {keyof JSX.IntrinsicElements} tag - The HTML tag to be used for the component (e.g., 'div', 'span').
 * @param {string} baseClass - The base class name to be applied to the component.
 * @param {(props: T) => string[]} [dynamicClasses] - An optional function that returns an array of dynamic class names based on the component's props.
 * @returns {React.ForwardRefExoticComponent<React.PropsWithoutRef<T & React.HTMLAttributes<HTMLElement>> & React.RefAttributes<HTMLElement>>} - A styled React component with dynamic class names.
 */
function cs<T extends object>(
  tag: keyof JSX.IntrinsicElements,
  baseClass: string,
  dynamicClasses?: (props: T) => string[],
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<T & React.HTMLAttributes<HTMLElement>> & React.RefAttributes<HTMLElement>
> {
  const StyledComponent = forwardRef<HTMLElement, T & React.HTMLAttributes<HTMLElement>>(
    (props, ref) => {
      const { className, ...restProps } = props

      // Handle dynamic class names
      const classes = clsx(
        baseClass,
        dynamicClasses ? dynamicClasses(restProps as T) : [],
        className,
      )

      // Filter out invalid HTML attributes
      const filteredProps = Object.fromEntries(
        Object.entries(restProps).filter(([key]) => isValidHtmlAttribute(key)),
      )

      // Use React.createElement to generate the component
      return React.createElement(
        tag, // The tag (e.g., 'div', 'span')
        {
          className: classes,
          ref, // Forward the ref to the underlying DOM element
          ...filteredProps, // Pass only valid HTML attributes
        },
      )
    },
  )

  StyledComponent.displayName = `StyledComponent(${tag})` // Optional for better debugging
  return StyledComponent
}

export default cs
