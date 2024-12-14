import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts"; // Only if bundling .d.ts files

export default [
  // Existing JS bundling
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ declaration: false, declarationDir: null }),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/v1/index.ts",
    output: {
      file: "dist/v1/index.js",
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ declaration: false, declarationDir: null }),
    ],
    external: ["react", "react-dom"],
  },
  // Type declaration bundling
  {
    input: "dist/index.d.ts",
    output: {
      file: "dist/index.d.ts",
      format: "esm",
    },
    plugins: [dts()],
  },
  {
    input: "dist/v1/index.d.ts",
    output: {
      file: "dist/v1/index.d.ts",
      format: "esm",
    },
    plugins: [dts()],
  },
];
