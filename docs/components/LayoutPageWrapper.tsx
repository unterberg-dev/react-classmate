import type { ReactNode } from "react"

import { APP_CONFIG } from "#lib/config"

const LayoutPageWrapper = ({ children }: { children: ReactNode }) => (
  <div
    className={`w-full h-full min-h-dvh overflow-x-hidden relative z-15 ${APP_CONFIG.headerHeightConfig.footerPaddingBottomClass}`}
  >
    <div className="pb-10">
      <div className="absolute top-0 left-0 w-full h-full max-h-150 bg-gradient-to-b from-primarySuperLight" />
      {children}
    </div>
  </div>
)

export default LayoutPageWrapper
