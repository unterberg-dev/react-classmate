import cm from "@classmate/react"
import type { AnchorHTMLAttributes, ReactNode } from "react"
import { H4Headline } from "#components/common/Headline"
import LinkComponent from "#components/common/LinkComponent"
import useMenuStore from "#hooks/useMenuStore"
import { menuData } from "#lib/menuData"
import stringToCodeElement from "#lib/utils/stringToCodeElement"

const List = cm.ul`
  mb-2 
  flex 
  flex-col 
  gap-1
  ml-2
`

const SubList = cm.ul`
  ml-6 
  mt-2 
  flex-col
  flex
  gap-1
  mb-2
`

const Section = cm.div``

const FlexLinkBase = cm.extend(LinkComponent)`
  flex 
  items-center
  gap-x-2
`

const FlexLink = ({
  ...props
}: { children: ReactNode; href: string } & AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <li>
    <FlexLinkBase isMenu {...props} />
  </li>
)

const Navigation = ({ isTablet }: { isTablet?: boolean }) => {
  const closeMenu = useMenuStore((state) => state.close)

  const handleClick = () => {
    if (isTablet) {
      closeMenu()
    }
  }

  return (
    <>
      {menuData.map((section) => (
        <Section key={section.title}>
          <H4Headline as="p" className="mb-4">
            {section.title}
          </H4Headline>
          <List>
            {section.items.map((item) =>
              item.href ? (
                <FlexLink
                  key={item.label}
                  onClick={() => handleClick()}
                  href={item.href}
                  target={item.href?.startsWith("http") ? "_blank" : undefined}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </FlexLink>
              ) : (
                <li key={item.label}>
                  <span className="flex items-center gap-x-2 font-bold">
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.label}
                  </span>
                  {item.subItems && (
                    <SubList>
                      {item.subItems.map((subItem) => {
                        const subLabelContent = stringToCodeElement(subItem.label, subItem.hightlightCode)
                        return (
                          <FlexLink
                            key={subItem.label}
                            onClick={() => handleClick()}
                            href={subItem.href || ""}
                          >
                            {subLabelContent}
                          </FlexLink>
                        )
                      })}
                    </SubList>
                  )}
                </li>
              ),
            )}
          </List>
        </Section>
      ))}
    </>
  )
}

export default Navigation
