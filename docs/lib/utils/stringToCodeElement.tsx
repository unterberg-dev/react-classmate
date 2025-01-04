import CodeElement from "#components/common/Code"

/**
 * Takes a label (string) and an array of code snippet substrings (string[]).
 * Returns a ReactNode array with all occurrences of each snippet
 * replaced by <CodeElement>{snippet}</CodeElement>.
 */
const stringToCodeElement = (label: string, code?: string[]): React.ReactNode[] => {
  if (!code) return [label]

  let parts: React.ReactNode[] = [label]

  for (const snippet of code) {
    const newParts: React.ReactNode[] = []

    for (const part of parts) {
      if (typeof part === "string") {
        const splitted = part.split(snippet)

        splitted.forEach((segment, idx) => {
          newParts.push(segment)
          if (idx < splitted.length - 1) {
            newParts.push(<CodeElement key={`${snippet}-${segment}`}>{snippet}</CodeElement>)
          }
        })
      } else {
        newParts.push(part)
      }
    }
    parts = newParts
  }
  return parts
}

export default stringToCodeElement
