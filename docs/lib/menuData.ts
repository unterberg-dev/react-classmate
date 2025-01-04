import { Blocks, BrickWall, Power, Siren, SwatchBook, TextCursorInput } from "lucide-react"

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
        href: "/docs/get-started",
        icon: Power,
      },
      {
        label: "Base",
        href: "/docs/basic",
        icon: BrickWall,
      },
      {
        label: "Extend",
        href: "/docs/extend",
        icon: Blocks,
      },
      {
        label: "Variants",
        href: "/docs/variants",
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
            href: "/docs/interpolation/style",
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
            href: "/docs/utils/typescript#rcbasecomponent",
            hightlightCode: ["RcBaseComponent"],
          },
          {
            label: "VariantsConfig",
            href: "/docs/utils/typescript#variantsconfig",
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
            href: "/docs/utils/convertrcprops",
            hightlightCode: ["convertRcProps()"],
          },
        ],
      },
    ],
  },
  {
    title: "Examples",
    items: [
      {
        label: "Avanced Button",
        href: "/docs/examples/advanced-button",
      },
      // You can include more items here if needed
    ],
  },
]
