import type {
  ComponentRenderer,
  Interpolation,
  LogicHandler,
  RuntimeComponent,
  StyleDefinition,
} from "../types"

interface CreateBaseComponentOptions<P extends object> {
  logic?: LogicHandler<P>[]
  displayName?: string
}

const createBaseComponent = <P extends object, Tag>(
  tag: Tag,
  strings: TemplateStringsArray,
  interpolations: Interpolation<P>[],
  renderComponent: ComponentRenderer<Tag>,
  options: CreateBaseComponentOptions<P> = {},
): RuntimeComponent<P> => {
  const styles: Record<string, string | number> = {}
  const displayName =
    options.displayName ?? `Styled(${typeof tag === "string" ? (tag as string) : "Component"})`
  const logicHandlers = options.logic ?? []

  const computeClassName = (props: P, collectedStyles: Record<string, string | number>) => {
    const styleUtility = (styleDef: StyleDefinition<P>) => {
      Object.assign(collectedStyles, styleDef)
      return ""
    }

    return strings
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
  }

  return renderComponent({
    tag,
    computeClassName: (props) => computeClassName(props, styles),
    displayName,
    styles,
    logicHandlers,
  })
}

export default createBaseComponent
