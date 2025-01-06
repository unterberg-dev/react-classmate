import { Github, Sticker } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import rc from "react-classmate"

import LayoutComponent from "#components/LayoutComponent"
import MobileMenu, { GhostBgInner } from "#components/MobileMenu"
import ThemeSwitch from "#components/ThemeSwitch"
import Button from "#components/common/Button"
import H1Headline from "#components/common/H1Headline"
import { APP_CONFIG } from "#lib/config"
import { internalLink } from "#lib/links"

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

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isInit, setIsInit] = useState(false)

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
    let timeoutId: NodeJS.Timeout | null = null
    window.addEventListener("scroll", handleScroll)

    // uno animation preset "animate-out fade-out" forces us to wait for the animation in the background to finish
    // we set the init state right after that - not very elegant
    // probably bad seo: defo increase of cpu load on page init
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        setIsInit(true)
        timeoutId = null
      }, APP_CONFIG.transition.time)
    }

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
        <LogoContainer href={internalLink.start}>
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
      <GhostBgInner $isInit={isInit} $scrolled={scrolled} />
      <MobileMenu isInit={isInit} scrolled={scrolled} />
    </HeaderOuter>
  )
}

export default Header
