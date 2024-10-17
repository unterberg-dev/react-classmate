# styled-classnames
## organize your css-in-js classes

A higher-order function that creates a styled React component with dynamic class names. SSR-compatible

### simple

```tsx
import sc from 'classnames-styled'

const StyledDiv = sc(
  'div', // component tag
  'text-xl' // static classnames
);

<StyledDiv>Hello World</StyledDiv>;
```

### dynamic

```tsx
import sc from 'classnames-styled'

// Define props interface
interface StyledDivProps {
  isActive: boolean;
}

const StyledDiv = cs<StyledDivProps>(
  // component tag
  'div', 
  // base class names
  `
    text-white
    text-2xl
    font-bold
  `,
  // dynamic class names
  ({ isActive }) => [isActive ? `animate-in fade-in` : 'animate-out fade-out'],
)

const SomeComponent = () => {
  const [isActive, setIsActive] = useState(false)

  <StyledDiv isActive={isActive}>Hello</StyledDiv>
}
```