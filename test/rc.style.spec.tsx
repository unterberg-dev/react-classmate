import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import React from "react"

import rc from "../dist"

describe("Style Capabilities", () => {
  it("applies styles correctly in createBaseComponent", () => {
    const BaseButton = rc.button<{ $disabled?: boolean }>`
      ${(p) => (p.$disabled ? "text-gray" : "text-blue")}
      ${(p) => p.style({ color: p.$disabled ? "gray" : "blue" })}
    `

    const { container } = render(<BaseButton $disabled={false}>Base Button</BaseButton>)
    const button = container.firstChild as HTMLElement

    expect(button).toHaveClass("text-blue")
    expect(button).toHaveStyle("color: blue")
  })

  it("merges and overrides styles in createExtendedComponent", () => {
    const BaseButton = rc.button<{ $disabled?: boolean }>`
      text-blue
      ${(p) => p.style({ color: p.$disabled ? "gray" : "blue" })}
    `

    const { container: baseButtonContainer } = render(<BaseButton $disabled={true}>Base Button</BaseButton>)

    const baseButton = baseButtonContainer.firstChild as HTMLElement
    expect(baseButton).toHaveClass("text-blue")
    expect(baseButton).toHaveStyle("color: gray")

    const ExtendedButton = rc.extend(BaseButton)<{ $test?: boolean }>`
      ${(p) => p.style({ outlineColor: p.$test ? "black" : "red" })}
    `
    const { container: extendedButtonContainer } = render(
      <ExtendedButton $disabled={true} $test={false}>
        Extended Button
      </ExtendedButton>,
    )

    const button = extendedButtonContainer.firstChild as HTMLElement

    expect(button).toHaveClass("text-blue")
    expect(button).toHaveStyle("color: gray")
    expect(button).toHaveStyle("outline-color: red")
  })

  // // Variants Component Test
  it("applies styles dynamically in createVariantsComponent", () => {
    const VariantButton = rc.button.variants<{ $size: "small" | "large"; $disabled?: boolean }>({
      base: (p) => p.style({ border: p.$disabled ? "1px solid gray" : "1px solid blue" }),
      variants: {
        $size: {
          small: (p) => p.style({ fontSize: "12px" }),
          large: (p) => p.style({ fontSize: "18px" }),
        },
      },
      defaultVariants: {
        $size: "small",
      },
    })

    const { container } = render(
      <VariantButton $disabled={false} $size="large">
        Variant Button
      </VariantButton>,
    )
    const button = container.firstChild as HTMLElement

    expect(button).toHaveStyle("border: 1px solid blue")
    expect(button).toHaveStyle("font-size: 18px")
  })
})
