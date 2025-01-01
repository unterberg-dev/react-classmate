import LinkComponent from "#components/common/LinkComponent"
import { APP_CONFIG } from "#lib/config"

const Footer = () => (
  <footer className="bg-light text-dark -mt-16 h-16 z-17 relative">
    <div className="container mx-auto p-4">
      <p className="text-center">
        <LinkComponent href={APP_CONFIG.repoUrl} className="!text-dark">
          2025, react-classmate
        </LinkComponent>
      </p>
    </div>
  </footer>
)

export default Footer
