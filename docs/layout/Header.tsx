import { Github, Moon, Sticker } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import rc from "react-classmate"

import LayoutComponent from "#components/LayoutComponent"
import ThemeSwitch from "#components/ThemeSwitch"
import Button from "#components/common/Button"
import H1Headline from "#components/common/H1Headline"
import LinkComponent from "#components/common/LinkComponent"
import { APP_CONFIG } from "#lib/config"

const HeaderOuter = rc.header`
  fixed
  w-full
  z-25
  ${APP_CONFIG.headerHeightConfig.heightClass}
`

const LogoContainer = rc.a`
  relative  
  block
  flex
  items-center 
  space-x-2
`

const HeaderLayout = rc.extend(LayoutComponent)`
  flex
  justify-between
  items-center
  h-full
  z-25
`

const GhostBgInner = rc.div<{ $scrolled: boolean }>`
  shadow-grayNeutral/08 
  dark:shadow-darkNeutral/50 
  bg-white 
  top-0 absolute h-full w-full shadow-md
  ${(p) => (p.$scrolled ? "animate-in fade-in" : "animate-out fade-out")}
`

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const ghostBgRef = useRef<HTMLDivElement>(null)

  const handleScroll = useMemo(
    () =>
      (() => {
        let timeoutId: NodeJS.Timeout | null = null
        return () => {
          if (timeoutId) return
          timeoutId = setTimeout(() => {
            setScrolled(window.scrollY > 5)
            if (ghostBgRef.current?.classList.contains("invisible")) {
              ghostBgRef.current.classList.remove("invisible")
            }
            timeoutId = null
          }, 70)
        }
      })(),
    [],
  )

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    // Initialize on mount
    // check if already scrolled
    if (window.scrollY > 5) {
      setScrolled(true)
      if (ghostBgRef.current?.classList.contains("invisible")) {
        ghostBgRef.current.classList.remove("invisible")
      }
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  return (
    <HeaderOuter>
      <HeaderLayout>
        <LogoContainer href={`${APP_CONFIG.viteUrl}/`}>
          <Sticker className="text-dark h-6 w-6" strokeWidth={2} />
          <H1Headline className="!text-lg">react-classmate</H1Headline>
        </LogoContainer>
        <div className="flex gap-2">
          <Button className="relative" link={APP_CONFIG.repoUrl} color="icon" noShadow noGutter size="sm">
            <Github className="h-4 w-4" />
          </Button>
          <ThemeSwitch />
        </div>
      </HeaderLayout>
      <div ref={ghostBgRef} className="theme-header-shadow invisible pointer-events-none">
        <GhostBgInner $scrolled={scrolled} />
      </div>
    </HeaderOuter>
  )
}

export default Header
