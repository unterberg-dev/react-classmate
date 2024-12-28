import { useCallback } from "react"

import type { UserTheme } from "#lib/types"
import useThemeStore from "#zustand/useThemeStore"

/** the hook to get and set theme */
const useSystemTheme = () => {
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)

  const handleThemeChange = useCallback(
    (newTheme: UserTheme) => {
      localStorage.setItem("theme-appearance", newTheme)
      setTheme(newTheme)

      if (newTheme === "light") {
        document.documentElement.classList.remove("dark")
      } else {
        document.documentElement.classList.add("dark")
      }
    },
    [setTheme],
  )

  // if the user has set a theme, return it
  return {
    theme,
    handleThemeChange,
  }
}

export default useSystemTheme
