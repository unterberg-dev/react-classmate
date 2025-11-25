import cm from "@classmate/react"

interface CodeProps {
  $size?: "sm" | "md" | "lg" | "xl" | "2xl"
  $color?: "primary" | "error" | "success" | "warning" | "text"
}

const CodeElement = cm.code.variants<CodeProps>({
  base: "bg-graySuperLight/50 dark:bg-graySuperLight/50 px-1 py-1 rounded",
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
