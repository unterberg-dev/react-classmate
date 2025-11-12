import type { JSX } from "react"

import createBaseComponent from "./factory/base"
import createExtendedComponent from "./factory/extend"
import createVariantsComponent from "./factory/variants"
import type {
  InputComponent,
  Interpolation,
  LogicHandler,
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
const createExtendBuilder = (
  baseComponent: RcBaseComponent<any>,
  logicHandlers: LogicHandler<any>[] = [],
) => {
  const builder = <T extends object>(strings: TemplateStringsArray, ...interpolations: Interpolation<T>[]) =>
    createExtendedComponent<T>(baseComponent, strings, interpolations, logicHandlers as LogicHandler<T>[])

  const builderWithLogic = builder as typeof builder & {
    logic: (handler: LogicHandler<any>) => ReturnType<typeof createExtendBuilder>
  }

  builderWithLogic.logic = (handler: LogicHandler<any>) =>
    createExtendBuilder(baseComponent, [...logicHandlers, handler])

  return builderWithLogic
}

const createFactoryFunction = (tag: keyof JSX.IntrinsicElements, logicHandlers: LogicHandler<any>[] = []) => {
  const factory = <T extends object>(strings: TemplateStringsArray, ...interpolations: Interpolation<T>[]) =>
    createBaseComponent<T, keyof JSX.IntrinsicElements>(tag, strings, interpolations, {
      logic: logicHandlers as LogicHandler<any>[],
    })

  const factoryWithLogic = factory as typeof factory & {
    logic: (handler: LogicHandler<any>) => ReturnType<typeof createFactoryFunction>
    variants: <ExtraProps extends object, VariantProps extends object = ExtraProps>(
      config: VariantsConfig<VariantProps, ExtraProps>,
    ) => RcBaseComponent<any>
  }

  factoryWithLogic.logic = (handler: LogicHandler<any>) =>
    createFactoryFunction(tag, [...logicHandlers, handler])

  factoryWithLogic.variants = <ExtraProps extends object, VariantProps extends object = ExtraProps>(
    config: VariantsConfig<VariantProps, ExtraProps>,
  ) =>
    createVariantsComponent<keyof JSX.IntrinsicElements, ExtraProps, VariantProps>(tag, config, {
      logic: logicHandlers as LogicHandler<any>[],
    })

  return factoryWithLogic
}

const rc: RcComponentFactory = new Proxy(rcTarget, {
  get(_, prop: string) {
    // calls `rc.extend`
    if (prop === "extend") {
      return <BCProps extends object>(baseComponent: RcBaseComponent<BCProps> | InputComponent) =>
        createExtendBuilder(baseComponent as RcBaseComponent<any>)
    }

    return createFactoryFunction(prop as keyof JSX.IntrinsicElements)
  },
}) as RcComponentFactory

export default rc
