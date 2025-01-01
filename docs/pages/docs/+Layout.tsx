import type { ReactNode } from "react"

import "@unocss/reset/tailwind.css"
import "#components/theme.css"
import "virtual:uno.css"
import LayoutComponent from "#components/LayoutComponent"
import Sidebar from "#layout/Sidebar"

const DocsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <LayoutComponent className="grid grid-cols-1 lg:grid-cols-4 gap-5">
      <Sidebar />
      <div className="lg:col-span-3">{children}</div>
    </LayoutComponent>
  )
}

export default DocsLayout
