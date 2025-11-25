import vikeReact from "vike-react/config"
import type { Config } from "vike/types"

export default {
  title: "@classmate/react",
  description: "A react tool to separate class name logic, create variants and manage styles.",
  extends: vikeReact,
  lang: "en",
  clientRouting: true,
  prerender: true,
  trailingSlash: true,
} satisfies Config
