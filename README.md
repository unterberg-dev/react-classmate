# react-styled-classnames

## Separate class names from your components - the simple way 🫰

A function which creates a styled React component with dynamic class names. SSR-compatible & works with unocss / tailwind.

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
  'div', // component tag
  'text-xl' // static classnames
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
  'div',
  `
    text-white
    text-2xl
    font-bold
  `,
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
(not strictly build and incompatible with rollup - not suited for ssr)