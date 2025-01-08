import { useEffect, useRef } from "react"

import useThemeStore from "#hooks/useThemeStore"
import { getSystemTheme } from "#lib/utils"

const useActiveSystemTheme = () => {
  const setTheme = useThemeStore((data) => data.setTheme)

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)")

    // Listener function to handle system theme changes
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      const newTheme = event.matches ? "dark" : "light"
      setTheme(newTheme)
    }

    // Attach the listener
    mediaQueryList.addEventListener("change", handleSystemThemeChange)

    return () => {
      mediaQueryList.removeEventListener("change", handleSystemThemeChange)
    }
  }, [setTheme])

  useEffect(() => {
    const persistedTheme = localStorage.getItem("theme-appearance")

    if (persistedTheme) {
      const parsedTheme = JSON.parse(persistedTheme)

      if (parsedTheme.state.theme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    } else {
      if (getSystemTheme() === "dark") {
        setTheme("dark")
        document.documentElement.classList.add("dark")
      } else {
        setTheme("light")
      }
    }
  }, [setTheme])
}

export default useActiveSystemTheme
