# react-classmate

A tool for managing React component class names, variants and styles with the simplicity of styled-components and cva. Designed and tested for use with utility-first CSS libraries and SSR/SSG frameworks.

## 🚩 Transform this

```jsx
const SomeButton = ({ isLoading, ...props }) => {
  const activeClass = isLoading
    ? "bg-blue-400 text-white"
    : "bg-blue-800 text-blue-200";

  return (
    <button
      {...props}
      className={`transition-all mt-5 border-1 md:text-lg text-normal ${someConfig.transitionDurationEaseClass} ${activeClass} ${props.className || ""}`}
    >
      {props.children}
    </button>
  );
};
```

## 🌤️ Into

```js
const ButtonBase = rc.button`
  text-normal
  md:text-lg
  mt-5
  border-1
  transition-all
  ${someConfig.transitionDurationEaseClass}
  ${(p) => (p.$isLoading ? "opacity-90 pointer-events-none" : "")}
`;
```

## Features

- Class name-focused components
- Variants
- Extend components
- Dynamic styles
- TypeScript support
- Tested with SSR Frameworks

[![npm](https://img.shields.io/npm/v/react-classmate)](https://www.npmjs.com/package/react-classmate)
[![npm bundle size](https://img.shields.io/bundlephobia/min/react-classmate)](https://bundlephobia.com/result?p=react-classmate)

## Contents

- [Features](#features)
- [Getting started](#getting-started)
- [Basic usage](#basic)
- [Usage with props](#use-with-props)
- [Create Variants](#create-variants)
- [Extend components](#extend)
- [Add CSS Styles](#add-css-styles)
- [Recipes for `rc.extend`](#receipes-for-rcextend)
  - [Use rc for creating base component](#use-rc-for-creating-base-component)
  - [Auto infer types for props](#auto-infer-types-for-props)
  - [Extending other lib components / `any` as Input](#extending-other-lib-components--any-as-input)

## Getting started

Make sure you have installed [React](https://react.dev/) (> 16.8.0) in your project.

```bash
npm i react-classmate
# or
yarn add react-classmate
```

## Basic

Create a component by calling `rc` with a tag name and a template literal string.

```tsx
import rc from "react-classmate";

const Container = rc.div`
  py-2
  px-5
  min-h-24
`;
// transforms to: <div className="py-2 px-5 min-h-24" />
```

## Extend

Extend a component directly by passing the component and the tag name.

```tsx
import MyOtherComponent from "./MyOtherComponent"; // () => <button className="text-lg mt-5" />
import rc from "react-classmate";

const Container = rc.extend(MyOtherComponent)`
  py-2
  px-5
  min-h-24
`;
// transforms to: <button className="text-lg mt-5 py-2 px-5 min-h-24" />
```

## Use with props

Pass props to the component and use them in the template literal string and in the component prop validation.

```tsx
// hey typescript
interface ButtonProps {
  $isActive?: boolean;
  $isLoading?: boolean;
}
const SomeButton = rc.button<ButtonProps>`
  text-lg
  mt-5
  ${(p) => (p.$isActive ? "bg-blue-400 text-white" : "bg-blue-400 text-blue-200")}
  ${(p) => (p.$isLoading ? "opacity-90 pointer-events-none" : "")}
`;
// transforms to <button className="text-lg mt-5 bg-blue-400 text-white opacity-90 pointer-events-none" />
```

### Prefix incoming props with `$`

**we prefix the props incoming to dc with a `$` sign**. This is a important convention to distinguish dynamic props from the ones we pass to the component.

_This pattern should also avoid conflicts with reserved prop names._

## Create Variants

Create variants by passing an object to the `variants` key like in [cva](https://cva.style/docs/getting-started/variants).
The key should match the prop name and the value should be a function that returns a string. You could also re-use the props in the function.

```tsx
interface AlertProps {
  $severity: "info" | "warning" | "error";
  $isActive?: boolean;
}
const Alert = rc.div.variants<AlertProps>({
  // optional
  base: (p) => `
    ${p.isActive ? "custom-active" : "custom-inactive"}
    p-4
    rounded-md
  `,
  // required
  variants: {
    $severity: {
      warning: "bg-yellow-100 text-yellow-800",
      info: (p) =>
        `bg-blue-100 text-blue-800 ${p.$isActive ? "shadow-lg" : ""}`,
      error: (p) =>
        `bg-red-100 text-red-800 ${p.$isActive ? "ring ring-red-500" : ""}`,
    },
  },
  // optional - used if no variant was found
  defaultVariant: {
    $severity: "info",
  },
});

export default () => <Alert $severity="info" $isActive />;
// outputs: <div className="custom-active p-4 rounded-md bg-blue-100 text-blue-800 shadow-lg" />
```

### Typescript: Separate base props and variants with a second type parameter

As seen above, we also pass `AlertProps` to the variants, which can cause loose types. If you want to separate the base props from the variants, you can pass a second type to the `variants` function so that only those props are available in the variants.

```tsx
interface AlertProps {
  $isActive?: boolean;
}
interface AlertVariants {
  $severity: "info" | "warning" | "error";
}
const Alert = rc.div.variants<AlertProps, AlertVariants>({
  base: `p-4 rounded-md`,
  variants: {
    // in here there are only the keys from AlertVariants available
    $severity: {
      // you can use the props from AlertProps here again
      warning: "bg-yellow-100 text-yellow-800",
      info: (p) =>
        `bg-blue-100 text-blue-800 ${p.$isActive ? "shadow-lg" : ""}`,
      error: (p) =>
        `bg-red-100 text-red-800 ${p.$isActive ? "ring ring-red-500" : ""}`,
    },
  },
  // optional - used if no variant was found
  defaultVariant: {
    $severity: "info",
  },
});
```

## Add CSS Styles

You can use CSS styles in the template literal string with the `style` function. This function takes an object with CSS properties and returns a string. We can use the props from before.

```tsx
// Base:
const StyledButton = rc.button<{ $isDisabled: boolean }>`
  text-blue
  ${(p) =>
    p.style({
      boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
      cursor: p.$isDisabled ? "not-allowed" : "pointer",
    })}
`;
export default () => <StyledButton $isDisabled />;
// outputs: <button className="text-blue" style="box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); cursor: not-allowed;" />
```

```tsx
// Extended:
const BaseButton = rc.button<{ $isActive?: boolean }>`
  ${(p) =>
    p.style({
      backgroundColor: p.$isActive ? "green" : "red",
    })}
`;
const ExtendedButton = rc.extend(BaseButton)<{ $isLoading?: boolean }>`
  ${(p) =>
    p.style({
      opacity: p.$isLoading ? 0.5 : 1,
      pointerEvents: p.$isLoading ? "none" : "auto",
    })}
`;
export default () => <ExtendedButton $isActive $isLoading />;
// outputs: <button className="bg-red" style="opacity: 0.5; pointer-events: none;" />
```

## Recipes for `rc.extend`

With `rc.extend`, you can build upon any base React component, adding new styles and even supporting additional props. This makes it easy to create reusable component variations without duplicating logic.

```tsx
import { ArrowBigDown } from "lucide-react";
import rc from "react-classmate";

const StyledLucideArrow = rc.extend(ArrowBigDown)`
  md:-right-4.5
  right-1
  slide-in-r-20
`;

// ts: we can pass only props which are accessible on a `lucid-react` Component
export default () => <StyledLucideArrow stroke="3" />;
```

⚠️ Having problems by extending third party components, see: [Extending other lib components](#extending-other-lib-components--juggling-with-components-that-are-any)

Now we can define a base component, extend it with additional styles and classes, and pass properties. You can pass the types to the `extend` function to get autocompletion and type checking.

```tsx
import rc from "react-classmate";

interface StyledSliderItemBaseProps {
  $active: boolean;
}
const StyledSliderItemBase = rc.button<StyledSliderItemBaseProps>`
  absolute
  h-full
  w-full
  left-0
  top-0
  ${(p) => (p.$active ? "animate-in fade-in" : "animate-out fade-out")}
`;

interface NewStyledSliderItemProps extends StyledSliderItemBaseProps {
  $secondBool: boolean;
}
const NewStyledSliderItemWithNewProps = rc.extend(
  StyledSliderItemBase
)<NewStyledSliderItemProps>`
  rounded-lg
  text-lg
  ${(p) => (p.$active ? "bg-blue" : "bg-red")}
  ${(p) => (p.$secondBool ? "text-underline" : "some-class-here")}
`;

export default () => (
  <NewStyledSliderItemWithNewProps $active $secondBool={false} />
);
// outputs: <button className="absolute h-full w-full left-0 top-0 animate-in fade-in rounded-lg text-lg bg-blue" />
```

### Use rc for creating base component

```tsx
const BaseButton = rc.extend(rc.button``)`
  text-lg
  mt-5
`;
```

### extend from variants

```tsx
interface ButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  $severity: "info" | "warning" | "error";
  $isActive?: boolean;
}

const Alert = rc.input.variants<ButtonProps>({
  base: "p-4",
  variants: {
    $severity: {
      info: (p) =>
        `bg-blue-100 text-blue-800 ${p.$isActive ? "shadow-lg" : ""}`,
    },
  },
});

const ExtendedButton = rc.extend(Alert)<{ $test: boolean }>`
  ${(p) => (p.$test ? "bg-green-100 text-green-800" : "")}
`;

export default () => <ExtendedButton $severity="info" $test />;
// outputs: <input className="p-4 bg-blue-100 text-blue-800 shadow-lg bg-green-100 text-green-800" />
```

### Auto infer types for props

By passing the component, we can validate the component to accept tag related props.
This is useful if you wanna rely on the props for a specific element without the `$` prefix.

```tsx
// if you pass rc component it's types are validated
const ExtendedButton = rc.extend(rc.button``)`
  some-class
  ${(p) => (p.type === "submit" ? "font-normal" : "font-bold")}
`;

// infers the type of the input element + add new props
const MyInput = ({ ...props }: HTMLAttributes<HTMLInputElement>) => (
  <input {...props} />
);
const StyledDiv = rc.extend(MyInput)<{ $trigger?: boolean }>`
  bg-white
  ${(p) => (p.$trigger ? "!border-error" : "")}
  ${(p) => (p.type === "submit" ? "font-normal" : "font-bold")}
`;
```

### Extending other lib components / `any` as Input

Unfortunately we cannot infer the type directly of the component if it's `any` or loosely typed. But we can use a intermediate step to pass the type to the `extend` function.

```tsx
import { ComponentProps } from 'react'
import { MapContainer } from 'react-leaflet'
import { Field, FieldConfig } from 'formik'
import rc, { RcBaseComponent } from 'react-classmate'

// we need to cast the type to ComponentProps
type StyledMapContainerType = ComponentProps<typeof MapContainer>
const StyledMapContainer: RcBaseComponent<StyledMapContainerType> = rc.extend(MapContainer)`
  absolute
  h-full
  w-full
  text-white
  outline-0
`

export const Component = () => <StyledMapContainer bounds={...} />

// or with Formik

import { Field, FieldConfig } from 'formik'

type FieldComponentProps = ComponentProps<'input'> & FieldConfig
const FieldComponent = ({ ...props }: FieldComponentProps) => <Field {...props} />

const StyledField = rc.extend(FieldComponent)<{ $error: boolean }>`
  theme-form-field
  w-full
  ....
  ${p => (p.$error ? '!border-error' : '')}
`

export const Component = () => <StyledField placeholder="placeholder" as="select" name="name" $error />
```

⚠️ This is a workaround! This is a _bug_ - we should be able to pass the types directly in the interface in which we pass `$error`. Contributions welcome.

## CommonJS

If you are using CommonJS, you can import the library like this:

```js
const rc = require("react-classmate").default;

// or

const { default: rc } = require("react-classmate");
```

## Upcoming

- Variants for `rc.extend`
- named lib import for CommonJS (currently only `.default`)
  -- Means we need to remove the named export in the ts file to not duplicate IDE import suggestions:
  --- Change postbuild script to remove named esm export
- Nest components?
- Integrate more tests, benchmarks focused on SSR and React
- Advanced IDE integration
  - show generated default class on hover
  - enforce autocompletion and tooltips from the used libs

## Inspiration

- [tailwind-styled-component](https://github.com/MathiasGilson/tailwind-styled-component)
- [cva](https://github.com/joe-bell/cva)
- [twin.macro](https://github.com/ben-rogerson/twin.macro)
