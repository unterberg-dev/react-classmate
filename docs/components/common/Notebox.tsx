import rc from "react-classmate"

interface NoteboxProps {
  $type?: "info" | "warning" | "error" | "success" | "aside"
}

const Notebox = rc.div.variants<NoteboxProps>({
  base: `
    p-3 md:p-5
    rounded md:rounded-lg
    border-1
  `,
  variants: {
    $type: {
      info: "border-none bg-white",
      warning: "border-warningLight bg-warningSuperLight",
      error: "border-errorLight bg-errorSuperLight",
      success: "border-successLight bg-successSuperLight",
      aside: "border-graySuperLight bg-light",
    },
  },
  defaultVariants: {
    $type: "info",
  },
})

export default Notebox
