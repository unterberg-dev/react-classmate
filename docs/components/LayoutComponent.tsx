import rc from "react-classmate"

interface LayoutComponentProps {
  type?: "full" | "normal" | "small" | "normalWithoutGutter"
}

const LayoutComponent = rc.div.variants<LayoutComponentProps>({
  base: "m-auto relative",
  variants: {
    type: {
      full: "w-full",
      small: "max-w-4xl px-3",
      normalWithoutGutter: "max-w-7xl px-0",
      normal: "max-w-7xl px-3 sm:px-5",
    },
  },
  defaultVariants: {
    type: "normal",
  },
})

export default LayoutComponent
