# react-dynamic-classnames

Just a tool I use to separate styles and classes from React components, mainly driven with utility-first CSS libraries like UnoCSS and Tailwind. Like styled components for class names.

```bash
npm i react-dynamic-classnames --save-dev
# or
yarn add react-dynamic-classnames --dev
```

## The "issue"

When working with utility-first libraries like [uno.css](https://unocss.dev/) or [tailwind](https://tailwindcss.com/), it's common to define utility classes directly in your React components. While the below works for [most of our cases](#do-i-need-react-dynamic-classnames), it can lead to cluttered and hard-to-maintain code, especially handling with conditional classes and/or dynamic styles. Often I do not want to create a wrapper component only to keep the styles separated.

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
const SomeButton = dc.button<{ $isActive?: boolean; $isLoading?: boolean }>(
  ({ $isActive, $isLoading }) => `
    text-lg
    mt-5
    py-2
    px-5
    min-h-24
    inline-flex
    z-10
    transition-all
    ${someConfig.transitionDurationEaseClass}
    ${$isActive ? 'bg-blue-400 text-white' : 'bg-blue-400 text-blue-200'}
    ${$isLoading ? 'opacity-90 pointer-events-none' : ''}
  `,
)
```

## Features

- dynamic classnames
- CSS objects
- tiny, dev dependency
- works with any utility-first CSS library (UnoCSS, Tailwind, etc.)
- SSR compatible
- merge components (experimental)

## Do you need `react-dynamic-classnames`?

No, absolutely not, this is just a tool I use to keep my code clean and maintainable. Maybe you like it. Contributions are welcome. There is just one goal:

### re-inventing the wheel?

Kind of - There are other libraries that handle this area well, such as [twin.macro](https://github.com/ben-rogerson/twin.macro)  and [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component).
## Getting started

```bash
npm i react-dynamic-classnames --save-dev
# or
yarn add react-dynamic-classnames --dev
```

### Basic usage

```tsx
import { dc } from 'react-dynamic-classnames/v1'

const Container = dc.div(`
  text-lg
  mt-5
  py-2
  px-5
  min-h-24
  inline-flex
  z-10
`);
```

### Usage with props and css

```tsx
// or extended pattern

interface ButtonProps {
  $isActive?: boolean
  $isLoading?: boolean
}

const SomeButton = dc.button<ButtonProps>(
  ({ $isActive, $isLoading }) => `
    text-lg
    mt-5
    py-2
    px-5
    min-h-24
    inline-flex
    z-10
    transition-all
    ${someConfig.transitionDurationEaseClass}
    ${$isActive ? 'bg-blue-400 text-white' : 'bg-blue-400 text-blue-200'}
    ${$isLoading ? 'opacity-90 pointer-events-none' : ''}
  `,
  // optional: css object with or without props
  ({ $isActive }) => ({
    boxShadow: `0 0 0 1px rgba(255, 255, 255, ${$isActive ? 0.7 : 0.2})`,
  }),
)
```

### Usage with object pattern

The object pattern allows you to define dynamic classes and styles in a more readable way.

```tsx
const Container = dc.button<ContainerProps>({
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
```

### Prefix incoming props with `$`

**Note how we prefix the props incoming to dc with a `$` sign**. This is a important convention to distinguish dynamic props from the ones we pass to the component.

*This pattern should also avoid conflicts with reserved prop names.*

## Extending components (Experimental)

To extend react components, we can use the `restyle` function. This function takes any valid react ccomponent and extends it with additional styles and classes. If not passed, the types are inferred from the base component.

```tsx
import { restyle } from 'react-dynamic-classnames/v1'
import { ArrowBigDown } from 'lucide-react'

export const StyledLucideArrow = restyle(
  ArrowBigDown,
  `
  md:-right-4.5
  right-1
  slide-in-r-20
`,
)
```

Now we can define a base component and extend it with additional styles and classes and pass properties. You can pass the types to the `restyle` function to get autocompletion and type checking on the way.

```tsx
import { useState } from 'react'
import { dc, restyle } from 'react-dynamic-classnames/v1'

interface StyledSliderItemBaseProps {
  $active: boolean
}

const StyledSliderItemBase = dc.button<StyledSliderItemBaseProps>(
  ({ $active }) => `
    absolute
    h-full
    w-full
    left-0
    top-0
    ${$active ? 'animate-in fade-in' : 'animate-out fade-out'}
`,
)

interface NewStyledSliderItemProps extends StyledSliderItemBaseProps {
  $secondBool: boolean
}

const NewStyledSliderItemWithNewProps = restyle<NewStyledSliderItemProps>(
  StyledSliderItemBase,
  ({ $active, $secondBool }) => `
    rounded-lg
    text-lg
    ${$active ? 'bg-blue' : 'bg-red'}
    ${$secondBool ? 'text-underline' : ''}
  `,
)

const SomeComponent = () => {
  const [active, _setActive] = useState(false)
  const [otherActive, _setOtherActive] = useState(false)

  return (
    <>
      <NewStyledSliderItemWithNewProps $active={active} $secondBool={otherActive} />
    </>
  )
}

export default SomeComponent
```

*Currently untested with the extended pattern*

## Inspiration
- [twin.macro](https://github.com/ben-rogerson/twin.macro)
- [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component)
- [cva](https://github.com/joe-bell/cva)