# react-styled-classnames

Separate styles/classes from your react-components - the simple way 🫰

## The problem

While developing with react and [uno.css](https://unocss.dev/) / [tailwind](https://tailwindcss.com/), I found myself writing utility classes and conditions directly in the components `className` attribute:

```tsx
<div className={`text-white text-2xl font-bold ${isActive ? 'animate-in fade-in' : 'animate-out fade-out'}`}>Hello</div>
```

That made the components hard to read and maintain, since we often need conditional classes and animations.

## The mission

- simple utility to separate class names from the components
- SSR-compatible
- work with any class name, including tailwind or unocss (presets).
- no `styled-components` or `emotion` libs
- pass (dynamic) css objects 

### Not re-inventing the wheel

There are libs outside that do a great job in this area, like [twin.macro](https://github.com/ben-rogerson/twin.macro) or [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component), but they are either too complex, using `styled-components` or are not SSR-compatible. Additionally I like to work with a little bit more separation of concerns when it comes to conditional classes, as you can see in the example below.

## Getting started

```bash
npm i react-styled-classnames # or yarn
```

### Simple usage

```tsx
import sc from 'react-styled-classnames'

const StyledDiv = sc('div', 'text-xl bg-blue-500');

const SomeComponent = () => 
  <div>
    <StyledDiv>Hello</StyledDiv>
  </div>
```

### Advanced usage

```tsx
import sc from 'react-styled-classnames'

// props interface
interface StyledDivProps {
  $isActive?: boolean
}

const StyledDiv = sc<StyledDivProps>(
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
const MyElement = sc('div', 'text-xl bg-blue-500' );

const SomeComponent = () => <MyElement src="hello-world">Weird prop pass</MyElement>

// this creates html with a invalid property "src":
// <div src="hello-world" class="text-xl bg-blue-500">...
```

## Upcoming features
- typescript should emit error if we use invalid properties (see above)

## Inspired by:
- [twin.macro](https://github.com/ben-rogerson/twin.macro)
(to much boilerplate for most of my use cases)
- [tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-component)
(incompatible with vite / rollup, not SSR-compatible atm)