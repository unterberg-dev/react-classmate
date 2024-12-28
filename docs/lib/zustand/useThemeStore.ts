import { create } from "zustand"

import type { UserTheme } from "#lib/types"

interface ThemeStoreValues {
  theme: UserTheme | undefined
  setTheme: (payload: UserTheme) => void
}

const useThemeStore = create<ThemeStoreValues>()((set) => ({
  theme: undefined,
  setTheme: (payload) => set(() => ({ theme: payload })),
}))

export default useThemeStore
