import "@testing-library/jest-dom"
import { render } from "@solidjs/testing-library"

import sc, { createClassmate } from "../../dist"

describe("createClassmate", () => {
  it("returns the component produced by the factory", () => {
    const StyledBox = createClassmate(() => sc.div`p-4 text-blue-500`)

    const { container } = render(() => <StyledBox data-testid="box">Content</StyledBox>)
    expect(container.firstChild).toHaveClass("p-4 text-blue-500")
    expect(container.firstChild).toHaveAttribute("data-testid", "box")
  })

  it("can be invoked multiple times without recreating styles", () => {
    const Styled = createClassmate(() => sc.button`rounded bg-green-500 text-white`)

    const { container: first } = render(() => <Styled>First</Styled>)
    const { container: second } = render(() => <Styled>Second</Styled>)

    expect(first.firstChild).toHaveClass("rounded bg-green-500 text-white")
    expect(second.firstChild).toHaveClass("rounded bg-green-500 text-white")
  })
})
