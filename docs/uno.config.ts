// uno.config.ts
import { type Theme, colors } from "@unocss/preset-wind"
import { type Preset, defineConfig, presetUno } from "unocss"
import presetTheme from "unocss-preset-theme"

export const defaultColors = {
  transparent: "transparent",
  current: "currentColor",
  buttonTextColor: colors.neutral[50],
  headerShadowColor: colors.neutral[300],
  black: colors.neutral[950],
  dark: colors.neutral[900],
  darkNeutral: colors.neutral[900],
  grayDark: colors.neutral[800],
  grayDarkBorder: colors.neutral[700],
  darkBorder: "#111",
  gray: colors.neutral[500],
  grayNeutral: colors.neutral[500],
  lightNeutral: colors.neutral[50],
  grayLight: colors.neutral[300],
  graySuperLight: colors.neutral[200],
  lightBorder: colors.neutral[100],
  light: colors.neutral[50],
  white: "#ffffff",

  primaryDarkNeutral: colors.sky[700],
  buttonPrimaryDarkBg: colors.sky[700],
  primarySuperDark: colors.slate[900],
  primaryDark: colors.sky[700],
  primary: colors.sky[500],
  primaryLight: colors.sky[300],
  primarySuperLight: colors.sky[100],

  successDarkNeutral: colors.emerald[800],
  successSuperLight: colors.emerald[50],
  successLight: colors.emerald[200],
  success: colors.emerald[500],
  successDark: colors.emerald[800],
  successSuperDark: colors.emerald[950],

  warningDarkNeutral: colors.amber[800],
  warning: colors.amber[500],
  warningSuperLight: colors.amber[50],
  warningLight: colors.amber[200],
  warningDark: colors.amber[800],
  warningSuperDark: colors.amber[950],

  errorSuperLight: colors.red[50],
  errorLight: colors.red[200],
  error: colors.red[500],
  errorDark: colors.red[800],
  errorSuperDark: colors.red[950],
}

// dark theme overrides
export const darkModeOverrides = {
  black: defaultColors.white,
  dark: defaultColors.light,
  grayDark: defaultColors.graySuperLight,
  grayDarkBorder: defaultColors.grayLight,
  gray: defaultColors.grayNeutral,
  grayLight: defaultColors.grayDarkBorder,
  graySuperLight: defaultColors.grayDarkBorder,
  light: defaultColors.dark,
  white: defaultColors.black,
  primarySuperDark: defaultColors.primarySuperLight,
  primaryDark: defaultColors.primaryLight,
  primaryLight: defaultColors.primaryDark,
  primarySuperLight: defaultColors.primarySuperDark,

  headerShadowColor: defaultColors.black,
  lightBorder: defaultColors.darkBorder,

  warningSuperLight: defaultColors.warningSuperDark,
  warningLight: defaultColors.warningDark,
  warningDark: defaultColors.warningLight,
  warningSuperDark: defaultColors.warningSuperLight,

  errorSuperLight: defaultColors.errorSuperDark,
  errorLight: defaultColors.errorDark,
  error: defaultColors.error,
  errorDark: defaultColors.errorLight,
  errorSuperDark: defaultColors.errorSuperLight,

  successSuperLight: defaultColors.successSuperDark,
  successLight: defaultColors.successDark,
  success: defaultColors.successLight,
  successDark: defaultColors.success,
}

export default defineConfig({
  presets: [
    presetUno(),
    presetTheme<Theme>({
      theme: {
        dark: {
          colors: darkModeOverrides,
        },
      },
    }) as Preset<Theme>,
  ],
  theme: {
    colors: defaultColors,
    fontSize: {
      base: ["16px", "24px"],
      small: ["14px", "20px"],
      micro: ["10px", "12px"],
    },
    fontFamily: {
      sans: "Helvetica Neue, Arial, Tahoma, sans-serif",
    },
  },
  // a good place to use the theme values directly
  preflights: [
    {
      // outputs the css variables for colors and font sizes
      // assigns base font styles to html and body
      getCSS: ({ theme }) => {
        let cssVariables = ""

        if (theme.colors) {
          for (const color of Object.keys(theme.colors)) {
            if (typeof theme.colors?.[color] === "string") {
              cssVariables += `--color-${color}: ${theme.colors?.[color]};\n`
            }
          }
        }

        if (theme.fontSize) {
          for (const size of Object.keys(theme.fontSize)) {
            if (Array.isArray(theme.fontSize?.[size])) {
              cssVariables += `--font-size-${size}: ${theme.fontSize?.[size][0]};\n`
            }
          }
        }

        return `
          body, html {
            background-color: ${theme.colors?.dark};
            color: ${theme.colors?.light};
            font-family: ${theme.fontFamily?.sans};
            font-size: ${theme.fontSize?.base[0]};
          }
          :root {
            ${cssVariables}
          }
        `
      },
    },
  ],
})
