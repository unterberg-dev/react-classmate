import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import babel from "@rollup/plugin-babel";
import { minify } from "rollup-plugin-esbuild-minify";

export default [
  // ESM and CJS Builds
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "esm",
        sourcemap: true,
      },
      {
        file: "dist/index.cjs.js",
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
      minify(),
    ],
    external: ["react", "react-dom"],
  },
  // TypeScript Declarations
  {
    input: "dist/index.d.ts",
    output: {
      file: "dist/index.d.ts",
      format: "esm",
    },
    plugins: [dts()],
  },
];
