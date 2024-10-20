# react-dynamic-classnames

Separate styles and classes from your React components, seamlessly integrating with utility-first CSS libraries like UnoCSS and Tailwind. Just like [styled-components](https://github.com/styled-components), just without the need for it.

## The problem

When working with styling libraries like [uno.css](https://unocss.dev/) / [tailwind](https://tailwindcss.com/), it's common to define utility classes directly in your React components. While this approach works for most of our cases, it can lead to cluttered and hard-to-maintain code, especially when dealing with conditional classes and/or dynamic styles.

```tsx
const SomeComponent = () => (
  <div
    className={`text-xl bg-blue-500 mt-5 pr-2 ${isActive ? 'animate-in fade-in' : 'animate-out fade-out'}`}
    aria-label="Hello"
  >
    Hello
  </div>
)
```

## What the tool does:

```tsx
const StyledElement = ds.div<{ $isActive?: boolean }>(
  ({ $isActive }) => `
      text-xl
      bg-blue-500
      mt-5
      pr-2
    ${$isActive ? 'animate-in fade-in' : 'animate-out fade-out'}
  `,
)

const SomeComponent = () =>
  <StyledElement $isActive aria-label="Hello">Hello</StyledDiv>
```

it provides a basic boilerplate to separate styles and classes from your React components and allows you to define your styles and classes in a more declarative way. Just like styled components, but without the need for the CSS-in-JS library.

## Features

- Tiny - no `styled-components` dependency
- works with any utility-first CSS library (UnoCSS, Tailwind, etc.)
- Typescript-Support
- SSR-ready
- CSS objects

### Not re-inventing the wheel

There are other libraries that handle this area well, such as [twin.macro](https://github.com/ben-rogerson/twin.macro)  and [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component). However, these solutions are either too complex for my projects, rely on `styled-components`, or lack SSR compatibility. I prefer a simpler approach with more separation of concerns for handling conditional classes, as demonstrated in the example below.

## Getting started

```bash
npm i react-dynamic-style # or yarn
```

### Simple usage

```tsx
import { ds } from 'react-dynamic-style'

const StyledDiv = ds.div(`
  text-xl
  bg-blue-500
`);

// or const StyledDiv = ds.div('text-xl bg-blue-500');

const SomeComponent = () =>
  <div>
    <StyledDiv>Hello</StyledDiv>
  </div>
```

### Usage with props and css

```tsx
// or extended pattern

interface StyledDivProps {
  $isActive?: boolean
}

const StyledDiv = ds.div<StyledDivProps>(
  ({ $isActive }) => `
    text-2xl
    font-bold
    ${$isActive ? `animate-in fade-in` : `animate-out fade-out`}
  `,
  ({ $isActive }) => ({
    opacity: $isActive ? 1 : 0,
  }),
)

// static css object for arbitrary styles
const StyledDiv = ds.div<StyledDivProps>(
  ({ $isActive }) => `
    text-2xl
    font-bold
    ${$isActive ? `animate-in fade-in` : `animate-out fade-out`}
  `,
  // we do not have to pass a fnc here
  {
    boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1)',
  },
)
```

### Advanced usage with extended pattern

If you need more space for your styles, you can use the extended pattern. This pattern allows you to define dynamic classes and styles in a more readable way.

```tsx
import { ds } from 'react-dynamic-style'

const StyledDiv = ds.div<StyledDivProps>({
  base: 'text-2xl font-bold',
  // optional: dynamic classes
  classes: ({ $isActive }) => [$isActive ? 'animate-in fade-in' : 'animate-out fade-out'],
  // optional: css object with or without dynamic props
  css: ({ $isActive }) => ({
    opacity: $isActive ? 1 : 0,
  }),
})

const SomeComponent = () => {
  const [isActive, setIsActive] = useState(false)

  return <StyledDiv $isActive={isActive}>Henlo</StyledDiv>
}
```

Note how we prefix the dynamic prop with a `$` sign. This is a important convention to distinguish dynamic props from the ones we pass to the component.

This pattern should also avoid conflicts with reserved prop names.

## Inspired by:
- [twin.macro](https://github.com/ben-rogerson/twin.macro)
(to much boilerplate for most of my use cases)
- [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component)
(incompatible with vite / rollup, not SSR-compatible atm)
