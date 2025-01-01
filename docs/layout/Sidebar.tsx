import rc from "react-classmate"

import { Blocks, BrickWall, Power, Siren, SwatchBook } from "lucide-react"
import H4Headline from "#components/common/H4Headline"
import LinkComponent from "#components/common/LinkComponent"
import { APP_CONFIG } from "#lib/config"

const SidebarWrap = rc.nav`
  absolute lg:relative p-0
  left-[100%] lg:left-0
`

const SidebarSticky = rc.div`
  sticky
  top-24
  flex 
  flex-col 
  gap-5
`

const Headline = rc.extend(H4Headline)`mb-5 text-grayDark`

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
`

const Section = rc.div``

const FlexLink = rc.extend(LinkComponent)`
  flex 
  items-center
  gap-x-2
`

// @todo: outsource menu to static config file
const Sidebar = () => {
  return (
    <SidebarWrap>
      <SidebarSticky>
        <Section>
          <Headline>Get started</Headline>
          <List>
            <li>
              <FlexLink href="/docs/getting-started">
                <Power className="w-4 h-4" />
                Getting Started
              </FlexLink>
            </li>
            <li>
              <FlexLink href="/docs/basic">
                <BrickWall className="w-4 h-4" />
                Base
              </FlexLink>
            </li>
            <li>
              <FlexLink href="/docs/extend">
                <Blocks className="w-4 h-4" />
                Extend
              </FlexLink>
            </li>
            <li>
              <FlexLink href="/docs/variants">
                <SwatchBook className="w-4 h-4" />
                Variants
              </FlexLink>
            </li>
          </List>
        </Section>
        <Section>
          <Headline>Utils</Headline>
          <List>
            <li>
              <FlexLink href="/docs/utils/typescript">
                <Siren className="w-4 h-4" />
                Typescript
              </FlexLink>
              <SubList>
                <li>
                  <LinkComponent href="/docs/utils/typescript#rcbasecomponent">
                    <code>RcBaseComponent</code>
                  </LinkComponent>
                </li>
                <li>
                  <LinkComponent href="/docs/utils/typescript#variantsconfig">
                    <code>VariantsConfig</code>
                  </LinkComponent>
                </li>
              </SubList>
            </li>
            <li>
              <span className="flex items-center gap-x-2">
                <SwatchBook className="w-4 h-4" />
                Interaction
              </span>
              <SubList>
                <li>
                  <LinkComponent href="/docs/utils/convertrcprops">
                    <code>convertRcProps()</code>
                  </LinkComponent>
                </li>
              </SubList>
            </li>
          </List>
        </Section>
        <Section>
          <Headline>Examples</Headline>
          <List>
            <li>
              <LinkComponent href="/docs/examples/advanced-button">Avanced Button</LinkComponent>
            </li>
            <li>
              <LinkComponent href="/docs/examples/link">Link Component</LinkComponent>
            </li>
            <li>
              <LinkComponent href="/docs/examples/input">Input</LinkComponent>
            </li>
          </List>
        </Section>
      </SidebarSticky>
    </SidebarWrap>
  )
}

export default Sidebar
