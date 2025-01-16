import{X as t,c as u,B as c,g as h,j as e,f as n,b as s,S as p,e as x,h as y,k as g,l as f,C as v,m as j,i as b,o as w,a as S}from"../chunks/chunk-D9omzb_q.js";import{N as C,D as T,a as N,H as a}from"../chunks/chunk-LWXXMUun.js";import{D as k}from"../chunks/chunk-F-X9b3Cv.js";/* empty css                      */import"../chunks/chunk-CYDrz2XN.js";/* empty css                      *//* empty css                      *//* empty css                      */const o=t.extend(C)`
  !p-2
  md:!p-3
  rounded 
  border-1
  border-grayLight/50 dark:border-graySuperLight/50 
  shadow-md
  shadow-gray/20
  dark:shadow-light/50
`,z=`const MyButton = rc.button\`
  text-blue
  bg-white
  rounded-lg
  \${(p) => (p.$isLoading" ? "opacity-50 pointer-events-none" : "")}
\``,P=`<MyButton $isLoading={true} type="button" />

// renders to:
<button class="text-blue bg-white rounded-lg opacity-50 pointer-events-none" type="button">Click here</button>`,A=`const SectionBase = rc.div\`
  px-3
  text-dark
  mx-auto
\`

const CustomSection = rc.extend(SectionBase)\`
  mb-3
  \${(p) => (p.$small ? "text-sm" : "")}
\``,L=`<CustomButton $isLoading $customState type="button" />

// renders to:
<button class="text-blue bg-white rounded-lg opacity-50 pointer-events-none mb-3 text-center bg-black animate-pulse" type="button">Click here</button>`,U=`const Alert = rc.div.variants({
  base: "p-4 rounded-md",
  variants: {
    $severity: {
      info: (p) => \`bg-blue-100 text-blue-800 \${p.$isActive ? "shadow-lg" : ""}\`,
      warning: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800",
    },
  },
  defaultVariants: {
    $severity: "info",
  },
})`,$=`<Alert $severity="warning">This is an warning alert</Alert>
// renders:
<div class="p-4 rounded-md bg-yellow-100 text-yellow-800">This is an warning alert</div>`,r=t.div`
  grid-cols-1 md:grid-cols-2 
  grid gap-10
  items-center
  mb-20
`,i=t.extend(u)`
  flex md:items-center items-start
  gap-2
  mb-8
  !text-xl
`,l=t.extend(c)`mt-8`,m=t.div.variants({base:`
    absolute -mt-100 left-0 w-full
    h-100 
    pointer-events-none
  `,variants:{$type:{variants:"from-primarySuperLight top-0 bg-gradient-to-t",footer:"from-primarySuperLight -bottom-100 bg-gradient-to-b"}}}),d=t.p`text-lg`;t.extend(h)`mb-4`;t.p`text-sm`;const D=()=>e.jsxs(e.Fragment,{children:[e.jsxs(n,{type:"small",className:"px-0 z-10",children:[e.jsxs("div",{className:"text-center sm:w-3/4 lg:w-3/5 mx-auto mb-20",children:[e.jsx(T,{headingStyle:"h1",excerpt:"A tool for managing React component class names, variants and styles with the simplicity of styled-components and cva.",main:"React Classmate",pre:"Welcome to",centered:!0}),e.jsxs("div",{className:"flex justify-center gap-4",children:[e.jsxs(c,{id:"get-started-button",color:"primary",link:s.docs.getStarted,children:[e.jsx(p,{className:"h-4 w-4"}),"Get Started"]}),e.jsxs(c,{"aria-label":"Visit NPM Package",link:x.npm,color:"secondary",children:[e.jsx("div",{className:"h-4.5 w-4.5",children:e.jsx(y,{color:"lightNeutral"})}),"Check on NPM"]})]})]}),e.jsx("div",{className:"text-center mb-16",children:e.jsx(N,{centered:!0,main:"What's inside?",pre:"Overview"})}),e.jsxs(r,{children:[e.jsxs("div",{children:[e.jsx(i,{children:"Compose simple components"}),e.jsx(d,{children:"Create elements on the fly. No need to write repetitive classnames or style logic."}),e.jsxs(l,{color:"secondary",link:s.docs.basic,children:[e.jsx(g,{className:"h-4 w-4"})," Create a classmate component"]})]}),e.jsxs(o,{children:[e.jsx(a,{noCopy:!0,input:z,noGutter:!0}),e.jsx(a,{noCopy:!0,input:P})]})]})]}),e.jsxs(n,{type:"full",className:"z-8 bg-primarySuperLight",children:[e.jsx(m,{$type:"variants"}),e.jsx(n,{type:"small",className:"z-4",children:e.jsxs(r,{children:[e.jsxs(o,{className:"order-2 md:order-1",children:[e.jsx(a,{noCopy:!0,input:U,noGutter:!0}),e.jsx(a,{noCopy:!0,input:$})]}),e.jsxs("div",{className:"order-1 md:order-2",children:[e.jsx(i,{children:"Variants"}),e.jsx(d,{children:"Create styled components with different variants based on the props you pass to it."}),e.jsxs(l,{link:s.docs.variants,color:"secondary",children:[e.jsx(f,{className:"h-4 w-4"})," Use variants"]})]})]})}),e.jsx(m,{$type:"footer"})]}),e.jsx(n,{type:"full",className:"z-8",children:e.jsxs(n,{type:"small",className:"z-4",children:[e.jsxs(r,{children:[e.jsxs("div",{children:[e.jsxs(i,{children:["Adapt components with ",e.jsx(v,{$size:"xl",children:"rc.extend"})]}),e.jsx(d,{children:"Extend components with additional classes or styles with the common syntax. Properties from the base component stay accessible."}),e.jsxs(l,{color:"secondary",link:s.docs.extend,children:[e.jsx(j,{className:"h-4 w-4"})," Extend Components"]})]}),e.jsxs(o,{className:"order-2 md:order-1",children:[e.jsx(a,{noCopy:!0,input:A,noGutter:!0}),e.jsx(a,{noCopy:!0,input:L})]})]}),e.jsx(k,{type:"warning",className:"!my-10 md:w-3/4 mx-auto shadow-md",icon:p,children:e.jsx("p",{children:"Typescript Users: The examples above are simplified for demonstration purposes. For a more detailed explanation how to keep your types, please refer to the documentation."})})]})})]}),B=Object.freeze(Object.defineProperty({__proto__:null,default:D},Symbol.toStringTag,{value:"Module"})),W={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},Loading:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/Loading",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:b}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:w}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/pages/+Layout.tsx",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"plus-file",exportValues:S}]},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","title"]},valueSerialized:{type:"js-serialized",value:"react-classmate"}},lang:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","lang"]},valueSerialized:{type:"js-serialized",value:"en"}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/index/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:B}}};export{W as configValuesSerialized};
