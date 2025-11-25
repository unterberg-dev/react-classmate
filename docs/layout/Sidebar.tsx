import cm from "@classmate/react"

import Navigation from "#components/Navigation"

const SidebarWrap = cm.nav`
  relative p-0
  hidden
  lg:block
`

const SidebarSticky = cm.div`
  sticky
  top-24
  flex 
  flex-col 
  gap-5
`

const Sidebar = () => {
  return (
    <SidebarWrap>
      <SidebarSticky>
        <Navigation />
      </SidebarSticky>
    </SidebarWrap>
  )
}

export default Sidebar
