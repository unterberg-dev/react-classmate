import { useEffect, useRef } from "react"
import useTheme from "#hooks/useThemeStore"
import { getSystemTheme } from "#lib/utils"

const useActiveSystemTheme = () => {
  const { setTheme } = useTheme()
  const currentSystemTheme = useRef(getSystemTheme())

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)")

    // Listener function to handle system theme changes
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      const newTheme = event.matches ? "dark" : "light"
      if (newTheme !== currentSystemTheme.current) {
        currentSystemTheme.current = newTheme
        setTheme(newTheme)
      }
    }

    // Attach the listener
    mediaQueryList.addEventListener("change", handleSystemThemeChange)

    return () => {
      mediaQueryList.removeEventListener("change", handleSystemThemeChange)
    }
  }, [setTheme])
}

export default useActiveSystemTheme
