// https://vike.dev/Head

import React from "react"
import logoUrl from "../assets/logo.svg"

export default function HeadDefault() {
  return (
    <>
      <link rel="icon" href={logoUrl} />
      <script
        id="check-dark-mode"
        nonce="2t4f394ea52c937db4f319231a53fcc8"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: we must access localStorage to check dark mode as early as possible
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
                const themeStore = localStorage.getItem('theme-appearance')
                const systemTheme = prefersDarkScheme.matches ? 'dark' : 'light'
                const isAutoDark = themeStore && themeStore === 'auto' && systemTheme === 'dark'
                if (themeStore === 'dark' || isAutoDark) {
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
