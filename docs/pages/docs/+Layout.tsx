import type { ReactNode } from "react"

import "@unocss/reset/tailwind.css"
import "#components/theme.css"
import "virtual:uno.css"
import LayoutComponent from "#components/LayoutComponent"
import Sidebar from "#layout/Sidebar"

const DocsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <LayoutComponent className="flex gap-2">
      <Sidebar>Sidebar</Sidebar>
      <div className="">{children}</div>
    </LayoutComponent>
  )
}

export default DocsLayout
