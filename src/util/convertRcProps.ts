/**
 * Converts props to their `$`-prepended counterparts and removes the original keys.
 *
 * @param props - The original props object.
 * @param mappings - An object mapping original keys (from BaseProps) to `$`-prepended keys.
 * @returns A new object with `$`-prepended keys and original keys removed.
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
