import rc from "react-classmate"

interface CodeProps {
  $size?: "sm" | "md" | "lg" | "xl" | "2xl"
  $color?: "primary" | "error" | "success" | "warning" | "text"
}

const CodeElement = rc.code.variants<CodeProps>({
  base: "bg-graySuperLight dark:bg-graySuperLight px-1 py-1 rounded",
  variants: {
    $size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-md",
      xl: "text-lg",
      "2xl": "text-xl",
    },
    $color: {
      primary: "text-primary dark:text-primaryDark",
      text: "text-grayDark",
      error: "text-errorDark",
      success: "text-successDark",
      warning: "text-warningDark",
    },
  },
  defaultVariants: {
    $size: "md",
    $color: "primary",
  },
})

export default CodeElement
