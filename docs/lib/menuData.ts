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
      {
        label: "Base",
        href: internalLink.docs.basic,
        icon: BrickWall,
      },
      {
        label: "Extend",
        href: internalLink.docs.extend,
        icon: Blocks,
      },
      {
        label: "Variants",
        href: internalLink.docs.variants,
        icon: SwatchBook,
      },
    ],
  },
  {
    title: "Utils",
    items: [
      {
        label: "Interpolation",
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
      {
        label: "Typescript",
        icon: Siren,
        subItems: [
          {
            label: "RcBaseComponent",
            href: internalLink.typescript.rcBaseComponent,
            hightlightCode: ["RcBaseComponent"],
          },
          {
            label: "VariantsConfig",
            href: internalLink.typescript.variantsConfig,
            hightlightCode: ["VariantsConfig"],
          },
        ],
      },
      {
        label: "Interaction",
        icon: SwatchBook,
        subItems: [
          {
            label: "convertRcProps()",
            href: internalLink.util.convertRcProps,
            hightlightCode: ["convertRcProps()"],
          },
        ],
      },
    ],
  },
  // {
  //   title: "Examples",
  //   items: [
  //     {
  //       label: "Avanced Button",
  //       href: internalLink.example.advancedButton,
  //     },
  //   ],
  // },
]
