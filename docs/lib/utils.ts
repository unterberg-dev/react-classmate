export const getSystemTheme = (): "dark" | "light" => {
  if (typeof window === "undefined") return "light"

  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
  return prefersDarkScheme.matches ? "dark" : "light"
}
