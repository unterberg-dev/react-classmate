# react-dynamic-classnames

Separate styles and classes from your React components, seamlessly integrating with utility-first CSS libraries like UnoCSS and Tailwind. Like styled components for class names.

```bash
npm i react-dynamic-classnames --save-dev
# or
yarn add react-dynamic-classnames --dev
```

## The "issue"

When working with utility-first libraries like [uno.css](https://unocss.dev/) or [tailwind](https://tailwindcss.com/), it's common to define utility classes directly in your React components. While the below works for [most of our cases](#do-i-need-react-dynamic-classnames), it can lead to cluttered and hard-to-maintain code, especially handling with conditional classes and/or dynamic styles. Often I do not want to create a wrapper component only to keep the styles separated.

```tsx
const SomeButton = ({ isLoading, isActive, ...props } : SomeButtonProps) => {
  /* potentially logic here */

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

It provides a alternative way to maintain classnames and styles for all valid React components. Just like styled components, but without the need for a additional library.

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

- tiny
- dev dependency
- works with any utility-first CSS library (UnoCSS, Tailwind, etc.)
- typscript
- SSR-ready
- CSS objects

### re-inventing the wheel?

There are other libraries that handle this area well, such as [twin.macro](https://github.com/ben-rogerson/twin.macro)  and [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component). However, these solutions are either too complex for my projects, rely on `styled-components`, or lack SSR compatibility. I prefer a simpler approach with more separation of concerns for handling conditional classes, as demonstrated in the examples below.

## Getting started

```bash
npm i react-dynamic-classnames --save-dev
# or
yarn add react-dynamic-classnames --dev
```

### Basic usage

```tsx
import { dc } from 'react-dynamic-classnames'

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

### Prefix dynamic props with `$`

**Note how we prefix the dynamic prop with a `$` sign**. This is a important convention to distinguish dynamic props from the ones we pass to the component.

*This pattern should also avoid conflicts with reserved prop names.*

## Do I need `react-dynamic-classnames`?

No, in a perfect world, in smaller projects, everything is granular and well-organized, only 3-4 classnames per element, and we don't need this library.

## Combine (Merge Styles) from already styled elements (Experimental)

```tsx
import { dc, restyle, RestyleType } from 'react-dynamic-classnames'

const StyledSliderItem = dc.button<{ $active: boolean }>(
  ({ $active }) => `
    absolute
    h-full
    w-full
    left-0
    top-0
    ${APP_CONFIG.uno.transition}
    ${$active ? 'animate-in fade-in' : 'animate-out fade-out'}
`,
)

// this element merges props and classnames with the ones you passed earlier
type NewStyledSliderItemProps = RestyleType<typeof StyledSliderItem>
const NewStyledSliderItem = restyle<{ $secondBool: boolean } & NewStyledSliderItemProps>(
  StyledSliderImage,
  ({ $active, $secondBool }) => `
    ${$active ? 'bg-blue' : 'bg-red'}
    ${$secondBool ? 'text-underline' : ''}
  `,
)

const SomeComponent = () => <NewStyledSliderItem $active $secondBool />
```

## Inspiration
- [twin.macro](https://github.com/ben-rogerson/twin.macro)
- [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component)
