import { usePageContext } from "vike-react/usePageContext"
import { APP_CONFIG } from "#lib/config"

import uno from "../uno.config"

export default function HeadDefault() {
  const { urlParsed, config } = usePageContext()

  const ogDesc = (config.description || APP_CONFIG.defaultDescription) as string
  const ogTitle = (config.title || APP_CONFIG.defaultDescription) as string
  const ogLang = (config.lang || "en") as string

  const darkColor = uno.theme?.colors?.dark
  const lightColor = uno.theme?.colors?.light
  const canonicalUrl = `${APP_CONFIG.prodUrl}${urlParsed.pathname}${urlParsed.pathname.endsWith("/") ? "" : "/"}`

  return (
    <>
      <link rel="manifest" href={`${APP_CONFIG.prodUrl}/site.webmanifest`} />
      <link rel="icon" href={`${APP_CONFIG.prodUrl}/favicon.ico`} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDesc} />
      <meta property="og:locale" content={ogLang} />

      {/* Inline dark mode check - zero delay set */}
      <script
        id="check-dark-mode"
        nonce="2t4f394ea52c937db4f319231a53fcc8"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: we wanna access localStorage to check dark mode as early as possible
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const addDarkClass = () => {
                document.documentElement.classList.add('dark')
              }
              const isLocalStorageAvailable = () => {
                  try {
                    const testKey = 't'
                    localStorage.setItem(testKey, testKey)
                    localStorage.removeItem(testKey)
                    return true;
                  } catch (error) {
                    return false;
                  }
              }
              const checkDarkMode = () => {
                const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
                const systemTheme = prefersDarkScheme.matches ? 'dark' : 'light'
                const themeStore = JSON.parse(localStorage.getItem('theme-appearance'))

                if (!isLocalStorageAvailable() ||!themeStore) {
                  if (systemTheme === 'dark') {
                    addDarkClass()
                  }
                  return
                }
                if (themeStore.state.theme === 'dark') {
                  document.documentElement.classList.add('dark')
                }
              }
              checkDarkMode()
            })();
          `,
        }}
      />
    </>
  )
}
