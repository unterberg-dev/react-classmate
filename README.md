[![npm](https://img.shields.io/npm/v/react-styled-classnames)](https://www.npmjs.com/package/react-styled-classnames)
[![npm bundle size](https://img.shields.io/bundlephobia/min/react-styled-classnames)](https://bundlephobia.com/result?p=react-styled-classnames)

# react-styled-classnames

A tool for managing react component class names and variants with the simplicity of styled-components. Designed for use with utility-first CSS libraries and SSR.

## 🚩 Transform this

```jsx
const SomeButton = ({ isLoading, ...props }) => {
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

```js
const ButtonBase = rsc.button`
  text-normal
  md:text-lg
  mt-5
  border-1
  transition-all
  ${someConfig.transitionDurationEaseClass}
  ${(p) => (p.$isLoading ? "opacity-90 pointer-events-none" : "")}
`
```

## Features

- Dynamic class names
- Add Variants
- Extend components
- React, no other dependencies
- TypeScript support
- SSR compatibility

## Contents

- [Features](#features)
- [Getting started](#getting-started)
- [Basic usage](#basic)
- [Usage with props](#use-with-props)
- [Create Variants](#create-variants)
- [Extend components](#extend)
- [Recipes for `rsc.extend`](#receipes-for-rscextend)
  - [Use rsc for creating base component](#use-rsc-for-creating-base-component)
  - [Custom mapping function for props](#custom-mapping-function-for-props)
  - [Auto infer types for props](#auto-infer-types-for-props)
  - [Extending other lib components / Juggling with components that are `any`](#extending-other-lib-components--juggling-with-components-that-are-any)
- [Version 1 Users](#version-1)

## Upcoming

- Integrate more tests focused on SSR and React
- Interactive playground
- `$` prefix should be optional (at least for variants)
- Advanced IDE integration
  - show generated default class on hover
  - enforce autocompletion and tooltips from the used libs

### re-inventing the wheel?

Yes kind of, while [twin.macro](https://github.com/ben-rogerson/twin.macro) requires styled-components, and [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component) isn’t fully compatible with [Vike](https://vike.dev/) - [See Issue here](https://vike.dev/broken-npm-package).

I wrote my own version to fit my needs and extended it slightly with the [variants](#create-variants) feature as seen as inspiration in [cva](https://cva.style/docs/getting-started/variants).

## Getting started

Let's assume you have installed [React](https://react.dev/) (> 16.8.0)

```bash
npm i react-styled-classnames --save-dev
# or
yarn add react-styled-classnames --dev
```

## Basic

create a component by calling `rsc` with a tag name and a template literal string.

```tsx
import rsc from 'react-styled-classnames'

const Container = rsc.div`
  py-2
  px-5
  min-h-24
`
// transforms to: <div className="py-2 px-5 min-h-24" />
```

## Extend

Extend a component directly by passing the component and the tag name.

```tsx
import MyOtherComponent from './MyOtherComponent' // () => <button className="text-lg mt-5" />
import rsc from 'react-styled-classnames'

const Container = rsc.extend(MyOtherComponent)`
  py-2
  px-5
  min-h-24
`
// transforms to: <button className="text-lg mt-5 py-2 px-5 min-h-24" />
```

## Use with props

Pass props to the component and use them in the template literal string and in the component prop validation.

```tsx
// hey typescript
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
// transforms to <button className="text-lg mt-5 bg-blue-400 text-white opacity-90 pointer-events-none" />
```

### Prefix incoming props with `$`

**Note how we prefix the props incoming to dc with a `$` sign**. This is a important convention to distinguish dynamic props from the ones we pass to the component.

*This pattern should also avoid conflicts with reserved prop names.*

## Create Variants

Create variants by passing an object to the `variants` key like in [cva](https://cva.style/docs/getting-started/variants).
The key should match the prop name and the value should be a function that returns a string. You could also re-use the props in the function.

```tsx
interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  $severity: "info" | "warning" | "error";
  $isActive?: boolean;
}

const Alert = rsc.div.variants<AlertProps>({
  // optional but dynamic
  base: p => `
    ${isActive ? 'custom-active' : 'custom-inactive'}
    p-4
    rounded-md
  `,
  variants: {
    $severity: {
      info: (p) => `bg-blue-100 text-blue-800 ${p.$isActive ? "shadow-lg" : ""}`,
      warning: (p) => `bg-yellow-100 text-yellow-800 ${p.$isActive ? "font-bold" : ""}`,
      error: (p) => `bg-red-100 text-red-800 ${p.$isActive ? "ring ring-red-500" : ""}`,
    },
  },
});

export default () => <Alert $severity="info" $isActive />
// outputs: <div className="custom-active p-4 rounded-md bg-blue-100 text-blue-800 shadow-lg" />
```

*due to a current limitiation the extension `... extends HTMLAttributes<HTMLDivElement>`is needed for the `variants` to infer the intrinsic props down to the implemented component*

## Receipes for `rsc.extend`

With `rsc.extend`, you can build upon any base React component—adding new styles and even supporting additional props. This makes it easy to create reusable component variations without duplicating logic.

```tsx
import { ArrowBigDown } from 'lucide-react'
import rsc from 'react-styled-classnames'

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
import rsc from 'react-styled-classnames'

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
// outputs: <button className="absolute h-full w-full left-0 top-0 animate-in fade-in rounded-lg text-lg bg-blue" />
```

### Use rsc for creating base component

Extend a component directly by passing the component and the tag name.

```tsx
const BaseButton = rsc.extend(rsc.button``)`
  text-lg
  mt-5
`
```

### extend from variants

```tsx
interface ButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  $severity: "info" | "warning" | "error";
  $isActive?: boolean;
}

const Alert = rsc.input.variants<ButtonProps>({
  base: "p-4",
  variants: {
    $severity: {
      info: (p) => `bg-blue-100 text-blue-800 ${p.$isActive ? "shadow-lg" : ""}`,
    },
  },
});

const ExtendedButton = rsc.extend(Alert)<{ $test: boolean }>`
  ${p => p.$test ? "bg-green-100 text-green-800" : ""}
`

export default () => <ExtendedButton $severity="info" $test />
// outputs: <input className="p-4 bg-blue-100 text-blue-800 shadow-lg bg-green-100 text-green-800" />
```

### custom mapping function for props
* this is deprecated, since we have the extend function

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
import { ComponentProps } from 'react'
import { MapContainer } from 'react-leaflet'
import { Field, FieldConfig } from 'formik'
import rsc, { RscBaseComponent } from 'react-styled-classnames'

// we need to cast the type to ComponentProps
type StyledMapContainerType = ComponentProps<typeof MapContainer>
const StyledMapContainer: RscBaseComponent<StyledMapContainerType> = rsc.extend(MapContainer)`
  absolute
  h-full
  w-full
  text-white
  outline-0
`

export const Component = () => <StyledMapContainer bounds={...} />
```

⚠️ This is a workaround! This is a *bug* - we should be able to cast the type directly in the interface in which we pass `$error`. Contributions welcome.

## Version 1

👋 Due to bundle size I removed V1 from this package. it's still available, but unmaintained under this package: https://www.npmjs.com/package/react-dynamic-classnames

## Inspiration
- [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component)
- [cva](https://github.com/joe-bell/cva)
- [twin.macro](https://github.com/ben-rogerson/twin.macro)
