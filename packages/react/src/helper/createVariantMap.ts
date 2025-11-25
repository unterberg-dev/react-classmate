import { createVariantMap as createCoreVariantMap } from "@classmate/core"

import rc from "../rc"
import type { RcBaseComponent, RcIntrinsicElement, VariantsConfig } from "../types"

interface CreateVariantMapOptions<T extends RcIntrinsicElement> {
  elements: readonly T[]
  variantsConfig: VariantsConfig<any, any>
}

const createVariantMap = <T extends RcIntrinsicElement>({
  elements,
  variantsConfig,
}: CreateVariantMapOptions<T>): Record<T, RcBaseComponent<any>> => {
  const buildVariantFactory = (tag: RcIntrinsicElement) => ({
    variants: (config: VariantsConfig<any, any>) => rc[tag].variants(config),
  })

  return createCoreVariantMap<T, RcBaseComponent<any>>({
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
