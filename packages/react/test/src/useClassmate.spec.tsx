import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import React, { useEffect } from "react"
import type { ComponentType } from "react"

import cm, { useClassmate } from "../../dist"

describe("useClassmate", () => {
  it("returns a stable component reference when dependencies do not change", () => {
    const references: ComponentType[] = []

    const RenderComponent = ({ rerenderKey }: { rerenderKey: number }) => {
      const StyledDay = useClassmate(
        () =>
          cm.div.variants({
            base: "p-2",
            variants: {
              $status: {
                completed: "text-green-600",
                pending: "text-gray-600",
              },
            },
            defaultVariants: {
              $status: "pending",
            },
          }),
        [],
      )

      useEffect(() => {
        references.push(StyledDay)
      })

      return (
        <StyledDay data-testid="styled-day" $status={rerenderKey % 2 === 0 ? "pending" : "completed"}>
          Test
        </StyledDay>
      )
    }

    const { rerender } = render(<RenderComponent rerenderKey={0} />)
    rerender(<RenderComponent rerenderKey={1} />)

    expect(references).toHaveLength(2)
    expect(references[0]).toBe(references[1])
  })

  it("recreates the component when dependency array changes", () => {
    const references: ComponentType[] = []

    const RenderComponent = ({ tone }: { tone: "primary" | "secondary" }) => {
      const StyledCard = useClassmate(
        () =>
          cm.div`
            p-4 border
            ${tone === "primary" ? "bg-blue-100 border-blue-200" : "bg-slate-100 border-slate-200"}
          `,
        [tone],
      )

      useEffect(() => {
        references.push(StyledCard)
      })

      return (
        <StyledCard data-testid="styled-card">
          {tone === "primary" ? "Primary card" : "Secondary card"}
        </StyledCard>
      )
    }

    const { rerender } = render(<RenderComponent tone="primary" />)
    rerender(<RenderComponent tone="secondary" />)

    expect(references).toHaveLength(2)
    expect(references[0]).not.toBe(references[1])
  })
})
