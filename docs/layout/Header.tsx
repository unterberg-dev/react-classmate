import { Github, Logs, Sticker } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import rc from "react-classmate"

import LayoutComponent from "#components/LayoutComponent"
import Navigation from "#components/Navigation"
import ThemeSwitch from "#components/ThemeSwitch"
import Button from "#components/common/Button"
import H1Headline from "#components/common/H1Headline"
import useMenuStore from "#hooks/useMenuStore"
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

// todo: not working on prod page init - header flickers
// we need a generic version with a outer wrapper, since we can't know when the prop $isInit
// the main problem is that "animate-out fade-out" causes flicker on page init
const GhostBgInner = rc.div.variants<{ $scrolled: boolean; $isInit?: boolean }, { $type: "main" | "sub" }>({
  base: (p) => `
    absolute inset-0
    shadow-lg
    shadow-grayNeutral/05 
    dark:shadow-darkNeutral/50
    ${p.$isInit ? "" : "invisible"}
    ${p.$scrolled ? "animate-in fade-in" : "animate-out fade-out"}
  `,
  variants: {
    $type: {
      main: "bg-white",
      sub: "bg-light",
    },
  },
  defaultVariants: {
    $type: "main",
  },
})

const MenuSlideout = rc.div<{ $open: boolean; $isInit: boolean }>`
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
  min-h-dvh
  ${(p) => (p.$isInit ? "" : "invisible")}
  ${APP_CONFIG.uno.transitionUno}
  ${(p) => (p.$open ? "animate-in fade-in" : "pointer-events-none animate-out fade-out")}
`

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isInit, setIsInit] = useState(false)

  const menuOpen = useMenuStore((state) => state.isOpen)
  const toggleMenuOpen = useMenuStore((state) => state.toggle)

  const handleScroll = useMemo(
    () =>
      (() => {
        let timeoutId: NodeJS.Timeout | null = null
        return () => {
          if (timeoutId) return
          timeoutId = setTimeout(() => {
            setScrolled(window.scrollY > 5)
            timeoutId = null
          }, 70)
        }
      })(),
    [],
  )

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    setIsInit(true)

    if (window.scrollY > 5) {
      setScrolled(true)
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
      <GhostBgInner $isInit={isInit} $scrolled={scrolled || menuOpen} />
      <div className="lg:hidden gap-4 absolute top-12 left-0 w-full">
        <GhostBgInner $isInit={isInit} $scrolled={scrolled || menuOpen} $type="sub" />
        <LayoutComponent>
          <Button onClick={() => toggleMenuOpen()} className="!px-0 !py-2" size="sm" color="hollow" noShadow>
            <span className="relative z-2 flex gap-1 items-center">
              <Logs className="h-4 w-4" /> Menu
            </span>
          </Button>
        </LayoutComponent>
        <MenuSlideout $isInit={isInit} className="" $open={menuOpen}>
          {menuOpen && (
            <div className="mt-13 p-1">
              <Navigation isTablet />
            </div>
          )}
        </MenuSlideout>
      </div>
    </HeaderOuter>
  )
}

export default Header
