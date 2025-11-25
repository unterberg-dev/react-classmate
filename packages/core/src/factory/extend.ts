import type {
  ComponentRenderer,
  Interpolation,
  LogicHandler,
  RuntimeComponent,
  StyleDefinition,
} from "../types"

const createExtendedComponent = <P extends object, Tag>(
  baseComponent: RuntimeComponent<any>,
  strings: TemplateStringsArray,
  interpolations: Interpolation<P>[],
  renderComponent: ComponentRenderer<Tag>,
  logicHandlers: LogicHandler<P>[] = [],
): RuntimeComponent<P> => {
  const displayName = `Extended(${baseComponent.displayName || "Component"})`
  const baseComputeClassName = baseComponent.__rcComputeClassName || (() => "")
  const baseStyles = baseComponent.__rcStyles || {}
  const tag = (baseComponent.__rcTag as Tag) || (baseComponent as unknown as Tag)
  const baseLogic = (baseComponent.__rcLogic as LogicHandler<any>[]) || []
  const combinedLogic = [...baseLogic, ...logicHandlers]

  const computeClassName = (props: P, collectedStyles: Record<string, string | number>) => {
    const styleUtility = (styleDef: StyleDefinition<P>) => {
      Object.assign(collectedStyles, styleDef)
      return ""
    }

    const baseClassName = baseComputeClassName({
      ...props,
      style: styleUtility,
    })

    const extendedClassName = strings
      .map((str, i) => {
        const interp = interpolations[i]
        if (typeof interp === "function") {
          return str + interp({ ...props, style: styleUtility })
        }
        return str + (interp ?? "")
      })
      .join("")
      .replace(/\s+/g, " ")
      .trim()

    return [baseClassName, extendedClassName].filter(Boolean).join(" ")
  }

  const computeMergedStyles = (props: P) => {
    const collectedStyles: Record<string, string | number> = {}
    computeClassName(props, collectedStyles)

    const resolvedBaseStyles =
      typeof baseStyles === "function" ? (baseStyles as (props: P) => StyleDefinition<P>)(props) : baseStyles

    return { ...resolvedBaseStyles, ...collectedStyles }
  }

  return renderComponent({
    tag,
    computeClassName: (props) => computeClassName(props, {}),
    displayName,
    styles: (props) => computeMergedStyles(props),
    logicHandlers: combinedLogic as LogicHandler<any>[],
  })
}

export default createExtendedComponent
