import { Sticker } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import rc from "react-classmate"

import LayoutComponent from "#components/LayoutComponent"
import ThemeSwitch from "#components/ThemeSwitch"
import H1Headline from "#components/common/H1Headline"
import { APP_CONFIG } from "#lib/config"

const HeaderOuter = rc.header`
  fixed
  w-full
  z-25
  ${APP_CONFIG.headerHeightConfig.heightClass}
`

const LogoContainer = rc.div`
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
        <LogoContainer>
          <Sticker className="text-dark h-6 w-6" strokeWidth={2} />
          <H1Headline className="!text-lg">react-classmate</H1Headline>
        </LogoContainer>
        <ThemeSwitch />
      </HeaderLayout>
      <div ref={ghostBgRef} className="theme-header-shadow invisible pointer-events-none">
        <div
          className={`${scrolled ? "animate-in fade-in" : "animate-out fade-out"}   shadow-md
  shadow-darkNeutral/20 bg-white animate-ease-out top-0 absolute h-full w-full shadow-md shadow-headerShadowColor shadow-opacity-30`}
        />
      </div>
    </HeaderOuter>
  )
}

export default Header
