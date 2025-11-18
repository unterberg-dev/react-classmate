# solid-classmate

[![npm](https://img.shields.io/npm/v/solid-classmate)](https://www.npmjs.com/package/solid-classmate)
[![npm bundle size](https://img.shields.io/bundlephobia/min/solid-classmate)](https://bundlephobia.com/result?p=solid-classmate)

A tool for managing Solid component class names, variants and styles.

## 🚩 Transform this

```jsx
const SomeButton = ({ isLoading, ...props }) => {
  const activeClass = isLoading
    ? "bg-blue-400 text-white"
    : "bg-blue-800 text-blue-200";

  return (
    <button
      {...props}
      className={`transition-all mt-5 border-1 md:text-lg text-normal ${someConfig.transitionDurationEaseClass} ${activeClass} ${
        props.className || ""
      }`}
    >
      {props.children}
    </button>
  );
};
```

## 🌤️ Into

```js
const SomeButton = sc.button`
  text-normal
  md:text-lg
  mt-5
  border-1
  transition-all
  ${someConfig.transitionDurationEaseClass}
  ${({ $isLoading }) => ($isLoading ? "opacity-90 pointer-events-none" : "")}
`;
```

## Features

- Class name-focused components
- Variants
- Extend components
- Dynamic styles
- TypeScript support
- Tested with SSR Frameworks
- Classname merging

## New Documentation online!

#### [Head over to the new docs page](https://solid-classmate.dev/)

## Contents

- [Features](#features)
- [Getting started](#getting-started)
- [Basic usage](#basic)
- [Usage with props](#use-with-props)
- [Create Variants](#create-variants)
- [Extend components](#extend)
- [Add CSS Styles](#add-css-styles)
- [Use inside Solid components](#use-inside-solid-components---createclassmate)
- [Add logic headers](#add-logic-headers)
- [Recipes for `sc.extend`](#recipes-for-sc-extend)
  - [Use sc for creating base component](#use-sc-for-creating-base-component)
  - [Auto infer types for props](#auto-infer-types-for-props)
  - [Extending other lib components / `any` as Input](#extending-other-lib-components--any-as-input)

## Getting started

Make sure you have installed [SolidJS](https://www.solidjs.com/) (> 1.8.0) in your
project.

```bash
npm i solid-classmate
# or
yarn add solid-classmate
```

## Basic

Create a component by calling `sc` with a tag name and a template literal
string.

```tsx
import sc from "solid-classmate";

const Container = sc.div`
  py-2
  px-5
  min-h-24
`;
// transforms to: <div className="py-2 px-5 min-h-24" />
```

Additional Information:
[See "Base usage" documentation](https://solid-classmate.dev/docs/basic/)

### Use with props

Pass props to the component and use them in the template literal string and in
the component prop validation.

```tsx
// hey typescript
interface ButtonProps {
  $isActive?: boolean;
  $isLoading?: boolean;
}
const SomeButton = sc.button<ButtonProps>`
  text-lg
  mt-5
  ${(
  p,
) => (p.$isActive ? "bg-blue-400 text-white" : "bg-blue-400 text-blue-200")}
  ${(p) => (p.$isLoading ? "opacity-90 pointer-events-none" : "")}
`;
// transforms to <button className="text-lg mt-5 bg-blue-400 text-white opacity-90 pointer-events-none" />
```

### Prefix incoming props with `$`

**we prefix the props incoming to dc with a `$` sign**. This is a important
convention to distinguish dynamic props from the ones we pass to the component.

_This pattern should also avoid conflicts with reserved prop names._

## Create Variants

Create variants by passing an object to the `variants` key like in
[cva](https://cva.style/docs/getting-started/variants). The key should match the
prop name and the value should be a function that returns a string. You could
also re-use the props in the function.

```tsx
interface AlertProps {
  $severity: "info" | "warning" | "error";
  $isActive?: boolean;
}
const Alert = sc.div.variants<AlertProps>({
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

Additional Information:
[See "Variants" documentation](https://solid-classmate.dev/docs/variants/)

### Typescript: Separate base props and variants with a second type parameter

As seen above, we also pass `AlertProps` to the variants, which can cause loose
types. If you want to separate the base props from the variants, you can pass a
second type to the `variants` function so that only those props are available in
the variants.

```tsx
interface AlertProps {
  $isActive?: boolean;
}
interface AlertVariants {
  $severity: "info" | "warning" | "error";
}
const Alert = sc.div.variants<AlertProps, AlertVariants>({
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

## Extend

Extend a component directly by passing the component and the tag name.

```tsx
import MyOtherComponent from "./MyOtherComponent"; // () => <button className="text-lg mt-5" />
import sc from "solid-classmate";

const Container = sc.extend(MyOtherComponent)`
  py-2
  px-5
  min-h-24
`;
// transforms to: <button className="text-lg mt-5 py-2 px-5 min-h-24" />
```

Additional Information:
["Extend" documentation](https://solid-classmate.dev/docs/extend/)

## Add CSS Styles

You can use CSS styles in the template literal string with the `style` function.
This function takes an object with CSS properties and returns a string. We can
use the props from before.

```tsx
// Base:
const StyledButton = sc.button<{ $isDisabled: boolean }>`
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
const BaseButton = sc.button<{ $isActive?: boolean }>`
  ${(p) =>
  p.style({
    backgroundColor: p.$isActive ? "green" : "red",
  })}
`;
const ExtendedButton = sc.extend(BaseButton)<{ $isLoading?: boolean }>`
  ${(p) =>
  p.style({
    opacity: p.$isLoading ? 0.5 : 1,
    pointerEvents: p.$isLoading ? "none" : "auto",
  })}
`;
export default () => <ExtendedButton $isActive $isLoading />;
// outputs: <button className="bg-red" style="opacity: 0.5; pointer-events: none;" />
```

### Use inside Solid components - `createClassmate`

Solid components only execute once, so you can safely declare classmate
components inline. When you still want a helper to encapsulate that factory,
`createClassmate` simply evaluates the callback and returns the generated
component.

```tsx
import sc, { createClassmate } from "solid-classmate";

const WorkoutDay = ({ status }: { status: "completed" | "pending" }) => {
  const StyledDay = createClassmate(() =>
    sc.div.variants({
      base: "rounded border p-4 text-sm",
      variants: {
        $status: {
          completed: "border-green-400 bg-green-50",
          pending: "border-yellow-400 bg-yellow-50",
        },
      },
    }),
  );

  return <StyledDay $status={status}>Workout details</StyledDay>;
};
```

The helper mirrors the legacy `useClassmate` API but without dependency
tracking since Solid props are already stable.

### Add logic headers

Use `.logic()` to run arbitrary JavaScript once per render before your class
names or variants are computed. The return value is shallow-merged back into the
props, so you can derive `$` props, DOM attributes, or anything else your
component needs without additional hooks.

```tsx
type DayStatus = "completed" | "pending"

interface WorkoutProps {
  workouts: unknown[]
  allResolved: boolean
  hasCompleted: boolean
  hasSkipped: boolean
  $status?: DayStatus
}

const WorkoutDay = sc.div
  .logic<WorkoutProps>((props) => {
    const status = deriveDayStatus(props)
    return {
      $status: status,
      ["data-status"]: status,
    }
  })
  .variants<WorkoutProps, { $status: DayStatus }>({
    base: "rounded border p-4",
    variants: {
      $status: {
        completed: "bg-green-50 border-green-400",
        pending: "bg-white border-slate-200",
      },
    },
  })

// Consumers only pass raw workout data – the logic header derives $status for you.
<WorkoutDay workouts={workouts} allResolved hasCompleted hasSkipped={false} />
```

> Return values from `.logic()` are merged in order, so later logic calls can
> reference earlier results or override them.

## Recipes for `sc.extend`

With `sc.extend`, you can build upon any base Solid component, adding new styles
and even supporting additional props. This makes it easy to create reusable
component variations without duplicating logic.

```tsx
import { ArrowBigDown } from "lucide-solid";
import sc from "solid-classmate";

const StyledLucideArrow = sc.extend(ArrowBigDown)`
  md:-right-4.5
  right-1
  slide-in-r-20
`;

// ts: we can pass only props which are accessible on a `lucide-solid` Component
export default () => <StyledLucideArrow stroke="3" />;
```

⚠️ Having problems by extending third party components, see:
[Extending other lib components](#extending-other-lib-components--juggling-with-components-that-are-any)

Now we can define a base component, extend it with additional styles and
classes, and pass properties. You can pass the types to the `extend` function to
get autocompletion and type checking.

```tsx
import sc from "solid-classmate";

interface StyledSliderItemBaseProps {
  $active: boolean;
}
const StyledSliderItemBase = sc.button<StyledSliderItemBaseProps>`
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
const NewStyledSliderItemWithNewProps = sc.extend(
  StyledSliderItemBase,
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

### Use sc for creating base component

```tsx
const BaseButton = sc.extend(sc.button``)`
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

const Alert = sc.input.variants<ButtonProps>({
  base: "p-4",
  variants: {
    $severity: {
      info: (p) =>
        `bg-blue-100 text-blue-800 ${p.$isActive ? "shadow-lg" : ""}`,
    },
  },
});

const ExtendedButton = sc.extend(Alert)<{ $test: boolean }>`
  ${(p) => (p.$test ? "bg-green-100 text-green-800" : "")}
`;

export default () => <ExtendedButton $severity="info" $test />;
// outputs: <input className="p-4 bg-blue-100 text-blue-800 shadow-lg bg-green-100 text-green-800" />
```

### Auto infer types for props

By passing the component, we can validate the component to accept tag related
props. This is useful if you wanna rely on the props for a specific element
without the `$` prefix.

```tsx
// if you pass sc component it's types are validated
const ExtendedButton = sc.extend(sc.button``)`
  some-class
  ${(p) => (p.type === "submit" ? "font-normal" : "font-bold")}
`;

// infers the type of the input element + add new props
const MyInput = ({ ...props }: JSX.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} />
);
const StyledDiv = sc.extend(MyInput)<{ $trigger?: boolean }>`
  bg-white
  ${(p) => (p.$trigger ? "!border-error" : "")}
  ${(p) => (p.type === "submit" ? "font-normal" : "font-bold")}
`;
```

### Extending other lib components / `any` as Input

Unfortunately we cannot infer the type directly of the component if it's `any`
or loosely typed. But we can use a intermediate step to pass the type to the
`extend` function.

```tsx
import type { ComponentProps } from "solid-js";
import { MapView } from "solid-awesome-map";
import { Field, type FieldProps } from "@modular-forms/solid";
import sc, { ScBaseComponent } from "solid-classmate";

// we need to cast the type to ComponentProps
type StyledMapProps = ComponentProps<typeof MapView>;
const StyledMap: ScBaseComponent<StyledMapProps> = sc.extend(MapView)`
  absolute
  h-full
  w-full
  text-white
  outline-0
`;

export const Component = () => <StyledMap bounds={...} />;

// or with another Solid form library

type FieldComponentProps = ComponentProps<typeof Field> & FieldProps;
const FieldComponent = ({ ...props }: FieldComponentProps) => <Field {...props} />;

const StyledField = sc.extend(FieldComponent)<{ $error: boolean }>`
  theme-form-field
  w-full
  ....
  ${(p) => (p.$error ? "!border-error" : "")}
`;

export const Component = () => <StyledField placeholder="placeholder" name="name" $error />;
```

⚠️ This is a workaround! This is a _bug_ - we should be able to pass the types
directly in the interface in which we pass `$error`. Contributions welcome.

## CommonJS

If you are using CommonJS, you can import the library like this:

```js
const sc = require("solid-classmate").default;

// or

const { default: sc } = require("solid-classmate");
```

## Tailwind Merge

solid-classmate uses [tailwind-merge](https://github.com/dcastil/tailwind-merge)
under the hood to merge class names. The last class name will always win, so you
can use it to override classes.

## Upcoming

- bug / troubleshoot: classnames set by ref.current (useRef) will be overwritten
  as soon component rerenders
  - needs at least a small article in the docs
- `sc.raw()` and `sc.raw.variants()` for only using `sc` syntax for classnames
  (output as string)
- Variants for `sc.extend`
- named lib import for CommonJS (currently only `.default`) -- Means we need to
  remove the named export in the ts file to not duplicate IDE import
  suggestions: --- Change postbuild script to remove named esm export
- Integrate more tests, benchmarks focused on SSR and Solid
- Advanced IDE integration
  - show generated default class on hover
  - enforce autocompletion and tooltips from the used libs

## Inspiration

- [tailwind-styled-component](https://github.com/MathiasGilson/tailwind-styled-component)
- [cva](https://github.com/joe-bell/cva)
- [twin.macro](https://github.com/ben-rogerson/twin.macro)
