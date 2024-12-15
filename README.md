# react-styled-classnames

A utility-first CSS tool for managing component class names with the simplicity of styled-components, designed for use with utility-first CSS libraries like UnoCSS and Tailwind:

```ts
const SomeButton = rsc.button<ButtonProps>`
  text-lg
  mt-5
  ${p => p.$isActive ? 'bg-blue-300 text-white' : 'bg-blue-400 text-blue-200'}
  ${p => p.$isLoading ? 'opacity-90 pointer-events-none' : ''}
`
```

## Contents

- [The "issue"](#the-issue)
- [Features](#features)
- [Getting started](#getting-started)
- [Basic usage](#basic-usage)
- [Usage with props](#usage-with-props)
- [Extend components with `rsc.extend`](#extend-components-with-rscextend)
  - [Use rsc for creating base component](#use-rsc-for-creating-base-component)
  - [Extend with Typescript](#handling-with-types)
- [Version 1 Users](#version-1)

## The "issue"

When working with utility-first libraries like [uno.css](https://unocss.dev/) or [tailwind](https://tailwindcss.com/), it's common to define utility classes directly in your React components. Which often leads to this kind of boilerplate code:

```tsx
interface SomeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean
  isActive: boolean
}

const SomeButton = ({ isLoading, isActive, children, className, ...props } : SomeButtonProps) => {
  const activeClass = useMemo(
    () => (isActive ? 'bg-blue-400 text-white' : 'bg-blue-800 text-blue-200'),
    [isActive],
  )
  const loadingClass = useMemo(() => (isLoading ? 'opacity-90 pointer-events-none' : ''), [isLoading])

  return (
    <button
      className={`text-lg mt-5 py-2 px-5 min-h-24 inline-flex transition-all z-10 ${someConfig.transitionDurationEaseClass} ${activeClass} ${loadingClass} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

### The tool let you write this instead:

```tsx
interface SomeButtonProps {
  $isActive?: boolean
  $isLoading?: boolean
}

const SomeButton = rsc.button<SomeButtonProps>`
  text-lg
  mt-5
  py-2
  px-5
  min-h-24
  inline-flex
  z-10
  transition-all
  ${someConfig.transitionDurationEaseClass}
  ${p => p.$isActive ? 'bg-blue-400 text-white' : 'bg-blue-800 text-blue-200'}
  ${p => p.$isLoading ? 'opacity-90 pointer-events-none' : 'my-custom-class'}
`
```

## Features

- Dynamic class names: Define dynamic styles based on props, feels like styled-components.
- React, no other dependencies: Works with any React component, no need for styled-components or tailwind
- Extend everything: Easily extend any React component with rsc.extend.
- Utility-first CSS support: Works seamlessly with libraries like UnoCSS and Tailwind.
- TypeScript: Autocompletion and strict type-checking in your IDE.
- SSR compatibility: Compatible with SSR frameworks like [Vike](https://vike.dev/) and [Next.js](https://nextjs.org/).

### re-inventing the wheel?

While [twin.macro](https://github.com/ben-rogerson/twin.macro) requires styled-components, and [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component) isn’t fully compatible with [Vike](https://vike.dev/) and requires tailwind, `react-styled-classnames` is lightweight and tailored for flexibility and SSR.

## Getting started

Let's assume you have installed React (> v17) and a utility-first library (uno.css / tailwind / shed / basscss).

```bash
npm i react-styled-classnames --save-dev
# or
yarn add react-styled-classnames --dev
```

## Basic usage

```tsx
import { rsc } from 'react-styled-classnames'

// IDE autocompletion and type-checking for utility class names
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

## Usage with props

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

With `rsc.extend`, you can build upon any base React component—adding new styles and even supporting additional props. This makes it easy to create reusable component variations without duplicating logic.

```tsx
import { ArrowBigDown } from 'lucide-react'
import { rsc } from 'react-styled-classnames'

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

### Handling with Types

By passing the component and the tag name, we can validate the component to accept tag related props.
This is useful if you wanna rely on the props for a specific element without the `$` prefix.

```tsx
import { rsc } from 'react-dynamic-classnames'

// if you pass rsc component it's types are validated
const ExtendedButton = rsc.extend(rsc.button``)`
  some-class
  ${p => p.type === 'submit' ? 'font-normal' : 'font-bold'}
`

// infers the type of the input element + add new props
const MyInput = ({ ...props }: HTMLAttributes<HTMLInputElement>) => (
  <input {...props} />
);
const StyledDiv = rsc.extend(MyInput)<{ $trigger?: boolean }>`
  bg-white
  ${p => p.$trigger ? "!border-error" : ""}
  ${p => p.type === 'submit' ? 'font-normal' : 'font-bold'}
`;
```

## Version 1

👋 Due to bundle size I removed V1 from this package. it's still available, but unmaintained under this package: https://www.npmjs.com/package/react-dynamic-classnames

```

## Inspiration
- [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component)
- [twin.macro](https://github.com/ben-rogerson/twin.macro)
- [cva](https://github.com/joe-bell/cva)
