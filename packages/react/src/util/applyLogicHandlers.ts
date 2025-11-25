import type { LogicHandler } from "../types"

const applyLogicHandlers = <T extends object>(props: T, logicHandlers: LogicHandler<T>[] = []): T => {
  if (!logicHandlers.length) {
    return props
  }

  return logicHandlers.reduce<T>(
    (acc, handler) => {
      const result = handler(acc)
      if (result && typeof result === "object") {
        return Object.assign({}, acc, result)
      }
      return acc
    },
    { ...props },
  )
}

export default applyLogicHandlers
