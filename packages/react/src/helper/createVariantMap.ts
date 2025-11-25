import { createVariantMap as createCoreVariantMap } from "@classmate/core"

import cm from "../cm"
import type { CmBaseComponent, CmIntrinsicElement, VariantsConfig } from "../types"

interface CreateVariantMapOptions<T extends CmIntrinsicElement> {
  elements: readonly T[]
  variantsConfig: VariantsConfig<any, any>
}

const createVariantMap = <T extends CmIntrinsicElement>({
  elements,
  variantsConfig,
}: CreateVariantMapOptions<T>): Record<T, CmBaseComponent<any>> => {
  const buildVariantFactory = (tag: CmIntrinsicElement) => ({
    variants: (config: VariantsConfig<any, any>) => cm[tag].variants(config),
  })

  return createCoreVariantMap<T, CmBaseComponent<any>>({
    elements,
    variantsConfig,
    resolveFactory: (tag) => buildVariantFactory(tag),
    fallbackFactory: buildVariantFactory("div"),
    warn: (message) => {
      if (process.env.NODE_ENV !== "production") {
        console.warn(message)
      }
    },
  })
}

export default createVariantMap
