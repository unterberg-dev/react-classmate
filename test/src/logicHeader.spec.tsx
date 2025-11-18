import "@testing-library/jest-dom"
import { render, screen } from "@solidjs/testing-library"

import sc from "../../dist"

type DayStatus = "completed" | "partlyCompleted" | "skipped" | "partlySkipped" | "pending" | "none"

interface WorkoutProps {
  workouts: unknown[]
  allResolved: boolean
  hasCompleted: boolean
  hasSkipped: boolean
  label: string
  $status?: DayStatus
}

const deriveDayStatus = ({ workouts, allResolved, hasCompleted, hasSkipped }: WorkoutProps): DayStatus => {
  if (workouts.length === 0) return "none"
  if (allResolved) {
    if (hasCompleted && !hasSkipped) return "completed"
    if (hasSkipped && !hasCompleted) return "skipped"
    if (hasCompleted && hasSkipped) return "partlyCompleted"
  } else {
    if (hasCompleted) return "partlyCompleted"
    if (hasSkipped) return "partlySkipped"
  }
  return "pending"
}

describe("logic header concept", () => {
  it("allows colocating derived status logic inside a classmate component", () => {
    const StyledDay = sc.div.logic<WorkoutProps>((props) => {
      const status = deriveDayStatus(props)
      return {
        $status: status,
        "data-status": status,
      }
    })<WorkoutProps>`
        ${(p) => (p.$status === "completed" ? "text-green-600" : "text-gray-600")}
        ${(p) => (p.$status === "skipped" ? "opacity-40" : "opacity-100")}
      `

    render(() => (
      <StyledDay
        data-testid="day"
        workouts={[{ id: 1 }]}
        allResolved
        hasCompleted
        hasSkipped={false}
        label="Monday"
      >
        Monday
      </StyledDay>
    ))

    const day = screen.getByTestId("day")
    expect(day).toHaveAttribute("data-status", "completed")
    expect(day).toHaveClass("text-green-600 opacity-100")
  })

  it("feeds derived props into variants automatically", () => {
    const WorkoutDayWithVariants = sc.div
      .logic<WorkoutProps>((props) => {
        const status = deriveDayStatus(props)
        return { $status: status }
      })
      .variants<WorkoutProps, { $status: DayStatus }>({
        base: "rounded border p-2",
        variants: {
          $status: {
            completed: "border-green-400 bg-green-50",
            skipped: "border-red-400 bg-red-50",
            pending: "border-gray-300 bg-gray-50",
            none: "border-gray-200 bg-white",
          },
        },
        defaultVariants: {
          $status: "none",
        },
      })

    render(() => (
      <WorkoutDayWithVariants
        data-testid="day"
        workouts={[{ id: 1 }]}
        allResolved
        hasCompleted
        hasSkipped={false}
        label="Monday"
      >
        Monday
      </WorkoutDayWithVariants>
    ))

    const day = screen.getByTestId("day")
    expect(day).toHaveClass("border-green-400 bg-green-50")
  })
})
