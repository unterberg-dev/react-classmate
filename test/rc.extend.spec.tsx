import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import React, { type InputHTMLAttributes } from "react"

import rc from "../dist"

describe("rc.extends", () => {
  it("extends the base component with new props", () => {
    interface StyledSliderItemBaseProps {
      $isActive: boolean
    }

    const StyledSliderItemBase = rc.button<StyledSliderItemBaseProps>`
      absolute
      top-0
      ${(p) => (p.$isActive ? "animate-in fade-in" : "animate-out fade-out")}
    `

    interface NewStyledSliderItemProps extends StyledSliderItemBaseProps {
      $secondBool: boolean
    }

    const NewStyledSliderItemWithNewProps = rc.extend(StyledSliderItemBase)<NewStyledSliderItemProps>`
      rounded-lg
      text-lg
      ${(p) => (p.$isActive ? "bg-blue" : "bg-red")}
      ${(p) => (p.type === "button" ? "text-underline" : "some-class-here")}
    `

    const { container } = render(
      <NewStyledSliderItemWithNewProps type="button" $isActive={false} $secondBool />,
    )
    expect(container.firstChild).toHaveClass(
      "absolute top-0 animate-out fade-out rounded-lg text-lg bg-red text-underline",
    )
    expect(container.firstChild).not.toHaveAttribute("$isActive")
    expect(container.firstChild).not.toHaveAttribute("$secondBool")
    expect(container.firstChild).toBeInstanceOf(HTMLButtonElement)
  })

  it("assign a rc component and infer it's base types", () => {
    const StyledButton = rc.extend(rc.button``)<{ $trigger?: boolean }>`
      bg-white
      ${(p) => (p.type === "button" ? "border-primary" : "")}
    `

    const { container } = render(<StyledButton type="button" />)
    expect(container.firstChild).toHaveClass("bg-white border-primary")
  })

  it("extend a react component with an assigned class", () => {
    const MyInput = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => <input {...props} />

    const StyledInput = rc.extend(MyInput)<{ $trigger?: boolean }>`
      bg-white
      border-1
      ${(p) => (p.$trigger ? "border-error" : "border-gray")}
    `

    const { container } = render(<StyledInput type="text" $trigger />)
    expect(container.firstChild).toHaveClass("bg-white border-error")
    expect(container.firstChild).toBeInstanceOf(HTMLInputElement)
    expect(container.firstChild).not.toHaveAttribute("$trigger")
    expect(container.firstChild).toHaveAttribute("type", "text")
  })

  it("extend a extended react component", () => {
    const MyInput = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => <input {...props} />

    const StyledInput = rc.extend(MyInput)<{ $trigger?: boolean }>`
      bg-white
      border-1
      ${(p) => (p.$trigger ? "border-error" : "border-gray")}
    `

    const ExtendedStyledInput = rc.extend(StyledInput)<{ $someBool?: boolean }>`
      custom-class
      ${(p) => (p.$someBool ? "shadow" : "")}
      ${(p) => (p.type === "text" ? "text-lg" : "")}
      ${(p) => (p.$trigger ? "text-red" : "")}
    `

    const { container } = render(<ExtendedStyledInput type="text" $trigger $someBool />)
    expect(container.firstChild).toHaveClass("bg-white border-1 border-error custom-class")
    expect(container.firstChild).toHaveClass("shadow")
    expect(container.firstChild).toHaveClass("text-lg")
    expect(container.firstChild).toHaveClass("text-red")

    expect(container.firstChild).toBeInstanceOf(HTMLInputElement)
    expect(container.firstChild).not.toHaveAttribute("$trigger")
    expect(container.firstChild).not.toHaveAttribute("$someBool")

    expect(container.firstChild).toHaveAttribute("type", "text")
  })

  it("add a variant with props and change them in a extended component", () => {
    interface StyledSliderItemBaseProps {
      $isActive: boolean
      $color?: "red" | "blue"
    }

    const StyledSliderItemBase = rc.div.variants<StyledSliderItemBaseProps>({
      base: ({ $isActive }) => `absolute top-0 ${$isActive ? "animate-in fade-in" : "animate-out fade-out"}`,
      variants: {
        $color: {
          red: ({ $isActive }) => `${$isActive ? "bg-red" : "bg-red/50"} `,
          blue: ({ $isActive }) => `${$isActive ? "bg-blue" : "bg-blue/50"} `,
        },
      },
      defaultVariants: {
        $color: "red",
      },
    })

    const Extended = rc.extend(StyledSliderItemBase)`
      rounded-lg
      text-lg
      ${({ $isActive }) => ($isActive ? "pointer-events-none" : "")}
    `

    const { container: inactiveElement } = render(<Extended $isActive />)
    const { container: activeElement } = render(<Extended $isActive={false} />)

    expect(inactiveElement.firstChild).toHaveClass(
      "absolute top-0 animate-in fade-in bg-red rounded-lg text-lg pointer-events-none",
    )
    expect(activeElement.firstChild).toHaveClass(
      "absolute top-0 animate-out fade-out bg-red/50 rounded-lg text-lg",
    )
  })
})
