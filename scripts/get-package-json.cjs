const path = require("node:path")

function getPackageJson() {
  const modulePath = path.resolve("./")
  return require(path.join(modulePath, "package.json"))
}

module.exports = { getPackageJson }
