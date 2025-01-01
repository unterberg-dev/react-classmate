import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import React, { type JSX } from "react"

import rc from "../dist"

describe("rc base", () => {
  it("renders a rc.div with assigned classes", () => {
    const RenderDiv = rc.div`bg-red p-4`

    const { container } = render(<RenderDiv />)
    expect(container.firstChild).toHaveClass("bg-red p-4")
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
  })

  it("filters $-prefixed props & renders the class attribute on a rc.button", () => {
    const HiddenButton = rc.button<{
      $disabled: boolean
    }>`text-blue custom ${(p) => (p.$disabled ? "opacity-60" : "")}`
    const { container } = render(<HiddenButton aria-label="testlabel" $disabled />)

    expect(container.firstChild).not.toHaveAttribute("$disabled")
    expect(container.firstChild).toHaveClass("text-blue custom opacity-60")
    expect(container.firstChild).toHaveAttribute("aria-label")
    expect(container.firstChild).toBeInstanceOf(HTMLButtonElement)
  })

  it("can use intrinsic properties of element", () => {
    const HiddenButton = rc.button<JSX.IntrinsicElements["button"]>`
      text-blue 
      custom 
      ${(p) => (p.type === "button" ? "opacity-60" : "")}
    `
    const { container } = render(<HiddenButton aria-label="testlabel" type="button" />)

    expect(container.firstChild).not.toHaveAttribute("$disabled")
    expect(container.firstChild).toHaveClass("text-blue custom opacity-60")
    expect(container.firstChild).toHaveAttribute("aria-label")
    expect(container.firstChild).toBeInstanceOf(HTMLButtonElement)
  })
})
