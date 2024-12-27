import "@testing-library/jest-dom"
import { prettyDOM, render } from "@testing-library/react"
import React from "react"

import rc from "../dist"

describe("Style Capabilities", () => {
  // Base Component Test
  it("applies styles correctly in createBaseComponent", () => {
    const BaseButton = rc.button<{ $disabled?: boolean }>`
      text-blue
      ${(p) => p.style({ color: p.$disabled ? "gray" : "blue" })}
    `

    const { container } = render(<BaseButton $disabled={true}>Base Button</BaseButton>)
    const button = container.firstChild as HTMLElement
    console.log(prettyDOM(button))

    expect(button).toHaveClass("text-blue")
    expect(button).toHaveStyle("color: gray")

    render(<BaseButton $disabled={false}>Base Button</BaseButton>)
    expect(button).toHaveStyle("color: blue")
  })

  // Extended Component Test
  it("merges and overrides styles in createExtendedComponent", () => {
    const BaseButton = rc.button<{ $disabled?: boolean }>`
      text-blue
      ${(p) => p.style({ color: p.$disabled ? "gray" : "blue" })}
    `

    const ExtendedButton = rc.extend(BaseButton)<{ $highlighted?: boolean }>`
      ${(p) => p.style({ backgroundColor: p.$highlighted ? "yellow" : "transparent" })}
    `

    const { container } = render(
      <ExtendedButton $disabled={true} $highlighted={true}>
        Extended Button
      </ExtendedButton>,
    )

    const button = container.firstChild as HTMLElement
    console.log(prettyDOM(button))

    expect(button).toHaveClass("text-blue")
    // expect(button).toHaveStyle("color: gray")
    expect(button).toHaveStyle("background-color: yellow")
  })

  // Variants Component Test
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
    console.log(prettyDOM(button))

    expect(button).toHaveStyle("border: 1px solid blue")
    expect(button).toHaveStyle("font-size: 18px")
  })
})
