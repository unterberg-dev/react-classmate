import { type AnchorHTMLAttributes, useMemo } from "react"
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

const LinkComponent = ({ target = "_self", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const pageContext = usePageContext()
  const { urlPathname } = pageContext

  // clean up href and pathname
  const hrefWithoutSlashes = props.href?.replace(/^\/|\/$/g, "") || ""
  const pathnameWithoutSlashes = urlPathname.replace(/^\/|\/$/g, "")

  const isExternal = useMemo(() => /^(http|mailto)/.test(props.href || ""), [props.href])

  const isActive = useMemo(
    () =>
      hrefWithoutSlashes === ""
        ? pathnameWithoutSlashes === hrefWithoutSlashes
        : pathnameWithoutSlashes.startsWith(hrefWithoutSlashes),
    [hrefWithoutSlashes, pathnameWithoutSlashes],
  )

  return (
    <StyledLink
      target={isExternal ? "_blank" : target}
      rel={isExternal ? "noreferrer" : ""}
      $isExternal={isExternal}
      $isActive={isActive}
      {...props}
    />
  )
}

export default LinkComponent
