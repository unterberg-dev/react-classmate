import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { UserTheme } from "#lib/types"

export const getSystemTheme = (): "dark" | "light" | undefined => {
  if (typeof window === "undefined") return undefined

  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
  return prefersDarkScheme.matches ? "dark" : "light"
}

interface ThemeStoreValues {
  theme: UserTheme | undefined
  setTheme: (payload: UserTheme | undefined) => void
}

const useThemeStore = create<ThemeStoreValues>()(
  persist(
    (set) => ({
      theme: undefined,
      setTheme: (payload) => {
        set({ theme: payload })

        if (payload === "light") {
          document.documentElement.classList.remove("dark")
        } else {
          document.documentElement.classList.add("dark")
        }
      },
    }),
    {
      name: "theme-appearance",
    },
  ),
)

export default useThemeStore
