import { LoaderCircle } from "lucide-react"
import type { HTMLAttributes, ReactNode } from "react"
import rc, { type VariantsConfig, convertRcProps } from "react-classmate"
import { APP_CONFIG } from "#lib/config"
import { isLinkExternal } from "#lib/utils"

interface ButtonBaseProps {
  $size?: "lg" | "md" | "sm" | "xs"
  $color?: "primary" | "secondary" | "error" | "success" | "warning" | "copy" | "hollow" | "icon"
  $disabled?: boolean
  $loading?: boolean
  $noShadow?: boolean
  $noGutter?: boolean
}

const buttonVariants: VariantsConfig<ButtonBaseProps, ButtonBaseProps> = {
  base: ({ $noShadow, $noGutter, $disabled, $loading }) => `
    transition-colors
    inline-flex items-center justify-center gap-2 
    font-bold
    text-lightNeutral
    ${APP_CONFIG.uno.transitionWind}
    ${$noShadow ? "!shadow-none" : "shadow-darkNeutral/20"}
    ${$noGutter ? "!p-0" : ""}
    ${$disabled ? "opacity-60 cursor-not-allowed" : ""}
    ${$loading ? "opacity-80 pointer-events-none" : ""}
  `,
  variants: {
    $size: {
      xs: "py-1 px-2 rounded text-xs shadow-sm",
      sm: "py-1.5 px-2.5 rounded text-sm shadow-sm",
      md: "py-2 px-3 rounded shadow-sm",
      lg: "py-3 px-4 rounded-lg shadow-md",
    },
    $color: {
      hollow: "bg-transparent",
      primary: ({ $disabled }) => `bg-primaryDarkNeutral ${!$disabled ? "hover:bg-primary" : ""}`,
      copy: ({ $disabled }) => `
        bg-white
        dark:bg-gray/30
        !text-dark
        active:!bg-successDarkNeutral
        active:!text-lightNeutral
        active:dark:!bg-successDarkNeutral
        active:dark:!text-lightNeutral
        ${!$disabled ? "hover:!text-dark hover:bg-grayLight/30 hover:dark:bg-gray/50" : ""}`,
      icon: `
        rounded-full
        w-7 lg:w-8
        h-7 lg:h-8
        !min-h-auto 
        !bg-gray/20 dark:!bg-grayLight 
        !text-dark dark:!text-grayDark
      `,
      success: ({ $disabled }) => `bg-successDarkNeutral ${!$disabled ? "hover:bg-success" : ""}`,
      warning: ({ $disabled }) => `bg-warningDarkNeutral ${!$disabled ? "hover:bg-warning" : ""}`,
      error: ({ $disabled }) => `bg-errorDarkNeutral ${!$disabled ? "hover:bg-error" : ""}`,
    },
  },
  defaultVariants: {
    $size: "md",
    $color: "primary",
  },
}

const ButtonBase = rc.button.variants(buttonVariants)
const LinkButton = rc.a.variants(buttonVariants)

interface ButtonProps extends HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
  icon?: ReactNode
  link?: string
  type?: "button" | "submit" | "reset"

  // we must redeclare these props here because $-props are not inherited from ButtonBaseProps
  size?: ButtonBaseProps["$size"]
  color?: ButtonBaseProps["$color"]
  disabled?: ButtonBaseProps["$disabled"]
  loading?: ButtonBaseProps["$loading"]
  noShadow?: ButtonBaseProps["$noShadow"]
  noGutter?: ButtonBaseProps["$noGutter"]
}

const Button = ({ children, icon, link, ...buttonProps }: ButtonProps) => {
  const Component = link ? LinkButton : ButtonBase

  const preparedProps = convertRcProps(buttonProps, {
    size: "$size",
    noShadow: "$noShadow",
    noGutter: "$noGutter",
    loading: "$loading",
    disabled: "$disabled",
    color: "$color",
  })

  const isExternal = isLinkExternal(link)

  return (
    <Component {...(link ? { href: link, target: isExternal ? "_blank" : "" } : {})} {...preparedProps}>
      {icon}
      {children}
      {buttonProps.loading && <LoaderCircle className="w-4 h-4 animate-spin" />}
    </Component>
  )
}

export default Button
