// @todo: move to /scripts dir

import { execSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const typesDir = path.resolve(__dirname, "dist/types")
const localPackageDir = path.resolve(__dirname, ".localPack")

const cleanTypesDir = () => {
  if (fs.existsSync(typesDir)) {
    fs.rmSync(typesDir, { recursive: true, force: true })
    console.log("Removed dist/types folder.")
  }
}

cleanTypesDir()

/**
 * mostly used to locally "install" a clone of the npm package
 * `"react-classmate": "file:{relativePathToLibrary}/.localPack"`,
 */
const testBuild = () => {
  if (fs.existsSync(localPackageDir)) {
    fs.rmSync(localPackageDir, { recursive: true, force: true })
  }
  fs.mkdirSync(localPackageDir, { recursive: true })

  try {
    console.log("Creating npm package...")
    const packResult = execSync("npm pack", { stdio: "pipe" }).toString().trim()
    const tarballName = path.basename(packResult)
    const tarballPath = path.resolve(__dirname, tarballName)

    console.log(`Extracting ${tarballName} to ${localPackageDir}...`)
    execSync(`tar -xzf ${tarballPath} -C ${localPackageDir}`)
    fs.unlinkSync(tarballPath)

    // Move contents of "package" folder up one level
    const packageDir = path.resolve(localPackageDir, "package")
    if (fs.existsSync(packageDir)) {
      const files = fs.readdirSync(packageDir)
      for (const file of files) {
        const fromPath = path.join(packageDir, file)
        const toPath = path.join(localPackageDir, file)
        fs.renameSync(fromPath, toPath)
      }
      fs.rmdirSync(packageDir)
    }

    console.log(`Package extracted to ${localPackageDir}`)
  } catch (error) {
    console.error("Error during packing:", error)
    process.exit(1)
  }
}

if (process.env.MODE === "packLocal") {
  testBuild()
}
