import cm from "@classmate/react"
import type { ReactNode } from "react"

import { APP_CONFIG } from "#lib/config"

const Layout = cm.div`
  w-full
  h-full
  min-h-dvh
  relative
  z-15 
  ${APP_CONFIG.headerHeightConfig.footerPaddingBottomClass}
`

const Gradient = cm.div`
  absolute
  top-0
  left-0
  w-full
  h-full
  max-h-150
  bg-gradient-to-b
  from-primarySuperLight
  pointer-events-none
`

const LayoutPageWrapper = ({ children }: { children: ReactNode }) => (
  <Layout>
    <div className={APP_CONFIG.headerHeightConfig.heightClass} />
    <div className="pt-20">
      <Gradient />
      {children}
    </div>
  </Layout>
)

export default LayoutPageWrapper
