import rc from "react-classmate"

interface NoteboxProps {
  $type?: "info" | "warning" | "error" | "success" | "aside"
  $size?: "sm" | "md"
}

const Notebox = rc.div.variants<NoteboxProps>({
  base: `
    rounded 
    border-1
    p-3
  `,
  variants: {
    $type: {
      info: "border-none bg-white",
      warning: "border-warningLight bg-warningSuperLight",
      error: "border-errorLight bg-errorSuperLight",
      success: "border-successLight bg-successSuperLight",
      aside: "border-graySuperLight bg-light",
    },
    $size: {
      sm: "md:p-3",
      md: "md:p-5 md:rounded-lg",
    },
  },
  defaultVariants: {
    $type: "info",
    $size: "md",
  },
})

export default Notebox
