import { Copy } from "lucide-react"
import { useCallback } from "react"
import rc from "react-classmate"

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash"
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"

import Button from "#components/common/Button"
import useThemeStore from "#hooks/useThemeStore"

SyntaxHighlighter.registerLanguage("tsx", tsx)
SyntaxHighlighter.registerLanguage("bash", bash)

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
  ${(p) => (p.$noGutter ? "" : "mt-4")}
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
  const { theme } = useThemeStore()

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(input)
  }, [input])

  return (
    <Highlighter $noGutter={noGutter}>
      {!noCopy && <CopyToClipboard handleCopy={handleCopy} />}
      <SyntaxHighlighter
        customStyle={{
          padding: 16,
          margin: 0,
          fontSize: 14,
          maxHeight: 420,
          minWidth: "none",
          overflow: "auto",
        }}
        language={language}
        style={theme === "dark" ? oneDark : oneLight}
      >
        {input}
      </SyntaxHighlighter>
    </Highlighter>
  )
}

export default HighlighterComponent
