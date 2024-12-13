```bash
npm i react-styled-classnames --save-dev
# or
yarn add react-styled-classnames --dev
```

# react-styled-classnames

Just another tool to separate styles and classes from React components, mainly driven with utility-first CSS libraries like UnoCSS and Tailwind. Like styled components for class names:

```ts
const SomeButton = rsc.button<ButtonProps>`
  text-lg
  mt-5
  ${p => p.$isActive ? 'bg-blue-400 text-white' : 'bg-blue-400 text-blue-200'}
  ${p => p.$isLoading ? 'opacity-90 pointer-events-none' : ''}
`
```

## The "issue"

When working with utility-first libraries like [uno.css](https://unocss.dev/) or [tailwind](https://tailwindcss.com/), it's common to define utility classes directly in your React components. While the below works for most of our cases, it can lead to cluttered and hard-to-maintain code, especially handling with conditional classes and/or dynamic styles. Often I do not want to create a wrapper component only to keep the styles separated.

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

## What the tool can do

Provides an alternative way to write and maintain classnames for all valid React components.

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

const SomeButtonVariation = rsc.extend(SomeButton)`
  md:-right-4.5
  slide-in-r-20
`
```

## Features

- dynamic classnames, works like styled components
- extend any component
- works with any utility-first CSS library (UnoCSS, Tailwind, etc.)
- typescript support / autocompletion
- SSR ready

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

const SomeButton = rsc.button<ButtonProps>`
  text-lg
  mt-5
  ${p => p.$isActive ? 'bg-blue-400 text-white' : 'bg-blue-400 text-blue-200'}
  ${p => p.$isLoading ? 'opacity-90 pointer-events-none' : ''}
`
```

### Prefix incoming props with `$`

**Note how we prefix the props incoming to dc with a `$` sign**. This is a important convention to distinguish dynamic props from the ones we pass to the component.

*This pattern should also avoid conflicts with reserved prop names.*

## Extend components with `rsc.extend`

To extend react components, we can use the `extend` keyword. This function takes any valid react component and extends it with additional styles and classes. Types are inferred from the base component.

```tsx
import { rsc } from 'react-styled-classnames'
import { ArrowBigDown } from 'lucide-react'

const StyledLucideArrow = rsc.extend(ArrowBigDown)`
  md:-right-4.5
  right-1
  slide-in-r-20
`

// note how we can pass props which are only accessible on a Lucid Component
export default () => <StyledLucideArrow stroke="3" />
```

Now we can define a base component and extend it with additional styles and classes and pass properties. You can pass the types to the `extend` function to get autocompletion and type checking on the way.

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

## Example usage of `rsc.extend`

### Use rsc for creating base component

Extend a component directly by passing the component and the tag name.

```tsx
import { rsc } from 'react-styled-classnames'

const BaseButton = rsc.extend(rsc.button``)`
  text-lg
  mt-5
`
```

*Saw this the first time in Material UI's `styled` function, where you can pass the mui-component.*

### Using element tag props and validation

By passing the component and the tag name, we can validate the component to accept tag related props.
This is useful if you wanna rely on the props for a specific element without the `$` prefix.

```tsx
import { rsc } from 'react-dynamic-classnames'

// mimic basic button type
type ButtonType = 'submit' | 'reset' | 'button' | undefined

// extend to pass $isActive prop if needed
interface ExtendedButtonProps {
  $isActive?: boolean
}
// note how we pass "button" as the second argument to correctly validate the props
const ExtendedButton = rsc.extend(rsc.button``, 'button')<ExtendedButtonProps>`
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

## Version 1 Users

If you liked the V1 version with `dc` and `restyle` and the object based pattern, it's still available in this package until the next major release.

See: [V1 Documentation](
  https://github.com/richard-unterberg/react-styled-classnames/tree/master/src/v1-deprecated)

### V1 Examples

```tsx
// V1 object pattern example

const Button = dc.button<ContainerProps>({
  // required: base class
  base: `
    text-lg
    mt-5
    py-2
    px-5
    min-h-24
    inline-flex
    z-10
    transition-all
    ${someConfig.transitionDurationEaseClass}
  `,
  // optional: dynamic classes
  classes: ({ $isActive, $isLoading }) => [
    $isActive ? 'bg-blue-400 text-white' : 'bg-blue-400 text-blue-200',
    $isLoading ? 'opacity-90 pointer-events-none' : '',
  ],
  // optional: css object with or without props
  css: ({ $isActive }) => ({
    boxShadow: `0 0 0 1px rgba(255, 255, 255, ${$isActive ? 0.7 : 0.2})`,
  }),
})

// V1 restyle example (now rsc.extend)
export const RestyledButton = restyle(
  Button,
  `
  md:-right-4.5
  right-1
  slide-in-r-20
`,
)
```

## Inspiration
- [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component)
- [twin.macro](https://github.com/ben-rogerson/twin.macro)
- [cva](https://github.com/joe-bell/cva)
