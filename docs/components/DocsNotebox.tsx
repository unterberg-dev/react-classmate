import { CircleHelp, type LucideIcon } from "lucide-react"
import type { HTMLAttributes } from "react"
import rc from "react-classmate"
import Notebox from "#components/common/Notebox"

interface DocsNoteboxProps extends HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon
}

const StyledNotebox = rc.extend(Notebox)`
  mt-4
  flex 
  gap-2 
  items-baseline 
  relative
`

const DocsNotebox = ({ icon = CircleHelp, ...props }: DocsNoteboxProps) => {
  const IconComponent = icon

  return (
    <StyledNotebox $size="sm" $type="warning" className={props.className}>
      <div className="w-6 h-6 absolute left-2 -mt-3 top-6 color-warningDark bg-warningLight rounded-full flex items-center justify-center">
        <IconComponent className="w-4 h-4" />
      </div>
      <div className="flex-1 pl-7">{props.children}</div>
    </StyledNotebox>
  )
}

export default DocsNotebox
