import { useEffect, useRef } from "react"

import useSystemTheme from "#hooks/useSystemTheme"
import type { UserTheme } from "#lib/types"
import { getSystemTheme } from "#lib/utils"

const isLocalStorageAvailable = () => {
  try {
    const testKey = "t"
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey)
    return true // localStorage is available
  } catch (error) {
    return false // localStorage is blocked
  }
}

/** checks if users appearance has changed using matchMedia */
const useTriggerTheme = () => {
  const { theme, handleThemeChange } = useSystemTheme()
  const currentSystemTheme = useRef<UserTheme>(getSystemTheme())
  const isInitial = useRef(true)

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)")

    // Listener function to handle theme changes
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      const newTheme = event.matches ? "dark" : "light"
      if (newTheme !== currentSystemTheme.current) {
        currentSystemTheme.current = newTheme as UserTheme
        handleThemeChange(newTheme as UserTheme)
      }
    }

    // Attach the listener
    mediaQueryList.addEventListener("change", handleSystemThemeChange)

    // Initial run to set the theme
    if (
      isLocalStorageAvailable() &&
      theme &&
      localStorage.getItem("theme-appearance") &&
      theme !== localStorage.getItem("theme-appearance")
    ) {
      handleThemeChange(localStorage.getItem("theme-appearance") as UserTheme)
    }

    // Trigger change on the first run
    if (isInitial.current && isLocalStorageAvailable()) {
      isInitial.current = false
      handleThemeChange((localStorage.getItem("theme-appearance") as UserTheme) || getSystemTheme())
    }

    return () => {
      mediaQueryList.removeEventListener("change", handleSystemThemeChange)
    }
  }, [handleThemeChange, theme])
}

export default useTriggerTheme
