import { usePageContext } from "vike-react/usePageContext"
import LayoutComponent from "#components/LayoutComponent"
import Navigation from "#components/Navigation"
import { H2Headline } from "#components/common/Headline"

export default function Page() {
  const { is404 } = usePageContext()
  if (is404) {
    return (
      <LayoutComponent type="small">
        <H2Headline className="mb-10">404 Page Not Found</H2Headline>
        <p>This page could not be found.</p>
        <p className="mb-10">Maybe you are interested in something else in the meantime?</p>
        <Navigation />
      </LayoutComponent>
    )
  }
  return (
    <LayoutComponent>
      <H2Headline className="mb-10">500 Internal Server Error</H2Headline>
      <p>Something went wrong.</p>
      <p className="mb-10">Maybe you are interested in something else in the meantime?</p>
      <Navigation />
    </LayoutComponent>
  )
}
