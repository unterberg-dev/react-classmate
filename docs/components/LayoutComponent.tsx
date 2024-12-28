import rc from "react-classmate"

interface LayoutComponentProps {
  $type?: "full" | "normal" | "small" | "normalWithoutGutter"
}

// @todo: to variants
const typeClass = (type: LayoutComponentProps["$type"]) => {
  switch (type) {
    case "full":
      return "w-full"
    case "small":
      return "max-w-3xl px-3"
    case "normalWithoutGutter":
      return "max-w-5xl px-0"
    default:
      return "max-w-5xl px-3 sm:px-5"
  }
}

const LayoutComponent = rc.div<LayoutComponentProps>`
  m-auto
  relative
  ${(p) => typeClass(p.$type)}
`

export default LayoutComponent
