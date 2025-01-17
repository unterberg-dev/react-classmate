import{c as p,X as u,j as e,C as t,b as a,d as l,e as h,B as o,i as m,o as g,a as x}from"../chunks/chunk-CMvKMWtq.js";import{i as y}from"../chunks/chunk-DTLx8GJJ.js";import{D as f}from"../chunks/chunk-BCN8JSgu.js";import{D as r}from"../chunks/chunk-BUH9KIAS.js";import{H as d}from"../chunks/chunk-DXC0PJvX.js";import{S as s,a as i,b as n}from"../chunks/chunk-BFFOM0Zl.js";/* empty css                      */import"../chunks/chunk-CYDrz2XN.js";/* empty css                      *//* empty css                      *//* empty css                      *//**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=p("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]),b=`import { LoaderCircle } from "lucide-react"
import type { HTMLAttributes, ReactNode } from "react"
import { type RcBaseComponent, type VariantsConfig, convertRcProps, createVariantMap } from "react-classmate"

import { APP_CONFIG } from "#lib/config"
import type { Colors } from "#lib/types"
import { isLinkExternal } from "#lib/utils"

// 1. types
interface ButtonBaseProps {
  $size?: "lg" | "md" | "sm" | "xs"
  $color?: Colors
  $disabled?: boolean
  $loading?: boolean
}

// 2. setup variants
const buttonVariants: VariantsConfig<ButtonBaseProps, ButtonBaseProps> = {
  base: ({ $disabled, $loading }) => \`
    transition-colors
    inline-flex items-center justify-center gap-2 
    font-bold
    \${APP_CONFIG.transition.tw}
    \${$disabled ? "opacity-60 cursor-not-allowed" : ""}
    \${$loading ? "opacity-80 pointer-events-none" : ""}
  \`,
  variants: {
    $size: {
      xs: "py-1 px-2 rounded text-xs shadow-sm",
      sm: "py-1.5 px-2.5 rounded text-sm shadow-sm",
      md: "py-1.5 px-3 rounded shadow-sm",
      lg: "py-3 px-4 rounded-lg shadow-md",
    },
    $color: {
      primary: ({ $disabled }) => \`
        text-lightNeutral 
        bg-primaryDarkNeutral 
        \${!$disabled ? "hover:bg-primary" : ""}
      \`,
      secondary: ({ $disabled }) => \`
        text-lightNeutral 
        bg-secondaryDarkNeutral 
        \${!$disabled ? "hover:bg-secondary" : ""}
      \`,
      success: ({ $disabled }) => \`
        text-lightNeutral 
        bg-successDarkNeutral 
        \${!$disabled ? "hover:bg-success" : ""}
      \`,
      warning: ({ $disabled }) => \`
        text-lightNeutral 
        bg-warningDarkNeutral 
        \${!$disabled ? "hover:bg-warning" : ""}
      \`,
      error: ({ $disabled }) => \`
        text-lightNeutral 
        bg-errorDarkNeutral 
        \${!$disabled ? "hover:bg-error" : ""}
      \`,
      neutral: ({ $disabled }) => \`
        text-dark 
        bg-light dark:bg-grayLight 
        \${!$disabled ? "hover:bg-graySuperLight dark:hover:bg-gray" : ""}
      \`,
    },
  },
  defaultVariants: {
    $size: "md",
    $color: "primary",
  },
}

// 3. create variant map
const button = createVariantMap({
  elements: ["button", "a"],
  variantsConfig: buttonVariants,
})

// 4 define the react component
interface ButtonProps extends HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
  icon?: ReactNode
  link?: string
  type?: "button" | "submit" | "reset"

  // we don't want to expose the classmate props to the user (devs) -> redeclare them here
  size?: ButtonBaseProps["$size"]
  color?: ButtonBaseProps["$color"]
  disabled?: ButtonBaseProps["$disabled"]
  loading?: ButtonBaseProps["$loading"]
}

const Button = ({ children, icon, link, ...buttonProps }: ButtonProps) => {
  // cast types
  const Component = link
    ? (button.a as RcBaseComponent<ButtonBaseProps & HTMLAttributes<HTMLAnchorElement>>)
    : (button.button as RcBaseComponent<ButtonBaseProps & HTMLAttributes<HTMLButtonElement>>)
  const isExternal = isLinkExternal(link)

  const preparedProps = convertRcProps(buttonProps, {
    size: "$size",
    loading: "$loading",
    disabled: "$disabled",
    color: "$color",
  })

  return (
    <Component {...(link ? { href: link, target: isExternal ? "_blank" : "" } : {})} {...preparedProps}>
      {icon}
      {children}
      {buttonProps.loading && <LoaderCircle className="w-4 h-4 animate-spin" />}
    </Component>
  )
}

// 6. export(s)
export default Button
`,w=`import Button from "./Button.tsx"

const SomeComponent = () => (
  <>
    <Button type="button" size="lg">Button Big</Button>
    <Button type="button">Button Medium</Button>
    <Button type="button" size="sm">Button Small</Button>
    <Button type="button" size="xs">Button Extra Small</Button>
  </>
)`,v=u.div`
  flex
  flex-wrap
  items-center
  gap-4
  w-full
`,B=()=>e.jsxs(e.Fragment,{children:[e.jsx(f,{main:"Button Component (Tailwind / Uno)",pre:"Designing with Variants",excerpt:e.jsxs(e.Fragment,{children:["An example of an advanced Tailwind / Uno (Windi) button component that fully utilizes the features of ",e.jsx(t,{children:"variants"})," and Tailwind classes."]})}),e.jsxs(r,{type:"warning",icon:c,className:"!mb-8",children:["This article is currently under construction. If you need more explanation how parts of this component works, see the well documented"," ",e.jsx(a,{href:l.example.headline,children:"Headline Component"}),"."]}),e.jsx(s,{children:"Intro: It all started here"}),e.jsxs(i,{children:[e.jsxs(n,{children:['The task of blueprinting a redundantly placed button, fully utilizing its design through property-controlled utility classes. Writing this only as a React component is a nightmare. And even then, at the point when you think you finally have this one "perfect button," you are unable to properly maintain it through the variability of project requirements and the resulting "horizontal styling." My wish was to read those heavily styled components like a book, with all the information I need to know about its design and behavior. This is why I created'," ",e.jsx(a,{href:l.start,children:"react-classmate"}),"."]}),e.jsx(n,{children:"The main idea of this project is to engage myself in properly designing and managing class names and separating them from the application logic."}),e.jsxs("p",{children:["This example requires you to have a basic understanding of Tailwind and its utility classes. If you are not familiar with it, I recommend that you read the"," ",e.jsx(a,{href:"https://tailwindcss.com/docs/utility-first",children:'Tailwind "Utility-First Fundamentals"'})," ","first."]})]}),e.jsx(s,{children:"Full Code"}),e.jsxs(i,{children:[e.jsxs(n,{children:["The code below features dark (:dark) mode, hover (:hover), and active (:active) states as utility classes. You can also control the ",e.jsx(t,{children:"noGutter"}),","," ",e.jsx(t,{children:"disabled"}),",",e.jsx(t,{children:"loading"}),","," ",e.jsx(t,{children:"noShadow"}),", and ",e.jsx(t,{children:"type"})," properties."]}),e.jsxs(n,{children:["This introduces the usage of the utility type ",e.jsx(t,{children:"VariantsConfig"})," and the utility function ",e.jsx(t,{children:"convertRcProps"}),". More on both below."]}),e.jsx(d,{input:b}),e.jsxs(r,{className:"!mb-0",children:[e.jsxs(h,{children:["Usage of the Important ",e.jsx(t,{children:"!"})," Prefix in Tailwind"]}),e.jsxs(n,{children:["In general, I would not recommend using the ",e.jsx(t,{children:"!"})," override (which is similar to !important) too often in classmate components, since we should preserve its usage. In the case of this button, we only override the padding and the shadow, which can be set using explicit props."]})]})]}),e.jsx(s,{children:"Button Sizing"}),e.jsxs(i,{children:[e.jsxs(n,{children:["This is a basic button with the ",e.jsx(t,{children:'type="button"'})," attribute."]}),e.jsx("div",{children:e.jsx(d,{input:w})}),e.jsxs(v,{children:[e.jsx(o,{type:"button",size:"lg",children:"Button Big"}),e.jsx(o,{type:"button",children:"Button Medium"}),e.jsx(o,{type:"button",size:"sm",children:"Button Small"}),e.jsx(o,{type:"button",size:"xs",children:"Button Extra Small"})]})]}),e.jsx(i,{children:e.jsx(r,{icon:c,className:"!mb-0",children:"More examples coming soon!"})})]}),j=Object.freeze(Object.defineProperty({__proto__:null,default:B},Symbol.toStringTag,{value:"Module"})),T=()=>"Advanced Tailwind Button | react-classmate",P=Object.freeze(Object.defineProperty({__proto__:null,default:T},Symbol.toStringTag,{value:"Module"})),M={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},Loading:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/Loading",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:m}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:g}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},lang:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","lang"]},valueSerialized:{type:"js-serialized",value:"en"}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/pages/docs/+Layout.tsx",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/pages/+Layout.tsx",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"plus-file",exportValues:y},{type:"plus-file",exportValues:x}]},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/examples/button/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:j}},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/examples/button/+title.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:P}}};export{M as configValuesSerialized};
