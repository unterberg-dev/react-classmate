import fs from "node:fs/promises"
import path from "node:path"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

import Beasties from "beasties"
import { JSDOM } from "jsdom"
import pLimit from "p-limit"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const CONFIG = {
  targetDir: path.resolve(__dirname, "../dist/client"),
  flagFileName: "postbuild.done",
  backgroundColor: "#171717",
  concurrency: 5,
}

const findHtmlFiles = async (dir, htmlFiles = []) => {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  const promises = entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await findHtmlFiles(fullPath, htmlFiles)
    } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === ".html") {
      htmlFiles.push(fullPath)
    }
  })

  await Promise.all(promises)
  return htmlFiles
}

const fileExists = async (filePath) => {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

const criticalCss = async (htmlFiles) => {
  if (htmlFiles.length === 0) {
    console.log("No HTML files found for critical CSS processing.")
    return
  }

  const beasties = new Beasties({
    path: CONFIG.targetDir,
    preload: "swap",
    pruneSource: true,
  })

  const limit = pLimit(CONFIG.concurrency)

  const tasks = htmlFiles.map((file) =>
    limit(async () => {
      try {
        const fileContent = await fs.readFile(file, "utf-8")
        const inlined = await beasties.process(fileContent)
        await fs.writeFile(file, inlined)
        console.log(`Processed critical CSS for: ${file}`)
      } catch (error) {
        console.error(`Error processing critical CSS for ${file}:`, error)
      }
    }),
  )

  await Promise.all(tasks)
}

const emptyDuplicateUnoCss = async (htmlFiles) => {
  if (htmlFiles.length === 0) {
    console.log("No HTML files found for duplicate Uno CSS processing.")
    return
  }

  const emptiedCssFiles = new Set()
  const unoLinkRegex = /<link\s+[^>]*href="(\/assets\/static\/uno-[^"]+\.css)"[^>]*>/g

  const limit = pLimit(CONFIG.concurrency)

  const tasks = htmlFiles.map((file) =>
    limit(async () => {
      try {
        const fileContent = await fs.readFile(file, "utf-8")
        const matches = [...fileContent.matchAll(unoLinkRegex)]

        if (matches.length > 1) {
          console.log(`Duplicate Uno CSS links found in ${file}, processing duplicates...`)

          const duplicateMatches = matches.slice(1)

          for (const match of duplicateMatches) {
            const unoHref = match[1]

            const relativeCssPath = unoHref.startsWith("/") ? unoHref.slice(1) : unoHref
            const cssFilePath = path.join(CONFIG.targetDir, relativeCssPath)

            if (!emptiedCssFiles.has(cssFilePath)) {
              if (await fileExists(cssFilePath)) {
                try {
                  await fs.writeFile(cssFilePath, "/* empty */")
                  console.log(`Emptied duplicate CSS file: ${cssFilePath}`)
                  emptiedCssFiles.add(cssFilePath)
                } catch (cssError) {
                  console.error(`Error emptying CSS file ${cssFilePath}:`, cssError)
                }
              } else {
                console.warn(`CSS file does not exist: ${cssFilePath}`)
              }
            } else {
              console.log(`CSS file already emptied: ${cssFilePath}`)
            }
          }
        }
      } catch (error) {
        console.error(`Error processing duplicate Uno CSS in ${file}:`, error)
      }
    }),
  )

  await Promise.all(tasks)
}

const addBackgroundToHtmlTag = async (htmlFiles) => {
  if (htmlFiles.length === 0) {
    console.log("No HTML files found for modifying <html> tag.")
    return
  }

  const limit = pLimit(CONFIG.concurrency)

  const tasks = htmlFiles.map((file) =>
    limit(async () => {
      try {
        const fileContent = await fs.readFile(file, "utf-8")
        const dom = new JSDOM(fileContent)
        const document = dom.window.document
        const htmlElement = document.documentElement

        if (htmlElement) {
          const existingStyle = htmlElement.getAttribute("style") || ""
          const newStyle = `background-color: ${CONFIG.backgroundColor}`

          const backgroundColorRegex = /background-color\s*:\s*[^;]+;?/

          if (backgroundColorRegex.test(existingStyle)) {
            const updatedStyle = existingStyle.replace(backgroundColorRegex, newStyle)
            htmlElement.setAttribute("style", updatedStyle)
            console.log(`Updated background-color in ${file}`)
          } else {
            const separator = existingStyle.endsWith(";") || existingStyle === "" ? "" : "; "
            const updatedStyle = `${existingStyle}${separator}${newStyle}`
            htmlElement.setAttribute("style", updatedStyle)
            console.log(`Added background-color to ${file}`)
          }

          const updatedContent = dom.serialize()
          await fs.writeFile(file, updatedContent)
        } else {
          console.warn(`No <html> tag found in ${file}. Skipping.`)
        }
      } catch (error) {
        console.error(`Error modifying <html> tag in ${file}:`, error)
      }
    }),
  )

  await Promise.all(tasks)
}

const hasPostBuildRun = async () => {
  const flagFilePath = path.join(CONFIG.targetDir, CONFIG.flagFileName)
  return await fileExists(flagFilePath)
}

const markPostBuildRun = async () => {
  const flagFilePath = path.join(CONFIG.targetDir, CONFIG.flagFileName)
  try {
    await fs.writeFile(flagFilePath, "Post-build tasks have been executed.", { flag: "w" })
    console.log(`Post-build flag file created at ${flagFilePath}`)
  } catch (error) {
    console.error("Error creating post-build flag file:", error)
  }
}

const postBuild = async () => {
  const alreadyRun = await hasPostBuildRun()
  if (alreadyRun) {
    console.log("Post-build tasks have already been executed. Skipping.")
    return
  }

  console.log("Starting post-build tasks...")

  try {
    const htmlFiles = await findHtmlFiles(CONFIG.targetDir)

    await emptyDuplicateUnoCss(htmlFiles)
    await criticalCss(htmlFiles)
    // await addBackgroundToHtmlTag(htmlFiles)

    await markPostBuildRun()

    console.log("Post-build tasks completed successfully.")
  } catch (error) {
    console.error("Error during post-build tasks:", error)
  }
}

postBuild()
