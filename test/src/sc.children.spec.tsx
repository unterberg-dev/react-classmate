import "@testing-library/jest-dom"
import { render } from "@solidjs/testing-library"

import sc from "../../dist"

const LayoutComponent = sc.div.variants({
  base: "wrapper",
  variants: {
    $size: {
      sm: "small",
      md: "medium",
    },
  },
  defaultVariants: {
    $size: "md",
  },
})

describe("sc children handling", () => {
  it("renders array children generated from maps without losing nodes", () => {
    const pages = [1, 2, 3]

    const { container } = render(() => (
      <LayoutComponent data-testid="layout" $size="sm">
        {pages.map((page) => (
          <div class="page" data-page={page}>
            <h1>Page {page}</h1>
          </div>
        ))}
      </LayoutComponent>
    ))

    const layout = container.querySelector("[data-testid='layout']")
    expect(layout).toHaveClass("wrapper small")

    const renderedPages = container.querySelectorAll("[data-page]")
    expect(renderedPages).toHaveLength(pages.length)
    expect(container.querySelector("[data-page='2']")?.querySelector("h1")).toHaveTextContent("Page 2")
  })
})
