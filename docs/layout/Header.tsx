import { ChevronRight, Github, Logs, Sticker } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import rc from "react-classmate"

import LayoutComponent from "#components/LayoutComponent"
import SidebarInner from "#components/SidebarInner"
import ThemeSwitch from "#components/ThemeSwitch"
import Button from "#components/common/Button"
import H1Headline from "#components/common/H1Headline"
import Sidebar from "#layout/Sidebar"
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
  relative
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

const GhostBgOuter = rc.div`
  theme-header-shadow 
  invisible 
  pointer-events-none
`

const MenuSlideout = rc.div<{ $open: boolean }>`
  bg-white dark:bg-darkNeutral
  shadow-grayNeutral/20 dark:shadow-darkNeutral/20
  p-4
  rounded-md
  absolute
  top-0
  left-0
  h-full
  w-full
  z-1
  ${(p) => (p.$open ? "animate-in fade-in" : "animate-out fade-out")}
`

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const ghostBgRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(true)

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
          <Sticker className="text-dark h-4 w-4 lg:h-6 lg:w-6" />
          <H1Headline className="!text-base lg:!text-lg">react-classmate</H1Headline>
        </LogoContainer>
        <div className="flex gap-2">
          <Button className="relative" link={APP_CONFIG.repoUrl} color="icon" noShadow noGutter size="sm">
            <Github className="h-4 w-4" />
          </Button>
          <ThemeSwitch />
        </div>
      </HeaderLayout>
      <GhostBgOuter ref={ghostBgRef}>
        <GhostBgInner $scrolled={scrolled || menuOpen} />
      </GhostBgOuter>
      <div className="lg:hidden gap-4 absolute top-12 left-0 w-full">
        <GhostBgInner className="!bg-light dark:!bg-light" $scrolled={scrolled || menuOpen} />
        <LayoutComponent>
          <Button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="!px-0 !py-2"
            size="sm"
            color="hollow"
            noShadow
          >
            <span className="relative z-2 flex gap-1 items-center">
              <Logs className="h-4 w-4" /> Menu
            </span>
          </Button>
        </LayoutComponent>
        <MenuSlideout className="min-h-dvh" $open={menuOpen}>
          <SidebarInner />
        </MenuSlideout>
      </div>
    </HeaderOuter>
  )
}

export default Header
