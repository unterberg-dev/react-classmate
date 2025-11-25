import {
  createBaseComponent,
  createExtendedComponent,
  createVariantsComponent,
  domElements,
} from "@classmate/core"
import type { JSX } from "react"

import type {
  InputComponent,
  Interpolation,
  LogicHandler,
  MergeProps,
  RcBaseComponent,
  RcComponentFactory,
  RcFactoryFunction,
  RcIntrinsicElement,
  VariantsConfig,
} from "./types"
import createReactElement from "./util/createReactElement"

const createExtendBuilder = (
  baseComponent: RcBaseComponent<any>,
  logicHandlers: LogicHandler<any>[] = [],
) => {
  const builder = <T extends object>(strings: TemplateStringsArray, ...interpolations: Interpolation<T>[]) =>
    createExtendedComponent<T, keyof JSX.IntrinsicElements | InputComponent>(
      baseComponent,
      strings,
      interpolations,
      createReactElement,
      logicHandlers as LogicHandler<T>[],
    ) as RcBaseComponent<T>

  const builderWithLogic = builder as typeof builder & {
    logic: (handler: LogicHandler<any>) => ReturnType<typeof createExtendBuilder>
  }

  builderWithLogic.logic = (handler: LogicHandler<any>) =>
    createExtendBuilder(baseComponent, [...logicHandlers, handler])

  return builderWithLogic
}

const createFactoryFunction = <E extends RcIntrinsicElement>(
  tag: E,
  logicHandlers: LogicHandler<any>[] = [],
): RcFactoryFunction<E> => {
  const factory = <T extends object>(strings: TemplateStringsArray, ...interpolations: Interpolation<T>[]) =>
    createBaseComponent<MergeProps<E, T>, E>(tag, strings, interpolations, createReactElement, {
      logic: logicHandlers as LogicHandler<MergeProps<E, T>>[],
    }) as RcBaseComponent<MergeProps<E, T>>

  const factoryWithLogic = factory as RcFactoryFunction<E>

  factoryWithLogic.logic = ((handler: LogicHandler<any>) =>
    createFactoryFunction(tag, [...logicHandlers, handler])) as RcFactoryFunction<E>["logic"]

  factoryWithLogic.variants = ((config: VariantsConfig<any, any>) =>
    createVariantsComponent<E, any, any, MergeProps<E, any>>(tag, config, createReactElement, {
      logic: logicHandlers as LogicHandler<MergeProps<E, any>>[],
    }) as RcBaseComponent<MergeProps<E, any>>) as RcFactoryFunction<E>["variants"]

  return factoryWithLogic
}

const rcTarget = Object.create(null) as Record<string, RcFactoryFunction<any>> & {
  extend?: RcComponentFactory["extend"]
}

for (const tag of domElements) {
  if (!rcTarget[tag]) {
    rcTarget[tag] = createFactoryFunction(tag as RcIntrinsicElement)
  }
}

rcTarget.extend = <BCProps extends object>(baseComponent: RcBaseComponent<BCProps> | InputComponent) =>
  createExtendBuilder(baseComponent as RcBaseComponent<any>)

const rc = rcTarget as unknown as RcComponentFactory

export default rc
