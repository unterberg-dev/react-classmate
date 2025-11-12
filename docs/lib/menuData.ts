import { Blocks, BrickWall, Siren, Sparkles, SwatchBook, TextCursorInput } from "lucide-react"
import { internalLink } from "#lib/links"

interface MenuItem {
  label: string
  href?: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  onClick?: () => void
  subItems?: MenuItem[]
  hightlightCode?: string[]
}

export interface MenuSection {
  title: string
  items: MenuItem[]
}

// Example usage: convert your JSX menu into a structured TS object
export const menuData: MenuSection[] = [
  {
    title: "Get started",
    items: [
      {
        label: "Getting Started",
        href: internalLink.docs.getStarted,
        icon: Sparkles,
      },
    ],
  },
  {
    title: "Builder",
    items: [
      {
        label: "Base",
        href: internalLink.docs.basic,
        icon: BrickWall,
      },
      {
        label: "Variants",
        href: internalLink.docs.variants,
        icon: SwatchBook,
      },
      {
        label: "Extend",
        href: internalLink.docs.extend,
        icon: Blocks,
      },
      {
        label: "useClassmate",
        href: internalLink.docs.useClassmate,
        icon: Sparkles,
      },
      {
        label: ".logic()",
        href: internalLink.docs.logic,
        icon: Siren,
      },
    ],
  },
  {
    title: "Utils",
    items: [
      {
        label: "Interpolation / Literals",
        icon: TextCursorInput,
        // subItems for nested links
        subItems: [
          {
            label: "CSS-in-JS: style()",
            href: internalLink.util.style,
            hightlightCode: ["style()"],
          },
        ],
      },
      //     {
      //       label: "Typescript",
      //       icon: Siren,
      //       subItems: [
      //         {
      //           label: "RcBaseComponent",
      //           href: internalLink.typescript.rcBaseComponent,
      //           hightlightCode: ["RcBaseComponent"],
      //         },
      //         {
      //           label: "VariantsConfig",
      //           href: internalLink.typescript.variantsConfig,
      //           hightlightCode: ["VariantsConfig"],
      //         },
      //       ],
      //     },
      //     {
      //       label: "Helper",
      //       icon: SwatchBook,
      //       subItems: [
      //         {
      //           label: "convertRcProps()",
      //           href: internalLink.util.convertRcProps,
      //           hightlightCode: ["convertRcProps()"],
      //         },
      //         {
      //           label: "createVariantMap()",
      //           href: internalLink.util.createVariantMap,
      //           hightlightCode: ["createVariantMap()"],
      //         },
      //       ],
      //     },
    ],
  },
  {
    title: "Examples",
    items: [
      {
        label: "Variants",
        icon: SwatchBook,
        subItems: [
          {
            label: "Headline (h1, h2, ..)",
            href: internalLink.example.headline,
            hightlightCode: ["h1", "h2"],
          },
          {
            label: "Button (a, button)",
            href: internalLink.example.button,
            hightlightCode: ["a", "button"],
          },
        ],
      },
    ],
  },
]
