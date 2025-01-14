import { create } from "zustand"

interface MenuStoreValues {
  isOpen: boolean
  toggle: () => void
  close: () => void
}

const useMenuStore = create<MenuStoreValues>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
}))

export default useMenuStore
