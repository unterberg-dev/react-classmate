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
