import babel from "@rollup/plugin-babel"
import typescript from "@rollup/plugin-typescript"
import dts from "rollup-plugin-dts"
import { minify } from "rollup-plugin-esbuild-minify"

// node <= v21 experimental: https://github.com/tc39/proposal-import-attributes
import packageJson from "./package.json" with { type: "json" }

const pkg = packageJson

const globals = {
  react: "React",
  "tailwind-merge": "tailwind-merge",
}

const babelOptions = {
  babelHelpers: "bundled",
  extensions: [".ts", ".tsx"],
  exclude: /node_modules/,
}

for (const key of Object.keys(pkg.peerDependencies || {})) {
  if (!(key in globals)) {
    throw new Error(`Missing peer dependency "${key}" in the globals map.`)
  }
}

export default [
  {
    input: "src/index.ts",
    external: Object.keys(globals),
    output: [
      {
        format: "cjs",
        file: pkg.main,
        exports: "named",
      },
      {
        format: "esm",
        file: pkg.module,
        exports: "named",
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      babel(babelOptions),
      minify(),
    ],
  },
  {
    input: "./dist/types/src/index.d.ts",
    output: [{ file: pkg.types, format: "esm" }],
    plugins: [dts()],
  },
]
