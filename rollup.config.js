import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import dts from "rollup-plugin-dts"
import { minify } from "rollup-plugin-esbuild-minify"

// node <= v21 experimental: https://github.com/tc39/proposal-import-attributes
import packageJson from "./package.json" with { type: "json" }

const pkg = packageJson

const globals = {
  react: "React",
}

const babelOptions = {
  babelHelpers: "bundled",
  extensions: [".ts", ".tsx"],
  exclude: /node_modules/,
}

const resolveConfig = {
  extensions: [".ts", ".tsx"],
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
      // CommonJS
      {
        file: pkg.main,
        format: "cjs",
        exports: "named",
      },
      // ES module
      {
        file: pkg.module,
        format: "esm",
        exports: "named",
      },
    ],
    plugins: [
      resolve(resolveConfig),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      babel(babelOptions),
      minify(),
    ],
  },
  {
    input: "./dist/types/index.d.ts",
    output: [{ file: pkg.types, format: "esm" }],
    plugins: [dts()],
  },
]
