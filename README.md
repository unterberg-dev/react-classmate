# react-styled-classnames

Separate class names from your components - the simple way 🫰

While developing with react and uno.css, I found myself writing the classNames and conditions directly in the components. That made the components hard to read and maintain, since I often need conditional classes and animations.

This is a simple utility to separate the class names from the components, making it SSR-compatible & works with any class name, including tailwind or unocss (presets).

No `styled-components` or `emotion` needed, it's just a simple function that returns a styled component. 

### Getting started

```bash
npm i react-styled-classnames
# or
yarn add react-styled-classnames
```

### simple

```tsx
import sc from 'react-styled-classnames'

const StyledDiv = sc(
  // component tag
  'div', 
  // static classnames
  `
    text-xl
    bg-blue-500
  ` 
);

const SomeComponent = () => 
  <div>
    <StyledDiv>Hello</StyledDiv>
  </div>
```

### dynamic

```tsx
import sc from 'react-styled-classnames'

// props interface
interface StyledDivProps {
  isActive?: boolean
}

const StyledDiv = sc<StyledDivProps>(
  // component tag
  'div',
  // static
  `
    text-white
    text-2xl
    font-bold
  `,
  // property based
  ({ isActive }) => [
    isActive
      ? `
        animate-in
        fade-in
      `
      : `
        animate-out
        fade-out
      `,
  ],
)

const SomeComponent = () => {
  const [isActive, setIsActive] = useState(false)

  return <StyledDiv isActive={isActive}>Henlo</StyledDiv>
}
```

### Inspired by:
- [twin.macro](https://github.com/ben-rogerson/twin.macro)
(to complicated for most of my use cases)
- [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component)
(incompatible with vite / rollup - not suited for ssr)