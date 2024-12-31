export const codeString1 = `<Button size="lg" type="button">Button Big</Button>
<Button type="button">Button Medium</Button>
<Button size="sm" type="button">Button Small</Button>
<Button type="button" disabled>Button Disabled</Button>
<Button type="button" loading>Button Loading</Button>`

export const codeString2 = `<Button size="lg" type="button" color="error">Button Big</Button>
<Button type="button" color="error">Button Medium</Button>
<Button size="sm" type="button" color="error">Button Small</Button>
<Button type="button" disabled color="error">Button Disabled</Button>
<Button type="button" color="error" loading>Button Loading</Button>`

export const buttonCode = `import { LoaderCircle } from "lucide-react"
import type { HTMLAttributes, ReactNode } from "react"
import rc, { type VariantsConfig } from "react-classmate"

interface ButtonBaseProps extends HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
  $size?: "sm" | "md" | "lg"
  $color?: "primary" | "secondary" | "error" | "success" | "warning"
  $disabled?: boolean
  $loading?: boolean
  $shadow?: boolean
  $gutter?: boolean
}

const buttonVariants: VariantsConfig<ButtonBaseProps, ButtonBaseProps> = {
  base: ({ $gutter, $disabled, $loading }) => \`
    transition-colors
    inline-flex items-center justify-center gap-2 
    font-bold
    text-lightNeutral
    shadow-darkNeutral/20
    \${$gutter ? "" : "!p-0"}
    \${$disabled ? "opacity-70 cursor-not-allowed" : ""}
    \${$loading ? "opacity-80 pointer-events-none" : ""}
  \`,
  variants: {
    $size: {
      sm: ({ $shadow }) => \`py-2 px-3 rounded text-sm \${$shadow ? "shadow-sm" : ""}\`,
      md: ({ $shadow }) => \`py-2 px-3 rounded \${$shadow ? "shadow-sm" : ""}\`,
      lg: ({ $shadow }) => \`py-3 px-4 rounded-lg \${$shadow ? "shadow-md" : ""}\`,
    },
    $color: {
      primary: ({ $disabled }) => \`bg-primaryDarkNeutral \${!$disabled ? "hover:bg-primary" : ""}\`,
      success: ({ $disabled }) => \`bg-successDarkNeutral \${!$disabled ? "hover:bg-success" : ""}\`,
      warning: ({ $disabled }) => \`bg-warningDarkNeutral \${!$disabled ? "hover:bg-warning" : ""}\`,
      error: ({ $disabled }) => \`bg-errorDarkNeutral \${!$disabled ? "hover:bg-error" : ""}\`,
    },
  },
  defaultVariants: {
    $size: "md",
    $color: "primary",
  },
}

const ButtonBase = rc.button.variants(buttonVariants)
const LinkButton = rc.a.variants(buttonVariants)

export interface ButtonProps extends ButtonBaseProps {
  icon?: ReactNode
  link?: string
  type: "button" | "submit" | "reset"
}

const Button = ({
  children,
  icon,
  link,
  $size = "md",
  $gutter = true,
  $shadow = true,
  ...buttonProps
}: ButtonProps) => {
  const Component = link ? LinkButton : ButtonBase

  return (
    <Component href={link} $size={$size} $shadow={$shadow} $gutter={$gutter} {...buttonProps}>
      {icon}
      {children}
      {buttonProps.$loading && <LoaderCircle className="w-4 h-4 animate-spin" />}
    </Component>
  )
}

export default Button
`
