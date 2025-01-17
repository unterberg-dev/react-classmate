import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash"
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"

import useThemeStore from "#hooks/useThemeStore"

SyntaxHighlighter.registerLanguage("tsx", tsx)
SyntaxHighlighter.registerLanguage("bash", bash)

interface HighlighterClientProps {
  input: string
  language?: "tsx" | "bash"
}

const HighlighterClient = ({ input, language }: HighlighterClientProps) => {
  const { theme } = useThemeStore()

  return (
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
  )
}

export default HighlighterClient
