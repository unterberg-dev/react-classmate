import type { AnchorHTMLAttributes } from "react"
import rc from "react-classmate"
import { usePageContext } from "vike-react/usePageContext"

import { APP_CONFIG } from "#lib/config"
import { isLinkExternal } from "#lib/utils"

interface StyledLinkProps {
  $isExternal: boolean
  $isActive: boolean
  $isMenu: boolean
}

const StyledLink = rc.a<StyledLinkProps>`
  link
  transition-colors
  ${APP_CONFIG.transition.tw}
  inline-block
  hover:text-primary
  ${(p) => (p.$isActive ? "!text-primaryDark/70 underline isActive" : "")}
  ${(p) => (p.$isMenu ? "!text-dark" : "text-primaryDark underline underline-0.5")}
`

const LinkComponent = ({
  target = "_self",
  isMenu = false,
  href,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string; isMenu?: boolean }) => {
  const { urlOriginal } = usePageContext()

  if (!href) return <div>Missing href</div>
  const isExternal = isLinkExternal(href)
  const isActive = urlOriginal === href

  return (
    <StyledLink
      href={href}
      target={isExternal ? "_blank" : target}
      rel={isExternal ? "noreferrer" : ""}
      $isExternal={isExternal}
      $isActive={isActive}
      $isMenu={isMenu}
      {...props}
    />
  )
}

export default LinkComponent
