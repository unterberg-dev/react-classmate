# react-dynamic-style

Separate styles and classes from your React components, seamlessly integrating with utility-first CSS libraries like UnoCSS and Tailwind. 🫰

## The problem

When working with styling libraries like [uno.css](https://unocss.dev/) / [tailwind](https://tailwindcss.com/), it's common to define utility classes directly in your React components. While this approach works for most of our cases, it can lead to cluttered and hard-to-maintain code, especially when dealing with conditional classes, dynamic styles, or complex animations.

```tsx
<div className={`text-white text-2xl font-bold ${isActive ? 'animate-in fade-in' : 'animate-out fade-out'}`}>Hello</div>
```

## What the tool does

- Compatible with SSR (Server-Side Rendering)
- Works seamlessly with popular utility-first libraries like UnoCSS and Tailwind
- Allows passing dynamic CSS objects, in addition to class names
- No dependency on styled-components or emotion
- TS Support (WIP)

### Not re-inventing the wheel

There are other libraries that handle this area well, such as [twin.macro](https://github.com/ben-rogerson/twin.macro)  and [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component). However, these solutions are either too complex, rely on `styled-components`, or lack SSR compatibility. I prefer a simpler approach with more separation of concerns for handling conditional classes, as demonstrated in the example below.

## Getting started

```bash
npm i react-dynamic-style # or yarn
```

### Simple usage

```tsx
import { ds } from 'react-dynamic-style'

const StyledDiv = ds('div', 'text-xl bg-blue-500');

const SomeComponent = () => 
  <div>
    <StyledDiv>Hello</StyledDiv>
  </div>
```

### Advanced usage

```tsx
import { ds } from 'react-dynamic-style'

// props interface
interface StyledDivProps {
  $isActive?: boolean
}

const StyledDiv = ds<StyledDivProps>(
  // component tag
  'div',
  {
    base: 'text-white text-2xl font-bold',
    // optional: dynamic classes
    classes: ({ $isActive }) => [
      $isActive
        ? 'animate-in fade-in'
        : 'animate-out fade-out',
    ],
    // optional: css object with or without dynamic props
    css: ({ $isActive }) => ({
      opacity: $isActive ? 1 : 0,
    }),
  }
);

const SomeComponent = () => {
  const [isActive, setIsActive] = useState(false)

  return <StyledDiv $isActive={isActive}>Henlo</StyledDiv>
}
```

### ⚠️ Heads up!

Atm you can pass props wildly (typescript does not check the prop types), which produces evtl. invalid html like this:

```tsx
const MyElement = ds('div', 'text-xl bg-blue-500' );

const SomeComponent = () => <MyElement src="hello-world">Invalid src prop pass</MyElement>

// this creates html with a invalid property "src":
// <div src="hello-world" class="text-xl bg-blue-500">...
```

## Upcoming features
- typescript should emit error if we use invalid properties (see above) ⬆️

## Inspired by:
- [twin.macro](https://github.com/ben-rogerson/twin.macro)
(to much boilerplate for most of my use cases)
- [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component)
(incompatible with vite / rollup, not SSR-compatible atm)