import vikeReact from "vike-react/config"
import type { Config } from "vike/types"

export default {
  title: "react-classmate",
  description:
    "A tool for managing React component class names, variants and styles with the simplicity of styled-components and cva. Designed and tested for use with utility-first CSS libraries and SSR/SSG frameworks.",
  extends: vikeReact,
  clientRouting: true,
} satisfies Config
