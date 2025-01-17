import { Copy } from "lucide-react"
import { useCallback } from "react"
import rc from "react-classmate"
import { clientOnly } from "vike-react/clientOnly"

import Button from "#components/common/Button"

const HighlighterClient = clientOnly(() => import("#components/HighlighterClient"))

const CopyToClipboard = ({ handleCopy }: { handleCopy: () => void }) => {
  return (
    <div className="absolute top-2 right-2">
      <Button
        size="xs"
        color="copy"
        type="button"
        onClick={() => {
          handleCopy()
        }}
      >
        <Copy size={16} />
        Copy
      </Button>
    </div>
  )
}

const Highlighter = rc.div<{ $noGutter: boolean }>`
  highlighter
  bg-lightBorder 
  relative 
  !min-w-none 
  w-[100%]
  rounded-md
  ${(p) => (p.$noGutter ? "" : "mb-4")}
`

interface HighlighterComponentProps {
  input: string
  language?: "tsx" | "bash"
  noGutter?: boolean
  noCopy?: boolean
}

const HighlighterComponent = ({
  input,
  language = "tsx",
  noGutter = false,
  noCopy = false,
}: HighlighterComponentProps) => {
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(input)
  }, [input])

  return (
    <Highlighter $noGutter={noGutter}>
      {!noCopy && <CopyToClipboard handleCopy={handleCopy} />}
      <HighlighterClient
        fallback={
          <div className="h-full w-full overflow-scroll p-4">
            <code className="w-full text-sm block leading-5 text-grayDark">
              <pre>{input}</pre>
            </code>
          </div>
        }
        input={input}
        language={language}
      />
    </Highlighter>
  )
}

export default HighlighterComponent
