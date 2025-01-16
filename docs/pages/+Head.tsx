import { APP_CONFIG } from "#lib/config"

export default function HeadDefault() {
  return (
    <>
      <link rel="manifest" href={`${APP_CONFIG.viteUrl}site.webmanifest`} />
      <link rel="icon" href={`${APP_CONFIG.viteUrl}favicon.ico`} />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${APP_CONFIG.viteUrl}`} />
      <meta property="og:title" content="react-classmate" />
      <meta
        property="og:description"
        content="A react tool to separate class name logic, create variants and manage styles."
      />
      <meta property="og:locale" content="en" />
      <meta property="og:site_name" content="react-classmate" />
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
