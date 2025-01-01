import type { ReactNode } from "react"

import { APP_CONFIG } from "#lib/config"

const LayoutPageWrapper = ({ children }: { children: ReactNode }) => (
  <div
    className={`w-full h-full min-h-dvh relative z-15 ${APP_CONFIG.headerHeightConfig.footerPaddingBottomClass}`}
  >
    <div className={APP_CONFIG.headerHeightConfig.heightClass} />
    <div className="pt-20">
      <div className="absolute top-0 left-0 w-full h-full max-h-150 bg-gradient-to-b from-primarySuperLight pointer-events-none" />
      {children}
    </div>
  </div>
)

export default LayoutPageWrapper
