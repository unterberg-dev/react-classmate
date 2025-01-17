import{j as e,b as s,d as l,C as r,i as d,o as c,a as p}from"../chunks/chunk-CMvKMWtq.js";import{i as u}from"../chunks/chunk-DTLx8GJJ.js";import{D as h}from"../chunks/chunk-BCN8JSgu.js";import{D as m,C as x}from"../chunks/chunk-BUH9KIAS.js";import{H as t}from"../chunks/chunk-DXC0PJvX.js";import{S as a,a as i,b as n,c as o}from"../chunks/chunk-BFFOM0Zl.js";/* empty css                      */import"../chunks/chunk-CYDrz2XN.js";/* empty css                      *//* empty css                      *//* empty css                      */const f=`// this could be almost any component that accepts a className prop
const MyInput = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => <input {...props} />

const StyledInput = rc.extend(MyInput)<{ $trigger?: boolean }>\`
  bg-white
  border-1
  \${(p) => (p.$trigger ? "border-error" : "border-gray")}
\``,y=`<StyledInput type="text" $trigger />
// renders:
// <input type="text" class="bg-white border-1 border-error" />

<ExtendedInput type="text" $trigger $someBool />
// renders:
// <input type="text" class="bg-white border-1 border-error custom-class shadow text-lg text-red" />`,g=`type GradientType = "variants" | "thanks" | "footer"

const SectionGradient = rc.div.variants<{ $type: GradientType }>({
  base: \`
    absolute -mt-100 left-0 w-full
    h-100 
    bg-gradient-to-t
    pointer-events-none
  \`,
  variants: {
    $type: {
      variants: "from-primarySuperLight top-0",
      thanks: "from-primaryLight/40 bottom-0",
      footer: "from-light",
    }
  }
})`,b='const ExtendedStyledInput = rc.extend(StyledInput)<{ $someBool?: boolean }>`\n  custom-class\n  ${(p) => (p.$someBool ? "shadow" : "")}\n  ${(p) => (p.type === "text" ? "text-lg" : "")}\n  ${(p) => (p.$trigger ? "text-red" : "")}\n`',w=`import { ArrowBigDown } from "lucide-react"
import rc from "react-classmate"

const StyledLucideArrow = rc.extend(ArrowBigDown)\`
  md:-right-4.5
  right-1
  slide-in-r-20
\`

// ts: we can pass only props which are accessible on a \`lucid-react\` Component
export default () => <StyledLucideArrow stroke="3" />`,S=`// ...
import Notebox from "#components/common/Notebox"

export const Section = rc.extend(Notebox)\`
  mb-8
\`
export const SectionHeadline = rc.extend(H3Headline)\`
  mb-4
\`
export const SectionInnerHeadline = rc.extend(H4Headline)\`
  mt-4
\`
// .... 
`,j=`// probably unused :/
const GradientBase = rc.div\`
  absolute -mt-100 left-0 w-full
  h-100 
  bg-gradient-to-t
  pointer-events-none
\`

const VariantsGradient = rc.extend(GradientBase)\`
  from-primarySuperLight 
  top-0
\`
const ThanksGradient = rc.extend(GradientBase)\`
 from-primaryLight/40
 bottom-0
\`
const FooterGradient = rc.extend(GradientBase)\`
 from-light
 bottom-0
\``,T=()=>e.jsxs(e.Fragment,{children:[e.jsx(h,{pre:"Reuse, Share & Extend",main:"Extend Components",excerpt:"The extend function allows extending upon almost any react-component with our classmate syntax."}),e.jsx(a,{children:"Basic Syntax"}),e.jsxs(i,{children:[e.jsx(n,{children:"We pass a input component and extend it with our classmate syntax. The extend function returns a new component."}),e.jsx(t,{input:f}),e.jsx(n,{children:"Extend as often as you want:"}),e.jsx(t,{input:b}),e.jsx(o,{children:"Implementation"}),e.jsx(t,{input:y}),e.jsxs(m,{icon:x,children:["Unsure what we do in the interpolation above? Head back to the"," ",e.jsxs(s,{href:l.docs.basic,className:"!text-warningDark",children:[e.jsx(r,{$color:"warning",children:"Base"})," documentation page"]})]})]}),e.jsxs(a,{children:["When to use ",e.jsx(r,{$size:"2xl",children:"rc.extend"}),"?"]}),e.jsxs(i,{children:[e.jsx(n,{children:"There are two different scenarios where extending components is helpful:"}),e.jsx(o,{children:"1. Reduce redundancy"}),e.jsxs(n,{children:['When you wanna extend a "base"-component, in which you desired to set less specific styling classnames (e.g. outer margins, typography, etc.) ',e.jsx(r,{children:"rc.extend"})," could be your pick. For example these are some elements which are re-used all over this documentation:"]}),e.jsx(t,{input:S}),e.jsx(o,{children:"2. Extend classnames of a third-party library component"}),e.jsx(t,{input:w})]}),e.jsxs(a,{children:["When to ",e.jsx("strong",{children:"not"})," use"," "]}),e.jsxs(i,{children:[e.jsx(n,{children:"A classic example where you find yourself extending the same component multiple times to assign almost similar classnames:"}),e.jsx(t,{input:j}),e.jsx(o,{children:"Why is this bad practice?"}),e.jsxs("ul",{className:"list-disc list-inside mb-4 ml-4",children:[e.jsx("li",{children:"Cluttered, redundant code"}),e.jsx("li",{children:"Base component is likely going to be unused"})]}),e.jsx(o,{children:"How to fix?"}),e.jsxs(n,{children:["In the example above it's very likely that we will not implement the"," ",e.jsx(r,{children:"GradientBase"})," in the jsx later and might want to consider creating a"," ",e.jsx(s,{href:l.docs.variants,children:"variant"})," out of our blueprint from above. Here is an example how we could do it:"]}),e.jsx(t,{input:g})]})]}),v=Object.freeze(Object.defineProperty({__proto__:null,default:T},Symbol.toStringTag,{value:"Module"})),P=()=>"Extend Components | react-classmate",E=Object.freeze(Object.defineProperty({__proto__:null,default:P},Symbol.toStringTag,{value:"Module"})),_={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},Loading:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/Loading",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:d}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:c}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},lang:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","lang"]},valueSerialized:{type:"js-serialized",value:"en"}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/pages/docs/+Layout.tsx",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/pages/+Layout.tsx",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"plus-file",exportValues:u},{type:"plus-file",exportValues:p}]},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/extend/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:v}},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/extend/+title.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:E}}};export{_ as configValuesSerialized};
