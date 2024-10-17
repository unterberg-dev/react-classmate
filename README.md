# classnames-styled

A higher-order function that creates a styled React component with dynamic class names. SSR-compatible.

```bash
npm i classnames-styled
# or
yarn add classnames-styled
```

Inspired by:
- [twin.macro](https://github.com/ben-rogerson/twin.macro)
(to complicated for most of my use cases)

- [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component)
(not strictly build and incompatible with rollup - not suited for ssr)

### simple

```tsx
import cs from 'classnames-styled'

const StyledDiv = cs(
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
import cs from 'classnames-styled'

// props interface
interface StyledDivProps {
  isActive?: boolean
}

const StyledDiv = cs<StyledDivProps>(
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