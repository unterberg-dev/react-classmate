import type { JSX } from "solid-js"

import createBaseComponent from "./factory/base"
import createExtendedComponent from "./factory/extend"
import createVariantsComponent from "./factory/variants"
import type {
  InputComponent,
  Interpolation,
  LogicHandler,
  ScBaseComponent,
  ScComponentFactory,
  VariantsConfig,
} from "./types"

// init
const scTarget: Partial<ScComponentFactory> = {}

/**
 * Intercepts property lookups:
 * - `sc.extend`: returns function to extend an existing component
 * - `sc.button`, `sc.div`, etc.: returns factory for base components, with `.variants`
 */
const createExtendBuilder = (
  baseComponent: ScBaseComponent<any>,
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
    ) => ScBaseComponent<any>
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

const sc: ScComponentFactory = new Proxy(scTarget, {
  get(_, prop: string) {
    // calls `sc.extend`
    if (prop === "extend") {
      return <BCProps extends object>(baseComponent: ScBaseComponent<BCProps> | InputComponent) =>
        createExtendBuilder(baseComponent as ScBaseComponent<any>)
    }

    return createFactoryFunction(prop as keyof JSX.IntrinsicElements)
  },
}) as ScComponentFactory

export default sc
