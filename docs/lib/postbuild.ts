import fs from "node:fs"
import path from "node:path"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import Beasties from "beasties"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Function to recursively find all HTML files in a directory
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

// Existing criticalCss function
async function criticalCss() {
  try {
    const htmlFiles = await findHtmlFiles(targetDir)
    if (htmlFiles.length === 0) {
      console.log("No HTML files found.")
    } else {
      const beasties = new Beasties({
        path: targetDir,
        pruneSource: true,
        reduceInlineStyles: false,
        preload: "body",
        logLevel: "trace",
      })

      for (const file of htmlFiles) {
        const fileContent = await fs.promises.readFile(file, "utf-8")
        const inlined = await beasties.process(fileContent)
        await fs.promises.writeFile(file, inlined)
      }
    }
  } catch (error) {
    console.error("Error while processing critical CSS:", error)
  }
}

// New function to remove duplicate Uno CSS links
async function removeDuplicateUnoCss() {
  try {
    const htmlFiles = await findHtmlFiles(targetDir)
    if (htmlFiles.length === 0) {
      console.log("No HTML files found for duplicate Uno CSS removal.")
      return
    }

    for (const file of htmlFiles) {
      let fileContent = await fs.promises.readFile(file, "utf-8")
      const unoLinkRegex = /<link\s+[^>]*href="(\/assets\/static\/uno-[^"]+\.css)"[^>]*>/g

      const matches = [...fileContent.matchAll(unoLinkRegex)]

      if (matches.length > 1) {
        console.log(`Duplicate Uno CSS links found in ${file}, removing duplicates...`)

        const linksToRemove = matches.slice(1)

        for (const match of linksToRemove) {
          const linkTag = match[0]
          fileContent = fileContent.replace(linkTag, "")
        }

        fileContent = fileContent.replace(/\n\s*\n/g, "\n")

        await fs.promises.writeFile(file, fileContent)
        console.log(`Duplicates removed from ${file}`)
      }
    }
  } catch (error) {
    console.error("Error while removing duplicate Uno CSS links:", error)
  }
}

// Main postBuild function to execute all post-build tasks sequentially
async function postBuild() {
  // await removeDuplicateUnoCss()
  await criticalCss()
}

// Execute the postBuild function
postBuild()
