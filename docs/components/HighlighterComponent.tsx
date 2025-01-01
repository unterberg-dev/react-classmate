import { Copy } from "lucide-react"
import { useCallback } from "react"
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter"
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"
import Button from "#components/common/Button"
import useThemeStore from "#hooks/useThemeStore"

SyntaxHighlighter.registerLanguage("tsx", tsx)

const CopyToClipboard = ({ handleCopy }: { handleCopy: () => void }) => {
  return (
    <div className="absolute top-2 right-2">
      <Button
        size="xs"
        color="card"
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

const HighlighterComponent = ({ input }: { input: string }) => {
  const { theme } = useThemeStore()

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(input)
  }, [input])

  return (
    <div className="highlighter bg-lightBorder relative mt-3 !min-w-none w-[100%]">
      <CopyToClipboard handleCopy={handleCopy} />
      <SyntaxHighlighter
        customStyle={{
          padding: 16,
          margin: 0,
          fontSize: 14,
          minWidth: "none",
          overflow: "auto",
        }}
        language="tsx"
        style={theme === "dark" ? oneDark : oneLight}
      >
        {input}
      </SyntaxHighlighter>
    </div>
  )
}

export default HighlighterComponent
