import { Github, Sparkles, Sticker } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import rc from "react-classmate"

import { usePageContext } from "vike-react/usePageContext"
import LayoutComponent from "#components/LayoutComponent"
import MobileMenu, { GhostBgInner } from "#components/MobileMenu"
import ThemeSwitch from "#components/ThemeSwitch"
import Button from "#components/common/Button"
import NpmLogo from "#components/common/NpmLogo"
import { APP_CONFIG } from "#lib/config"
import { externalLink, internalLink } from "#lib/links"

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
  const { urlPathname } = usePageContext()

  const isStartPage = urlPathname === "/"

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

    // the case when the user refreshes the page while being scrolled down or history backs to the page which was scrolled down
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
          <Sticker className="text-dark h-4 w-4 lg:h-5 lg:w-5" />
          <span className="font-bold text-base lg:text-lg">react-classmate</span>
        </LogoContainer>
        <div className="flex gap-2">
          {isStartPage && (
            <Button
              color="primary"
              size="xs"
              noShadow
              link={internalLink.docs.getStarted}
              className="animate-in fade-in mr-2 !hidden !sm:inline-flex"
            >
              <Sparkles className="h-4 w-4" />
              Get Started
            </Button>
          )}
          <Button
            aria-label="Visit NPM Package"
            className="relative"
            link={externalLink.npm}
            color="icon"
            noShadow
            noGutter
            size="sm"
          >
            <div className="h-4.5 w-4.5">
              <NpmLogo />
            </div>
          </Button>
          <Button
            aria-label="Visit Github Repository"
            className="relative"
            link={externalLink.github}
            color="icon"
            noShadow
            noGutter
            size="sm"
          >
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
