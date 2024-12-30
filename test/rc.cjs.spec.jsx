const React = require("react")
const { render } = require("@testing-library/react")

const rc = require("../dist/index.cjs.js").default

describe("CommonJS Build", () => {
  it("should import the library using require", () => {
    const RenderDiv = rc.div`bg-red p-4`

    const { container } = render(<RenderDiv />)
    expect(container.firstChild).toHaveClass("bg-red p-4")
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
  })
})

describe("rc base test", () => {
  it("extends the base component with new props", () => {
    const StyledSliderItemBase = rc.button`
      absolute
      top-0
      ${(p) => (p.$isActive ? "animate-in fade-in" : "animate-out fade-out")}
    `

    const NewStyledSliderItemWithNewProps = rc.extend(StyledSliderItemBase)`
      rounded-lg
      text-lg
      ${(p) => (p.$isActive ? "bg-blue" : "bg-red")}
      ${(p) => (p.$secondBool ? "text-underline" : "some-class-here")}
    `

    const { container } = render(<NewStyledSliderItemWithNewProps $isActive={false} $secondBool />)
    expect(container.firstChild).toHaveClass(
      "absolute top-0 animate-out fade-out rounded-lg text-lg bg-red text-underline",
    )
    expect(container.firstChild).not.toHaveAttribute("$isActive")
    expect(container.firstChild).toBeInstanceOf(HTMLButtonElement)
  })
})
