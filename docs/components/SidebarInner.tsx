import { Blocks, BrickWall, Power, Siren, SwatchBook, TextCursorInput } from "lucide-react"
import type { ReactNode } from "react"
import rc from "react-classmate"
import CodeElement from "#components/common/Code"
import H4Headline from "#components/common/H4Headline"
import LinkComponent from "#components/common/LinkComponent"

const Headline = rc.extend(H4Headline)`
  mb-5 
  text-grayDark
`

const List = rc.ul`
  mb-2 
  flex 
  flex-col 
  gap-0.5
`

const SubList = rc.ul`
  ml-6 
  mt-2 
  flex-col
  flex
  gap-1
  mb-3
`

const Section = rc.div``

const FlexLinkBase = rc.extend(LinkComponent)`
  flex 
  items-center
  gap-x-2
`

const FlexLink = ({ ...props }: { children: ReactNode; href: string }) => (
  <li>
    <FlexLinkBase isMenu {...props} />
  </li>
)

const SidebarInner = () => (
  <>
    <Section>
      <Headline>Get started</Headline>
      <List>
        <FlexLink href="/docs/get-started">
          <Power className="w-4 h-4" />
          Getting Started
        </FlexLink>
        <FlexLink href="/docs/basic">
          <BrickWall className="w-4 h-4" />
          Base
        </FlexLink>
        <FlexLink href="/docs/extend">
          <Blocks className="w-4 h-4" />
          Extend
        </FlexLink>
        <FlexLink href="/docs/variants">
          <SwatchBook className="w-4 h-4" />
          Variants
        </FlexLink>
      </List>
    </Section>
    <Section>
      <Headline>Utils</Headline>
      <List>
        <li>
          <span className="flex items-center gap-x-2 font-bold">
            <TextCursorInput className="w-4 h-4" />
            Interpolation
          </span>
          <SubList>
            <FlexLink href="/docs/interpolation/style">
              CSS-in-JS: <CodeElement $color="text">style()</CodeElement>
            </FlexLink>
          </SubList>
        </li>
        <li>
          <span className="flex items-center gap-x-2 font-bold">
            <Siren className="w-4 h-4" />
            Typescript
          </span>
          <SubList>
            <FlexLink href="/docs/utils/typescript#rcbasecomponent">
              <CodeElement $color="text">RcBaseComponent</CodeElement>
            </FlexLink>
            <FlexLink href="/docs/utils/typescript#variantsconfig">
              <CodeElement $color="text">VariantsConfig</CodeElement>
            </FlexLink>
          </SubList>
        </li>
        <li>
          <span className="flex items-center gap-x-2 font-bold">
            <SwatchBook className="w-4 h-4" />
            Interaction
          </span>
          <SubList>
            <FlexLink href="/docs/utils/convertrcprops">
              <CodeElement $color="text">convertRcProps()</CodeElement>
            </FlexLink>
          </SubList>
        </li>
      </List>
    </Section>
    <Section>
      <Headline>Examples</Headline>
      <List>
        <FlexLink href="/docs/examples/advanced-button">Avanced Button</FlexLink>
        {/* <FlexLink href="/docs/examples/link">Link Component</FlexLink>
  <FlexLink href="/docs/examples/input">Input</FlexLink> */}
      </List>
    </Section>
  </>
)

export default SidebarInner
