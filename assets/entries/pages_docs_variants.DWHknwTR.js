import{j as e,C as t,i as o,a as n,o as r}from"../chunks/chunk-Bokv7s76.js";import{D as l,H as a}from"../chunks/chunk-DYO16Mu5.js";import{S as s,a as d,c as i,i as p}from"../chunks/chunk-CEv1v94T.js";/* empty css                      */import"../chunks/chunk-B1VfgWyW.js";/* empty css                      *//* empty css                      *//* empty css                      */import"../chunks/chunk-ckwbz45p.js";const u=`interface AlertProps {
  $severity: "info" | "warning" | "error"
  $isActive?: boolean
}

const Alert = rc.div.variants<AlertProps>({
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
})`,c=`<Alert $severity="warning" $isActive>Warning alert</Alert>

// renders:
// <button type="button" class="p-4 rounded-md bg-yellow-100 text-yellow-800 font-bold">Warning alert</button>`,f=()=>e.jsxs(e.Fragment,{children:[e.jsx(l,{main:"Variants",pre:"Keep it together",excerpt:e.jsx(e.Fragment,{children:"This function allows you to create a styled component with different variants based on the props you pass to it."})}),e.jsx(s,{children:"Basic syntax"}),e.jsxs(d,{children:[e.jsx(a,{input:u}),e.jsx(i,{children:"The function receives the following properties:"}),e.jsxs("ul",{className:"mb-4",children:[e.jsxs("li",{children:[e.jsx(t,{children:"base"})," - optional - The base classname of the component"]}),e.jsxs("li",{children:[e.jsx(t,{children:"variants"})," - required - An object with the different variants"]}),e.jsxs("li",{children:[e.jsx(t,{children:"defaultVariants"})," - optional - a fallback for when no variant is passed"]})]}),e.jsx(i,{children:"Implementation"}),e.jsx(a,{input:c})]})]}),h=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"})),m=()=>"Variants - React Classmate Documentation",y=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"})),A={hasServerOnlyHook:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!1}},isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:r}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/variants/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:h}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/pages/docs/+Layout.tsx",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/pages/+Layout.tsx",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"plus-file",exportValues:p},{type:"plus-file",exportValues:n}]},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/variants/+title.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:y}},lang:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","lang"]},valueSerialized:{type:"js-serialized",value:"en"}},Loading:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/Loading",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:o}}};export{A as configValuesSerialized};
