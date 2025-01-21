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
        reduceInlineStyles: false,
        preload: "body",
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

// New function to empty duplicate Uno CSS files
async function emptyDuplicateUnoCss() {
  try {
    const htmlFiles = await findHtmlFiles(targetDir)
    if (htmlFiles.length === 0) {
      console.log("No HTML files found for duplicate Uno CSS processing.")
      return
    }

    // To keep track of which CSS files have been emptied to avoid redundant operations
    const emptiedCssFiles = new Set<string>()

    for (const file of htmlFiles) {
      const fileContent = await fs.promises.readFile(file, "utf-8")

      // Regular expression to match <link> tags with href starting with "/assets/static/uno-" and ending with ".css"
      const unoLinkRegex = /<link\s+[^>]*href="(\/assets\/static\/uno-[^"]+\.css)"[^>]*>/g

      const matches = [...fileContent.matchAll(unoLinkRegex)]

      if (matches.length > 1) {
        console.log(`Duplicate Uno CSS links found in ${file}, processing duplicates...`)

        // Keep the first occurrence and process the rest
        const duplicateMatches = matches.slice(1)

        for (const match of duplicateMatches) {
          const unoHref = match[1] // Extracted href value

          // Resolve the CSS file path
          // Remove the leading '/' to correctly join with targetDir
          const relativeCssPath = unoHref.startsWith("/") ? unoHref.slice(1) : unoHref
          const cssFilePath = path.join(targetDir, relativeCssPath)

          if (!emptiedCssFiles.has(cssFilePath)) {
            try {
              // Check if the CSS file exists
              await fs.promises.access(cssFilePath, fs.constants.F_OK)

              // Empty the CSS file by truncating its content
              await fs.promises.truncate(cssFilePath, 0)
              console.log(`Emptied duplicate CSS file: ${cssFilePath}`)

              // Mark this CSS file as emptied
              emptiedCssFiles.add(cssFilePath)
            } catch (cssError) {
              console.error(`Error processing CSS file ${cssFilePath}:`, cssError)
            }
          } else {
            console.log(`CSS file already emptied: ${cssFilePath}`)
          }
        }
      }
    }
  } catch (error) {
    console.error("Error while emptying duplicate Uno CSS files:", error)
  }
}

// Main postBuild function to execute all post-build tasks sequentially
async function postBuild() {
  await emptyDuplicateUnoCss()
  await criticalCss()
}

// Execute the postBuild function
postBuild()
