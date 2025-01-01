// uno.config.ts
import { type Theme, colors } from "@unocss/preset-wind"
import { type Preset, defineConfig, presetUno } from "unocss"
import presetAnimations from "unocss-preset-animations"
import presetTheme from "unocss-preset-theme"

export const defaultColors = {
  transparent: "transparent",
  current: "currentColor",
  buttonTextColor: colors.neutral[50],
  shadowNeutral: colors.neutral[300],
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

  primaryDarkNeutral: colors.indigo[700],
  buttonPrimaryDarkBg: colors.indigo[700],
  primarySuperDark: colors.slate[900],
  primaryDark: colors.indigo[700],
  primary: colors.indigo[500],
  primaryLight: colors.indigo[300],
  primarySuperLight: colors.indigo[100],

  successDarkNeutral: colors.emerald[700],
  success: colors.emerald[500],
  successSuperLight: colors.emerald[50],
  successLight: colors.emerald[200],
  successDark: colors.emerald[800],
  successSuperDark: colors.emerald[950],

  warningDarkNeutral: colors.amber[700],
  warning: colors.amber[500],
  warningSuperLight: colors.amber[50],
  warningLight: colors.amber[200],
  warningDark: colors.amber[800],
  warningSuperDark: colors.amber[950],

  errorDarkNeutral: colors.red[700],
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

  lightBorder: defaultColors.darkBorder,
  darkBorder: defaultColors.light,

  warningSuperLight: defaultColors.warningSuperDark,
  warningLight: defaultColors.warningDark,
  warningDark: defaultColors.warningLight,
  warningSuperDark: defaultColors.warningSuperLight,

  errorSuperLight: defaultColors.errorSuperDark,
  errorLight: defaultColors.errorDark,
  errorDark: defaultColors.errorLight,
  errorSuperDark: defaultColors.errorSuperLight,

  successSuperLight: defaultColors.successSuperDark,
  successLight: defaultColors.successDark,
  successDark: defaultColors.successLight,
  successSuperDark: defaultColors.successSuperLight,
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
    presetAnimations({ fillMode: "both" }),
  ],
  // gotta catch em all
  content: {
    pipeline: {
      exclude: [/\.(css|postcss|node_modules|dist|sass|scss|less|stylus|stLyl)($|\?)/],
      include: ["**/*.ts", "**/*.tsx"],
    },
  },
  theme: {
    colors: defaultColors,
    fontSize: {
      base: ["17px", "24px"],
      md: ["15.5px", "20px"],
      sm: ["14px", "20px"],
      xs: ["12px", "20px"],
      micro: ["10px", "12px"],
    },
    fontFamily: {
      sans: "Helvetica Neue, Arial, Tahoma, sans-serif",
    },
  },
  preflights: [
    {
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
            background-color: ${theme.colors?.light};
            color: ${theme.colors?.dark};
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
