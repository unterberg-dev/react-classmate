import { transformSync } from "@babel/core"
import type { Plugin } from "vite"

type TaggedTemplateExpressionPath = babel.NodePath<babel.types.TaggedTemplateExpression>
type TaggedTemplateProperty = babel.NodePath<babel.types.Property>

/**
 * Flatten any multi-line string by:
 * - Converting newlines to spaces
 * - Collapsing multiple spaces
 * - Trimming?
 */
const flattenString = (text: string): string => text.replace(/[\n\r]+/g, " ").replace(/\s+/g, " ")

/**
 * ALPHA!
 * does not work with custom variant configs
 * see variants config in: pages/docs/examples/button/
 *
 * Our Babel plugin that:
 * 1. Flattens tagged template expressions for certain `handles` (e.g. `rc.div``...``).
 * 2. Flattens an object property named "base" if it's a multiline string literal.
 */
const babelPluginFlattenLiterals = (handles: string[]) => ({
  name: "babel-plugin-flatten-literals",
  visitor: {
    // Flatten Tagged Template Expressions for e.g. rc.div`...`
    TaggedTemplateExpression(path: TaggedTemplateExpressionPath) {
      let matched = false
      const tag = path.node.tag
      if (!tag) return

      //  a) identifier`...` (e.g. styled`...`)
      if (tag.type === "Identifier" && handles.includes(tag.name)) {
        matched = true
      }
      //  b) object.member`...` (e.g. rc.div`...`)
      else if (tag.type === "MemberExpression") {
        const obj = tag.object
        if (obj?.type === "Identifier" && handles.includes(obj.name)) {
          matched = true
        }
      }
      //  c) object.member(...)\`...\` (e.g. rc.extend(...)`...`)
      else if (tag.type === "CallExpression") {
        const callee = tag.callee
        if (
          callee?.type === "MemberExpression" &&
          callee.object?.type === "Identifier" &&
          handles.includes(callee.object.name) &&
          callee.property?.type === "Identifier" &&
          callee.property.name === "extend"
        ) {
          matched = true
        }
      }

      if (!matched) return

      // Flatten the template's quasis
      const templateLiteral = path.node.quasi
      if (!templateLiteral?.quasis) return

      let changed = false

      for (const quasi of templateLiteral.quasis) {
        const rawOrig = quasi.value.raw
        const cookedOrig = quasi.value.cooked

        // Flatten raw
        const flattenedRaw = flattenString(rawOrig)
        quasi.value.raw = flattenedRaw

        // Flatten cooked
        if (cookedOrig) {
          quasi.value.cooked = flattenString(cookedOrig)
        }

        if (rawOrig !== quasi.value.raw || cookedOrig !== quasi.value.cooked) {
          changed = true
        }
      }

      if (changed) {
        path.setData("flattened", true)
      }
    },

    /**
     * 2) Flatten object property named "base" if it's a multi-line string literal
     */
    Property(path: TaggedTemplateProperty) {
      if (path.node.key.type !== "Identifier") return
      if (path.node.key.name !== "base") return

      const valueNode = path.node.value
      // "base: 'some string'"
      if (valueNode?.type === "StringLiteral") {
        const originalValue = valueNode.value
        const flattened = flattenString(originalValue)
        if (flattened !== originalValue) {
          valueNode.value = flattened
          path.setData("flattened", true)
        }
      }
      // "base: `some multiline`"
      else if (valueNode?.type === "TemplateLiteral") {
        let changed = false
        for (const quasi of valueNode.quasis) {
          const rawOrig = quasi.value.raw
          const cookedOrig = quasi.value.cooked
          quasi.value.raw = flattenString(rawOrig)

          if (cookedOrig) {
            let flattenedCooked = flattenString(cookedOrig)
            if (flattenedCooked.length > 0 && !flattenedCooked.endsWith(" ")) {
              flattenedCooked += " "
            }
            quasi.value.cooked = flattenedCooked
          }
          if (rawOrig !== quasi.value.raw || cookedOrig !== quasi.value.cooked) {
            changed = true
          }
        }
        if (changed) {
          path.setData("flattened", true)
        }
      }
    },
  },
})

export interface ViteFlattenMultiHandlePluginOptions {
  handles: string[]
}

/**
 * Vite plugin that:
 * - Flattens multiline tagged template literals for the given `handles`
 *   (e.g. rc.div`...`),
 * - Also flattens strings in an object property named "base".
 */
const viteFlattenMultiHandlePlugin = (options: ViteFlattenMultiHandlePluginOptions): Plugin => {
  const { handles } = options
  if (!handles?.length) {
    throw new Error("[vite-flatten-plugin] 'handles' array cannot be empty.")
  }

  let globalReplacedCount = 0

  return {
    name: "vite-flatten-multi-handle-plugin",
    enforce: "pre",

    transform(code, id) {
      if (id.includes("node_modules")) return null
      if (!/\.[cm]?(js|ts)x?$/.test(id)) return null

      let replacedCount = 0

      const result = transformSync(code, {
        filename: id,
        plugins: [
          () => {
            const pluginObj = babelPluginFlattenLiterals(handles)
            return {
              ...pluginObj,
              visitor: {
                ...pluginObj.visitor,

                TaggedTemplateExpression(path: TaggedTemplateExpressionPath) {
                  pluginObj.visitor.TaggedTemplateExpression.call(this, path)
                  if (path.getData("flattened")) {
                    replacedCount++
                  }
                },
                Property(path: TaggedTemplateProperty) {
                  pluginObj.visitor.Property.call(this, path)
                  if (path.getData("flattened")) {
                    replacedCount++
                  }
                },
              },
            }
          },
        ],
        parserOpts: {
          sourceType: "module",
          plugins: ["typescript", "jsx"],
        },
        babelrc: false,
        configFile: false,
      })

      if (replacedCount > 0) {
        globalReplacedCount += replacedCount
      }
      if (result?.code) {
        return { code: result.code, map: null }
      }
      return null
    },

    closeBundle() {
      if (globalReplacedCount > 0) {
        console.log(`[Vite FlattenPlugin] Flattened ${globalReplacedCount} multiline template(s) total.`)
      }
    },
  }
}

export default viteFlattenMultiHandlePlugin
