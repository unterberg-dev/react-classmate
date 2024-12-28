import { type HTMLAttributes, type ReactNode, type RefObject, useMemo } from "react"

export interface ButtonProps extends HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
  children?: ReactNode
  label?: string
  icon?: ReactNode
  size?: "small" | "medium" | "large"
  link?: string
  noBg?: boolean
  noGutter?: boolean
  disabled?: boolean
  active?: boolean
  ref?: RefObject<HTMLAnchorElement | HTMLButtonElement>
  className?: string
  type?: "button" | "submit" | "reset"
}

const Button = ({
  children,
  label = "",
  icon,
  link,
  size,
  noBg,
  noGutter,
  active,
  disabled,
  onClick,
  ref,
  className,
  type = "button",
  ...props
}: ButtonProps) => {
  const paddingSizeClass = useMemo(() => {
    switch (size) {
      case "small":
        return "px-3 py-1 text-base rounded min-h-9"
      default:
        return "px-7 py-2 text-lg rounded-lg min-h-10"
    }
  }, [size])

  const disabledColorStyle = useMemo(
    () => (disabled ? "bg-grayLight text-buttonTextColor" : "bg-buttonPrimaryDarkBg text-buttonTextColor"),
    [disabled],
  )

  const activeClass = useMemo(() => (active && !noBg ? "!bg-buttonPrimaryDarkBg" : ""), [active, noBg])

  const hoverClass = useMemo(
    () =>
      disabled || active ? "" : "hover:bg-buttonPrimaryDarkBg hover:bg-opacity-90 hover:text-buttonTextColor",
    [active, disabled],
  )

  const buttonStyle = useMemo(
    () =>
      `transition-colors inline-flex items-center justify-center ${noGutter ? "p-0" : paddingSizeClass} ${hoverClass} ${activeClass} ${noBg ? "" : disabledColorStyle} gap-2 font-bold  ${className ?? ""}`,
    [activeClass, className, disabledColorStyle, hoverClass, noBg, noGutter, paddingSizeClass],
  )

  if (link) {
    return (
      <a
        href={link}
        onClick={onClick}
        className={buttonStyle}
        ref={ref as RefObject<HTMLAnchorElement>}
        aria-label={label}
        {...props}
      >
        {icon}
        {children}
      </a>
    )
  }

  // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/button-has-type.md
  if (type === "submit") {
    return (
      <button
        type="submit"
        disabled={disabled}
        onClick={onClick}
        className={buttonStyle}
        ref={ref as RefObject<HTMLButtonElement>}
        aria-label={label}
        {...props}
      >
        {icon}
        {children}
      </button>
    )
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={buttonStyle}
      ref={ref as RefObject<HTMLButtonElement>}
      aria-label={label}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}

export default Button
