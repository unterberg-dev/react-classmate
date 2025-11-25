import {
  createBaseComponent,
  createExtendedComponent,
  createVariantsComponent,
  domElements,
} from "@classmate/core"
import type { JSX } from "react"

import type {
  CmBaseComponent,
  CmComponentFactory,
  CmFactoryFunction,
  CmIntrinsicElement,
  InputComponent,
  Interpolation,
  LogicHandler,
  MergeProps,
  VariantsConfig,
} from "./types"
import createReactElement from "./util/createReactElement"

const createExtendBuilder = (
  baseComponent: CmBaseComponent<any>,
  logicHandlers: LogicHandler<any>[] = [],
) => {
  const builder = <T extends object>(strings: TemplateStringsArray, ...interpolations: Interpolation<T>[]) =>
    createExtendedComponent<T, keyof JSX.IntrinsicElements | InputComponent>(
      baseComponent,
      strings,
      interpolations,
      createReactElement,
      logicHandlers as LogicHandler<T>[],
    ) as CmBaseComponent<T>

  const builderWithLogic = builder as typeof builder & {
    logic: (handler: LogicHandler<any>) => ReturnType<typeof createExtendBuilder>
  }

  builderWithLogic.logic = (handler: LogicHandler<any>) =>
    createExtendBuilder(baseComponent, [...logicHandlers, handler])

  return builderWithLogic
}

const createFactoryFunction = <E extends CmIntrinsicElement>(
  tag: E,
  logicHandlers: LogicHandler<any>[] = [],
): CmFactoryFunction<E> => {
  const factory = <T extends object>(strings: TemplateStringsArray, ...interpolations: Interpolation<T>[]) =>
    createBaseComponent<MergeProps<E, T>, E>(tag, strings, interpolations, createReactElement, {
      logic: logicHandlers as LogicHandler<MergeProps<E, T>>[],
    }) as CmBaseComponent<MergeProps<E, T>>

  const factoryWithLogic = factory as CmFactoryFunction<E>

  factoryWithLogic.logic = ((handler: LogicHandler<any>) =>
    createFactoryFunction(tag, [...logicHandlers, handler])) as CmFactoryFunction<E>["logic"]

  factoryWithLogic.variants = ((config: VariantsConfig<any, any>) =>
    createVariantsComponent<E, any, any, MergeProps<E, any>>(tag, config, createReactElement, {
      logic: logicHandlers as LogicHandler<MergeProps<E, any>>[],
    }) as CmBaseComponent<MergeProps<E, any>>) as CmFactoryFunction<E>["variants"]

  return factoryWithLogic
}

const cmTarget = Object.create(null) as Record<string, CmFactoryFunction<any>> & {
  extend?: CmComponentFactory["extend"]
}

for (const tag of domElements) {
  if (!cmTarget[tag]) {
    cmTarget[tag] = createFactoryFunction(tag as CmIntrinsicElement)
  }
}

cmTarget.extend = <BCProps extends object>(baseComponent: CmBaseComponent<BCProps> | InputComponent) =>
  createExtendBuilder(baseComponent as CmBaseComponent<any>)

const cm = cmTarget as unknown as CmComponentFactory

export default cm
