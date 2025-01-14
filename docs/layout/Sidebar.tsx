import rc from "react-classmate"

import Navigation from "#components/Navigation"

const SidebarWrap = rc.nav`
  relative p-0
  hidden
  lg:block
`

const SidebarSticky = rc.div`
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
