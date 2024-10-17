import clsx from 'clsx';
import React, { forwardRef, CSSProperties } from 'react';

const cleanCssString = (css: string): string => {
  return css
    .replace(/\s+/g, ' ')
    .trim();
};

type WithHTMLProps<T> = T & React.HTMLProps<HTMLElement>

interface SCOptions {
  base?: string;
  classes?: (props: WithHTMLProps<any>) => string[];
  css?: CSSProperties | ((props: WithHTMLProps<any>) => CSSProperties); // Updated to allow function
}

type SCType = <T>(
  tag: keyof JSX.IntrinsicElements,
  opts: SCOptions | string, // Updated to allow string
) => React.ForwardRefExoticComponent<WithHTMLProps<T> & React.RefAttributes<HTMLElement>>;

/**
 * A higher-order function that creates a React component with dynamic class names.
 *
 * @param {keyof JSX.IntrinsicElements} tag - The HTML tag to be used for the component (e.g., 'div', 'span').
 * @param {SCOptions | string} opts - The options for the component or a string representing the base class.
 * @returns {React.ForwardRefExoticComponent<WithHTMLProps<T> & React.RefAttributes<HTMLElement>>} - A styled React component with dynamic class names.
 */
const sc: SCType = <T>(
  tag: keyof JSX.IntrinsicElements,
  opts: SCOptions | string,
): React.ForwardRefExoticComponent<
  WithHTMLProps<T> & React.RefAttributes<HTMLElement>
> => {
  // Determine if opts is a string or an object
  const baseClass = typeof opts === 'string' ? opts : opts.base;
  const dynamicClasses = typeof opts === 'object' ? opts.classes : undefined;
  const css = typeof opts === 'object' ? opts.css : undefined;

  const RenderComponent = forwardRef<HTMLElement, WithHTMLProps<T>>(
    (props, ref) => {
      const { className, style, ...restProps } = props;

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

      // Handle dynamic CSS
      const resolvedCss = typeof css === 'function' ? css(restProps as WithHTMLProps<T>) : css;

      // Merge styles
      const mergedStyles = { ...resolvedCss, ...style };

      // generate component
      return React.createElement(
        tag,
        {
          className: classes,
          style: mergedStyles,
          ref,
          ...filteredProps,
        },
      );
    },
  );

  // debug
  RenderComponent.displayName = `StyledComponent(${tag})`;

  return RenderComponent as React.ForwardRefExoticComponent<
    WithHTMLProps<T> & React.RefAttributes<HTMLElement>
    >;
};

export default sc;