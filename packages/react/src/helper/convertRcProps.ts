/**
 * Converts props to their `$`-prepended counterparts and removes the original keys.
 * Mainly used if you wanna "mirror" properties from a component to a classmate component.
 *
 * @param props - The original props object.
 * @param mappings - An object mapping original keys (from BaseProps) to `$`-prepended keys.
 * @returns A new object with `$`-prepended keys and original keys removed.
 * @example
 * ```tsx
 * const preparedProps = convertRcProps(buttonProps, {
 *  size: "$size",
 *  noShadow: "$noShadow",
 *  noGutter: "$noGutter",
 *  loading: "$loading",
 *  disabled: "$disabled",
 *  color: "$color",
 * })
 * ```
 * will result in (example):
 * ```tsx
 * const preparedProps = {
 *  $size: "md",
 *  $color: "primary",
 *  $disabled: false,
 *  $loading: false,
 *  $noShadow: false,
 *  $noGutter: false,
 * }
 */
const convertRcProps = <T extends object, BaseProps extends object, K extends keyof BaseProps & keyof T>(
  props: T,
  mappings: Record<K, `$${K & string}`>,
): Omit<T, K> & Record<string, any> => {
  const convertedProps: Record<string, any> = {}

  for (const key of Object.keys(mappings)) {
    if (key in props) {
      convertedProps[mappings[key as K]] = props[key as K]
      delete props[key as K]
    }
  }

  return { ...props, ...convertedProps }
}

export default convertRcProps
