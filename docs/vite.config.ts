import path from "node:path"
import react from "@vitejs/plugin-react"
import UnoCSS from "unocss/vite"
import vike from "vike/plugin"
import { defineConfig } from "vite"
import rawPlugin from "vite-raw-plugin"

export default defineConfig({
  base: "/react-classmate/",
  plugins: [
    vike({
      prerender: true,
      trailingSlash: true,
    }),
    rawPlugin({
      fileRegex: /\.rcx$/,
    }),
    UnoCSS(),
    react({}),
  ],
  ssr: {
    noExternal: ["react-syntax-highlighter"],
  },
  build: {
    cssMinify: "esbuild",
    minify: true,
  },
  optimizeDeps: {
    include: ["react/jsx-runtime", "react", "react-dom"],
  },
  resolve: {
    alias: {
      "#examples": path.resolve(__dirname, "./pages/docs/examples"),
      "#docs": path.resolve(__dirname, "./pages/docs/"),
      "#hooks": path.resolve(__dirname, "./lib/hooks/"),
      "#zustand": path.resolve(__dirname, "./lib/zustand/"),
      "#lib": path.resolve(__dirname, "./lib/"),
      "#pages": path.resolve(__dirname, "./pages/"),
      "#layout": path.resolve(__dirname, "./layout/"),
      "#components": path.resolve(__dirname, "./components/"),
      "#root": __dirname,
    },
  },
})
