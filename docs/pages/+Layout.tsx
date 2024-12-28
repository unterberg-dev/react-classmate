import type { ReactNode } from "react"

import "@unocss/reset/tailwind.css"
import "#components/styles.css"
import "#components/theme.css"
import "virtual:uno.css"

import LayoutPageWrapper from "#components/LayoutPageWrapper"
import useTriggerTheme from "#hooks/useTriggerTheme"
import Footer from "#layout/Footer"
import Header from "#layout/Header"

const AppLayout = ({ children }: { children: ReactNode }) => {
  useTriggerTheme()

  return (
    <div className="bg-light text-dark">
      <Header />
      <LayoutPageWrapper>{children}</LayoutPageWrapper>
      <Footer />
      aslkdjaslkdasj
    </div>
  )
}

export default AppLayout
