import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  minify: true,
  sourcemap: false,
  splitting: false,
  target: "es2018",
  external: ["react", "tailwind-merge"],
  outDir: "dist",
  tsconfig: "./tsconfig.json",
  outExtension({ format }) {
    return { js: format === "cjs" ? ".cjs.js" : ".js" }
  },
  esbuildOptions(options, context) {
    options.charset = "utf8"
    if (!options.footer) {
      options.footer = {}
    }
    if (context.format === "cjs") {
      options.footer.js =
        "module.exports = Object.assign(module.exports.default || module.exports, module.exports);"
    }
  },
})
