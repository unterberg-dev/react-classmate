import clsx from 'clsx';
import React, { forwardRef } from 'react';

const cleanCssString = (css: string): string => {
  return css
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .trim(); // Trim leading and trailing spaces
};

type WithHTMLProps<T> = T & React.HTMLProps<HTMLElement>

/**
 * A higher-order function that creates a React component with dynamic class names.
 *
 * @param {keyof JSX.IntrinsicElements} tag - The HTML tag to be used for the component (e.g., 'div', 'span').
 * @param {string} baseClass - The base class name to be applied to the component.
 * @param {(props: WithHTMLProps<T>) => string[]} [dynamicClasses] - An optional function that returns an array of dynamic class names based on the component's props.
 * @returns {React.ForwardRefExoticComponent<WithHTMLProps<T> & React.RefAttributes<HTMLElement>>} - A styled React component with dynamic class names.
 */
function sc<T>(
  tag: keyof JSX.IntrinsicElements,
  baseClass: string,
  dynamicClasses?: (props: WithHTMLProps<T>) => string[],
): React.ForwardRefExoticComponent<
  WithHTMLProps<T> & React.RefAttributes<HTMLElement>
> {
  const StyledComponent = forwardRef<HTMLElement, WithHTMLProps<T>>(
    (props, ref) => {
      const { className, ...restProps } = props;

      // Handle dynamic class names
      const classes = cleanCssString(clsx(
        baseClass,
        dynamicClasses ? dynamicClasses(restProps as WithHTMLProps<T>) : [],
        className,
      ));

      // Filter out invalid HTML attributes and properties prefixed with "$"
      const filteredProps = Object.fromEntries(
        Object.entries(restProps).filter(([key]) => 
          !key.startsWith('$')
        ),
      );

      // Use React.createElement to generate the component
      return React.createElement(
        tag, // The tag (e.g., 'div', 'span')
        {
          className: classes,
          ref, // Forward the ref to the underlying DOM element
          ...filteredProps, // Pass all valid HTML attributes
        },
      );
    },
  );

  StyledComponent.displayName = `StyledComponent(${tag})`; // Optional for better debugging
  return StyledComponent as React.ForwardRefExoticComponent<
    WithHTMLProps<T> & React.RefAttributes<HTMLElement>
    >;
}

export default sc;
