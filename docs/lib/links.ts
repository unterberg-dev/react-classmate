import { APP_CONFIG } from "#lib/config"

const base = APP_CONFIG.viteUrl

export const internalLink = {
  start: `${APP_CONFIG.viteUrl}`,
  docs: {
    getStarted: `${base}docs/get-started/`,
    basic: `${base}docs/basic/`,
    extend: `${base}docs/extend/`,
    variants: `${base}docs/variants/`,
    useClassmate: `${base}docs/use-classmate/`,
    logic: `${base}docs/logic/`,
  },
  util: {
    style: `${base}docs/interpolation/style/`,
    convertRcProps: `${base}docs/helper/convertrcprops/`,
    createVariantMap: `${base}docs/helper/createvariantmap/`,
  },
  typescript: {
    rcBaseComponent: `${base}docs/typescript/rcbasecomponent/`,
    variantsConfig: `${base}docs/typescript/variantsconfig/`,
  },
  example: {
    button: `${base}docs/examples/button/`,
    headline: `${base}docs/examples/headline/`,
  },
}

export const externalLink = {
  npm: "https://www.npmjs.com/package/react-classmate",
  github: "https://github.com/unterberg-dev/react-classmate",
}
