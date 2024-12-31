export default function HeadDefault() {
  return (
    <>
      <script
        id="check-dark-mode"
        nonce="2t4f394ea52c937db4f319231a53fcc8"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: we wanna access localStorage to check dark mode as early as possible
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
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
                if (!isLocalStorageAvailable()) {
                  return
                }
                const themeStore = JSON.parse(localStorage.getItem('theme-appearance'))
                const systemTheme = prefersDarkScheme.matches ? 'dark' : 'light'
                const isAutoDark = themeStore.state.theme && themeStore.state.theme === 'auto' && systemTheme === 'dark'
                if (themeStore.state.theme === 'dark' || isAutoDark) {
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
