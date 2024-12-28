import type { JSX } from "react"

import createBaseComponent from "./factory/base"
import createExtendedComponent from "./factory/extend"
import createVariantsComponent from "./factory/variants"
import type {
  InputComponent,
  Interpolation,
  RcBaseComponent,
  RcComponentFactory,
  VariantsConfig,
} from "./types"

// init
const rcTarget: Partial<RcComponentFactory> = {}

/**
 * Intercepts property lookups:
 * - `rc.extend`: returns function to extend an existing component
 * - `rc.button`, `rc.div`, etc.: returns factory for base components, with `.variants`
 */
const rcFactory = new Proxy(rcTarget, {
  get(_, prop: string) {
    // calls `rc.extend`
    if (prop === "extend") {
      return <BCProps extends object>(baseComponent: RcBaseComponent<BCProps> | InputComponent) =>
        <T extends object>(strings: TemplateStringsArray, ...interpolations: Interpolation<T>[]) => {
          const rcBaseComponent = baseComponent as RcBaseComponent<any> // Ensure proper type
          return createExtendedComponent<T>(rcBaseComponent, strings, interpolations)
        }
    }

    // calls `rc.button`, `rc.div`, etc.
    const factoryFunction = <T extends object>(
      strings: TemplateStringsArray,
      ...interpolations: Interpolation<T>[]
    ) =>
      createBaseComponent<T, keyof JSX.IntrinsicElements>(
        prop as keyof JSX.IntrinsicElements,
        strings,
        interpolations,
      )

    // attach `.variants` to factory components
    factoryFunction.variants = <ExtraProps extends object, VariantProps extends object = ExtraProps>(
      config: VariantsConfig<VariantProps, ExtraProps>,
    ) => {
      return createVariantsComponent<keyof JSX.IntrinsicElements, ExtraProps, VariantProps>(
        prop as keyof JSX.IntrinsicElements,
        config,
      )
    }
    return factoryFunction
  },
}) as RcComponentFactory

export default rcFactory as RcComponentFactory
