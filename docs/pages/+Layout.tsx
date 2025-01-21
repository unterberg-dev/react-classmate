import type { ReactNode } from "react"

import LayoutPageWrapper from "#components/LayoutPageWrapper"
import useActiveSystemTheme from "#hooks/useActiveSystemTheme"
import Footer from "#layout/Footer"
import Header from "#layout/Header"

// using the reset of @unocss/..somereset will cause uno css to be included twice :/
import "#components/tailwind-reset.css"

import "#components/theme.css"
import "virtual:uno.css"

const AppLayout = ({ children }: { children: ReactNode }) => {
  useActiveSystemTheme()

  return (
    <div className="bg-light text-dark">
      <Header />
      <LayoutPageWrapper>{children}</LayoutPageWrapper>
      <Footer />
    </div>
  )
}

export default AppLayout
