# react-styled-classnames

A utility-first CSS tool for managing component class names with the simplicity of styled-components, designed for use with utility-first CSS libraries like `UnoCSS` and `Tailwind`.

## 🚩 Transform this

```tsx
// typescript
interface SomeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

const SomeButton = ({ isLoading, ...props }: SomeButtonProps) => {
  const activeClass = isLoading ? 'bg-blue-400 text-white' : 'bg-blue-800 text-blue-200'

  return (
    <button
      {...props}
      className={`transition-all mt-5 border-1 md:text-lg text-normal ${someConfig.transitionDurationEaseClass} ${loadingClass} ${props.className || ''}`}
    >
      {props.children}
    </button>
  )
}
```

## 🌤️ Into this

```tsx
// typescript
interface ButtonBaseProps {
  $isLoading?: boolean
}

const ButtonBase = rsc.button<ButtonBaseProps>`
  text-normal
  md:text-lg 
  mt-5
  border-1 
  transition-all
  ${someConfig.transitionDurationEaseClass}
  ${(p) => (p.$isLoading ? "opacity-90 pointer-events-none" : "")}
`

// (and add a variation)
const PrimaryButton = rsc.extend(ButtonBase)<{ $pulse: boolean }>`
  bg-blue-400
  text-white
  ${p => p.$pulse ? 'animate-pulse' : ''}
  ${p => p.$isLoading ? 'border-blue-700' : ''}
`

const Component = () => {
  // where the logic happens
  return (
    <PrimaryButton $pulse $isLoading>
      Click me
    </PrimaryButton>
  )
}
```

## Contents

- [Features](#features)
- [Getting started](#getting-started)
- [Basic usage](#basic-usage)
- [Usage with props](#usage-with-props)
- [Extend components with `rsc.extend`](#extend-components-with-rscextend)
  - [Use rsc for creating base component](#use-rsc-for-creating-base-component)
  - [Extend with Typescript](#handling-with-types)
- [Version 1 Users](#version-1)

## Features

- Dynamic class names
- Extend components
- Utility-first CSS support
- React, no other dependencies
- TypeScript support
- SSR compatibility

### re-inventing the wheel?

While [twin.macro](https://github.com/ben-rogerson/twin.macro) requires styled-components, and [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component) isn’t fully compatible with [Vike](https://vike.dev/) and requires tailwind, `react-styled-classnames` is lightweight and tailored for flexibility and SSR.

## Getting started

Let's assume you have installed [React](https://react.dev/) (> 17) and a utility-first css library ([uno.css](https://unocss.dev/) / [tailwind](https://tailwindcss.com/)).

```bash
npm i react-styled-classnames --save-dev
# or
yarn add react-styled-classnames --dev
```

## Basic usage

```tsx
import { rsc } from 'react-styled-classnames'

const Container = rsc.div`
  py-2
  px-5
  min-h-24
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

⚠️ Having problems by extending third party components, see: [Extending other lib components](#extending-other-lib-components--juggling-with-components-that-are-any)

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

## Receipes for `rsc.extend`

All example assume you have imported `rsc` like `import { rsc } from 'react-styled-classnames'`

### Use rsc for creating base component

Extend a component directly by passing the component and the tag name.

```tsx
const BaseButton = rsc.extend(rsc.button``)`
  text-lg
  mt-5
`
```

*Saw this the first time in Material UI's `styled` function, where you can pass the mui-component.*

### custom mapping function for props

```tsx
interface NoteboxProps {
  $type?: 'info' | 'warning' | 'error' | 'success' | 'aside'
}

const typeClass = (type: NoteboxProps['$type']) => {
  switch (type) {
    case 'warning':
      return 'border-warningLight bg-warningSuperLight'
    case 'error':
      return 'border-errorLight bg-errorSuperLight'
    case 'success':
      return 'border-successLight bg-successSuperLight'
    case 'aside':
      return 'border-graySuperLight bg-light'
    // info
    default:
      return 'border-graySuperLight bg-white'
  }
}

const Notebox = rsc.div<NoteboxProps>`
  p-2
  md:p-4
  rounded
  border-1
  ${p => typeClass(p.$type || 'info')}
`

export default Notebox
```

### Auto infer types for props

By passing the component, we can validate the component to accept tag related props.
This is useful if you wanna rely on the props for a specific element without the `$` prefix.

```tsx
// if you pass rsc component it's types are validated
const ExtendedButton = rsc.extend(rsc.button``)`
  some-class
  ${p => p.type === 'submit' ? 'font-normal' : 'font-bold'}
`

// infers the type of the input element + add new props
const MyInput = ({ ...props }: HTMLAttributes<HTMLInputElement>) => (
  <input {...props} />
)
const StyledDiv = rsc.extend(MyInput)<{ $trigger?: boolean }>`
  bg-white
  ${p => p.$trigger ? "!border-error" : ""}
  ${p => p.type === 'submit' ? 'font-normal' : 'font-bold'}
`
```

### Extending other lib components / Juggling with components that are `any`

Unfortunately we cannot infer the type directly of the component if it's `any` or loosely typed. But we can use a intermediate step to pass the type to the `extend` function.

```tsx
import { Field, FieldConfig } from 'formik'

type FieldComponentProps = ComponentProps<'input'> & FieldConfig
const FieldComponent = ({ ...props }: FieldComponentProps) => <Field {...props} />

const StyledField = rsc.extend(FieldComponent)<{ $error: boolean }>`
  theme-form-field
  w-full
  ....
  ${p => (p.$error ? '!border-error' : '')}
`

export const Component = () => <StyledField placeholder="placeholder" as="select" name="name" $error />
```

⚠️ This is a workaround! This is a *bug* - we should be able to cast the type directly in the interface in which we pass `$error`. Contributions welcome.

## Version 1

👋 Due to bundle size I removed V1 from this package. it's still available, but unmaintained under this package: https://www.npmjs.com/package/react-dynamic-classnames

## Inspiration
- [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component)
- [twin.macro](https://github.com/ben-rogerson/twin.macro)
- [cva](https://github.com/joe-bell/cva)
