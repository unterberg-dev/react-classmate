import { Monitor, Moon, Sun } from "lucide-react" // Added Monitor icon for "auto mode"
import rc from "react-classmate"

import Button from "#components/common/Button"
import useTheme from "#hooks/useThemeStore"
import { getSystemTheme } from "#lib/utils"

const CustomButton = rc.extend(Button)`
  w-7 lg:w-8
  h-7 lg:h-8
  !min-h-auto 
  animate-in fade-in 
  rounded-full
  !bg-gray/20 dark:!bg-grayLight 
  !text-dark dark:!text-grayDark
  `

const Badge = rc.span`
  bg-primaryDark 
  text-light 
  rounded-full 
  font-normal 
  w-3 
  h-3 
  flex 
  justify-center 
  items-center 
  absolute 
  text-superMicro 
  top-0 
  right-0
`

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className="flex gap-2">
      {theme && (
        <CustomButton type="button" color="hollow" noShadow noGutter onClick={toggleTheme} size="sm">
          {theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {theme === getSystemTheme() ? (
            <Badge>
              <Monitor className="h-2 w-2 pointer-events-none" strokeWidth="3" />
            </Badge>
          ) : null}
        </CustomButton>
      )}
    </div>
  )
}

export default ThemeSwitch
