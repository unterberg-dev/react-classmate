import { CircleHelp, type LucideIcon } from "lucide-react"
import type { HTMLAttributes } from "react"
import rc from "react-classmate"
import Notebox, { type NoteboxType } from "#components/common/Notebox"

interface DocsNoteboxProps extends HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon
  type?: NoteboxType
}

const StyledNotebox = rc.extend(Notebox)`
  mb-4
  flex
  gap-2 
  items-baseline 
  relative
`

const IconOuter = rc.div.variants<{ $type: NoteboxType }>({
  base: `
    w-6 h-6 
    absolute left-2 top-6 
    -mt-3 
    flex items-center justify-center
    rounded-full 
  `,
  variants: {
    $type: {
      info: "bg-white",
      warning: "bg-warningLight color-warningDark ",
      error: "bg-errorLight color-errorDark",
      success: "bg-successLight color-successDark",
      aside: "bg-light color-grayDark",
    },
  },
})

const DocsNotebox = ({ icon = CircleHelp, type = "warning", ...props }: DocsNoteboxProps) => {
  const IconComponent = icon

  return (
    <StyledNotebox $size="sm" $type={type} className={props.className}>
      <IconOuter $type={type}>
        <IconComponent className="w-4 h-4" />
      </IconOuter>
      <div className="flex-1 pl-7">{props.children}</div>
    </StyledNotebox>
  )
}

export default DocsNotebox
