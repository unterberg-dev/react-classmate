import type { LogicHandler } from "../types"

const applyLogicHandlers = <T extends object>(props: T, logicHandlers: LogicHandler<T>[] = []): T => {
  if (!logicHandlers.length) {
    return props
  }

  return logicHandlers.reduce<T>(
    (acc, handler) => {
      const result = handler(acc)
      if (result && typeof result === "object") {
        const { __rcOmit, ...rest } = result as { __rcOmit?: (keyof T | string)[] } & Partial<T>
        const next = Object.assign({}, acc, rest)

        if (Array.isArray(__rcOmit) && __rcOmit.length > 0) {
          const nextRecord = next as Record<PropertyKey, unknown>
          for (const key of __rcOmit) {
            if (key && key in nextRecord) {
              delete nextRecord[key as PropertyKey]
            }
          }
        }

        return next
      }
      return acc
    },
    { ...props },
  )
}

export default applyLogicHandlers
