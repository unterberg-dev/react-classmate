import type { AnchorHTMLAttributes } from "react"
import rc from "react-classmate"
import { usePageContext } from "vike-react/usePageContext"
import { APP_CONFIG } from "#lib/config"

interface StyledLinkProps {
  $isExternal: boolean
  $isActive: boolean
}

const StyledLink = rc.a<StyledLinkProps>`
  transition-colors
  ${APP_CONFIG.uno.transitionWind}
  text-dark 
  inline-block 
  hover:text-primary
  ${(p) => (p.$isActive ? "text-primaryDark  underline" : "")}
`

const clean = (s: string) => s.replace(/^\/|\/$/g, "")

const LinkComponent = ({ target = "_self", href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { urlPathname } = usePageContext()

  if (!href) return null

  const [hrefNoSlash, pathNoSlash] = [clean(href), clean(urlPathname)]
  const isExternal = /^(http|mailto)/.test(href)
  const isActive = hrefNoSlash ? pathNoSlash.startsWith(hrefNoSlash) : pathNoSlash === hrefNoSlash

  return (
    <StyledLink
      href={isExternal ? href : `${APP_CONFIG.viteUrl}${href}`}
      target={isExternal ? "_blank" : target}
      rel={isExternal ? "noreferrer" : ""}
      $isExternal={isExternal}
      $isActive={isActive}
      {...props}
    />
  )
}

export default LinkComponent
