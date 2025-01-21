import fs from "node:fs"
import path from "node:path"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import Beasties from "beasties"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function findHtmlFiles(dir: string, htmlFiles: string[] = []): Promise<string[]> {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await findHtmlFiles(fullPath, htmlFiles)
    } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === ".html") {
      htmlFiles.push(fullPath)
    }
  }
  return htmlFiles
}

const targetDir = path.resolve(__dirname, "../dist/client")

async function criticalCss() {
  try {
    const htmlFiles = await findHtmlFiles(targetDir)
    if (htmlFiles.length === 0) {
      console.log("No HTML files found.")
    } else {
      const beasties = new Beasties({
        path: targetDir,
      })

      for (const file of htmlFiles) {
        const fileContent = await fs.promises.readFile(file, "utf-8")
        const inlined = await beasties.process(fileContent)
        await fs.promises.writeFile(file, inlined)
      }
    }
  } catch (error) {
    console.error("Error while searching for HTML files:", error)
  }
}

// Execute the postBuild function
// criticalCss()
