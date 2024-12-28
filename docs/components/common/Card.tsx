import rc from "react-classmate"

import useSystemTheme from "#hooks/useSystemTheme"
import type { UserTheme } from "#lib/types"

// @todo: to variants
const StyledCard = rc.div<{ $theme?: UserTheme }>`
  p-2
  md:p-4
  rounded
  border-1
  ${(p) =>
    p.$theme === "dark"
      ? `
    border-graySuperLight
    bg-light
    shadow-white
    shadow`
      : `
    border-white
    bg-white
    shadow
    `}
`

const Card = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { theme } = useSystemTheme()
  return <StyledCard $theme={theme} {...props} />
}

export default Card
