import { useMemo } from "react"
import rc from "react-classmate"

type DayStatus = "completed" | "partlyCompleted" | "skipped" | "partlySkipped" | "pending" | "none"

// You can additionally type the variant props for strict type checking
interface StyledDayVariants {
  $status: DayStatus
}

const workouts = []
const allResolved = false
const hasCompleted = false
const hasSkipped = false

const TestComponentWithClassmateInside = () => {
  const status = useMemo<DayStatus>(() => {
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
  }, [])

  const StyledDay = rc.div.variants<StyledDayVariants>({
    base: "min-h-28 rounded-md border p-2 flex flex-col gap-2 text-xs",
    variants: {
      $status: {
        completed: "border-primary/70 bg-primary/10 hover:bg-primary/15",
        partlyCompleted: "border-primary/50 bg-primary/5 hover:bg-primary/10",
        skipped: "border-warning/70 bg-warning/10 hover:bg-warning/15",
        partlySkipped: "border-warning/50 bg-warning/5 hover:bg-warning/10",
        pending: "border-shade/70 bg-shade/15 hover:bg-shade/30",
        none: "border-shade/30 bg-base-200 hover:bg-base-300",
      },
    },
    defaultVariants: {
      $status: "none",
    },
  })

  return <StyledDay $status={status}>This will cause a TypeScript error</StyledDay>
}

export default TestComponentWithClassmateInside
