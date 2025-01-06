import { Logs } from "lucide-react"
import rc from "react-classmate"
import { RemoveScroll } from "react-remove-scroll"

import LayoutComponent from "#components/LayoutComponent"
import Navigation from "#components/Navigation"
import Button from "#components/common/Button"
import useMenuStore from "#hooks/useMenuStore"
import { APP_CONFIG } from "#lib/config"

// @todo: to styled.ts?
export const GhostBgInner = rc.div<{ $scrolled: boolean; $isInit?: boolean; $sub?: boolean }>`
  absolute inset-0
  shadow-lg
  shadow-grayNeutral/05 
  dark:shadow-darkNeutral/50
  ${(p) => (p.$isInit ? "" : "!invisible")}
  ${(p) => (p.$scrolled ? "animate-in fade-in" : "animate-out fade-out")}
  ${(p) => (p.$sub ? "bg-light" : "bg-white")}
`

interface AnimationTriggerProps {
  $open: boolean
  $isInit: boolean
}

const SlideOut = rc.div<AnimationTriggerProps>`
  bg-white dark:bg-darkNeutral
  shadow-grayNeutral/20 dark:shadow-darkNeutral/20
  p-3
  rounded-md
  absolute
  top-0
  left-0
  h-full
  w-full
  z-1
  min-h-dvh
  ${(p) => (p.$isInit ? "" : "!invisible")}
  ${APP_CONFIG.transition.uno}
  ${APP_CONFIG.headerHeightConfig.footerNegativeMargin}
  ${(p) => (p.$open ? "animate-in fade-in" : "pointer-events-none animate-out fade-out")}
`

const Menu = rc.div<AnimationTriggerProps>`
  mt-24
  ${(p) => (p.$isInit ? "" : "!invisible")}
  ${APP_CONFIG.transition.uno}
  ${(p) => (p.$open ? "animate-in slide-in-l-50%" : "pointer-events-none animate-out slide-out-l-50%")}
  overflow-y-auto
  ${(p) =>
    p.style({
      height: "calc(100vh - 10rem)",
    })}
`

const MobileMenu = ({ isInit, scrolled }: { isInit: boolean; scrolled: boolean }) => {
  const menuOpen = useMenuStore((state) => state.isOpen)
  const toggleMenuOpen = useMenuStore((state) => state.toggle)

  return (
    <div className="lg:hidden absolute left-0 top-12 w-full">
      <LayoutComponent>
        <Button onClick={() => toggleMenuOpen()} className="!px-0 !py-2" size="sm" color="hollow" noShadow>
          <span className="relative z-2 flex gap-1 items-center">
            <Logs className="h-4 w-4" /> Menu
          </span>
        </Button>
      </LayoutComponent>
      <GhostBgInner $isInit={isInit} $scrolled={scrolled} $sub />
      <SlideOut $isInit={isInit} $open={menuOpen}>
        <RemoveScroll enabled={menuOpen}>
          <Menu $isInit={isInit} $open={menuOpen}>
            <Navigation isTablet />
          </Menu>
        </RemoveScroll>
      </SlideOut>
    </div>
  )
}

export default MobileMenu
