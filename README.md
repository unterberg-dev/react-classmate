# react-styled-classnames

Just a tool I use to separate styles and classes from React components, mainly driven with utility-first CSS libraries like UnoCSS and Tailwind. Like styled components for class names.

```bash
npm i react-styled-classnames --save-dev
# or
yarn add react-styled-classnames --dev
```

## The "issue"

When working with utility-first libraries like [uno.css](https://unocss.dev/) or [tailwind](https://tailwindcss.com/), it's common to define utility classes directly in your React components. While the below works for [most of our cases](#do-i-need-react-styled-classnames), it can lead to cluttered and hard-to-maintain code, especially handling with conditional classes and/or dynamic styles. Often I do not want to create a wrapper component only to keep the styles separated.

```tsx
const SomeButton = ({ isLoading, isActive, ...props } : SomeButtonProps) => {
  /* logic here */

  const activeClass = useMemo(
    () => (isActive ? 'bg-blue-400 text-white' : 'bg-blue-400 text-blue-200'),
    [isActive],
  )
  const loadingClass = useMemo(() => (isLoading ? 'opacity-90 pointer-events-none' : ''), [isLoading])

  return (
    <button
      className={`text-lg mt-5 py-2 px-5 min-h-24 inline-flex transition-all z-10 ${someConfig.transitionDurationEaseClass} ${activeClass} ${loadingClass} ${props.className || ''}`}
      {...props}
    >
      {props.children}
    </button>
  )
}
```

## What the tool does

Providing a alternative way to maintain classnames and styles for all valid React components.

```tsx
const SomeButton = rsc.button<{ $isActive?: boolean; $isLoading?: boolean }>`
  text-lg
  mt-5
  py-2
  px-5
  min-h-24
  inline-flex
  z-10
  transition-all
  ${someConfig.transitionDurationEaseClass}
  ${p => p.$isActive ? 'bg-blue-400 text-white' : 'bg-blue-400 text-blue-200'}
  ${p => p.$isLoading ? 'opacity-90 pointer-events-none' : 'my-custom-class'}
`
```

## Features

- dynamic classnames, works like styled components
- extend any component
- tiny, dev dependency
- works with any utility-first CSS library (UnoCSS, Tailwind, etc.)
- typescript support / autocompletion
- SSR ready

## Upcoming features

- join forces with [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component) since syntax is similar but I could provide the extend feature and dynamic tags

### re-inventing the wheel?

Kind of - There are other libraries that handle this area well, such as [twin.macro](https://github.com/ben-rogerson/twin.macro) and [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component). twin macro needs styled-components, and tailwind-styled-components is not working with strict ssr environments, like vike. I created this lib just for the sake of using it in these environments.

## Getting started

```bash
npm i react-styled-classnames --save-dev
# or
yarn add react-styled-classnames --dev
```

### Basic usage

```tsx
import { rsc } from 'react-styled-classnames'

// ide auto-completion and type checking
const Container = rsc.div`
  text-lg
  mt-5
  py-2
  px-5
  min-h-24
  inline-flex
  z-10
`
```

### Usage with props

```tsx
interface ButtonProps {
  $isActive?: boolean
  $isLoading?: boolean
}

const SomeButton = rsc.button<ButtonProps>(`
    text-lg
    mt-5
    ${p => p.$isActive ? 'bg-blue-400 text-white' : 'bg-blue-400 text-blue-200'}
    ${p => p.$isLoading ? 'opacity-90 pointer-events-none' : ''}
  `,
)
```

### Prefix incoming props with `$`

**Note how we prefix the props incoming to dc with a `$` sign**. This is a important convention to distinguish dynamic props from the ones we pass to the component.

*This pattern should also avoid conflicts with reserved prop names.*

## Extending components

To extend react components, we can use the `extend` keyword. This function takes any valid react component and extends it with additional styles and classes. Types are inferred from the base component.

```tsx
import { rsc } from 'react-styled-classnames'
import { ArrowBigDown } from 'lucide-react'

const StyledLucideArrow = rsc.extend(ArrowBigDown)`
  md:-right-4.5
  right-1
  slide-in-r-20
`

// note how we can pass props which are only accessible a Lucid Component
export default () => <StyledLucideArrow stroke="3" />
```

Now we can define a base component and extend it with additional styles and classes and pass properties. You can pass the types to the `restyle` function to get autocompletion and type checking on the way.

```tsx
import { rsc } from 'react-styled-classnames'

interface StyledSliderItemBaseProps {
  $active: boolean
}

const StyledSliderItemBase = rsc.button<StyledSliderItemBaseProps>`
    absolute
    h-full
    w-full
    left-0
    top-0
    ${p => (p.$active ? 'animate-in fade-in' : 'animate-out fade-out')}
`

interface NewStyledSliderItemProps extends StyledSliderItemBaseProps {
  $secondBool: boolean
}

const NewStyledSliderItemWithNewProps = rsc.extend(StyledSliderItemBase)<NewStyledSliderItemProps>`
    rounded-lg
    text-lg
    ${p => (p.$active ? 'bg-blue' : 'bg-red')}
    ${p => (p.$secondBool ? 'text-underline' : 'some-class-here')}
  `

export default () => <NewStyledSliderItemWithNewProps $active $secondBool={false} />
```

## Other Examples

### Extend directly

We can also extend a component directly by passing the component and the tag name.

```tsx
import { rsc } from 'react-styled-classnames'

const BaseButton = rsc.extend(rsc.button``)`
  text-lg
  mt-5
`
```

### Extend with specific element props

Responding to incoming props, we can also extend a component with specific props based on the element type.

```tsx
import { rsc } from 'react-dynamic-classnames'

interface SomeButtonProps {
  $isActive?: boolean
}
const SomeButton = rsc.button<SomeButtonProps>`
  z-10
  ${p => (p.$isActive ? 'bg-blue-400 text-white' : 'bg-blue-700 text-blue-200')}
`

// mimic basic button type
type ButtonType = 'submit' | 'reset' | 'button' | undefined

// extend to pass $isActive prop if needed
interface ExtendedButtonProps extends SomeButtonProps {
  // note how we use a prop without $ prefix to let through the type
  type: ButtonType
}
// note how we pass "button" as the second argument to limit the component to a button
const ExtendedButton = rsc.extend(SomeButton, 'button')<ExtendedButtonProps>`
  some-class
  ${p => {
    if (p.type === 'submit') {
      return 'font-bold'
    }
    if (p.type === 'reset') {
      return 'font-italic'
    }
    return 'font-normal'
  }}
`

export default () => (
  <ExtendedButton $isActive type="submit">
    Submit
  </ExtendedButton>
)
```

## Inspiration
- [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component)
- [twin.macro](https://github.com/ben-rogerson/twin.macro)
- [cva](https://github.com/joe-bell/cva)
