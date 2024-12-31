import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import React, { type ReactNode, type HTMLAttributes } from "react"

import rc, { type VariantsConfig, convertRcProps } from "../dist"

// export default convertAndFilterProps

interface ButtonBaseProps extends HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
  $size?: "sm" | "md" | "lg"
  $color?: "primary" | "secondary" | "error" | "success" | "warning" | "card"
  $disabled?: boolean
  $loading?: boolean
  $noShadow?: boolean
  $noGutter?: boolean
}

const buttonVariants: VariantsConfig<ButtonBaseProps, object> = {
  base: (p) => `
    transition-colors
    inline-flex items-center justify-center gap-2 
    font-bold
    text-lightNeutral
    shadow-darkNeutral/20
    ${p.$noShadow ? "!shadow-none" : ""}
    ${p.$noGutter ? "!p-0" : ""}
    ${p.$disabled ? "opacity-70 cursor-not-allowed" : ""}
    ${p.$loading ? "opacity-80 pointer-events-none" : ""}
  `,
  variants: {
    $size: {
      sm: "py-2 px-3 rounded text-sm shadow-sm",
      md: "py-2 px-3 rounded shadow-sm",
      lg: "py-3 px-4 rounded-lg shadow-md",
    },
    $color: {
      primary: ({ $disabled }) => `bg-primaryDarkNeutral ${!$disabled ? "hover:bg-primary" : ""}`,
      card: ({ $disabled }) => `
        bg-light
        dark:bg-gray/30
        !text-dark
        active:bg-successDarkNeutral
        active:!text-lightNeutral
        active:dark:bg-successDarkNeutral
        active:dark:!text-lightNeutral
        ${
          !$disabled
            ? `
          hover:!text-dark 
          hover:bg-gray/10 
          hover:dark:bg-gray/50
          `
            : ""
        }`,
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
  type: "button" | "submit" | "reset"

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
  })

  return (
    <Component {...(link ? { href: link } : {})} {...preparedProps}>
      {icon}
      {children}
    </Component>
  )
}

const CustomButton = rc.extend(Button)`
  w-7 
  lg:w-8
  h-7 
  lg:h-8
`

describe("rc advanced button", () => {
  it("extends the base component with new props", () => {
    const { container } = render(
      <CustomButton type="button" aria-label="test" color="card" noGutter noShadow size="lg" />,
    )

    expect(container.firstChild).toHaveClass(
      "transition-colors inline-flex items-center justify-center gap-2 font-bold text-lightNeutral",
    )

    expect(container.firstChild).toHaveClass("!shadow-none")
    expect(container.firstChild).toHaveClass("!p-0")
    expect(container.firstChild).toHaveAttribute("aria-label", "test")
  })
})
