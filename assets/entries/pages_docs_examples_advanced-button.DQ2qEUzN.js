import{X as l,j as e,C as t,L as r,b as d,H as u,B as n,i as c,o as p,a as h}from"../chunks/chunk-D9omzb_q.js";import{i as m}from"../chunks/chunk-BIcnJ08U.js";import{D as g,H as s}from"../chunks/chunk-LWXXMUun.js";import{S as a,a as i,c as o}from"../chunks/chunk-CuSZpGbS.js";import{D as x}from"../chunks/chunk-F-X9b3Cv.js";/* empty css                      */import"../chunks/chunk-CYDrz2XN.js";/* empty css                      *//* empty css                      *//* empty css                      */const f=`// Button.tsx
import { LoaderCircle } from "lucide-react"
import type { HTMLAttributes, ReactNode } from "react"
import rc, { type VariantsConfig, convertRcProps } from "react-classmate"

import { APP_CONFIG } from "#lib/config"
import { isLinkExternal } from "#lib/utils"

interface ButtonBaseProps {
  $size?: "lg" | "md" | "sm" | "xs"
  $color?: "primary" | "secondary" | "error" | "success" | "warning" | "copy" | "hollow" | "icon"
  $disabled?: boolean
  $loading?: boolean
  $noShadow?: boolean
  $noGutter?: boolean
}

const buttonVariants: VariantsConfig<ButtonBaseProps, ButtonBaseProps> = {
  base: ({ $noShadow, $noGutter, $disabled, $loading }) => \`
    transition-colors duration-350 ease-out
    inline-flex items-center justify-center gap-2 
    font-bold
    \${APP_CONFIG.uno.transitionWind}
    \${$noShadow ? "!shadow-none" : "shadow-darkNeutral/20"}
    \${$noGutter ? "!p-0" : ""}
    \${$disabled ? "opacity-60 cursor-not-allowed" : ""}
    \${$loading ? "opacity-80 pointer-events-none" : ""}
  \`,
  variants: {
    $size: {
      xs: "py-1 px-2 rounded text-xs shadow-sm",
      sm: "py-1.5 px-2.5 rounded text-sm shadow-sm",
      md: "py-2 px-3 rounded shadow-sm",
      lg: "py-3 px-4 rounded-lg shadow-md",
    },
    $color: {
      hollow: "bg-transparent",
      primary: ({ $disabled }) => \`
        text-lightNeutral 
        bg-primaryDarkNeutral 
        \${!$disabled ? "hover:bg-primary" : ""}
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
      copy: ({ $disabled }) => \`
        bg-white
        dark:bg-gray/30
        text-dark
        active:bg-successDarkNeutral active:text-lightNeutral
        dark:active:bg-successDarkNeutral dark:active:text-lightNeutral
        \${!$disabled ? "hover:text-dark hover:bg-grayLight/30 dark:hover:bg-gray/50" : ""}
      \`,
      icon: \`
        rounded-full
        w-7 lg:w-8 h-7 lg:h-8
        bg-gray/20 dark:bg-grayLight 
        text-dark dark:text-grayDark
      \`,
    },
  },
  defaultVariants: {
    $size: "md",
    $color: "primary",
  },
}

const ButtonBase = rc.button.variants(buttonVariants)
const LinkButton = rc.a.variants(buttonVariants)

interface ButtonProps extends HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
  icon?: ReactNode
  link?: string
  type?: "button" | "submit" | "reset"

  // we must redeclare these props here because $-props are not inherited from ButtonBaseProps
  size?: ButtonBaseProps["$size"]
  color?: ButtonBaseProps["$color"]
  disabled?: ButtonBaseProps["$disabled"]
  loading?: ButtonBaseProps["$loading"]
  noShadow?: ButtonBaseProps["$noShadow"]
  noGutter?: ButtonBaseProps["$noGutter"]
}

const Button = ({ children, icon, link, ...buttonProps }: ButtonProps) => {
  const Component = link ? LinkButton : ButtonBase

  const preparedProps = convertRcProps(buttonProps, {
    size: "$size",
    noShadow: "$noShadow",
    noGutter: "$noGutter",
    loading: "$loading",
    disabled: "$disabled",
    color: "$color",
  })

  const isExternal = isLinkExternal(link)

  return (
    <Component {...(link ? { href: link, target: isExternal ? "_blank" : "" } : {})} {...preparedProps}>
      {icon}
      {children}
      {buttonProps.loading && <LoaderCircle className="w-4 h-4 animate-spin" />}
    </Component>
  )
}

export default Button`,b=`import Button from "./Button.tsx"

const SomeComponent = () => (
  <>
    <Button type="button" size="lg">Button Big</Button>
    <Button type="button">Button Medium</Button>
    <Button type="button" size="sm">Button Small</Button>
    <Button type="button" size="xs">Button Extra Small</Button>
  </>
)`,y=l.div`
  flex
  flex-wrap
  items-center
  gap-4
  w-full
`,w=()=>e.jsxs(e.Fragment,{children:[e.jsx(g,{main:"Advanced Tailwind Button",pre:"Working with Variants",excerpt:e.jsxs(e.Fragment,{children:["An example of an advanced Tailwind / Uno (Windi) button component that fully utilizes the features of ",e.jsx(t,{children:"variants"})," and Tailwind classes."]})}),e.jsx(a,{children:"Dev Note: It all started here"}),e.jsxs(i,{children:[e.jsxs("p",{children:['The task of blueprinting a redundantly placed button, fully utilizing its design through property-controlled utility classes. Writing this only as a React component is a nightmare. And even then, at the point when you think you finally have this one "perfect button," you are unable to properly maintain it through the variability of project requirements and the resulting "horizontal styling." My wish was to read those heavily styled components like a book, with all the information I need to know about its design and behavior. This is why I created'," ",e.jsx(r,{href:d.start,children:"react-classmate"}),"."]}),e.jsx(o,{children:"The main idea of this project is to engage myself in properly designing and managing class names and separating them from the application logic."}),e.jsxs(o,{children:["This example requires you to have a basic understanding of Tailwind and its utility classes. If you are not familiar with it, I recommend that you read the"," ",e.jsx(r,{href:"https://tailwindcss.com/docs/utility-first",children:'Tailwind "Utility-First Fundamentals"'})," ","first."]})]}),e.jsx(a,{children:"Button Component"}),e.jsxs(i,{children:[e.jsxs("p",{children:["The code below features dark (:dark) mode, hover (:hover), and active (:active) states as utility classes. You can also control the ",e.jsx(t,{children:"noGutter"}),","," ",e.jsx(t,{children:"disabled"}),",",e.jsx(t,{children:"loading"}),","," ",e.jsx(t,{children:"noShadow"}),", and ",e.jsx(t,{children:"type"})," properties."]}),e.jsxs(o,{children:["This introduces the usage of the utility type ",e.jsx(t,{children:"VariantsConfig"})," and the utility function ",e.jsx(t,{children:"convertRcProps"}),". More on both below."]}),e.jsx(s,{input:f}),e.jsxs(x,{children:[e.jsxs(u,{children:["Usage of the Important ",e.jsx(t,{children:"!"})," Prefix in Tailwind"]}),e.jsxs(o,{children:["In general, I would not recommend using the ",e.jsx(t,{children:"!"})," override (which is similar to !important) too often in classmate components, since we should preserve its usage. In the case of this button, we only override the padding and the shadow, which can be set using explicit props."]})]})]}),e.jsx(a,{children:"Button Sizing"}),e.jsxs(i,{children:[e.jsxs("p",{children:["This is a basic button with the ",e.jsx(t,{children:'type="button"'})," attribute."]}),e.jsx("div",{children:e.jsx(s,{input:b})}),e.jsxs(y,{children:[e.jsx(n,{type:"button",size:"lg",children:"Button Big"}),e.jsx(n,{type:"button",children:"Button Medium"}),e.jsx(n,{type:"button",size:"sm",children:"Button Small"}),e.jsx(n,{type:"button",size:"xs",children:"Button Extra Small"})]})]})]}),v=Object.freeze(Object.defineProperty({__proto__:null,default:w},Symbol.toStringTag,{value:"Module"})),B=()=>"Advanced Tailwind Button | react-classmate",j=Object.freeze(Object.defineProperty({__proto__:null,default:B},Symbol.toStringTag,{value:"Module"})),E={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},Loading:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/Loading",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:c}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:p}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},lang:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","lang"]},valueSerialized:{type:"js-serialized",value:"en"}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/pages/docs/+Layout.tsx",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/pages/+Layout.tsx",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"plus-file",exportValues:m},{type:"plus-file",exportValues:h}]},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/examples/advanced-button/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:v}},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/examples/advanced-button/+title.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:j}}};export{E as configValuesSerialized};
